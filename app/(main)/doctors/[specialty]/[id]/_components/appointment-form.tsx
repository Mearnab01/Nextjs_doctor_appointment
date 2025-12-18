"use client";

import { useState, useEffect, FormEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Loader2, Clock, ArrowLeft, Calendar, CreditCard } from "lucide-react";
import { bookAppointment } from "@/actions/appointments";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";

type Slot = {
  startTime: string;
  endTime: string;
  formatted: string;
};

type AppointmentResponse = {
  success: boolean;
  appointment?: {
    doctorId: string;
    id: string;
    startTime: Date;
    endTime: Date;
    status: string;
    notes: string | null;
    patientDescription: string | null;
    patientId: string;
  };
};

type AppointmentFormProps = {
  doctorId: string;
  slot: Slot;
  onBack: () => void;
  onComplete: () => void;
};

export function AppointmentForm({
  doctorId,
  slot,
  onBack,
  onComplete,
}: AppointmentFormProps) {
  const [description, setDescription] = useState<string>("");

  const { loading, data, fn: submitBooking } = useFetch(bookAppointment);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("doctorId", doctorId);
    formData.append("startTime", slot.startTime);
    formData.append("endTime", slot.endTime);
    formData.append("description", description);

    await submitBooking(formData);
  };

  useEffect(() => {
    if (data?.success) {
      toast.success("Appointment booked successfully!");
      onComplete();
    }
  }, [data, onComplete]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-muted/20 p-4 rounded-lg border space-y-3">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          <span>{format(new Date(slot.startTime), "EEEE, MMMM d, yyyy")}</span>
        </div>

        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          <span>{slot.formatted}</span>
        </div>

        <div className="flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          <span>
            Cost: <strong>2 credits</strong>
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Describe your medical concern (optional)
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={!!loading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Change Time Slot
        </Button>

        <Button type="submit" disabled={!!loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Booking...
            </>
          ) : (
            "Confirm Booking"
          )}
        </Button>
      </div>
    </form>
  );
}
