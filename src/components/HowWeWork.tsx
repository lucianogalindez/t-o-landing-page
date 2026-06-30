import { MessageSquare, FileText, HardHat } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Free Consultation",
    description: "Tell us about your project. We visit the site, assess your needs, and answer every question. No commitment required.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Planning & Quote",
    description: "We deliver a detailed, transparent estimate with timeline and materials. No hidden costs, no surprises.",
  },
  {
    number: "03",
    icon: HardHat,
    title: "Build & Deliver",
    description: "Our team executes the work with precision, keeps you informed at every stage, and leaves the site clean on completion.",
  },
];

export const HowWeWork = () => (
  <section className="py-16 md:py-24 bg-muted/40">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How We Work</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A simple, transparent process from first call to finished project
        </p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Connector line — desktop only */}
        <div className="hidden md:block absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-border" />

        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.number} className="flex flex-col items-center text-center relative">
              <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-background border-2 border-border mb-6">
                <Icon className="w-7 h-7 text-primary" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {step.number.replace("0", "")}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{step.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
