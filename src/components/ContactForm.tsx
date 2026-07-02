import { useState, useEffect } from "react";
import { getAttribution } from "@/utils/attribution";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Phone, Mail, MapPin } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const workTypes = [
  "Framing (Walls/Floors/Roof) – New Build",
  "Window Installation & Replacement",
  "Door Installation",
  "Kitchen Renovation",
  "Full Home Remodeling",
  "Other / Not Sure",
];

export const ContactForm = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    typeOfWork: "",
    description: "",
    budget: "",
  });

  useEffect(() => {
    const handlePreselect = (e: CustomEvent<string>) => {
      setFormData((prev) => ({ ...prev, typeOfWork: e.detail }));
    };
    window.addEventListener("preselect-work-type", handlePreselect as EventListener);
    return () => window.removeEventListener("preselect-work-type", handlePreselect as EventListener);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const attribution = getAttribution();
      const payload = {
        preferredDate: date ? format(date, "PPP") : "Not specified",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        typeOfWork: formData.typeOfWork,
        budget: formData.budget || "Not specified",
        description: formData.description,
        ...attribution,
      };
      const response = await fetch(
        "https://n8n-n8n.agjjtd.easypanel.host/webhook/dc3edd26-165c-4578-8863-e78106fb8648",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error("Request failed");
      toast({
        title: "Request Sent!",
        description: "Your quote request has been submitted successfully. We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", phone: "", address: "", typeOfWork: "", description: "", budget: "" });
      setDate(undefined);
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="scroll-mt-20 bg-muted/40 py-12 md:py-16">
      <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-5 overflow-hidden rounded-xl shadow-md">

        {/* Left info panel */}
        <div className="lg:col-span-2 bg-primary text-primary-foreground px-8 py-16 md:px-12 md:py-20 flex flex-col justify-between gap-12">
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-accent text-sm font-medium uppercase tracking-widest mb-4">Get in touch</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Let's build something together
              </h2>
              <p className="text-primary-foreground/70 text-base leading-relaxed">
                Tell us about your project and we'll get back to you within 24 hours.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <a
                href="tel:4016325085"
                className="flex items-center gap-4 text-primary-foreground/80 hover:text-primary-foreground transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/50 mb-0.5">Phone</p>
                  <p className="font-medium">401-632-5085</p>
                </div>
              </a>

              <a
                href="mailto:info@tandoconstructionllc.com"
                className="flex items-center gap-4 text-primary-foreground/80 hover:text-primary-foreground transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/50 mb-0.5">Email</p>
                  <p className="font-medium">info@tandoconstructionllc.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 text-primary-foreground/80">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/50 mb-0.5">Service area</p>
                  <p className="font-medium">Rhode Island & Massachusetts</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-primary-foreground/40 text-sm">
            Licensed & Insured · Free estimates
          </p>
        </div>

        {/* Right form panel */}
        <div className="lg:col-span-3 bg-background px-8 py-16 md:px-12 md:py-20">
          <h3 className="text-2xl font-bold text-foreground mb-1">Request a Free Quote</h3>
          <p className="text-muted-foreground mb-8">Fill in the form and we'll get back to you promptly</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="Your name" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="(401) 555-0123" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Project Address *</Label>
              <Input id="address" name="address" required value={formData.address} onChange={handleChange} placeholder="Street, City, State, ZIP" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="typeOfWork">Type of Work *</Label>
                <Select value={formData.typeOfWork} onValueChange={(value) => setFormData({ ...formData, typeOfWork: value })} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type of work" />
                  </SelectTrigger>
                  <SelectContent>
                    {workTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (Optional)</Label>
                <Input id="budget" name="budget" value={formData.budget} onChange={handleChange} placeholder="Your budget range" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Preferred Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description *</Label>
              <Textarea id="description" name="description" required value={formData.description} onChange={handleChange} placeholder="Tell us about your project..." rows={4} />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit Request"}
            </Button>
          </form>
        </div>

      </div>
      </div>
    </section>
  );
};
