import { getDoctorById, getAvailableTimeSlots } from "@/actions/appointments";
import { DoctorProfile } from "./_components/doctor-profile";
import { redirect } from "next/navigation";

export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    // Fetch doctor data and available slots in parallel
    const [doctorData, slotsData] = await Promise.all([
      getDoctorById(id),
      getAvailableTimeSlots(id),
    ]);

    if (!doctorData?.doctor) {
      redirect("/doctors");
    }

    return (
      <DoctorProfile
        doctor={doctorData?.doctor as any}
        availableDays={slotsData?.days || []}
      />
    );
  } catch (error) {
    console.error("Error loading doctor profile:", error);
    redirect("/doctors");
  }
}
