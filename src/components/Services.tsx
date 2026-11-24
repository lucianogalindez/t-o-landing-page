import { Button } from "@/components/ui/button";
import { Square, DoorOpen, UtensilsCrossed, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import windowsImg from "@/assets/service-windows.jpg";
import doorsImg   from "@/assets/service-doors.jpg";
import kitchenImg from "@/assets/service-kitchen.jpg";

// workType must match an option in ContactForm's workTypes so the select gets preselected
const services = [
  {
    title: "Windows",
    subtitle: "Installation & Replacement",
    description: "New window installation and full replacement, measured, installed and trimmed for a clean finish.",
    icon: Square,
    image: windowsImg,
    workType: "Windows",
  },
  {
    title: "Doors",
    subtitle: "Entry · French · Sliding · Interior & Exterior",
    description: "Entry, French and sliding doors, interior and exterior, installed and finished to fit your home.",
    icon: DoorOpen,
    image: doorsImg,
    workType: "Doors",
  },
  {
    title: "Remodeling",
    subtitle: "Kitchens · Bathrooms · Floors · Interior Finish",
    description: "Kitchens, bathrooms, floors and interior finish work, from a single room to the whole house.",
    icon: UtensilsCrossed,
    image: kitchenImg,
    workType: "Remodeling",
  },
];

const goToContact = (workType: string) => {
  window.dispatchEvent(new CustomEvent("preselect-work-type", { detail: workType }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
};

export const Services = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Windows, doors and remodeling in Rhode Island and Massachusetts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map(({ title, subtitle, description, icon: Icon, image, workType }) => (
          <div key={title} className="relative overflow-hidden rounded-xl group h-80 md:h-96">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/55 to-primary/15" />

            <div className="relative z-10 h-full flex flex-col justify-end p-5 md:p-6">
              <div className="flex items-start gap-2 mb-2">
                <Icon className="h-3.5 w-3.5 mt-0.5 shrink-0 text-white/60" />
                <span className="text-xs text-white/60 uppercase tracking-wider">{subtitle}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{title}</h3>
              <p className="text-sm text-white/75 mb-4 leading-relaxed">{description}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToContact(workType)}
                className="self-start bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary transition-colors"
              >
                Get started
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Entry point to the /203k page */}
      <Link
        to="/203k"
        className="group mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border bg-muted/50 px-5 py-4 md:px-6 hover:border-accent transition-colors"
      >
        <p className="text-foreground">
          <span className="font-semibold">Buying a home that needs work?</span>{" "}
          <span className="text-muted-foreground">We work on FHA 203(k) renovation loans.</span>
        </p>
        <span className="inline-flex items-center text-sm font-semibold text-primary shrink-0">
          Learn about 203(k)
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </div>
  </section>
);
