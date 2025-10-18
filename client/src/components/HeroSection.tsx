import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { MapPin, Calendar, Clock, Car, Users, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

import { useBookingForm } from '@/lib/BookingFormContext';

export default function HeroSection() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState<{ display_name: string; lat: string; lon: string }[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<{ display_name: string; lat: string; lon: string }[]>([]);
  const pickupDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropoffDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Fetch location suggestions
  const fetchLocationSuggestions = async (query: string, setter: (s: any[]) => void) => {
    if (!query || query.length < 2) {
      setter([]);
      return;
    }
    try {
      const url = `/api/location-suggest?q=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      if (!res.ok) {
        setter([]);
        return;
      }
      const data = await res.json();
      setter(
        data.map((d: any) => ({
          display_name: d.display_name,
          lat: d.lat,
          lon: d.lon,
        }))
      );
    } catch (err) {
      setter([]);
    }
  };

  // Debounced handlers
  const handlePickupChange = (value: string) => {
    setPickup(value);
    setPickupSuggestions([]);
    if (pickupDebounceRef.current) clearTimeout(pickupDebounceRef.current);
    pickupDebounceRef.current = setTimeout(() => {
      fetchLocationSuggestions(value, setPickupSuggestions);
    }, 300);
  };
  const handleDropoffChange = (value: string) => {
    setDropoff(value);
    setDropoffSuggestions([]);
    if (dropoffDebounceRef.current) clearTimeout(dropoffDebounceRef.current);
    dropoffDebounceRef.current = setTimeout(() => {
      fetchLocationSuggestions(value, setDropoffSuggestions);
    }, 300);
  };
  const choosePickupSuggestion = (s: { display_name: string; lat: string; lon: string }) => {
    setPickup(s.display_name);
    setPickupSuggestions([]);
  };
  const chooseDropoffSuggestion = (s: { display_name: string; lat: string; lon: string }) => {
    setDropoff(s.display_name);
    setDropoffSuggestions([]);
  };
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<{ hour: string; minute: string; period: 'AM' | 'PM' }>({ hour: '', minute: '', period: 'AM' });
  const { setData } = useBookingForm();
  const [ridesCompleted, setRidesCompleted] = useState(0);
  const [happyCustomers, setHappyCustomers] = useState(0);
  const [yearsExperience, setYearsExperience] = useState(0);

  // Animated statistics counter
  useEffect(() => {
    const animateValue = (start: number, end: number, duration: number, setter: (val: number) => void) => {
      const startTime = Date.now();
      const timer = setInterval(() => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        setter(value);
        if (progress === 1) {
          clearInterval(timer);
        }
      }, 20);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateValue(0, 5000, 2000, setRidesCompleted);
          animateValue(0, 4500, 2000, setHappyCustomers);
          animateValue(0, 15, 2000, setYearsExperience);
        }
      });
    }, { threshold: 0.1 });

    const statsElement = document.getElementById('hero-stats');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  const handleQuickBook = () => {
  const dateStr = date ? format(date, 'yyyy-MM-dd') : '';
  const timeStr = time.hour && time.minute ? `${time.hour}:${time.minute} ${time.period}` : '';
  setData({ pickup, dropoff, date: dateStr, time: timeStr });
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* High-quality luxury car background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-slow-zoom -top-20" //added -top-20 to hide bottom part of car
        style={{
          backgroundImage: `url('./car.webp')`,
        }}
      />
      
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Subtle decorative elements */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute w-96 h-96 top-10 -left-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute w-80 h-80 bottom-10 -right-24 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
        <div className="text-center mb-8 md:mb-12">
          {/* Improved Typography Hierarchy */}
          <div className="space-y-4 mb-8 animate-fade-in">
            {/* "Book Your Private" - 48-56px white semi-bold */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight drop-shadow-2xl">
              Book Your Private
            </h1>
            
            {/* "Vehicle & Driver" - 56-72px orange/yellow bold */}
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 leading-tight drop-shadow-2xl">
              Vehicle & Driver
            </h2>
            
            {/* "in 60 Seconds" - 64-80px bright yellow extra bold + glow */}
            <h3 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-yellow-300 leading-tight drop-shadow-2xl" style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}>
              in 60 Seconds
            </h3>
          </div>

          {/* Body text - 18-20px white with slight transparency */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-6 animate-fade-in-delay font-light leading-relaxed drop-shadow-lg">
            Safe Rides. Fair Prices.
          </p>

          {/* "24/7 Availability" - 22-24px bold bright yellow */}
          <p className="text-xl sm:text-2xl md:text-3xl text-yellow-300 font-bold mb-8 animate-fade-in-delay drop-shadow-lg">
            24/7 Availability
          </p>
          
          {/* Trust badges with glass effect */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10">
            <div className="flex items-center gap-2 glass-strong px-5 py-3 rounded-full backdrop-blur-lg animate-fade-in-delay hover:scale-105 transition-all duration-300 shadow-lg">
              <Award className="w-5 h-5 text-yellow-300" />
              <span className="text-sm md:text-base font-semibold text-white">✓ GPS-Tracked Rides</span>
            </div>
            <div className="flex items-center gap-2 glass-strong px-5 py-3 rounded-full backdrop-blur-lg animate-fade-in-delay hover:scale-105 transition-all duration-300 shadow-lg" style={{ animationDelay: '0.1s' }}>
              <Users className="w-5 h-5 text-yellow-300" />
              <span className="text-sm md:text-base font-semibold text-white">✓ Verified Drivers</span>
            </div>
            <div className="flex items-center gap-2 glass-strong px-5 py-3 rounded-full backdrop-blur-lg animate-fade-in-delay hover:scale-105 transition-all duration-300 shadow-lg" style={{ animationDelay: '0.2s' }}>
              <TrendingUp className="w-5 h-5 text-yellow-300" />
              <span className="text-sm md:text-base font-semibold text-white">✓ Transparent Pricing</span>
            </div>
          </div>

          {/* Live statistics with enhanced depth */}
          <div id="hero-stats" className="grid grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto mb-12">
            <div className="glass-strong rounded-2xl p-5 md:p-8 backdrop-blur-xl animate-slide-up shadow-2xl hover:shadow-yellow-500/20 hover:scale-105 transition-all duration-300 border border-white/20">
              <div className="text-2xl md:text-6xl font-black text-yellow-300 mb-3 count-up drop-shadow-lg">
                {ridesCompleted.toLocaleString()}+
              </div>
              <div className="text-sm md:text-base text-white font-semibold">Happy Journeys</div>
            </div>
            <div className="glass-strong rounded-2xl p-5 md:p-8 backdrop-blur-xl animate-slide-up shadow-2xl hover:shadow-yellow-500/20 hover:scale-105 transition-all duration-300 border border-white/20" style={{ animationDelay: '0.1s' }}>
              <div className="text-2xl md:text-6xl font-black text-yellow-300 mb-3 count-up drop-shadow-lg">
                {happyCustomers.toLocaleString()}+
              </div>
              <div className="text-sm md:text-base text-white font-semibold">5-Star Reviews</div>
            </div>
            <div className="glass-strong rounded-2xl p-5 md:p-8 backdrop-blur-xl animate-slide-up shadow-2xl hover:shadow-yellow-500/20 hover:scale-105 transition-all duration-300 border border-white/20" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl md:text-6xl font-black text-yellow-300 mb-3 count-up drop-shadow-lg">
                {yearsExperience}+
              </div>
              <div className="text-sm md:text-base text-white font-semibold">Years of Trust</div>
            </div>
          </div>
        </div>

        {/* Enhanced Glassmorphism booking form */}
        <Card className="max-w-4xl mx-auto backdrop-blur-3xl bg-white/10 p-8 md:p-10 border-2 border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] animate-fade-in-delay rounded-3xl" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-center text-white drop-shadow-lg">Book in Under 60 Seconds</h3>
          <p className="text-center text-white/80 mb-8 text-sm md:text-base">No hassle, just go!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Pickup Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 z-10" />
                <Input
                  placeholder="Enter pickup location"
                  value={pickup}
                  onChange={(e) => handlePickupChange(e.target.value)}
                  className="pl-12 bg-white/20 border-white/30 text-white placeholder:text-white/50 backdrop-blur-sm focus:bg-white/30 transition-all h-12"
                  data-testid="input-pickup"
                  autoComplete="off"
                />
                {pickupSuggestions.length > 0 && (
                  <ul className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg max-h-64 overflow-auto">
                    {pickupSuggestions.map((s, idx) => (
                      <li
                        key={idx}
                        className="px-3 py-2 hover:bg-muted cursor-pointer text-sm"
                        onMouseDown={() => choosePickupSuggestion(s)}
                        data-testid={`pickup-suggestion-${idx}`}
                      >
                        {s.display_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Drop Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 z-10" />
                <Input
                  placeholder="Enter drop location"
                  value={dropoff}
                  onChange={(e) => handleDropoffChange(e.target.value)}
                  className="pl-12 bg-white/20 border-white/30 text-white placeholder:text-white/50 backdrop-blur-sm focus:bg-white/30 transition-all h-12"
                  data-testid="input-dropoff"
                  autoComplete="off"
                />
                {dropoffSuggestions.length > 0 && (
                  <ul className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg max-h-64 overflow-auto">
                    {dropoffSuggestions.map((s, idx) => (
                      <li
                        key={idx}
                        className="px-3 py-2 hover:bg-muted cursor-pointer text-sm"
                        onMouseDown={() => chooseDropoffSuggestion(s)}
                        data-testid={`dropoff-suggestion-${idx}`}
                      >
                        {s.display_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Travel Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full pl-12 text-left font-normal bg-white/20 border-white/30 text-white placeholder:text-white/50 backdrop-blur-sm focus:bg-white/30 transition-all h-12", !date && "text-white/50")}
                    data-testid="input-date"
                  >
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 z-10" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90 ">Travel Time</label>
              <div className="flex gap-2">
                <Select
                  value={time.hour}
                  onValueChange={(value) => setTime({ ...time, hour: value })}
                >
                  <SelectTrigger className="pl-12 bg-white/20 border-white/30 text-white backdrop-blur-sm focus:bg-white/30 transition-all h-12 ">
                    <SelectValue placeholder="Hour" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((hour) => (
                      <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={time.minute}
                  onValueChange={(value) => setTime({ ...time, minute: value })}
                >
                  <SelectTrigger className="w-24 bg-white/20 border-white/30 text-white backdrop-blur-sm focus:bg-white/30 transition-all h-12">
                    <SelectValue placeholder="Min" />
                  </SelectTrigger>
                  <SelectContent>
                    {['00', '15', '30', '45'].map((minute) => (
                      <SelectItem key={minute} value={minute}>{minute}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={time.period}
                  onValueChange={(value) => setTime({ ...time, period: value as 'AM' | 'PM' })}
                >
                  <SelectTrigger className="w-20 bg-white/20 border-white/30 text-white backdrop-blur-sm focus:bg-white/30 transition-all h-12">
                    <SelectValue placeholder="AM/PM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Button
            size="lg"
            className="w-full text-lg h-14 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-300 btn-ripple rounded-xl"
            onClick={handleQuickBook}
            data-testid="button-quick-book"
          >
            Find My Perfect Ride →
          </Button>
        </Card>
      </div>
    </section>
  );
}
