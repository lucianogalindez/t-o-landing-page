import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useSectionNav } from "@/hooks/use-section-nav";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "203(k) Loans", href: "/203k" }, // separate page, not a section
  { name: "Gallery", href: "#gallery" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isOverHero, setIsOverHero] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
      const heroEl = document.getElementById("home");
      if (heroEl) {
        // Switch to solid when the light section is about to appear behind the navbar
        const navbarHeight = 80;
        setIsOverHero(heroEl.getBoundingClientRect().bottom > navbarHeight);
      }

      const sections = navLinks.filter((l) => l.href.startsWith("#")).map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transparent = isOverHero && !isOpen;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const goToSection = useSectionNav();
  // Home: highlight the section in view. Other pages: highlight the page's own link (e.g. "/203k").
  const current = pathname === "/" ? activeSection : pathname;
  const linkKey = (href: string) => (href.startsWith("#") ? href.substring(1) : href);

  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) navigate(href);
    else goToSection(href.substring(1));
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? isScrolled
            ? "bg-primary/95 backdrop-blur-sm shadow-md" // still over the hero but scrolled: keep white text, hide content behind
            : "bg-transparent"
          : "bg-background/95 backdrop-blur-sm shadow-md"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <button onClick={() => scrollToSection("#home")} className="flex items-center gap-3">
            <img
              src={logo}
              alt="T&O Construction LLC"
              className="h-10 md:h-12 w-auto transition-all duration-300"
              style={{ filter: transparent ? "brightness(0) invert(1)" : "none" }}
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className={`font-bold text-sm md:text-base transition-colors duration-300 ${transparent ? "text-white" : "text-foreground"}`}>
                T&O Construction LLC
              </span>
              <span className={`text-xs md:text-sm font-medium transition-colors duration-300 ${transparent ? "text-white/80" : "text-accent"}`}>
                Building & Home Remodeling
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  transparent
                    ? current === linkKey(link.href)
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                    : current === linkKey(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-accent"
                }`}
              >
                {link.name}
                {current === linkKey(link.href) && (
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 animate-fade-in ${
                      transparent ? "bg-white" : "bg-accent"
                    }`}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={`h-6 w-6 transition-colors duration-300 ${transparent ? "text-white" : "text-foreground"}`} />
            ) : (
              <Menu className={`h-6 w-6 transition-colors duration-300 ${transparent ? "text-white" : "text-foreground"}`} />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-left px-4 py-2 rounded-md transition-colors ${
                    current === linkKey(link.href)
                      ? "bg-accent/10 text-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
