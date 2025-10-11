import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    location: 'Thiruvannamalai',
    rating: 5,
    text: 'Excellent service! The driver was punctual and the car was very clean. Highly recommend for local and outstation trips.',
    initials: 'RK',
  },
  {
    name: 'Priya Sharma',
    location: 'Chennai',
    rating: 5,
    text: 'Very professional and courteous driver. The Innova was comfortable for our family trip. Will definitely book again.',
    initials: 'PS',
  },
  {
    name: 'Arun Vijay',
    location: 'Vellore',
    rating: 5,
    text: 'Best taxi service in the area! Affordable rates and reliable service. Used them multiple times and always satisfied.',
    initials: 'AV',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading">
            What Our Customers Say
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="hover-elevate transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'backwards' }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold" data-testid={`text-testimonial-name-${index}`}>
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground">{testimonial.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
