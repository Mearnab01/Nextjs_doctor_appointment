import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Shield,
  Check,
  Sparkles,
  Heart,
} from "lucide-react";
import { Stethoscope } from "lucide-react";
import { creditBenefits } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import Pricing from "@/components/pricing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="flex justify-start mb-2">
        <Link
          href="/"
          className="flex items-center text-muted-foreground hover:text-white transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-full mx-auto mb-12 text-center relative">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Sparkles className="h-6 w-6 text-purple-500/60 animate-pulse" />
        </div>

        <Badge
          variant="outline"
          className="bg-linear-to-r from-purple-900/40 to-blue-900/40 border-purple-700/30 px-4 py-1.5 text-purple-300 text-sm font-medium mb-4 backdrop-blur-sm"
        >
          <Heart className="h-3 w-3 mr-2" />
          Affordable Healthcare
        </Badge>

        <h1 className="text-4xl md:text-5xl font-bold gradient-title mb-4">
          Simple, Transparent Pricing
          <span className="block text-lg font-normal text-blue-300 mt-2">
            Powered by{" "}
            <span className="font-semibold text-white">CarePulse</span>
          </span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto bg-linear-to-r from-gray-900/50 to-gray-800/50 rounded-lg p-4 border border-gray-800/50">
          Choose the perfect consultation package that fits your healthcare
          needs with no hidden fees or long-term commitments
        </p>
      </div>

      {/* Pricing Table Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-br from-purple-900/10 via-transparent to-blue-900/10 rounded-2xl blur-3xl -z-10" />
        <Pricing />
      </div>
      <div className="mx-auto max-w-7xl mt-10 px-4">
        <Card className="mt-12 bg-muted/20 border-emerald-900/30">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white flex items-center">
              <Stethoscope className="h-5 w-5 mr-2 text-emerald-400" />
              Understanding Our Credit System
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
      {/* Trust Badges */}
      <div className="max-w-3xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-4 rounded-lg bg-gray-900/50 border border-gray-800/50">
          <Shield className="h-8 w-8 text-emerald-400 mb-2" />
          <span className="text-sm font-medium">HIPAA Compliant</span>
          <span className="text-xs text-muted-foreground mt-1">
            Your data is secure
          </span>
        </div>
        <div className="flex flex-col items-center p-4 rounded-lg bg-gray-900/50 border border-gray-800/50">
          <CreditCard className="h-8 w-8 text-blue-400 mb-2" />
          <span className="text-sm font-medium">No Surprise Fees</span>
          <span className="text-xs text-muted-foreground mt-1">
            Transparent pricing
          </span>
        </div>
        <div className="flex flex-col items-center p-4 rounded-lg bg-gray-900/50 border border-gray-800/50">
          <Check className="h-8 w-8 text-purple-400 mb-2" />
          <span className="text-sm font-medium">Cancel Anytime</span>
          <span className="text-xs text-muted-foreground mt-1">
            No commitments
          </span>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-16 text-center p-6 rounded-xl bg-linear-to-br from-gray-900/50 to-gray-800/50 border border-gray-800/50">
        <h2 className="text-2xl font-bold text-white mb-2">
          Questions? We're Here to Help
        </h2>
        <p className="text-muted-foreground mb-4">
          Contact our support team at{" "}
          <span className="text-blue-300 font-medium">
            support@carepulse.com
          </span>
        </p>
        <div className="inline-flex items-center text-sm text-gray-400 bg-gray-900/60 px-3 py-1.5 rounded-full">
          <span className="h-2 w-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
          Average response time: under 2 hours
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-2xl mx-auto mt-8 text-center">
        <p className="text-sm text-gray-500">
          All plans include access to CarePulse's core platform features.
          Additional services may require separate consultation.
        </p>
      </div>
    </div>
  );
}
