import { Button } from "@/components/ui/button";
import { Home, Hammer, Square, DoorOpen, UtensilsCrossed } from "lucide-react";

import framingImg    from "@/assets/service-framing.jpg";
import windowsImg   from "@/assets/service-windows.jpg";
import doorsImg     from "@/assets/service-doors.jpg";
import kitchenImg   from "@/assets/service-kitchen.jpg";
import remodelingImg from "@/assets/service-remodeling.jpg";

const services = [
  {
    title: "Framing",
    subtitle: "Walls · Floors · Roof · New Build",
    description: "Structural framing for walls, floors, and roof systems, built with precision from the foundation up on new residential construction.",
    icon: Hammer,
    image: framingImg,
    featured: true,
  },
  {
    title: "Window Installation",
    subtitle: "Installation & Replacement",
    description: "Energy-efficient window installation and full replacement service.",
    icon: Square,
    image: windowsImg,
    featured: false,
  },
  {
    title: "Door Installation",
    subtitle: "Interior & Exterior",
    description: "Entry, French, and sliding door installation, interior and exterior.",
    icon: DoorOpen,
    image: doorsImg,
    featured: false,
  },
  {
    title: "Kitchen Renovation",
    subtitle: "Full Remodel",
    description: "Full kitchen remodels from layout planning through finished cabinetry and surfaces.",
    icon: UtensilsCrossed,
    image: kitchenImg,
    featured: false,
  },
  {
    title: "Home Remodeling",
    subtitle: "Full Home",
    description: "Complete interior transformations, from single rooms to whole-house renovations.",
    icon: Home,
    image: remodelingImg,
    featured: false,
  },
];

const scrollToContact = () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
};

interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  image: string;
  featured: boolean;
}

const ServiceCard = ({ title, subtitle, description, icon: Icon, image, featured }: ServiceCardProps) => (
  <div
    className={`relative overflow-hidden rounded-xl group cursor-default ${
      featured ? "h-72 md:h-80" : "h-60"
    }`}
  >
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
      style={{ backgroundImage: `url(${image})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/55 to-primary/15" />

    <div className="relative z-10 h-full flex flex-col justify-end p-5 md:p-6">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-3.5 w-3.5 text-white/60" />
        <span className="text-xs text-white/60 uppercase tracking-wider">{subtitle}</span>
      </div>
      <h4 className={`font-bold text-white mb-2 leading-tight ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}>
        {title}
      </h4>
      <p className="text-sm text-white/75 mb-4 leading-relaxed">{description}</p>
      <Button
        variant="outline"
        size="sm"
        onClick={scrollToContact}
        className="self-start bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary transition-colors"
      >
        Request a Quote
      </Button>
    </div>
  </div>
);

export const Services = () => {
  const [featured, ...rest] = services;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional construction and home improvement services tailored to your needs
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <ServiceCard {...featured} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rest.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
