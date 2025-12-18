import { getPatientAppointments } from "@/actions/patient";
import { AppointmentCard } from "@/components/appointment-card";
import { PageHeader } from "@/components/page-header";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/onboarding";

/* -------------------- Types -------------------- */
type PatientAppointmentsResult = {
  appointments?: unknown[]; // AppointmentCard already enforces structure
  error?: string;
};

export default async function PatientAppointmentsPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "PATIENT") {
    redirect("/onboarding");
  }

  const { appointments, error }: PatientAppointmentsResult =
    await getPatientAppointments();

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        icon={<Calendar />}
        title="Appointment History"
        backLink="/doctors"
        backLabel="Explore Doctors"
      />

      <Card className="border-emerald-900/20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-emerald-400" />
            Upcoming & Past Consultations
          </CardTitle>
        </CardHeader>

        <CardContent>
          {error ? (
            <div className="text-center py-8">
              <p className="text-red-400">
                Something went wrong while loading your appointments.
              </p>
            </div>
          ) : appointments && appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment: any) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  userRole="PATIENT"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                You do not have any bookings yet
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Once you book a consultation, all your appointment details will
                appear here. Start by choosing a doctor that fits your needs.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
