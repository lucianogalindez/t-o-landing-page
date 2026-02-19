import { Button } from "@/components/ui/button";
import { Home, Hammer, Square, DoorOpen, UtensilsCrossed } from "lucide-react";

// Import service background images
import framingImg from "@/assets/service-framing.jpg";
import windowsImg from "@/assets/service-windows.jpg";
import doorsImg from "@/assets/service-doors.jpg";
import kitchenImg from "@/assets/service-kitchen.jpg";
import remodelingImg from "@/assets/service-remodeling.jpg";

const structuralServices = [
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
}

const ServiceCard = ({ title, icon: Icon, image }: ServiceCardProps) => (
  <div className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group h-52">
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
      style={{ backgroundImage: `url(${image})` }}
    />
    <div className="absolute inset-0 bg-primary/70 group-hover:bg-primary/65 transition-colors duration-300" />
    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-5 gap-3">
      <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h4 className="text-base font-semibold text-white">
        {title}
      </h4>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => scrollToContact()}
        className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm"
      >
        Request a Quote
      </Button>
    </div>
  </div>
);

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
              <ServiceCard
                key={service.title}
                {...service}
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

    </section>
  );
};
