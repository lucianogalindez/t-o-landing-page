import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FloatingCallButton } from "@/components/FloatingCallButton";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { HowWeWork } from "@/components/HowWeWork";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { ServiceAreas } from "@/components/ServiceAreas";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const { hash } = useLocation();

  // Arriving from another page (e.g. /203k → "/#services"): jump to that section, else start at the top
  useEffect(() => {
    const el = hash ? document.getElementById(hash.slice(1)) : null;
    if (el) el.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [hash]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <WhyChooseUs />
      <div id="services" className="scroll-mt-20">
        <Services />
      </div>
      <About />
      <HowWeWork />
      <div id="gallery" className="scroll-mt-20">
        <Gallery />
      </div>
      <div id="testimonials" className="scroll-mt-20">
        <Testimonials />
      </div>
      <ServiceAreas />
      <ContactForm />
      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default Index;
