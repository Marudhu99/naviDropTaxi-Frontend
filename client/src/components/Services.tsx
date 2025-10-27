import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    title: 'Airport Transfers',
    description: 'Reliable pickups and drops for Chennai, Bangalore, and other airports. On-time, every time.',
    image: './serviceImages/img1.webp',
    features: ['Meet & Greet', 'Flight Tracking', 'Luggage Assistance'],
  },
  {
    title: 'Outstation Trips',
    description: 'Comfortable long-distance travel to Chennai, Vellore, Bangalore, and beyond.',
    image: './serviceImages/img2.webp',
    features: ['One-way & Round-trip', 'Flexible Stops', 'Overnight Stays'],
  },
  {
    title: 'Local Rentals',
    description: 'Hourly or daily rentals for city exploration, shopping, or business meetings.',
    image: './serviceImages/img3.webp',
    features: ['4/8/12 Hour Packages', 'Within City Limits', 'Multiple Stops'],
  },
  {
    title: 'Corporate Services',
    description: 'Professional transportation for business meetings, conferences, and corporate events.',
    image: './serviceImages/img4.webp',
    features: ['Invoicing Available', 'Priority Booking', 'Fleet Management'],
  },
  {
    title: 'Tourist Packages',
    description: 'Explore Thiruvannamalai temples and surrounding attractions with our guided tours.',
    image: './serviceImages/img5.webp',
    features: ['Temple Tours', 'Scenic Routes', 'Local Guide Available'],
  },
  {
    title: 'Wedding & Events',
    description: 'Make your special day memorable with our premium vehicles and professional service.',
    image: './serviceImages/img6.webp',
    features: ['Decorated Vehicles', 'Multiple Cars', 'Punctual Service'],
  },
];

export default function Services() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Services</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From airport transfers to wedding cars - we've got every journey covered
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="overflow-hidden card-lift group border-2 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'backwards' }}
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3 font-heading group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button 
                  onClick={() => {
                    const bookingSection = document.getElementById('booking');
                    if (bookingSection) {
                      bookingSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-primary to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all hover:scale-105"
                >
                  Book Now →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-2xl p-8 border-2 border-primary/20">
          <h3 className="text-2xl font-bold mb-3">Need a Custom Service?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Have specific requirements? We offer customized transportation solutions for any occasion. 
            Call us to discuss your needs!
          </p>
          <a
            href="tel:9787099804"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-orange-500 text-white font-bold rounded-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Call for Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
}

