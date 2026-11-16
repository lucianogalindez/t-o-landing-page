import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const areas = [
  {
    state: "Rhode Island",
    registration: "RI Reg. GC‑44652",
    cities: [
      "Providence",
      "Warwick",
      "Cranston",
      "Pawtucket",
      "East Providence",
      "Woonsocket",
      "And surrounding areas"
    ],
  },
  {
    state: "Massachusetts",
    registration: "MA HIC 215402",
    cities: [
      "Worcester",
      "Fall River",
      "New Bedford",
      "Attleboro",
      "Taunton",
      "Brockton",
      "And surrounding areas"
    ],
  },
];

export const ServiceAreas = () => {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Service Areas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proudly serving homeowners throughout Rhode Island and Massachusetts
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {areas.map((area) => (
            <Card key={area.state} className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground leading-tight">
                      {area.state}
                    </h3>
                    <p className="text-xs text-muted-foreground tracking-wide">{area.registration}</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-3">
                  {area.cities.filter(c => c !== "And surrounding areas").map((city) => (
                    <li key={city} className="text-muted-foreground flex items-start">
                      <span className="text-accent mr-2">•</span>
                      {city}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground/70 italic">And surrounding areas</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
