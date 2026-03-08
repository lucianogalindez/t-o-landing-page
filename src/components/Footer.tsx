import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-1">T&O Construction LLC</h3>
            <p className="text-accent font-medium mb-4">Building & Home Remodeling</p>
            <p className="text-primary-foreground/80">
              Professional home remodeling and construction services in Rhode Island and Massachusetts.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a 
                href="tel:4016325085" 
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                401-632-5085
              </a>
              <a 
                href="mailto:info@tandoconstructionllc.com"
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@tandoconstructionllc.com
              </a>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4" />
                Serving RI & MA
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <button
                onClick={() => scrollToSection("services")}
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Our Services
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Request a Quote
              </button>
              <a 
                href="tel:4016325085"
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Call Now
              </a>
            </nav>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-primary-foreground/80">
          <p>&copy; {currentYear} T&O Construction LLC. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/t.oconstructionllc?igsh=MXkxc3B0d3Z1aXl2ZQ=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-primary-foreground transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/share/16hkJaqUaX/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-primary-foreground transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
