"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/**
 * Set doctor's availability slots
 */
export async function setAvailabilitySlots(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const startTime = formData.get("startTime");
    const endTime = formData.get("endTime");

    if (!startTime || !endTime) {
      throw new Error("Start time and end time are required");
    }

    if (startTime >= endTime) {
      throw new Error("Start time must be before end time");
    }

    const existingSlots = await db.availability.findMany({
      where: {
        doctorId: doctor.id,
      },
    });

    if (existingSlots.length > 0) {
      const slotsWithNoAppointments = existingSlots.filter(
        (slot:any) => !slot.appointment
      );

      if (slotsWithNoAppointments.length > 0) {
        await db.availability.deleteMany({
          where: {
            id: {
              in: slotsWithNoAppointments.map((slot) => slot.id),
            },
          },
        });
      }
    }

    const newSlot = await db.availability.create({
      data: {
        doctorId: doctor.id,
        startTime: new Date(String(startTime)),
        endTime: new Date(String(endTime)),
        status: "AVAILABLE",
      },
    });

    revalidatePath("/doctor");
    return { success: true, slot: newSlot };
  } catch (error: unknown) {
    console.error("Failed to set availability slots:", error);
    throw new Error(
      "Failed to set availability: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  }
}


/**
 * Get doctor's current availability slots
 */
export async function getDoctorAvailability() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const availabilitySlots = await db.availability.findMany({
      where: {
        doctorId: doctor.id,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return { slots: availabilitySlots };
  } catch (error:any) {
    console.error("Failed to fetch availability slots " + error.message);
  }
}

export async function getDoctorAppointments() {
  const { userId } = await auth();

  if (!userId) {
    console.warn("Unauthorized");
  }

  try {
    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId ?? undefined,
        role: "DOCTOR",
      },
    });

    if (!doctor) {
      console.warn("Doctor not found");
    }

    const appointments = await db.appointment.findMany({
      where: {
        doctorId: doctor?.id,
        status: {
          in: ["SCHEDULED"],
        },
      },
      include: {
        patient: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return { appointments };
  } catch (error:any) {
    throw new Error("Failed to fetch appointments " + error.message);
  }
}

/* ------------------------------------------------------------------ */
/* Helper: Safe FormData string extractor */
/* ------------------------------------------------------------------ */
function getString(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${key} is required`);
  }

  return value;
}

/* ------------------------------------------------------------------ */
/* Cancel Appointment (Doctor or Patient) */
/* ------------------------------------------------------------------ */
export async function cancelAppointment(
  formData: FormData
): Promise<{ success: true }> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  const appointmentId = getString(formData, "appointmentId");

  const appointment = await db.appointment.findUnique({
    where: { id: appointmentId },
    include: { patient: true, doctor: true },
  });
  if (!appointment) throw new Error("Appointment not found");

  if (
    appointment.patientId !== user.id &&
    appointment.doctorId !== user.id
  ) {
    throw new Error("Not authorized to cancel this appointment");
  }

  await db.$transaction(async (tx) => {
    await tx.appointment.update({
      where: { id: appointmentId },
      data: { status: "CANCELLED" },
    });

    // Refund patient
    await tx.creditTransaction.create({
      data: {
        userId: appointment.patientId,
        amount: 2,
        type: "APPOINTMENT_DEDUCTION",
      },
    });

    // Deduct doctor
    await tx.creditTransaction.create({
      data: {
        userId: appointment.doctorId,
        amount: -2,
        type: "APPOINTMENT_DEDUCTION",
      },
    });

    await tx.user.update({
      where: { id: appointment.patientId },
      data: { credits: { increment: 2 } },
    });

    await tx.user.update({
      where: { id: appointment.doctorId },
      data: { credits: { decrement: 2 } },
    });
  });

  revalidatePath(user.role === "DOCTOR" ? "/doctor" : "/appointments");
  return { success: true };
}

/* ------------------------------------------------------------------ */
/* Add Appointment Notes (Doctor only) */
/* ------------------------------------------------------------------ */
export async function addAppointmentNotes(
  formData: FormData
): Promise<{ success: true }> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const doctor = await db.user.findUnique({
    where: { clerkUserId: userId, role: "DOCTOR" },
  });
  if (!doctor) throw new Error("Doctor not found");

  const appointmentId = getString(formData, "appointmentId");
  const notes = getString(formData, "notes");

  const appointment = await db.appointment.findUnique({
    where: { id: appointmentId, doctorId: doctor.id },
  });
  if (!appointment) throw new Error("Appointment not found");

  await db.appointment.update({
    where: { id: appointmentId },
    data: { notes },
  });

  revalidatePath("/doctor");
  return { success: true };
}

/* ------------------------------------------------------------------ */
/* Mark Appointment as Completed (Doctor only, after end time) */
/* ------------------------------------------------------------------ */
export async function markAppointmentCompleted(
  formData: FormData
): Promise<{ success: true }> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const doctor = await db.user.findUnique({
    where: { clerkUserId: userId, role: "DOCTOR" },
  });
  if (!doctor) throw new Error("Doctor not found");

  const appointmentId = getString(formData, "appointmentId");

  const appointment = await db.appointment.findUnique({
    where: { id: appointmentId, doctorId: doctor.id },
  });
  if (!appointment) {
    throw new Error("Appointment not found or not authorized");
  }

  if (appointment.status !== "SCHEDULED") {
    throw new Error("Only scheduled appointments can be completed");
  }

  if (new Date() < new Date(appointment.endTime)) {
    throw new Error("Appointment has not ended yet");
  }

  await db.appointment.update({
    where: { id: appointmentId },
    data: { status: "COMPLETED" },
  });

  revalidatePath("/doctor");
  return { success: true };
}

