import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Home, Hammer, Layers, Shovel, Square, DoorOpen, UtensilsCrossed } from "lucide-react";

const structuralServices = [
  {
    title: "Foundation Insulation + Backfill",
    description: "Includes exterior foam board insulation + prep for drainage/backfill. Protects foundation & improves performance.",
    pricing: "Estimate after site review",
    icon: Layers,
  },
  {
    title: "Concrete Slab (Basement/Garage)",
    description: "Includes gravel base, vapor barrier, reinforcement (mesh/rebar) + pour & finish. Pricing varies by thickness/size & site conditions.",
    pricing: "Estimate after walkthrough",
    icon: Square,
  },
  {
    title: "Framing (Walls/Floors/Roof) – New Build",
    description: "Includes wall/floor framing, beams/LVL (as needed), blocking & layout per plans. Not included: engineering/permit fees (if required).",
    pricing: "Estimate after walkthrough",
    icon: Hammer,
  },
  {
    title: "Foundation",
    description: "Foundation walls (forms/rebar/pour) + waterproofing options. Built to code and ready for framing.",
    pricing: "Estimate after site review",
    icon: Building2,
  },
  {
    title: "Excavation + Footings (New Build)",
    description: "Includes excavation/layout, forms, rebar (as needed), concrete pour & finish. Not included: permits/engineering, inspections, unforeseen rock removal (if applicable).",
    pricing: "Varies by plan & site conditions",
    icon: Shovel,
  },
];

const remodelingServices = [
  {
    title: "Window Installation & Replacement",
    description: "Energy-efficient windows professionally installed to enhance your home's comfort and value.",
    icon: Square,
  },
  {
    title: "Door Installation",
    description: "Beautiful, secure doors that make a lasting first impression and improve home security.",
    icon: DoorOpen,
  },
  {
    title: "Kitchen Renovation",
    description: "Transform your kitchen into a beautiful, functional space perfect for cooking and entertaining.",
    icon: UtensilsCrossed,
  },
  {
    title: "Full Home Remodeling",
    description: "Complete home transformations from concept to completion with attention to every detail.",
    icon: Home,
  },
];

const scrollToContact = () => {
  const contactSection = document.getElementById("contact");
  contactSection?.scrollIntoView({ behavior: "smooth" });
};

export const Services = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional construction and home improvement services tailored to your needs
          </p>
        </div>

        {/* Structural & New Construction */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center md:text-left">
            Structural & New Construction
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {structuralServices.map((service) => (
              <Card key={service.title} className="border border-border shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col">
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <service.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">
                      {service.title}
                    </h4>
                  </div>
                  <p className="text-muted-foreground mb-3 flex-grow">
                    {service.description}
                  </p>
                  <p className="text-sm font-medium text-accent mb-4">
                    Pricing: {service.pricing}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={scrollToContact}
                    className="w-full mt-auto"
                  >
                    Request a Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Remodeling & Home Improvements */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center md:text-left">
            Remodeling & Home Improvements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {remodelingServices.map((service) => (
              <Card key={service.title} className="border border-border shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col">
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <service.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">
                      {service.title}
                    </h4>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {service.description}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={scrollToContact}
                    className="w-full mt-auto"
                  >
                    Request a Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
