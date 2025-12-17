import { PageHeader } from "@/components/page-header";
import { Stethoscope } from "lucide-react";
import React from "react";

export const metadata = {
  title: "Doctor Dashboard - CarePulse",
  description: "Manage your patients and appointments with CarePulse.",
};

const DoctorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Doctor Dashboard" icon={<Stethoscope />} />
      {children}
    </div>
  );
};

export default DoctorLayout;
