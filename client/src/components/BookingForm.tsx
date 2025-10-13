import { useState, useRef } from 'react';
import { MapPin, Calendar, Clock, User, Mail, Phone, CheckCircle, IndianRupee } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type Suggestion = {
  display_name: string;
  lat: string;
  lon: string;
};

type Coords = {
  lat: number;
  lon: number;
};

const vehicles = [
  { id: 'sedan', name: 'Sedan (4+1)', rate: 14, models: 'Indica, Swift Dzire' },
  { id: 'suv', name: 'SUV (6+1)', rate: 18, models: 'Xylo, Tavera' },
  { id: 'innova', name: 'Innova Premium (6+1)', rate: 19, models: 'Toyota Innova' },
  { id: 'muv', name: 'MUV (7+1)', rate: 18, models: 'Tavera' },
];

export default function BookingForm() {
  const [step, setStep] = useState(1);

  // location inputs
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  // coords for automatic distance calculation
  const [pickupCoords, setPickupCoords] = useState<Coords | null>(null);
  const [dropoffCoords, setDropoffCoords] = useState<Coords | null>(null);

  // suggestion lists
  const [pickupSuggestions, setPickupSuggestions] = useState<Suggestion[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<Suggestion[]>([]);

  // other fields
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [distance, setDistance] = useState(''); // km as string
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const pickupDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropoffDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedVehicle = vehicles.find(v => v.id === vehicleType);
  const estimatedFare = selectedVehicle && distance ? selectedVehicle.rate * parseFloat(distance) : 0;

  // Haversine distance in kilometers
  const computeDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (v: number) => (v * Math.PI) / 180;
    const R = 6371; // Earth radius km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const setDistanceFromCoords = (p: Coords, d: Coords) => {
    const km = computeDistanceKm(p.lat, p.lon, d.lat, d.lon);
    setDistance(km.toFixed(1)); // keep one decimal
  };

  // simple fetch to OpenStreetMap Nominatim
  const fetchLocationSuggestions = async (query: string, setter: (s: Suggestion[]) => void) => {
    if (!query || query.length < 2) {
      setter([]);
      return;
    }
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&q=${encodeURIComponent(query)}`;
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

  // handlers with debounce
  const handlePickupChange = (value: string) => {
    setPickup(value);
    setPickupSuggestions([]);
    // clear coords and auto distance when user changes text
    setPickupCoords(null);
    setDistance('');
    if (pickupDebounceRef.current) clearTimeout(pickupDebounceRef.current);
    pickupDebounceRef.current = setTimeout(() => {
      fetchLocationSuggestions(value, setPickupSuggestions);
    }, 300);
  };

  const handleDropoffChange = (value: string) => {
    setDropoff(value);
    setDropoffSuggestions([]);
    // clear coords and auto distance when user changes text
    setDropoffCoords(null);
    setDistance('');
    if (dropoffDebounceRef.current) clearTimeout(dropoffDebounceRef.current);
    dropoffDebounceRef.current = setTimeout(() => {
      fetchLocationSuggestions(value, setDropoffSuggestions);
    }, 300);
  };

  const choosePickupSuggestion = (s: Suggestion) => {
    setPickup(s.display_name);
    setPickupSuggestions([]);
    const coords = { lat: parseFloat(s.lat), lon: parseFloat(s.lon) };
    setPickupCoords(coords);
    // if dropoff coords exist, auto-calc distance
    if (dropoffCoords) {
      setDistanceFromCoords(coords, dropoffCoords);
    }
    // optionally store coordinates: s.lat, s.lon
  };

  const chooseDropoffSuggestion = (s: Suggestion) => {
    setDropoff(s.display_name);
    setDropoffSuggestions([]);
    const coords = { lat: parseFloat(s.lat), lon: parseFloat(s.lon) };
    setDropoffCoords(coords);
    // if pickup coords exist, auto-calc distance
    if (pickupCoords) {
      setDistanceFromCoords(pickupCoords, coords);
    }
    // optionally store coordinates: s.lat, s.lon
  };

  const handleNextStep = () => {
    if (step === 1 && pickup && dropoff && date && time && vehicleType) {
      setStep(2);
    } else if (step === 2 && name && mobile) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const bookingDetails = `
🚖 *New Booking Request*

📍 Pickup: ${pickup}
📍 Drop: ${dropoff}
📅 Date: ${date}
⏰ Time: ${time}
🚗 Vehicle: ${selectedVehicle?.name}
📏 Estimated Distance: ${distance} km
💰 Estimated Fare: ₹${estimatedFare}

👤 Customer Details:
Name: ${name}
Mobile: ${mobile}
${email ? `Email: ${email}` : ''}
    `.trim();

    const message = encodeURIComponent(bookingDetails);
    window.open(`https://wa.me/919787099804?text=${message}`, '_blank');

    setStep(3);
  };

  return (
    <section id="booking" className="py-16 md:py-24 bg-gradient-to-b from-background to-card relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
            Your Ride in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">3 Easy Steps</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Book your perfect ride in under <span className="text-primary font-bold">60 seconds</span>
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-center mb-4 gap-2">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                    step >= num
                      ? 'bg-gradient-to-br from-primary to-orange-500 text-white shadow-lg scale-110'
                      : 'bg-muted text-muted-foreground'
                  } ${step === num ? 'ring-4 ring-primary/30' : ''}`}
                >
                  {step > num ? '✓' : num}
                </div>
                {num < 3 && (
                  <div className="w-16 md:w-24 h-2 mx-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-primary to-orange-500 transition-all duration-500 ${
                        step > num ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm font-bold text-muted-foreground max-w-md mx-auto px-4">
            <span className={step >= 1 ? 'text-primary' : ''}>Where & When?</span>
            <span className={step >= 2 ? 'text-primary' : ''}>Your Details</span>
            <span className={step >= 3 ? 'text-green-600' : ''}>Confirmed!</span>
          </div>
        </div>

        <Card className="border-2 shadow-2xl backdrop-blur-sm bg-card/95">
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-orange-500/5">
            <CardTitle className="text-2xl flex items-center gap-3">
              {step === 1 && (
                <>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span>Where & When?</span>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <span>Almost There - Your Details</span>
                </>
              )}
              {step === 3 && (
                <>
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <span className="text-green-600">Booking Confirmed!</span>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6 md:p-8">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 relative">
                    <Label htmlFor="pickup">Pickup Location *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="pickup"
                        placeholder="Enter pickup location"
                        value={pickup}
                        onChange={(e) => handlePickupChange(e.target.value)}
                        className="pl-10"
                        data-testid="input-pickup-booking"
                        autoComplete="off"
                      />
                    </div>

                    {pickupSuggestions.length > 0 && (
                      <ul className="absolute z-50 mt-1 w-full bg-white dark:bg-card border rounded-md shadow-lg max-h-64 overflow-auto">
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

                  <div className="space-y-2 relative">
                    <Label htmlFor="dropoff">Drop Location *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="dropoff"
                        placeholder="Enter drop location"
                        value={dropoff}
                        onChange={(e) => handleDropoffChange(e.target.value)}
                        className="pl-10"
                        data-testid="input-dropoff-booking"
                        autoComplete="off"
                      />
                    </div>

                    {dropoffSuggestions.length > 0 && (
                      <ul className="absolute z-50 mt-1 w-full bg-white dark:bg-card border rounded-md shadow-lg max-h-64 overflow-auto">
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

                  <div className="space-y-2">
                    <Label htmlFor="date">Travel Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="pl-10"
                        data-testid="input-date-booking"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Travel Time *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="pl-10"
                        data-testid="input-time-booking"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="distance">Estimated Distance (km)</Label>
                    <Input
                      id="distance"
                      type="number"
                      placeholder="Automatically calculated when both locations are selected"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      data-testid="input-distance"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Select Vehicle Type *</Label>
                  <RadioGroup value={vehicleType} onValueChange={setVehicleType}>
                    {vehicles.map((vehicle) => (
                      <div key={vehicle.id} className="flex items-center space-x-3 border rounded-md p-4 hover-elevate">
                        <RadioGroupItem value={vehicle.id} id={vehicle.id} data-testid={`radio-${vehicle.id}`} />
                        <Label htmlFor={vehicle.id} className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">{vehicle.name}</p>
                              <p className="text-sm text-muted-foreground">{vehicle.models}</p>
                            </div>
                            <div className="flex items-center gap-1 font-bold text-primary">
                              <IndianRupee className="w-4 h-4" />
                              <span>{vehicle.rate}/km</span>
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {estimatedFare > 0 && (
                  <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/30 rounded-xl p-6 shadow-lg animate-slide-up">
                    <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-primary" />
                      <span>Price Breakdown</span>
                    </h4>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Base Rate</span>
                        <span className="font-medium">₹{selectedVehicle?.rate}/km</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Distance</span>
                        <span className="font-medium">{distance} km</span>
                      </div>
                      <div className="h-px bg-border" />
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">Estimated Total:</span>
                        <div className="flex items-center gap-1 text-3xl font-bold text-primary pulse-glow">
                          <IndianRupee className="w-7 h-7" />
                          <span data-testid="text-estimated-fare">{estimatedFare}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 flex items-start gap-2">
                      <div className="text-yellow-600 mt-0.5">ℹ️</div>
                      <p className="text-xs text-yellow-700 dark:text-yellow-300">
                        Final fare may vary based on actual distance, route, and time of day. Additional charges may apply for tolls or waiting time.
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full btn-ripple bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                  onClick={handleNextStep}
                  disabled={!pickup || !dropoff || !date || !time || !vehicleType}
                  data-testid="button-next-step-1"
                >
                  Get Instant Quote →
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        data-testid="input-name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        maxLength={10}
                        className="pl-10"
                        data-testid="input-mobile"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address (Optional)</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        data-testid="input-email"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-2 hover:bg-muted"
                    size="lg"
                    onClick={() => setStep(1)}
                    data-testid="button-back"
                  >
                    ← Back
                  </Button>
                  <Button
                    className="flex-2 md:flex-1 btn-ripple bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                    onClick={handleNextStep}
                    disabled={!name || !mobile || mobile.length !== 10}
                    data-testid="button-confirm-booking"
                  >
                    Book My Ride Now! →
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="text-center py-12 animate-fade-in">
                <div className="mb-8 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse" />
                    <CheckCircle className="w-24 h-24 text-green-500 relative animate-bounce" />
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-green-600">
                  🎉 Booking Request Sent!
                </h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                  Your booking request has been sent via <span className="text-green-600 font-semibold">WhatsApp</span>. Our team will contact you shortly to confirm your booking.
                </p>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-6 text-left space-y-3 mb-8 max-w-lg mx-auto shadow-lg">
                  <h4 className="font-bold text-lg mb-4 text-green-700 dark:text-green-400">Booking Summary</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Pickup</p>
                        <p className="font-semibold">{pickup}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Drop</p>
                        <p className="font-semibold">{dropoff}</p>
                      </div>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span>{date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <span>{time}</span>
                      </div>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Vehicle</span>
                      <span className="font-semibold">{selectedVehicle?.name}</span>
                    </div>
                    <div className="flex items-center justify-between bg-white dark:bg-card p-3 rounded-lg">
                      <span className="font-semibold">Estimated Fare</span>
                      <span className="text-2xl font-bold text-green-600 flex items-center">
                        <IndianRupee className="w-5 h-5" />
                        {estimatedFare}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setStep(1);
                    setPickup('');
                    setDropoff('');
                    setDate('');
                    setTime('');
                    setVehicleType('');
                    setDistance('');
                    setName('');
                    setMobile('');
                    setEmail('');
                    setPickupSuggestions([]);
                    setDropoffSuggestions([]);
                    setPickupCoords(null);
                    setDropoffCoords(null);
                  }}
                  size="lg"
                  className="btn-ripple bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white font-bold shadow-lg"
                  data-testid="button-new-booking"
                >
                  Plan Another Journey →
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
