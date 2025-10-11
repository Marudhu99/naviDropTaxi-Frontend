import VehicleCard from '../VehicleCard';

export default function VehicleCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <VehicleCard
        name="Sedan"
        type="4+1 Seater"
        capacity="4 Passengers + Driver"
        models="Tata Indica, Swift Dzire"
        rate={14}
        image="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070"
        onBook={() => console.log('Booking Sedan')}
      />
    </div>
  );
}
