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

