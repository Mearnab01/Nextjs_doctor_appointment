import Link from "next/link";
import { Badge } from "../ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1.5 text-emerald-400 text-sm font-medium mb-4"
          >
            <Sparkles className="h-3 w-3 mr-2 inline" />
            Smart, Simple Pricing
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose a Plan That Fits Your Care
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Flexible consultation credits designed to make quality healthcare
            affordable and accessible—whenever you need it.
          </p>

          <Link href="/pricing">
            <Button
              variant="outline"
              className="mt-8 group relative overflow-hidden border-emerald-700/50 hover:border-emerald-500 hover:bg-linear-to-r hover:from-emerald-900/20 hover:to-emerald-800/20 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center text-emerald-300 group-hover:text-emerald-200">
                Go to Pricing Page
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-linear-to-r from-emerald-900/0 via-emerald-700/10 to-emerald-900/0 group-hover:from-emerald-900/30 group-hover:via-emerald-700/20 group-hover:to-emerald-900/30 transition-all duration-500" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
