import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Phone, FileText } from "lucide-react";

const FRAME_COUNT = 86; // frames 025–110 inclusive

const PHASES = [
  {
    from: 0,
    to: 0.25,
    heading: "It starts with a vision.",
    sub: "From an empty lot, we build the home you've always imagined.",
  },
  {
    from: 0.25,
    to: 0.5,
    heading: "We raise the frame.",
    sub: "Structural framing crafted with precision. The bones of your future home.",
  },
  {
    from: 0.5,
    to: 0.75,
    heading: "Every layer, done right.",
    sub: "From structure to exterior, clean work on every surface of the build.",
  },
  {
    from: 0.75,
    to: 1,
    heading: "Building & Home<br>Remodeling in RI & MA",
    sub: "High-quality workmanship for residential projects. Clean finishes, done right.",
  },
];

export const Hero = () => {
  const wrapRef      = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const headingRef   = useRef<HTMLHeadingElement>(null);
  const subtextRef   = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;

    let ctx: CanvasRenderingContext2D | null = null;
    const frames: HTMLImageElement[] = [];
    let currentFrame = 0;
    let targetFrame  = 0;
    let raf: number | null = null;
    let currentPhase = 0;
    let phaseTimeout: ReturnType<typeof setTimeout> | null = null;

    // ── canvas drawing ─────────────────────────────────────────────────────

    function drawCover(img: HTMLImageElement) {
      if (!canvas || !ctx || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;

      let w: number, h: number;
      if (ir > cr) { h = ch; w = ch * ir; }
      else          { w = cw; h = cw / ir; }

      // Horizontal focal point. The house sits in the right-centre of every
      // frame (its centre is ~0.70 of the width; the left third is sky/lawn).
      // On portrait/narrow screens the cover crop only shows a vertical slice,
      // so centre that slice on the house instead of the frame middle. We solve
      // for the focusX that puts HOUSE_CENTER at the centre of the visible
      // window, accounting for k = how much of the frame width is actually shown
      // (k → 1 means the whole width fits and the focal point stops mattering).
      let focusX = 0.5;
      if (ir > cr) {
        const HOUSE_CENTER = 0.70;
        const k = cr / ir; // visible width as a fraction of the full frame
        focusX = Math.min(Math.max((HOUSE_CENTER - k / 2) / (1 - k), 0), 1);
      }

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - w) * focusX, (ch - h) / 2, w, h);
    }

    function drawFrame(f: number) {
      const idx = Math.min(Math.max(Math.round(f), 0), FRAME_COUNT - 1);
      if (frames[idx]?.complete && frames[idx].naturalWidth > 0) {
        drawCover(frames[idx]); return;
      }
      // Never blank — fall back to nearest loaded frame
      for (let offset = 1; offset < FRAME_COUNT; offset++) {
        const lo = idx - offset, hi = idx + offset;
        if (lo >= 0 && frames[lo]?.complete && frames[lo].naturalWidth > 0) {
          drawCover(frames[lo]); return;
        }
        if (hi < FRAME_COUNT && frames[hi]?.complete && frames[hi].naturalWidth > 0) {
          drawCover(frames[hi]); return;
        }
      }
    }

    function tick() {
      currentFrame += (targetFrame - currentFrame) * 0.2;
      if (Math.abs(targetFrame - currentFrame) < 0.1) currentFrame = targetFrame;
      drawFrame(currentFrame);
      raf = Math.abs(targetFrame - currentFrame) > 0.1
        ? requestAnimationFrame(tick)
        : null;
    }

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.clientWidth  * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrame);
    }

    // ── phase text ─────────────────────────────────────────────────────────

    function updatePhase(progress: number) {
      const idx = PHASES.findIndex((p, i) =>
        i === PHASES.length - 1
          ? progress >= p.from
          : progress >= p.from && progress < p.to
      );
      if (idx === currentPhase) return;
      currentPhase = idx;

      const heading = headingRef.current;
      const sub     = subtextRef.current;
      const hint    = scrollHintRef.current;
      if (!heading || !sub) return;

      // Fade out current text
      heading.style.opacity   = "0";
      heading.style.transform = "translateY(10px)";
      sub.style.opacity       = "0";
      sub.style.transform     = "translateY(10px)";

      // Swap content after fade-out, then fade back in
      if (phaseTimeout) clearTimeout(phaseTimeout);
      phaseTimeout = setTimeout(() => {
        heading.innerHTML       = PHASES[idx].heading;
        sub.textContent         = PHASES[idx].sub;
        heading.style.opacity   = "1";
        heading.style.transform = "translateY(0)";
        sub.style.opacity       = "1";
        sub.style.transform     = "translateY(0)";
      }, 220);

      // Scroll hint fades away once the user has left the first phase
      if (hint) hint.style.opacity = idx === 0 ? "1" : "0";
    }

    // ── scroll ─────────────────────────────────────────────────────────────

    function onScroll() {
      const rect     = wrap.getBoundingClientRect();
      const total    = wrap.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / total, 0), 1);
      targetFrame    = progress * (FRAME_COUNT - 1);
      if (!raf) raf  = requestAnimationFrame(tick);
      updatePhase(progress);
    }

    // ── preload ─────────────────────────────────────────────────────────────

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const num = i + 25; // index 0 → frame_025 … 85 → frame_110
      img.src = `/assets/frames/frame_${String(num).padStart(3, "0")}.jpg`;
      frames[i] = img;
      if (i === 0) img.onload = () => drawFrame(0);
    }

    resize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
      if (phaseTimeout) clearTimeout(phaseTimeout);
    };
  }, []);

  const handleCallNow = () => { window.location.href = "tel:4016325085"; };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={wrapRef} style={{ height: "400vh" }}>
      <section className="sticky top-0 h-screen overflow-hidden">

        {/* Frame sequence canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: "block" }}
        />

        {/* Gradients — keep text legible across all frames */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary/60 to-transparent" />

        {/* Content overlay */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl pt-16">
              <h1
                ref={headingRef}
                className="text-4xl md:text-5xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight"
                style={{ transition: "opacity 0.22s ease, transform 0.22s ease" }}
              >
                {PHASES[0].heading}
              </h1>
              <p
                ref={subtextRef}
                className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl"
                style={{ transition: "opacity 0.22s ease, transform 0.22s ease" }}
              >
                {PHASES[0].sub}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={handleCallNow}
                  className="text-base font-semibold bg-white text-primary hover:bg-white/90 border-0"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
                <Button
                  size="lg"
                  onClick={scrollToContact}
                  className="text-base font-semibold bg-transparent text-white border border-white/60 hover:bg-white/10 hover:border-white/80"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Request a Free Quote
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint — fades out after phase 0 */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-primary-foreground/70 select-none pointer-events-none"
          style={{ transition: "opacity 0.4s ease" }}
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll to see the build</span>
          <div className="w-5 h-8 border-2 border-primary-foreground/40 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-primary-foreground/60 rounded-full animate-bounce" />
          </div>
        </div>

      </section>
    </div>
  );
};
