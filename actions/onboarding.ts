"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/* ----------------------------- Types ----------------------------- */

type UserRole = "PATIENT" | "DOCTOR";

interface ActionResult {
  success: boolean;
  redirect?: string;
}

/* ----------------------- Set User Role Action -------------------- */

export async function setUserRole(formData: FormData): Promise<ActionResult> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Find user in database
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found in database");
  }

  const role = formData.get("role") as UserRole | null;

  if (!role || !["PATIENT", "DOCTOR"].includes(role)) {
    throw new Error("Invalid role selection");
  }

  try {
    /* -------------------------- PATIENT -------------------------- */
    if (role === "PATIENT") {
      await db.user.update({
        where: { clerkUserId: userId },
        data: { role: "PATIENT" },
      });

      revalidatePath("/");
      return { success: true, redirect: "/doctors" };
    }

    /* --------------------------- DOCTOR -------------------------- */
    const specialty = formData.get("specialty") as string | null;
    const experienceRaw = formData.get("experience") as string | null;
    const credentialUrl = formData.get("credentialUrl") as string | null;
    const description = formData.get("description") as string | null;

    const experience = experienceRaw ? Number(experienceRaw) : NaN;

    if (
      !specialty ||
      !credentialUrl ||
      !description ||
      Number.isNaN(experience)
    ) {
      throw new Error("All doctor fields are required");
    }

    await db.user.update({
      where: { clerkUserId: userId },
      data: {
        role: "DOCTOR",
        specialty,
        experience,
        credentialUrl,
        description,
        verificationStatus: "PENDING",
      },
    });

    revalidatePath("/");
    return { success: true, redirect: "/doctor/verification" };
  } catch (error: unknown) {
    console.error("Failed to set user role:", error);

    if (error instanceof Error) {
      throw new Error(`Failed to update user profile: ${error.message}`);
    }

    throw new Error("Failed to update user profile");
  }
}

/* ---------------------- Get Current User ------------------------- */

export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    return user;
  } catch (error) {
    console.error("Failed to get user information:", error);
    return null;
  }
}
 