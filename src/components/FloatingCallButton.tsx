import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

export const FloatingCallButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroEl = document.getElementById("home");
      if (heroEl) {
        setVisible(heroEl.getBoundingClientRect().bottom <= window.innerHeight * 0.5);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="tel:4016325085"
      aria-label="Llamar a T&O Construction"
      className={`md:hidden fixed bottom-6 right-5 z-50 flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3.5 rounded-full shadow-lg transition-all duration-300 active:scale-95 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-16 opacity-0 pointer-events-none"
      }`}
    >
      <Phone className="h-4 w-4 flex-shrink-0" />
      <span className="text-sm font-semibold">Call Now</span>
    </a>
  );
};
