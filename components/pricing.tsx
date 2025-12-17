"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PricingTable } from "@clerk/nextjs";

const Pricing: React.FC = () => {
  return (
    <Card
      className="
        relative overflow-hidden
        border border-emerald-900/40
        bg-linear-to-b from-emerald-950/40 via-emerald-950/20 to-transparent
        shadow-lg shadow-emerald-950/40
        backdrop-blur
      "
    >
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15),transparent_70%)]" />

      <CardContent className="relative p-6 md:p-10">
        <PricingTable
          checkoutProps={{
            appearance: {
              elements: {
                drawerRoot: {
                  zIndex: 2000,
                },
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default Pricing;
