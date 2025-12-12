import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden">
      {children}
    </div>
  );
};

export default AuthLayout;
