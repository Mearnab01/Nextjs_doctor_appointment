"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Stethoscope, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { setUserRole } from "@/actions/onboarding";
import { doctorFormSchema } from "@/lib/schema";
import { SPECIALTIES } from "@/lib/specialities";
import useFetch from "@/hooks/use-fetch";

import { z } from "zod";

/* ------------------------- Types ------------------------- */

type Step = "choose-role" | "doctor-form";
type DoctorFormValues = z.infer<typeof doctorFormSchema>;

interface ActionResponse {
  success: boolean;
  redirect?: string;
}

/* ----------------------- Component ----------------------- */

export default function OnboardingPage(): React.ReactElement {
  const [step, setStep] = useState<Step>("choose-role");
  const router = useRouter();

  const {
    loading,
    data,
    fn: submitUserRole,
  } = useFetch<[FormData], ActionResponse>(setUserRole);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      specialty: "",
      experience: undefined,
      credentialUrl: "",
      description: "",
    },
  });

  const specialtyValue = watch("specialty");

  const handlePatientSelection = async (): Promise<void> => {
    if (loading) return;

    const formData = new FormData();
    formData.append("role", "PATIENT");

    await submitUserRole(formData);
  };

  useEffect(() => {
    if (data?.success) {
      router.push(data?.redirect ?? "/");
    }
  }, [data, router]);

  const onDoctorSubmit = async (data: DoctorFormValues): Promise<void> => {
    if (loading) return;

    const formData = new FormData();
    formData.append("role", "DOCTOR");
    formData.append("specialty", data.specialty);
    formData.append("experience", data.experience.toString());
    formData.append("credentialUrl", data.credentialUrl);
    formData.append("description", data.description);

    await submitUserRole(formData);
  };

  /* -------------------- Role Selection -------------------- */

  if (step === "choose-role") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patient Card */}
        <Card
          className="border-emerald-900/20 hover:border-emerald-700/40 cursor-pointer transition-all"
          onClick={() => !loading && handlePatientSelection()}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <div className="p-4 bg-emerald-900/20 rounded-full mb-4">
              <User className="h-8 w-8 text-emerald-400" />
            </div>
            <CardTitle className="text-xl font-semibold text-white mb-2">
              Join as a Patient
            </CardTitle>
            <CardDescription className="mb-4">
              Book appointments, consult with doctors, and manage your
              healthcare journey
            </CardDescription>
            <Button
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700"
              disabled={loading ?? false}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Continue as Patient"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Doctor Card */}
        <Card
          className="border-emerald-900/20 hover:border-emerald-700/40 cursor-pointer transition-all"
          onClick={() => !loading && setStep("doctor-form")}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <div className="p-4 bg-emerald-900/20 rounded-full mb-4">
              <Stethoscope className="h-8 w-8 text-emerald-400" />
            </div>
            <CardTitle className="text-xl font-semibold text-white mb-2">
              Join as a Doctor
            </CardTitle>
            <CardDescription className="mb-4">
              Create your professional profile, set your availability, and
              provide consultations
            </CardDescription>
            <Button
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700"
              disabled={loading ?? false}
            >
              Continue as Doctor
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* -------------------- Doctor Form -------------------- */
  return (
    <Card className="border-emerald-900/20">
      <CardContent className="pt-6">
        <div className="mb-6">
          <CardTitle className="text-2xl font-bold text-white mb-2">
            Complete Your Doctor Profile
          </CardTitle>
          <CardDescription>
            Please provide your professional details for verification
          </CardDescription>
        </div>

        <form onSubmit={handleSubmit(onDoctorSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="specialty">Medical Specialty</Label>
            <Select
              value={specialtyValue}
              onValueChange={(value) => setValue("specialty", value)}
            >
              <SelectTrigger id="specialty">
                <SelectValue placeholder="Select your specialty" />
              </SelectTrigger>
              <SelectContent>
                {SPECIALTIES.map((spec) => (
                  <SelectItem key={spec.name} value={spec.name}>
                    {spec.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.specialty && (
              <p className="text-sm font-medium text-red-500 mt-1">
                {errors.specialty.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              type="number"
              placeholder="e.g. 5"
              {...register("experience", { valueAsNumber: true })}
            />
            {errors.experience && (
              <p className="text-sm font-medium text-red-500 mt-1">
                {errors.experience.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="credentialUrl">Link to Credential Document</Label>
            <Input
              id="credentialUrl"
              type="url"
              placeholder="https://example.com/my-medical-degree.pdf"
              {...register("credentialUrl")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description of Your Services</Label>
            <Textarea id="description" rows={4} {...register("description")} />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("choose-role")}
              disabled={loading ?? false}
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={loading ?? false}
              className="bg-emerald-600 hover:bg-emerald-700 hover:brightness-110 hover:cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit for Verification"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
