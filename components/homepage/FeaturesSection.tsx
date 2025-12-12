import { features } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-emerald-500">CarePulse</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl text-center mx-auto">
            Discover the benefits of using{" "}
            <span className="text-emerald-500">CarePulse</span> for your
            healthcare needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card border-emerald-700 hover:border-emerald-800/40 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/10 hover:scale-[1.02] hover:cursor-pointer"
            >
              <CardHeader className="pb-2">
                <div className="bg-emerald-900/20 p-3 rounded-lg w-fit mb-4">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    className="h-8 w-8"
                    width={32}
                    height={32}
                  />
                </div>
                <CardTitle className="text-xl font-semibold text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
