"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Slot = {
  startTime: string;
  endTime: string;
  formatted: string;
};

type DaySlots = {
  date: string;
  displayDate: string;
  slots: Slot[];
};

type SlotPickerProps = {
  days: DaySlots[];
  onSelectSlot: (slot: Slot) => void;
};

export const SlotPicker = ({ days, onSelectSlot }: SlotPickerProps) => {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const firstDayWithSlots =
    days.find((day) => day.slots.length > 0)?.date || days[0]?.date;

  const [activeTab, setActiveTab] = useState<string | undefined>(
    firstDayWithSlots
  );

  const handleSlotSelect = (slot: Slot) => {
    setSelectedSlot(slot);
  };

  const confirmSelection = () => {
    if (selectedSlot) {
      onSelectSlot(selectedSlot);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full justify-start overflow-x-auto">
          {days.map((day) => (
            <TabsTrigger
              key={day.date}
              value={day.date}
              disabled={day.slots.length === 0}
            >
              <div className="flex gap-2">
                <div>{format(new Date(day.date), "MMM d")}</div>
                <div>({format(new Date(day.date), "EEE")})</div>
              </div>
              {day.slots.length > 0 && (
                <div className="ml-2 text-xs px-2 py-1 rounded">
                  {day.slots.length}
                </div>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {days.map((day) => (
          <TabsContent key={day.date} value={day.date} className="pt-4">
            {day.slots.length === 0 ? (
              <div>No available slots.</div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {day.slots.map((slot) => (
                  <Card
                    key={slot.startTime}
                    onClick={() => handleSlotSelect(slot)}
                  >
                    <CardContent className="p-3 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{format(new Date(slot.startTime), "h:mm a")}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={confirmSelection} disabled={!selectedSlot}>
          Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
