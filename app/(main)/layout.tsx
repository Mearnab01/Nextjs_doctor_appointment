import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="conatiner mx-auto my-20">{children}</div>
      <Footer />
    </>
  );
};

export default RootLayout;
