
import { LucideIcon } from "lucide-react";
// ----------- TYPES -----------
export interface FeatureItem {
  icon: string ;
  title: string;
  description: string;
}

export interface TestimonialItem {
  initials: string;
  name: string;
  role: string;
  quote: string;
}

// No HTML allowed in TS strings → use plain text
export interface CreditBenefitItem {
  icon?: LucideIcon;
  highlight?: string;
  text: string;
}

type UserRole = "DOCTOR" | "PATIENT";

type AppointmentStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED";

type AppointmentUser = {
  id: string;
  name: string;
  email?: string;
  specialty?: string;
};

type Appointment = {
  id: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  notes: string | null;
  patientDescription: string | null;
  patient: AppointmentUser;
  doctor: AppointmentUser;
};

type ActionType = "cancel" | "notes" | "video" | "complete" | null;

type AppointmentCardProps = {
  appointment: Appointment;
  userRole: UserRole;
  refetchAppointments?: () => void;
};
