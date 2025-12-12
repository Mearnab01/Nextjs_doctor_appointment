import { CreditBenefitItem, FeatureItem, TestimonialItem } from "@/types";

import {
  Coins,
  Infinity,
  RefreshCcw,
  XCircle,
} from "lucide-react";



// ----------- FEATURES -----------
export const features: FeatureItem[] = [
  {
    icon: "/assets/icons/user.svg",
    title: "Create Your Profile",
    description:
      "Set up a secure personal profile to manage your health information and preferences effortlessly.",
  },
  {
    icon: "/assets/icons/calendar.svg",
    title: "Easy Appointment Booking",
    description:
      "Choose your doctor, pick an available time slot, and book appointments without any hassle.",
  },
  {
    icon: "/assets/icons/email.svg",
    title: "Instant Notifications",
    description:
      "Receive timely updates about appointment status, reminders, and doctor messages straight to your inbox.",
  },
  {
    icon: "/assets/icons/check-circle.svg",
    title: "Seamless Consultations",
    description:
      "Join appointments confidently with reliable, verified systems that ensure smooth communication.",
  },
  {
    icon: "/assets/icons/upload.svg",
    title: "Upload Medical Documents",
    description:
      "Easily upload prescriptions, lab reports, or medical papers for your doctor to review before or during consultation.",
  },
  {
    icon: "/assets/icons/pending.svg",
    title: "Track Appointment Status",
    description:
      "Stay informed with real-time updates for pending, approved, or completed appointments.",
  },
];



// ----------- TESTIMONIALS -----------
export const testimonials: TestimonialItem[] = [
  {
    initials: "SP",
    name: "Sarah P.",
    role: "Patient",
    quote:
      "Video consultations saved me hours every week. I get medical help without ever rushing to a clinic.",
  },
  {
    initials: "DR",
    name: "Dr. Robert M.",
    role: "Cardiologist",
    quote:
      "This platform transformed how I practice. I can now help more patients efficiently and effectively.",
  },
  {
    initials: "JT",
    name: "James T.",
    role: "Patient",
    quote:
      "The credit system is incredibly convenient. My whole family uses it for quick specialist consultations.",
  },
];

// ----------- CREDIT BENEFITS -----------
export const creditBenefits: CreditBenefitItem[] = [
  {
    icon: Coins,
    highlight: "2 credits per consultation",
    text: "Every consultation requires only two credits, no hidden charges.",
  },
  {
    icon: Infinity,
    highlight: "Credits never expire",
    text: "Use credits whenever you need—no deadline, no pressure.",
  },
  {
    icon: RefreshCcw,
    highlight: "Monthly credit refresh",
    text: "Subscription plans deliver fresh credits every month automatically.",
  },
  {
    icon: XCircle,
    highlight: "Cancel anytime",
    text: "No lock-ins, no penalties—manage your subscription freely.",
  },
];

