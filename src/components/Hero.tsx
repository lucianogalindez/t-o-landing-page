import { Button } from "@/components/ui/button";
import { Phone, Camera, Grid2x2, DoorOpen, Hammer } from "lucide-react";
import { BlueprintGrid, OwnerPhoto } from "@/components/HeroParts";

const strip = [
  { icon: Grid2x2,  title: "Windows",    detail: "Installation & replacement" },
  { icon: DoorOpen, title: "Doors",      detail: "Entry · French · Sliding · Interior" },
  { icon: Hammer,   title: "Remodeling", detail: "Kitchens · Baths · Floors · Interior finish" },
];

export const Hero = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground min-h-[100svh] flex flex-col">
      <BlueprintGrid />

      <div className="relative flex-1 flex items-center container mx-auto px-4 pt-20 pb-4 md:pt-28 md:pb-12 lg:pt-32 lg:pb-16">
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 lg:gap-16 items-center">

          {/* Text */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <p className="hidden md:block text-accent text-sm font-semibold uppercase tracking-[0.2em] mb-5">
              Rhode Island &amp; Massachusetts
            </p>
            <h1 className="text-[2rem] md:text-5xl 2xl:text-6xl font-bold leading-[1.1] mb-4 md:mb-6">
              You start with a&nbsp;vision.
              <br />
              <span className="text-accent">We build it.</span>
            </h1>
            <p className="text-base md:text-xl text-primary-foreground/80 mb-5 md:mb-9 max-w-xl mx-auto lg:mx-0">
              Windows, doors and remodeling in Rhode Island and Massachusetts.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="text-base font-semibold bg-white text-primary hover:bg-white/90 border-0"
              >
                <a href="tel:4016325085">
                  <Phone className="mr-2 h-5 w-5" />
                  Call 401-632-5085
                </a>
              </Button>
              <Button
                size="lg"
                onClick={scrollToContact}
                className="text-base font-semibold bg-transparent text-white border border-white/60 hover:bg-white/10 hover:border-white/80"
              >
                <Camera className="mr-2 h-5 w-5" />
                Send photos
              </Button>
            </div>

            <p className="mt-3 md:mt-4 text-sm md:text-base text-primary-foreground/75">
              Tell us your city and send a few photos.
            </p>

            <p className="mt-3 md:mt-8 text-sm md:text-base font-medium text-primary-foreground/90 tracking-wide">
              RI Reg. GC‑44652 · MA HIC 215402 · Insured · Hablamos español
            </p>
          </div>

          {/* Photo */}
          <div className="order-1 lg:order-2">
            <OwnerPhoto subtitle="Owner, T&O Construction LLC" />
          </div>

        </div>
      </div>

      {/* Services strip */}
      <div className="relative border-t border-white/10 bg-white/[0.04]">
        <div className="container mx-auto px-4">
          <ul className="grid grid-cols-3 divide-x divide-white/10">
            {strip.map(({ icon: Icon, title, detail }) => (
              <li key={title} className="flex flex-col md:flex-row items-center text-center md:text-left gap-1.5 md:gap-4 py-2.5 md:py-6 px-2 md:px-6 lg:px-8 md:first:pl-0">
                <div className="w-9 h-9 md:w-11 md:h-11 shrink-0 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm md:text-base leading-tight">{title}</p>
                  <p className="hidden md:block text-sm text-primary-foreground/70 leading-snug">{detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
