import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "John M.",
    location: "Providence, RI",
    text: "T&O Construction did an amazing job on our kitchen renovation. The attention to detail and cleanliness throughout the project was impressive. Highly recommend!",
    rating: 5,
  },
  {
    name: "Sarah L.",
    location: "Worcester, MA",
    text: "Professional, reliable, and skilled. They replaced all our windows and the difference in energy efficiency is remarkable. Great communication from start to finish.",
    rating: 5,
  },
  {
    name: "Michael R.",
    location: "Warwick, RI",
    text: "From the initial consultation to project completion, T&O Construction exceeded our expectations. Our new deck and exterior improvements look fantastic!",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it—hear from homeowners we've helped
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
