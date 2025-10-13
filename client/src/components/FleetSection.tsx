import VehicleCard from './VehicleCard';

const vehicles = [
  {
    name: 'Sedan',
    type: '4+1 Seater',
    capacity: '4 Passengers + Driver',
    models: 'Tata Indica, Swift Dzire',
    rate: 14,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070',
  },
  {
    name: 'SUV',
    type: '6+1 Seater',
    capacity: '6 Passengers + Driver',
    models: 'Mahindra Xylo, Chevrolet Tavera',
    rate: 18,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2071',
  },
  {
    name: 'Innova Premium',
    type: '6+1 Seater',
    capacity: '6 Passengers + Driver',
    models: 'Toyota Innova',
    rate: 19,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070',
  },
  {
    name: 'MUV',
    type: '7+1 Seater',
    capacity: '7 Passengers + Driver',
    models: 'Chevrolet Tavera',
    rate: 18,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070',
  },
];

export default function FleetSection() {
  const handleBook = (vehicleName: string) => {
    console.log(`Booking ${vehicleName}`);
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="fleet" className="py-16 md:py-24 bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Perfect Vehicle</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From city runs to highway adventures - <span className="text-primary font-bold">spotlessly clean</span>, expertly maintained, always ready for your next journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.name}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'backwards' }}
            >
              <VehicleCard
                {...vehicle}
                onBook={() => handleBook(vehicle.name)}
              />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            * Actual fare may vary based on exact distance and route
          </p>
        </div>
      </div>
    </section>
  );
}
