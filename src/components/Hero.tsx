import { Button } from "@/components/ui/button";
import { Phone, FileText } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

export const Hero = () => {
  const handleCallNow = () => {
    window.location.href = "tel:4016325085";
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center bg-cover bg-center pt-16 md:pt-20"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <p className="text-lg md:text-xl font-semibold text-accent mb-4 tracking-wide">
            Building & Remodeling
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Expert Building & Remodeling in RI & MA
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl">
            Clean, high-quality work for residential construction and home improvement projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={handleCallNow}
              className="text-lg font-semibold"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
            <Button 
              size="lg" 
              variant="hero"
              onClick={scrollToContact}
              className="text-lg font-semibold"
            >
              <FileText className="mr-2 h-5 w-5" />
              Request a Free Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
