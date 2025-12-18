"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { deductCreditsForAppointment } from "@/actions/credits";
import { Vonage } from "@vonage/server-sdk";
import { addDays, addMinutes, format, isBefore, endOfDay } from "date-fns";
import { Auth } from "@vonage/auth";
import { MediaMode } from "@vonage/video";

// Initialize Vonage Video API client
const credentials = new Auth({
  applicationId: process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID,
  privateKey: process.env.VONAGE_PRIVATE_KEY_PATH,
});
const options = {};
const vonage = new Vonage(credentials, options);

/**
 * Get doctor by ID
 */
interface Doctor {
  id: string;
  clerkUserId: string;
  email: string;
  name: string | null;
  verificationStatus: string | null;
  specialty: string | null;
  experience: number | null;
}

interface GetDoctorByIdResponse {
  doctor: Doctor | null;
}

export async function getDoctorById(doctorId: string): Promise<GetDoctorByIdResponse | undefined> {
  try {
    const doctor = await db.user.findUnique({
      where: {
        id: doctorId,
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
      },
    });

    if (!doctor) {
      console.error("Doctor not found");
    }

    return { doctor };
  } catch (error) {
    console.error("Failed to fetch doctor:", error);
  }
}

/**
 * Generate a Vonage Video API session
 */
async function createVideoSession() {
  try {
    const session = await vonage.video.createSession({ mediaMode: MediaMode.ROUTED });
    return session.sessionId;
  } catch (error:any) {
    console.error("Failed to create video session: " + error.message);
  }
}

/**
 * Get available time slots for booking for the next 4 days
 */
interface TimeSlot {
  startTime: string;
  endTime: string;
  formatted: string;
  day: string;
}

interface DaySlots {
  date: string;
  displayDate: string;
  slots: TimeSlot[];
}

interface GetAvailableTimeSlotsResponse {
  days: DaySlots[];
}

