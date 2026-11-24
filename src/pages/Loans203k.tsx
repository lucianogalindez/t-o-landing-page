import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { FloatingCallButton } from "@/components/FloatingCallButton";
import { BlueprintGrid, OwnerPhoto } from "@/components/HeroParts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Camera, ArrowRight, CheckCircle2 } from "lucide-react";

// Must match options in ContactForm's workTypes so the select gets preselected
const LOAN = "203(k) Renovation Loan";
const ASSESSMENT = "203(k) Feasibility Assessment";

const PAGE_TITLE = "FHA 203(k) Renovation Contractor in RI & MA | T&O Construction LLC";
const PAGE_DESCRIPTION =
  "Buying a home that needs work? T&O Construction works on FHA 203(k) renovation loans in Rhode Island and Massachusetts: line-item scopes, draw schedules and feasibility assessments.";

const whatWeDo = [
  "A detailed, line-item scope of work in the format lenders and 203(k) Consultants need.",
  "A realistic schedule built around the draw process.",
  "Clean job sites, clear communication, and paperwork that keeps your loan moving.",
  "We work alongside your 203(k) Consultant, loan officer and realtor, not around them.",
];

const assessmentIncludes = [
  "On-site walk-through of the property",
  "Property & city records research",
  "Permit path for your city",
  "A realistic budget range for the work",
];

const trust = [
  { title: "Since 2020", detail: "Windows · Doors · Remodeling" },
  { title: "RI Reg. GC‑44652", detail: "Rhode Island CRLB" },
  { title: "MA HIC 215402", detail: "Massachusetts" },
  { title: "Insured", detail: "Liability coverage" },
];

const goToContact = (workType: string) => {
  window.dispatchEvent(new CustomEvent("preselect-work-type", { detail: workType }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
};

const CallButton = () => (
  <Button asChild size="lg" className="text-base font-semibold bg-white text-primary hover:bg-white/90 border-0">
    <a href="tel:4016325085">
      <Phone className="mr-2 h-5 w-5" />
      Call 401-632-5085
    </a>
  </Button>
);

const SendPhotosButton = () => (
  <Button
    size="lg"
    onClick={() => goToContact(LOAN)}
    className="text-base font-semibold bg-transparent text-white border border-white/60 hover:bg-white/10 hover:border-white/80"
  >
    <Camera className="mr-2 h-5 w-5" />
    Send photos
  </Button>
);

const Loans203k = () => {
  // Page-specific <title> and meta description (index.html holds the home page ones)
  useEffect(() => {
    window.scrollTo(0, 0);
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevTitle = document.title;
    const prevDescription = meta?.content;
    document.title = PAGE_TITLE;
    if (meta) meta.content = PAGE_DESCRIPTION;
    return () => {
      document.title = prevTitle;
      if (meta && prevDescription !== undefined) meta.content = prevDescription;
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <div id="home">
        <section className="relative overflow-hidden bg-primary text-primary-foreground min-h-[100svh] flex flex-col">
          <BlueprintGrid />
          <div className="relative flex-1 flex items-center container mx-auto px-4 pt-20 pb-8 md:pt-28 md:pb-12 lg:pt-32 lg:pb-16">
            <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 lg:gap-16 items-center">
              <div className="text-center lg:text-left order-2 lg:order-1">
                <p className="text-accent text-xs md:text-sm font-semibold uppercase tracking-[0.2em] mb-4 md:mb-5">
                  <span className="block">FHA 203(k) Renovation Loans</span>
                  <span className="block">Rhode Island &amp; Massachusetts</span>
                </p>
                <h1 className="text-[2rem] md:text-5xl 2xl:text-6xl font-bold leading-[1.1] mb-4 md:mb-6">
                  Buying a home that needs&nbsp;work?
                </h1>
                <p className="text-base md:text-xl text-primary-foreground/80 mb-5 md:mb-9 max-w-xl mx-auto lg:mx-0">
                  Finance the purchase and the renovation in one loan through your lender, with a contractor
                  built for the 203(k) process.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <CallButton />
                  <SendPhotosButton />
                </div>
                <p className="mt-3 md:mt-4 text-sm md:text-base text-primary-foreground/75">
                  Tell us the property's city and send a few photos.
                </p>
              </div>
              <div className="order-1 lg:order-2">
                <OwnerPhoto subtitle="Owner · knows the 203(k) process" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* What we do */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What we do on a 203(k) project</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The contractor side of the loan, done the way lenders and Consultants expect.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {whatWeDo.map((item) => (
              <Card key={item} className="border-none shadow-md">
                <CardContent className="pt-6 flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 bg-accent rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <p className="text-foreground leading-relaxed pt-1.5">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feasibility assessment */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 overflow-hidden rounded-xl shadow-md max-w-5xl mx-auto">
            <div className="lg:col-span-3 bg-background px-8 py-12 md:px-12 md:py-14">
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">Feasibility assessment</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-8">
                Know what you're buying,
                <br />
                <span className="text-accent">before you make an offer.</span>
              </h2>
              <ul className="space-y-3 mb-8">
                {assessmentIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This is a contractor's assessment. It doesn't replace the HUD Consultant's Feasibility Study;
                it helps you decide before you spend on one.
              </p>
            </div>

            <div className="lg:col-span-2 bg-primary text-primary-foreground px-8 py-12 md:px-12 md:py-14 flex flex-col justify-center">
              <p className="text-5xl md:text-6xl font-bold leading-none">$350</p>
              <p className="text-primary-foreground/70 mt-2 mb-6">Single-family homes</p>
              <p className="font-semibold">$500 · Multi-family or structural</p>
              <p className="text-sm text-primary-foreground/60 mb-8">Additions, foundations</p>
              <Button
                size="lg"
                onClick={() => goToContact(ASSESSMENT)}
                className="w-full text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Book your assessment
              </Button>
              <p className="text-sm text-primary-foreground/80 mt-4">
                100% credited to your contract if you sign within 60 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Realtors / loan officers + trust */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                For realtors, loan officers &amp; 203(k) Consultants
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                If you work renovation loans in Rhode Island or Massachusetts, you need a contractor who doesn't
                kill the deal. Send us the property and we'll tell you if the numbers work.
              </p>
            </div>
            <Button size="lg" variant="outline" onClick={() => goToContact(LOAN)} className="shrink-0 self-start md:self-center">
              Send the property
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-border pt-10">
            {trust.map(({ title, detail }) => (
              <div key={title}>
                <p className="text-xl md:text-2xl font-bold text-foreground">{title}</p>
                <p className="text-sm text-muted-foreground">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground py-16 md:py-20">
        <BlueprintGrid />
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Found a house that needs work?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8">Send us the city and a few photos of the space.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <CallButton />
            <SendPhotosButton />
          </div>
          <p className="mt-8 text-sm md:text-base font-medium text-primary-foreground/90 tracking-wide">
            RI Reg. GC‑44652 · MA HIC 215402 · Insured · Hablamos español
          </p>
        </div>
      </section>

      <ContactForm />
      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default Loans203k;
