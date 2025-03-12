import HeroSection from "@/components/hero";
import { features } from "@/data/features";
import {
  Card, CardContent,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <div className="grid-background">

      </div>
      <HeroSection />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Powerful Features for Your Career Growth</h2>
          <div>
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent>
                  <div>{feature.icon}
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