export async function getAvailableTimeSlots(doctorId: string): Promise<GetAvailableTimeSlotsResponse | undefined> {
  try {
    // Validate doctor existence and verification
    const doctor = await db.user.findUnique({
      where: {
        id: doctorId,
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found or not verified");
    }

    // Fetch a single availability record
    const availability = await db.availability.findFirst({
      where: {
        doctorId: doctor.id,
        status: "AVAILABLE",
      },
    });

    if (!availability) {
      throw new Error("No availability set by doctor");
    }

    // Get the next 4 days
    const now = new Date();
    const days = [now, addDays(now, 1), addDays(now, 2), addDays(now, 3)];

    // Fetch existing appointments for the doctor over the next 4 days
    const lastDay = endOfDay(days[3]);
    const existingAppointments = await db.appointment.findMany({
      where: {
        doctorId: doctor.id,
        status: "SCHEDULED",
        startTime: {
          lte: lastDay,
        },
      },
    });

    const availableSlotsByDay: Record<string, TimeSlot[]> = {};

    // For each of the next 4 days, generate available slots
    for (const day of days) {
      const dayString = format(day, "yyyy-MM-dd");
      availableSlotsByDay[dayString] = [];

      // Create a copy of the availability start/end times for this day
      const availabilityStart = new Date(availability.startTime);
      const availabilityEnd = new Date(availability.endTime);

      // Set the day to the current day we're processing
      availabilityStart.setFullYear(
        day.getFullYear(),
        day.getMonth(),
        day.getDate()
      );
      availabilityEnd.setFullYear(
        day.getFullYear(),
        day.getMonth(),
        day.getDate()
      );

      let current = new Date(availabilityStart);
      const end = new Date(availabilityEnd);

      while (
        isBefore(addMinutes(current, 30), end) ||
        +addMinutes(current, 30) === +end
      ) {
        const next = addMinutes(current, 30);

        // Skip past slots
        if (isBefore(current, now)) {
          current = next;
          continue;
        }

        const overlaps = existingAppointments.some((appointment) => {
          const aStart = new Date(appointment.startTime);
          const aEnd = new Date(appointment.endTime);

          return (
            (current >= aStart && current < aEnd) ||
            (next > aStart && next <= aEnd) ||
            (current <= aStart && next >= aEnd)
          );
        });

        if (!overlaps) {
          availableSlotsByDay[dayString].push({
            startTime: current.toISOString(),
            endTime: next.toISOString(),
            formatted: `${format(current, "h:mm a")} - ${format(
              next,
              "h:mm a"
            )}`,
            day: format(current, "EEEE, MMMM d"),
          });
        }

        current = next;
      }
    }

    // Convert to array of slots grouped by day for easier consumption by the UI
    const result: DaySlots[] = Object.entries(availableSlotsByDay).map(([date, slots]) => ({
      date,
      displayDate:
        slots.length > 0
          ? slots[0].day
          : format(new Date(date), "EEEE, MMMM d"),
      slots,
    }));

    return { days: result };
  } catch (error) {
    console.error("Failed to fetch available slots:", error);
  }
}

/**
 * Book a new appointment with a doctor
 */
export async function bookAppointment(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    // Get the patient user
    const patient = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "PATIENT",
      },
    });

    if (!patient) {
      throw new Error("Patient not found");
    }

    // Parse form data
    const doctorId = formData.get("doctorId") as string;
    const startTime = new Date(formData.get("startTime") as string);
    const endTime = new Date(formData.get("endTime") as string);
    const patientDescription = (formData.get("description") as string) || null;

    // Validate input
    if (!doctorId || !startTime || !endTime) {
      throw new Error("Doctor, start time, and end time are required");
    }

    // Check if the doctor exists and is verified
    const doctor = await db.user.findUnique({
      where: {
        id: doctorId,
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found or not verified");
    }

    // Check if the patient has enough credits (2 credits per appointment)
    if (patient.credits < 2) {
      throw new Error("Insufficient credits to book an appointment");
    }

    // Check if the requested time slot is available
    const overlappingAppointment = await db.appointment.findFirst({
      where: {
        doctorId: doctorId,
        status: "SCHEDULED",
        OR: [
          {
            // New appointment starts during an existing appointment
            startTime: {
              lte: startTime,
            },
            endTime: {
              gt: startTime,
            },
          },
          {
            // New appointment ends during an existing appointment
            startTime: {
              lt: endTime,
            },
            endTime: {
              gte: endTime,
            },
          },
          {
            // New appointment completely overlaps an existing appointment
            startTime: {
              gte: startTime,
            },
            endTime: {
              lte: endTime,
            },
          },
        ],
      },
    });

    if (overlappingAppointment) {
      throw new Error("This time slot is already booked");
    }

    // Create a new Vonage Video API session
    const sessionId = await createVideoSession();

    // Deduct credits from patient and add to doctor
    const { success, error } = await deductCreditsForAppointment(
      patient.id,
      doctor.id
    );

    if (!success) {
      throw new Error(error || "Failed to deduct credits");
    }

    // Create the appointment with the video session ID
    const appointment = await db.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: doctor.id,
        startTime,
        endTime,
        patientDescription,
        status: "SCHEDULED",
        videoSessionId: sessionId, // Store the Vonage session ID
      },
    });

    revalidatePath("/appointments");
    return { success: true, appointment: appointment };
  } catch (error:any) {
    console.error("Failed to book appointment:", error);
    
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
/* Generate Video Token */
/* ------------------------------------------------------------------ */
export async function generateVideoToken(
  formData: FormData
): Promise<{
  success: true;
  videoSessionId: string;
  token: string;
}> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  const appointmentId = getString(formData, "appointmentId");

  const appointment = await db.appointment.findUnique({
    where: { id: appointmentId },
  });
  if (!appointment) throw new Error("Appointment not found");

  if (
    appointment.doctorId !== user.id &&
    appointment.patientId !== user.id
  ) {
    throw new Error("Not authorized to join this call");
  }

  if (appointment.status !== "SCHEDULED") {
    throw new Error("Appointment is not scheduled");
  }

  if (!appointment.videoSessionId) {
    throw new Error("Video session has not been created");
  }

  /* -------------------------------------------------------------- */
  /* Time validation */
  /* -------------------------------------------------------------- */
  const now = new Date();
  const startTime = new Date(appointment.startTime);
  const minutesUntilStart =
    (startTime.getTime() - now.getTime()) / (1000 * 60);

  if (minutesUntilStart > 30) {
    throw new Error(
      "Call can only be joined 30 minutes before the scheduled time"
    );
  }

  /* -------------------------------------------------------------- */
  /* Token expiration (1 hour after appointment end) */
  /* -------------------------------------------------------------- */
  const endTime = new Date(appointment.endTime);
  const expireTime =
    Math.floor(endTime.getTime() / 1000) + 60 * 60;

  const connectionData = JSON.stringify({
    userId: user.id,
    name: user.name,
    role: user.role,
  });

  const token = vonage.video.generateClientToken(
    appointment.videoSessionId,
    {
      role: "publisher",
      expireTime,
      data: connectionData,
    }
  );

  await db.appointment.update({
    where: { id: appointmentId },
    data: { videoSessionToken: token },
  });

  return {
    success: true,
    videoSessionId: appointment.videoSessionId,
    token,
  };
}
