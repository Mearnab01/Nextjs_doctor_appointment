import React from "react";

export const metadata = {
  title: "Find Doctors - CarePulse",
  description:
    "Discover top-rated doctors and healthcare professionals near you with CarePulse. Book appointments, read reviews, and manage your health effortlessly.",
};

const DoctorsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
};

export default DoctorsLayout;
