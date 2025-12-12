
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