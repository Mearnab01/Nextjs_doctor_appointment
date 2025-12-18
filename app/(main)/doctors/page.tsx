import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { SPECIALTIES } from "@/lib/specialities";
import { Search, Sparkles } from "lucide-react";

export default async function DoctorsPage() {
  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center mb-10 text-center relative">
        {/* Background decorative elements */}
        <div className="absolute -top-4 opacity-20">
          <Sparkles className="h-8 w-8 text-emerald-500" />
        </div>

        <div className="inline-flex items-center justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-lg"></div>
            <div className="relative px-4 py-1.5 bg-emerald-900/40 border border-emerald-700/50 rounded-full text-emerald-300 text-sm font-medium backdrop-blur-sm flex items-center">
              <Search className="h-3 w-3 mr-2" />
              Find Your Specialist
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-white to-emerald-200 bg-clip-text text-transparent">
          Find Your Doctor
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto bg-emerald-900/10 border border-emerald-800/30 rounded-lg p-4">
          Browse by specialty or view all available healthcare providers
        </p>
      </div>

      {/* Specialties Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {SPECIALTIES.map((specialty) => (
          <Link key={specialty.name} href={`/doctors/${specialty.name}`}>
            <Card className="group relative overflow-hidden hover:border-emerald-500/50 transition-all duration-300 cursor-pointer border-emerald-900/30 bg-emerald-900/5 hover:bg-emerald-900/10 h-full">
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-linear-to-br from-emerald-900/0 via-emerald-800/0 to-emerald-900/0 group-hover:from-emerald-900/20 group-hover:via-emerald-800/10 group-hover:to-emerald-900/20 transition-all duration-500" />

              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full relative z-10">
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-emerald-900/30 to-emerald-800/30 border border-emerald-700/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-emerald-400 text-xl group-hover:text-emerald-300 transition-colors">
                    <specialty.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="font-semibold text-white group-hover:text-emerald-200 transition-colors">
                  {specialty.name}
                </h3>
                <p className="text-xs text-emerald-400/70 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View specialists →
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center justify-center bg-emerald-900/20 border border-emerald-800/30 rounded-full px-4 py-2">
          <div className="h-2 w-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
          <span className="text-sm text-emerald-300">
            All doctors are verified and licensed professionals
          </span>
        </div>
      </div>
    </>
  );
}
