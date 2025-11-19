import { Card, CardContent } from "@/components/ui/card";
import windowsImage from "@/assets/windows-service.jpg";
import doorsImage from "@/assets/doors-service.jpg";
import kitchenImage from "@/assets/kitchen-service.jpg";
import bathroomImage from "@/assets/bathroom-service.jpg";
import exteriorImage from "@/assets/exterior-service.jpg";
import remodelingImage from "@/assets/remodeling-service.jpg";

const services = [
  {
    title: "Window Installation & Replacement",
    description: "Energy-efficient windows professionally installed to enhance your home's comfort and value.",
    image: windowsImage,
  },
  {
    title: "Door Installation",
    description: "Beautiful, secure doors that make a lasting first impression and improve home security.",
    image: doorsImage,
  },
  {
    title: "Kitchen Renovation",
    description: "Transform your kitchen into a beautiful, functional space perfect for cooking and entertaining.",
    image: kitchenImage,
  },
  {
    title: "Bathroom Renovation",
    description: "Create your dream bathroom with modern fixtures, quality materials, and expert craftsmanship.",
    image: bathroomImage,
  },
  {
    title: "Exterior Improvements",
    description: "Decks, siding, and outdoor living spaces that enhance your home's curb appeal.",
    image: exteriorImage,
  },
  {
    title: "Full Home Remodeling",
    description: "Complete home transformations from concept to completion with attention to every detail.",
    image: remodelingImage,
  },
];

export const Services = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional home improvement services tailored to your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
