import { useState, useCallback } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import galleryReal1 from "@/assets/gallery-real-1.png";
import galleryReal3 from "@/assets/gallery-real-3.png";
import galleryReal4 from "@/assets/gallery-real-4.png";
import galleryReal5 from "@/assets/gallery-real-5.png";
import galleryReal6 from "@/assets/gallery-real-6.png";
import galleryReal7 from "@/assets/gallery-real-7.png";
import galleryReal9 from "@/assets/gallery-real-9.png";
import galleryReal10 from "@/assets/gallery-real-10.png";
import galleryReal11 from "@/assets/gallery-real-11.jpg";
import galleryReal12 from "@/assets/gallery-real-12.jpg";
import galleryReal13 from "@/assets/gallery-real-13.jpg";
import galleryReal14 from "@/assets/gallery-real-14.jpg";
import galleryReal15 from "@/assets/gallery-real-15.jpg";
import galleryReal16 from "@/assets/gallery-real-16.jpg";
import galleryReal17 from "@/assets/gallery-real-17.jpg";

const galleryImages = [
  { src: galleryReal14, alt: "Custom door installation with storm door" },
  { src: galleryReal11, alt: "Arched window and door installation" },
  { src: galleryReal3, alt: "Sliding glass door installation" },
  { src: galleryReal1, alt: "Roof framing construction" },
  { src: galleryReal4, alt: "Window with shutters installation" },
  { src: galleryReal5, alt: "Oak window trim detail" },
  { src: galleryReal6, alt: "Window installation on scaffold" },
  { src: galleryReal7, alt: "Foundation measurement work" },
  { src: galleryReal9, alt: "Interior cabinetry and flooring" },
  { src: galleryReal10, alt: "Bay window installation with trim" },
  { src: galleryReal12, alt: "Window installation on cedar shingle siding" },
  { src: galleryReal13, alt: "Interior framing construction" },
  { src: galleryReal15, alt: "Blue front door installation with decorative trim" },
  { src: galleryReal16, alt: "Arched window with wood paneling" },
  { src: galleryReal17, alt: "Roof framing construction crew" },
];

const BATCH_SIZE = 6;
const MOBILE_INITIAL = 4;
const DESKTOP_INITIAL = 6;

export const Gallery = () => {
  const [visibleCount, setVisibleCount] = useState(DESKTOP_INITIAL);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const initialCount = isMobile ? MOBILE_INITIAL : DESKTOP_INITIAL;
  const isExpanded = visibleCount >= galleryImages.length;

  const handleToggle = useCallback(() => {
    if (isExpanded) {
      setVisibleCount(initialCount);
    } else {
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, galleryImages.length));
    }
  }, [isExpanded, initialCount]);

  const visibleImages = galleryImages.slice(0, visibleCount);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigateLightbox = useCallback(
    (direction: -1 | 1) => {
      if (lightboxIndex === null) return;
      const next = lightboxIndex + direction;
      if (next >= 0 && next < galleryImages.length) {
        setLightboxIndex(next);
      }
    },
    [lightboxIndex]
  );

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See the quality and craftsmanship we bring to every project
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {visibleImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
              style={{
                animation: index >= visibleCount - BATCH_SIZE ? `fade-in 0.4s ease-out ${(index % BATCH_SIZE) * 0.08}s both` : undefined,
              }}
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {galleryImages.length > initialCount && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleToggle}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:opacity-90 transition-opacity duration-200 shadow-md"
            >
              {isExpanded ? (
                <>
                  View Less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  View More <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-7 w-7" />
          </button>

          {lightboxIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
              className="absolute left-4 md:left-8 text-white/70 hover:text-white text-4xl font-light transition-colors select-none"
              aria-label="Previous image"
            >
              ‹
            </button>
          )}

          <img
            src={galleryImages[lightboxIndex].src}
            alt={galleryImages[lightboxIndex].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />

          {lightboxIndex < galleryImages.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
              className="absolute right-4 md:right-8 text-white/70 hover:text-white text-4xl font-light transition-colors select-none"
              aria-label="Next image"
            >
              ›
            </button>
          )}

          <div className="absolute bottom-6 text-white/60 text-sm">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
};
