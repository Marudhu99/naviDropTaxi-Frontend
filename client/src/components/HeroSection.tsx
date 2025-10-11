import { useState } from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function HeroSection() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleQuickBook = () => {
    console.log('Quick booking:', { pickup, dropoff, date, time });
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/95 via-secondary/85 to-secondary/70 z-10" />
      
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070')`,
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 font-heading">
            Your Trusted Ride in<br className="hidden sm:block" /> Thiruvannamalai
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-3xl mx-auto mb-6">
            Comfortable & Affordable Taxi Services - Available 24/7
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-white/90">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm md:text-base font-medium">✓ Clean Vehicles</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm md:text-base font-medium">✓ Professional Drivers</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm md:text-base font-medium">✓ Best Rates</span>
            </div>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center">Quick Booking</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Pickup Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Enter pickup location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="pl-10"
                  data-testid="input-pickup"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Drop Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Enter drop location"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="pl-10"
                  data-testid="input-dropoff"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Travel Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="pl-10"
                  data-testid="input-date"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Travel Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="pl-10"
                  data-testid="input-time"
                />
              </div>
            </div>
          </div>
          <Button
            size="lg"
            className="w-full"
            onClick={handleQuickBook}
            data-testid="button-quick-book"
          >
            Continue to Vehicle Selection
          </Button>
        </Card>
      </div>
    </section>
  );
}
