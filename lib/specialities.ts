import type { LucideIcon } from "lucide-react";
import {
  HeartPulse,
  Stethoscope,
  Bone,
  Eye,
  Baby,
  Brain,
  Flower2,
  Target,
  Milestone,
  Microscope,
  Timer,
  Thermometer,
  Activity,
  CircleDot,
} from "lucide-react";

/* ----------------------------- Types ----------------------------- */

export interface Specialty {
  name: string;
  icon: LucideIcon;
}

/* --------------------------- Data ------------------------------- */

export const SPECIALTIES: Specialty[] = [
  {
    name: "General Medicine",
    icon: Stethoscope,
  },
  {
    name: "Cardiology",
    icon: HeartPulse,
  },
  {
    name: "Dermatology",
    icon: CircleDot,
  },
  {
    name: "Endocrinology",
    icon: Timer,
  },
  {
    name: "Gastroenterology",
    icon: Thermometer,
  },
  {
    name: "Neurology",
    icon: Brain,
  },
  {
    name: "Obstetrics & Gynecology",
    icon: Flower2,
  },
  {
    name: "Oncology",
    icon: Target,
  },
  {
    name: "Ophthalmology",
    icon: Eye,
  },
  {
    name: "Orthopedics",
    icon: Bone,
  },
  {
    name: "Pediatrics",
    icon: Baby,
  },
  {
    name: "Psychiatry",
    icon: Brain,
  },
  {
    name: "Pulmonology",
    icon: Activity,
  },
  {
    name: "Radiology",
    icon: CircleDot,
  },
  {
    name: "Urology",
    icon: Milestone,
  },
  {
    name: "Other",
    icon: Microscope,
  },
];
