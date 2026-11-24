import fernandoImg from "@/assets/fernando.webp";

// Blueprint-style grid: fine 32px lines plus a stronger 160px grid, faded out
// towards the edges so it reads as texture and never competes with the text.
const blueprintStyle: React.CSSProperties = {
  backgroundImage: [
    "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
    "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
  ].join(", "),
  backgroundSize: "160px 160px, 160px 160px, 32px 32px, 32px 32px",
  maskImage: "radial-gradient(ellipse 80% 75% at 60% 50%, black 30%, transparent 100%)",
  WebkitMaskImage: "radial-gradient(ellipse 80% 75% at 60% 50%, black 30%, transparent 100%)",
};

export const BlueprintGrid = () => (
  <div className="absolute inset-0 pointer-events-none" style={blueprintStyle} />
);

/**
 * Fernando's photo in the brand-blue circle, with his name underneath.
 * Mobile/tablet: small circle + one line ("Fernando Toribio · Owner") so heroes fit one screen.
 * Desktop: large circle + name and `subtitle` on two lines.
 */
export const OwnerPhoto = ({ subtitle }: { subtitle: string }) => (
  <div className="flex flex-col items-center">
    <div className="relative">
      {/* Brand-blue glow behind the circle */}
      <div className="absolute -inset-6 md:-inset-10 lg:-inset-16 rounded-full bg-accent/25 blur-3xl" />
      {/* lg size is capped by viewport height so the hero fits on short laptop screens */}
      <div className="relative w-24 h-24 md:w-44 md:h-44 lg:w-[min(26rem,48vh)] lg:h-[min(26rem,48vh)] rounded-full p-1 md:p-1.5 lg:p-2 bg-accent shadow-2xl">
        <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-white to-[hsl(207,100%,90%)]">
          <img
            src={fernandoImg}
            alt="Fernando Toribio, owner of T&O Construction LLC"
            width={1254}
            height={1254}
            {...{ fetchpriority: "high" }} // lowercase: React 18 doesn't know fetchPriority
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
    <div className="mt-2.5 lg:mt-5 flex items-baseline gap-1.5 lg:block text-center">
      <p className="font-semibold text-sm md:text-base lg:text-lg leading-tight">Fernando Toribio</p>
      <p className="text-sm text-primary-foreground/60">
        <span className="lg:hidden">· Owner</span>
        <span className="hidden lg:inline">{subtitle}</span>
      </p>
    </div>
  </div>
);
