import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative pt-10 pb-22 overflow-hidden">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* left side */}
          <div className="leftSide space-y-8">
            <Badge
              variant="outline"
              className="bg-emerald-900/30 border-emerald-700/30 px-4 py-2 text-emerald-300 text-sm font-medium"
            >
              Your Instant Health Companion
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Connect with CarePulse
              <br /> <span className="gradient-title">Anytime, Anywhere</span>
            </h1>
            <p className="text-lg text-gray-300">
              Your gateway to instant medical consultations, consult via video,
              and seamless care coordination. Experience healthcare at your
              fingertips with CarePulse.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-emerald-500 text-white hover:bg-emerald-700 duration-150 transition-all"
                size={"lg"}
              >
                <Link href="/onboarding">
                  Get Started <ArrowRightCircle className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-emerald-700/30 hover:bg-muted/80"
              >
                <Link href="/doctors">Find Doctors</Link>
              </Button>
            </div>
          </div>

          {/* right side */}
          <div className="rightSide relative h-100 lg:h-125 rounded-xl overflow-hidden">
            <Image
              src="/assets/images/onboarding-img.png"
              alt="Doctor consultation"
              fill
              priority
              className="object-cover md:pt-14 rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
