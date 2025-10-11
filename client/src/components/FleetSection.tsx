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
    <section id="fleet" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading">
            Our Fleet
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our range of well-maintained vehicles for your comfortable journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.name}
              {...vehicle}
              onBook={() => handleBook(vehicle.name)}
            />
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
