import React from "react";
import { Badge } from "../ui/badge";
import Pricing from "../pricing";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Stethoscope } from "lucide-react";
import { creditBenefits } from "@/lib/data";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4"
          >
            Smart, Simple Pricing
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose a Plan That Fits Your Care
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Flexible consultation credits designed to make quality healthcare
            affordable and accessible—whenever you need it.
          </p>
        </div>

        <div className="mx-auto">
          {/* Pricing Table (Clerk Paywall / Subscription UI) */}
          <Pricing />

          {/* Credit System Explanation */}
          <Card className="mt-12 bg-muted/20 border-emerald-900/30">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white flex items-center">
                <Stethoscope className="h-5 w-5 mr-2 text-emerald-400" />
                Understanding Our Credit System
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {creditBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-emerald-900/10 border border-emerald-800/20 hover:bg-emerald-900/20 transition-all duration-200"
                  >
                    {/* Icon */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900/30 border border-emerald-800/30">
                      {benefit.icon && (
                        <benefit.icon className="h-5 w-5 text-emerald-400" />
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <p className="text-base leading-relaxed text-white font-medium">
                        {benefit.highlight}
                      </p>
                      <p className="text-muted-foreground text-sm mt-1">
                        {benefit.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
