import { getDoctorById } from "@/actions/appointments";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/page-header";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getDoctorById(id);
  if (!result) return {};

  const { doctor } = result;
  return {
    title: `Dr. ${doctor?.name} - CarePulse`,
    description: `Book an appointment with Dr. ${doctor?.name}, ${doctor?.specialty} specialist with ${doctor?.experience} years of experience.`,
  };
}

export default async function DoctorProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getDoctorById(id);

  if (!result?.doctor) redirect("/doctors");

  const { doctor } = result;

  return (
    <div className="container mx-auto">
      <PageHeader
        // icon={<Stethoscope />}
        title={"Dr. " + doctor.name}
        backLink={`/doctors/${doctor.specialty}`}
        backLabel={`Back to ${doctor.specialty}`}
      />

      {children}
    </div>
  );
}
