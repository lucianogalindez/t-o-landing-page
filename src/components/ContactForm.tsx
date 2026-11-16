import { useState, useEffect, useRef } from "react";
import { getAttribution } from "@/utils/attribution";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Camera, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Values must match the workType that Services.tsx sends with "preselect-work-type"
const workTypes = ["Windows", "Doors", "Remodeling", "Other"];

const findUsOptions = ["Instagram", "Facebook", "Google", "LinkedIn", "TikTok", "YouTube", "Referral", "Other"];

const WEBHOOK_URL = "https://n8n-n8n.agjjtd.easypanel.host/webhook/dc3edd26-165c-4578-8863-e78106fb8648";

const MAX_PHOTOS = 5;
const MAX_SIDE = 1600;      // px, longest side after resizing
const JPEG_QUALITY = 0.8;
const MAX_RAW_BYTES = 8 * 1024 * 1024; // fallback limit when the browser can't decode/resize a file

type Photo = { blob: Blob; url: string };

// Resize + re-encode on the device so a 4 MB phone photo travels as ~300 KB.
async function compressPhoto(file: File): Promise<Blob | null> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" } as ImageBitmapOptions);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY));
    if (blob) return blob;
  } catch {
    // Format the browser can't decode (e.g. HEIC on some Android/desktop browsers): send as-is if small enough
  }
  return file.size <= MAX_RAW_BYTES ? file : null;
}

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  city: "",
  typeOfWork: "",
  howFound: "",
  description: "",
};

export const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(emptyForm);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const photosRef = useRef<Photo[]>([]);
  photosRef.current = photos;

  useEffect(() => {
    const handlePreselect = (e: CustomEvent<string>) => {
      setFormData((prev) => ({ ...prev, typeOfWork: e.detail }));
    };
    window.addEventListener("preselect-work-type", handlePreselect as EventListener);
    return () => window.removeEventListener("preselect-work-type", handlePreselect as EventListener);
  }, []);

  // Free the preview URLs when the component goes away
  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const files = Array.from(input.files ?? []);
    input.value = ""; // allow picking the same file again later
    if (!files.length) return;

    const room = MAX_PHOTOS - photos.length;
    if (files.length > room) {
      toast({ title: `Up to ${MAX_PHOTOS} photos`, description: `Only the first ${room} will be added.` });
    }

    setIsProcessing(true);
    const added: Photo[] = [];
    let skipped = 0;
    for (const file of files.slice(0, room)) {
      const blob = await compressPhoto(file);
      if (blob) added.push({ blob, url: URL.createObjectURL(blob) });
      else skipped++;
    }
    setPhotos((prev) => [...prev, ...added]);
    setIsProcessing(false);

    if (skipped) {
      toast({
        title: "Some photos couldn't be added",
        description: "Try a JPG or PNG photo, or send them by text after we call you.",
        variant: "destructive",
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // multipart/form-data: n8n puts the text fields in $json.body and each photo in binary (photo1…photo5)
      const body = new FormData();
      Object.entries({ ...formData, ...getAttribution() }).forEach(([key, value]) => {
        if (value) body.append(key, String(value));
      });
      photos.forEach((p, i) => body.append(`photo${i + 1}`, p.blob, `photo${i + 1}.jpg`));

      const response = await fetch(WEBHOOK_URL, { method: "POST", body });
      if (!response.ok) throw new Error("Request failed");

      toast({
        title: "Request sent!",
        description: "Thanks! We'll call you back soon.",
      });
      photos.forEach((p) => URL.revokeObjectURL(p.url));
      setPhotos([]);
      setFormData(emptyForm);
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or call us at 401-632-5085.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                Tell us about your project and we'll get back to you.
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
            Insured · RI Reg. GC-44652 · MA HIC 215402 · Free estimates
          </p>
        </div>

        {/* Right form panel */}
        <div className="lg:col-span-3 bg-background px-8 py-16 md:px-12 md:py-20">
          <h3 className="text-2xl font-bold text-foreground mb-1">Request a Free Quote</h3>
          <p className="text-muted-foreground mb-8">Tell us your city and send a few photos.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" name="name" required autoComplete="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" name="phone" type="tel" required autoComplete="tel" value={formData.phone} onChange={handleChange} placeholder="(401) 555-0123" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input id="city" name="city" required autoComplete="address-level2" value={formData.city} onChange={handleChange} placeholder="e.g. Providence, RI" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="typeOfWork">Type of work</Label>
                <Select value={formData.typeOfWork} onValueChange={(value) => setFormData({ ...formData, typeOfWork: value })}>
                  <SelectTrigger id="typeOfWork" className="w-full">
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
                <Label htmlFor="howFound">How did you find us?</Label>
                <Select value={formData.howFound} onValueChange={(value) => setFormData({ ...formData, howFound: value })}>
                  <SelectTrigger id="howFound" className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {findUsOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Photos <span className="text-muted-foreground font-normal">(up to {MAX_PHOTOS})</span></Label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {photos.map((p, i) => (
                  <div key={p.url} className="relative aspect-square rounded-lg overflow-hidden border border-border bg-muted">
                    <img src={p.url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      aria-label={`Remove photo ${i + 1}`}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                {photos.length < MAX_PHOTOS && (
                  <label
                    className={`aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors ${
                      isProcessing ? "opacity-60 cursor-wait" : "cursor-pointer hover:border-primary hover:text-primary"
                    }`}
                  >
                    {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Camera className="h-5 w-5" />}
                    <span className="text-xs font-medium text-center leading-tight px-1">{isProcessing ? "Adding…" : "Add photos"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="sr-only"
                      disabled={isProcessing}
                      onChange={handleAddPhotos}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Tell us about the project</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="A few words about what you need…" rows={3} />
            </div>

            <div className="space-y-3">
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || isProcessing}>
                {isSubmitting ? "Sending..." : "Send request"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">We'll call you back. Hablamos español.</p>
            </div>
          </form>
        </div>

      </div>
      </div>
    </section>
  );
};
