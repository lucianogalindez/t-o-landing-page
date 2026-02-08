import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Building2, Home, Hammer, Square, DoorOpen, UtensilsCrossed } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Import service background images
import framingImg from "@/assets/service-framing.jpg";
import foundationImg from "@/assets/service-foundation.jpg";
import windowsImg from "@/assets/service-windows.jpg";
import doorsImg from "@/assets/service-doors.jpg";
import kitchenImg from "@/assets/service-kitchen.jpg";
import remodelingImg from "@/assets/service-remodeling.jpg";

const foundationSubOptions = [
  "Excavation + Footings (New Build)",
  "Foundation Insulation + Backfill",
  "Concrete Slab (Basement/Garage)",
];

const structuralServices = [
  {
    title: "Foundation",
    icon: Building2,
    image: foundationImg,
    hasSubOptions: true,
  },
  {
    title: "Framing (Walls/Floors/Roof) – New Build",
    icon: Hammer,
    image: framingImg,
  },
];

const remodelingServices = [
  {
    title: "Window Installation & Replacement",
    icon: Square,
    image: windowsImg,
  },
  {
    title: "Door Installation",
    icon: DoorOpen,
    image: doorsImg,
  },
  {
    title: "Kitchen Renovation",
    icon: UtensilsCrossed,
    image: kitchenImg,
  },
  {
    title: "Full Home Remodeling",
    icon: Home,
    image: remodelingImg,
  },
];

const scrollToContact = (workType?: string) => {
  if (workType) {
    window.dispatchEvent(new CustomEvent("preselect-work-type", { detail: workType }));
  }
  const contactSection = document.getElementById("contact");
  contactSection?.scrollIntoView({ behavior: "smooth" });
};

interface ServiceCardProps {
  title: string;
  icon: React.ElementType;
  image: string;
  hasSubOptions?: boolean;
  onViewOptions?: () => void;
}

const ServiceCard = ({ title, icon: Icon, image, hasSubOptions, onViewOptions }: ServiceCardProps) => (
  <div className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group h-52">
    {/* Background Image */}
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
      style={{ backgroundImage: `url(${image})` }}
    />
    {/* Dark Blue Overlay */}
    <div className="absolute inset-0 bg-primary/70 group-hover:bg-primary/65 transition-colors duration-300" />
    {/* Content */}
    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-5 gap-3">
      <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h4 className="text-base font-semibold text-white">
        {title}
      </h4>
      {hasSubOptions ? (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onViewOptions}
          className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm"
        >
          View Options
        </Button>
      ) : (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => scrollToContact()}
          className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm"
        >
          Request a Quote
        </Button>
      )}
    </div>
  </div>
);

export const Services = () => {
  const [foundationOpen, setFoundationOpen] = useState(false);

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
              <ServiceCard
                key={service.title}
                {...service}
                onViewOptions={service.hasSubOptions ? () => setFoundationOpen(true) : undefined}
              />
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
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </div>

      {/* Foundation Sub-Options Dialog */}
      <Dialog open={foundationOpen} onOpenChange={setFoundationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Foundation Services</DialogTitle>
            <DialogDescription>
              Select a foundation service to request a quote.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-2">
            {foundationSubOptions.map((option) => (
              <Button
                key={option}
                variant="outline"
                className="justify-between text-left h-auto py-3 px-4"
                onClick={() => {
                  setFoundationOpen(false);
                  scrollToContact(option);
                }}
              >
                <span>{option}</span>
                <span className="text-xs text-muted-foreground ml-2 shrink-0">Request a Quote →</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
