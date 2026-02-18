import galleryReal1 from "@/assets/gallery-real-1.png";
import galleryReal3 from "@/assets/gallery-real-3.png";
import galleryReal4 from "@/assets/gallery-real-4.png";
import galleryReal5 from "@/assets/gallery-real-5.png";
import galleryReal6 from "@/assets/gallery-real-6.png";
import galleryReal7 from "@/assets/gallery-real-7.png";
import galleryReal8 from "@/assets/gallery-real-8.png";
import galleryReal9 from "@/assets/gallery-real-9.png";

const galleryImages = [
  { src: galleryReal1, alt: "Roof framing construction" },
  { src: galleryReal3, alt: "Sliding glass door installation" },
  { src: galleryReal4, alt: "Window with shutters installation" },
  { src: galleryReal5, alt: "Oak window trim detail" },
  { src: galleryReal6, alt: "Window installation on scaffold" },
  { src: galleryReal7, alt: "Foundation measurement work" },
  { src: galleryReal8, alt: "Kitchen remodel with white cabinets" },
  { src: galleryReal9, alt: "Interior cabinetry and flooring" },
];

export const Gallery = () => {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
