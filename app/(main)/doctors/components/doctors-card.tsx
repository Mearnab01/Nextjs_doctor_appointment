import { User, Star, Calendar, Award, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  imageUrl?: string;
  rating?: number;
  experience?: number;
  availability?: string;
  description?: string;
}

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Card className="group relative overflow-hidden border-emerald-900/30 bg-linear-to-b from-emerald-900/5 to-emerald-950/5 hover:border-emerald-500/50 transition-all duration-300">
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-900/0 via-emerald-800/0 to-emerald-900/0 group-hover:from-emerald-900/15 group-hover:via-emerald-800/10 group-hover:to-emerald-900/15 transition-all duration-500 -z-10" />

      <CardContent className="p-6">
        <div className="flex items-start gap-5">
          {/* Doctor Avatar */}
          <div className="relative">
            <div className="absolute -inset-1 bg-emerald-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative w-14 h-14 rounded-full bg-linear-to-br from-emerald-900/40 to-emerald-800/30 border border-emerald-700/30 flex items-center justify-center shrink-0 overflow-hidden">
              {doctor.imageUrl ? (
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-emerald-900/20">
                  <User className="h-7 w-7 text-emerald-300" />
                </div>
              )}
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1 min-w-0">
            {/* Name and Verification */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
              <div>
                <h3 className="font-semibold text-white text-lg group-hover:text-emerald-100 transition-colors truncate">
                  {doctor.name}
                </h3>
                <p className="text-sm text-emerald-400/80">
                  {doctor.specialty}
                </p>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-2">
                <Badge
                  variant="outline"
                  className="bg-emerald-900/30 border-emerald-700/50 text-emerald-300 backdrop-blur-sm"
                >
                  <Star className="h-3 w-3 mr-1 fill-emerald-500" />
                  Verified
                </Badge>

                {doctor.rating && (
                  <div className="flex items-center text-sm text-emerald-400">
                    <Award className="h-3 w-3 mr-1" />
                    {doctor.rating}/5
                  </div>
                )}
              </div>
            </div>

            {/* Experience and Availability */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {doctor.experience && (
                <div className="flex items-center text-sm text-emerald-300/90 bg-emerald-900/20 px-2 py-1 rounded-md">
                  <Clock className="h-3 w-3 mr-1" />
                  {doctor.experience} years
                </div>
              )}

              {doctor.availability && (
                <div className="text-xs text-emerald-400/70 bg-emerald-900/10 px-2 py-1 rounded-md border border-emerald-800/30">
                  {doctor.availability}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-5">
              <p className="text-sm text-emerald-200/70 line-clamp-2 group-hover:line-clamp-none transition-all">
                {doctor.description ||
                  `Experienced ${doctor.specialty.toLowerCase()} specialist`}
              </p>
            </div>

            {/* Action Button */}
            <Button
              asChild
              className="w-full group/btn relative overflow-hidden bg-linear-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 border-emerald-600 hover:border-emerald-500 transition-all duration-300"
            >
              <Link
                href={`/doctors/${doctor.specialty}/${doctor.id}`}
                className="flex items-center justify-center"
              >
                <Calendar className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                <span className="font-medium">View Profile & Book</span>
                <span className="absolute right-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 translate-x-2 transition-all">
                  →
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
