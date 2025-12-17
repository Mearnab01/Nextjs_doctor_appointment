import { getCurrentUser } from "@/actions/onboarding";
import { redirect } from "next/navigation";
import { Sparkles, Heart } from "lucide-react";

export const metadata = {
  title: "Onboarding - CarePulse",
  description: "Complete your profile to get started with CarePulse",
};

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get complete user profile
  const user = await getCurrentUser();

  // Redirect users who have already completed onboarding
  if (user) {
    if (user.role === "PATIENT") {
      redirect("/doctors");
    } else if (user.role === "DOCTOR") {
      // Check verification status for doctors
      if (user.verificationStatus === "VERIFIED") {
        redirect("/doctor");
      } else {
        redirect("/doctor/verification");
      }
    } else if (user.role === "ADMIN") {
      redirect("/admin");
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-linear-to-br from-emerald-900/10 via-transparent to-blue-900/10 -z-10" />

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 opacity-10">
          <Heart className="h-24 w-24 text-emerald-500" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <Sparkles className="h-24 w-24 text-blue-500" />
        </div>

        <div className="text-center mb-10 relative">
          {/* Animated badge */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-lg animate-pulse"></div>
              <div className="relative px-4 py-2 bg-linear-to-r from-emerald-900/40 to-emerald-800/40 border border-emerald-700/50 rounded-full text-emerald-300 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="h-3 w-3 inline mr-2" />
                Complete Your Profile
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            Welcome to CarePulse
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto bg-gray-900/50 border border-gray-800/50 rounded-lg p-4">
            Tell us how you want to use the platform and start your journey to
            better healthcare
          </p>
        </div>

        {/* Main content card with subtle effects */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-600/20 to-blue-600/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-gray-900/70 border border-gray-800/50 rounded-2xl p-8 backdrop-blur-sm">
            {children}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Your information is securely encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
