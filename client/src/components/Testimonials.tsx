import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    location: 'Thiruvannamalai',
    rating: 5,
    text: 'Punctual pickup, smooth ride, and the sedan was spotless! Driver knew the best routes. This is now my go-to service for all trips.',
    initials: 'RK',
    color: 'from-blue-500 to-cyan-500',
    route: 'Sedan • Thiruvannamalai to Chennai Airport',
    date: 'September 2024',
  },
  {
    name: 'Priya Sharma',
    location: 'Chennai',
    rating: 5,
    text: 'The Innova was perfect for our family! Professional driver, comfortable seats, and great AC. Kids loved the smooth ride!',
    initials: 'PS',
    color: 'from-purple-500 to-pink-500',
    route: 'Innova Premium • Chennai to Thiruvannamalai',
    date: 'August 2024',
  },
  {
    name: 'Arun Vijay',
    location: 'Vellore',
    rating: 5,
    text: 'Outstanding service! Clean vehicle, courteous driver, transparent pricing. I\'ve used them 5+ times - consistently excellent!',
    initials: 'AV',
    color: 'from-orange-500 to-red-500',
    route: 'SUV • Vellore to Tiruvannamalai (Round Trip)',
    date: 'October 2024',
  },
];

export default function Testimonials() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Decorative quote marks in background */}
      <Quote className="absolute top-20 left-10 w-32 h-32 text-primary/5 rotate-180" />
      <Quote className="absolute bottom-20 right-10 w-40 h-40 text-accent/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
            Real Stories from <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Real Travelers</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See why travelers <span className="text-primary font-bold">choose us again & again</span> - genuine experiences, verified reviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="card-lift group relative overflow-hidden border-2 hover:border-primary/30 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'backwards' }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Decorative large quote mark */}
              <Quote className="absolute -top-4 -right-4 w-32 h-32 text-primary/5 group-hover:text-primary/10 transition-colors" />
              
              <CardContent className="p-8 relative z-10">
                {/* Customer avatar with decorative ring */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity`} />
                    <Avatar className="w-16 h-16 relative border-4 border-white shadow-lg">
                      <AvatarFallback className={`bg-gradient-to-br ${testimonial.color} text-white font-bold text-lg`}>
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="font-bold text-lg group-hover:text-primary transition-colors" data-testid={`text-testimonial-name-${index}`}>
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      📍 {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Animated star rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-yellow-400 text-yellow-400 star-animated" 
                      style={{ 
                        animationDelay: hoveredCard === index ? `${i * 0.1}s` : '0s' 
                      }}
                    />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-muted-foreground leading-relaxed text-base mb-4">
                  "{testimonial.text}"
                </p>

                {/* Ride details */}
                <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3 space-y-1 border border-muted">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">🚗 {testimonial.route}</span>
                  </div>
                  <div>
                    <span className="font-medium">Traveled: {testimonial.date}</span>
                  </div>
                </div>
              </CardContent>

              {/* Gradient decorative element */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
            </Card>
          ))}
        </div>

        {/* Overall rating banner - more prominent */}
        <div className="mt-16 text-center">
          <div className="block md:inline-flex items-center gap-6 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 backdrop-blur-md border-2 border-yellow-400/50 rounded-2xl px-10 py-6 shadow-2xl hover:scale-105 transition-transform">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
            <div className="text-left">
              <div className="text-4xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent ">5.0 Rating</div>
              <div className="text-base text-muted-foreground font-semibold mt-1">Based on 500+ Verified Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
