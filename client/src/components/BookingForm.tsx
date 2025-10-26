import { useState, useRef, useEffect } from 'react';
import { useBookingForm } from '@/lib/BookingFormContext';
import { MapPin, Calendar, Clock, User, Mail, Phone, CheckCircle, IndianRupee, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, isDate } from 'date-fns';
import { filterDistricts, haversineKm } from '@/lib/tn-districts';
import { toast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  { id: 'sedan', name: 'Sedan (4+1)', rate: 14, models: 'Indica, Swift Dzire', driverBata: { oneWay: 0, roundTrip: 400 } },
  { id: 'suv', name: 'SUV (6+1)', rate: 18, models: 'Xylo, Tavera', driverBata: { oneWay: 0, roundTrip: 600 } },
  { id: 'innova', name: 'Innova Premium (6+1)', rate: 19, models: 'Toyota Innova', driverBata: { oneWay: 0, roundTrip: 800 } },
  // { id: 'muv', name: 'MUV (7+1)', rate: 18, models: 'Tavera' },
];

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const { data: contextData } = useBookingForm();

  // location inputs
  const [pickup, setPickup] = useState(contextData.pickup || '');
  const [dropoff, setDropoff] = useState(contextData.dropoff || '');

  // coords for automatic distance calculation
  const [pickupCoords, setPickupCoords] = useState<Coords | null>(null);
  const [dropoffCoords, setDropoffCoords] = useState<Coords | null>(null);

  // suggestion lists
  const [pickupSuggestions, setPickupSuggestions] = useState<Suggestion[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<Suggestion[]>([]);

  // other fields
  const [date, setDate] = useState<Date | undefined>(contextData.date ? new Date(contextData.date) : undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(contextData.returnDate ? new Date(contextData.returnDate) : undefined);
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>(contextData.tripType || 'one-way');
  const [time, setTime] = useState<{ hour: string; period: 'AM' | 'PM' }>(() => {
    if (contextData.time) {
      const match = contextData.time.match(/(\d{2}):(\d{2}) ?(AM|PM)?/);
      if (match) {
        return {
          hour: match[1],
          period: (match[3] as 'AM' | 'PM') || 'AM',
        };
      }
    }
    return { hour: '', period: 'AM' };
  });
  const [vehicleType, setVehicleType] = useState('');
  const [distance, setDistance] = useState(contextData.distance || ''); // km as string
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Sync context data on change
  useEffect(() => {
    if (contextData.pickup) setPickup(contextData.pickup);
    if (contextData.dropoff) setDropoff(contextData.dropoff);
    if (contextData.date) setDate(new Date(contextData.date));
    if (contextData.returnDate) setReturnDate(new Date(contextData.returnDate));
    if (contextData.tripType) setTripType(contextData.tripType);
    if (contextData.time) {
      const match = contextData.time.match(/(\d{2}):(\d{2}) ?(AM|PM)?/);
      if (match) {
        setTime({ hour: match[1], period: (match[3] as 'AM' | 'PM') || 'AM' });
      }
    }
    if (contextData.distance) setDistance(contextData.distance);
  }, [contextData]);

  // Validation function
  const validateField = (field: string, value: any) => {
    switch (field) {
      case 'pickup':
        if (!value) return 'Pickup location is required';
        break;
      case 'dropoff':
        if (!value) return 'Drop location is required';
        break;
      case 'date':
        if (!value) return 'Date is required';
        break;
      case 'returnDate':
        if (tripType === 'round-trip' && !value) return 'Return date is required for round trip';
        if (tripType === 'round-trip' && value && date && value <= date) return 'Return date must be after pickup date';
        break;
      case 'time':
        if (!value.hour) return 'Time is required';
        break;
      case 'vehicleType':
        if (!value) return 'Vehicle type is required';
        break;
      case 'name':
        if (!value) return 'Name is required';
        if (value.length < 3) return 'Name must be at least 3 characters';
        break;
      case 'mobile':
        if (!value) return 'Mobile number is required';
        if (!/^[6-9]\d{9}$/.test(value)) return 'Enter a valid 10-digit mobile number';
        break;
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
        break;
    }
    return '';
  };

  const pickupDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropoffDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedVehicle = vehicles.find(v => v.id === vehicleType);
  const baseFare = selectedVehicle && distance ? selectedVehicle.rate * parseFloat(distance) : 0;
  const driverBata = selectedVehicle && tripType === 'round-trip' ? selectedVehicle.driverBata.roundTrip : 0;
  const estimatedFare = baseFare + driverBata;

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

  // Tamil Nadu districts only suggestions
  const fetchLocationSuggestions = (query: string, setter: (s: Suggestion[]) => void) => {
    if (query.length < 1) return setter([]);
    const results = filterDistricts(query).map(d => ({
      display_name: d.name,
      lat: String(d.lat),
      lon: String(d.lon),
    }));
    setter(results);
  };

  // handlers with debounce
  const handlePickupChange = (value: string) => {
    setPickup(value);
    setPickupSuggestions([]);
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
    if (dropoffCoords) {
      setDistanceFromCoords(coords, dropoffCoords);
    }
  };

  const chooseDropoffSuggestion = (s: Suggestion) => {
    setDropoff(s.display_name);
    setDropoffSuggestions([]);
    const coords = { lat: parseFloat(s.lat), lon: parseFloat(s.lon) };
    setDropoffCoords(coords);
    if (pickupCoords) {
      setDistanceFromCoords(pickupCoords, coords);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Use a local copy for eval to work correctly in the validation loop
    const localData = { pickup, dropoff, date, time, vehicleType, name, mobile, email };
    
    // Validate all fields
    const newErrors: { [key: string]: string } = {};
    ['pickup', 'dropoff', 'date', 'time', 'vehicleType', 'name', 'mobile', 'email'].forEach(field => {
      const error = validateField(field, localData[field as keyof typeof localData]);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Format time for message
    const formattedTime = `${time.hour}:00 ${time.period}`;

    const bookingDetails = `
🚖 *New Booking Request*

📍 Pickup: ${pickup}
📍 Drop: ${dropoff}
📅 Date: ${date ? format(date, "PPP") : ''}
${tripType === 'round-trip' && returnDate ? `📅 Return Date: ${format(returnDate, "PPP")}` : ''}
⏰ Time: ${formattedTime}
🚗 Vehicle: ${selectedVehicle?.name}
📏 Estimated Distance: ${distance} km
💰 Base Fare: ₹${baseFare.toFixed(2)}
${driverBata > 0 ? `💰 Driver Bata: ₹${driverBata}` : ''}
💰 Total Estimated Fare: ₹${estimatedFare.toFixed(2)}

👤 Customer Details:
Name: ${name}
Mobile: ${mobile}
${email ? `Email: ${email}` : ''}
    `.trim();

    // Send WhatsApp and email in parallel
    const message = encodeURIComponent(bookingDetails);
    const whatsappPromise = Promise.resolve(window.open(`https://wa.me/919787099804?text=${message}`, '_blank'));
    const emailPromise = fetch('/api/send-booking-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pickup,
        dropoff,
        date: date ? format(date, 'yyyy-MM-dd') : '',
        returnDate: returnDate ? format(returnDate, 'yyyy-MM-dd') : '',
        tripType,
        time: formattedTime,
        vehicleType: selectedVehicle?.name || '',
        distance,
        name,
        mobile,
        email,
        baseFare: baseFare.toFixed(2),
        driverBata: driverBata.toFixed(2),
        estimatedFare: estimatedFare.toFixed(2)
      })
    });

    let emailSuccess = false;
    try {
      const emailResponse = await emailPromise;
      if (emailResponse.ok) {
        emailSuccess = true;
      } else {
        console.error("Email API responded with an error:", await emailResponse.text());
        toast({ title: 'Email Error', description: 'Failed to send booking email notice.' });
      }
      await whatsappPromise;
    } catch (err) {
      console.error("Error during submission:", err);
      toast({ title: 'Submission Error', description: 'Could not complete the booking process.' });
    }

    setLoading(false);
    setStep(3);
    
    toast({
        title: 'Booking Request Sent! 🎉',
        description: 'Your request was sent. We will contact you shortly to confirm.',
        variant: 'default',
        duration: 5000,
    });
  };
  
  const resetForm = () => {
    setStep(1);
    setPickup('');
    setDropoff('');
    setDate(undefined);
    setReturnDate(undefined);
    setTripType('one-way');
    setTime({ hour: '', period: 'AM' });
    setVehicleType('');
    setDistance('');
    setName('');
    setMobile('');
    setEmail('');
    setPickupSuggestions([]);
    setDropoffSuggestions([]);
    setPickupCoords(null);
    setDropoffCoords(null);
    setErrors({});
    setShowConfirmDialog(false);
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
                <div className="space-y-4 mb-6">
                  <Label className="text-lg font-semibold">I'm Looking For</Label>
                  <RadioGroup value={tripType} onValueChange={(value) => {
                    setTripType(value as 'one-way' | 'round-trip');
                    if (value === 'one-way') {
                      setReturnDate(undefined);
                      setErrors({ ...errors, returnDate: '' });
                    }
                  }}>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="one-way" id="one-way" />
                      <Label htmlFor="one-way" className="cursor-pointer text-lg">One Way</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="round-trip" id="round-trip" />
                      <Label htmlFor="round-trip" className="cursor-pointer text-lg">Round Trip</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2 relative">
                     <Label htmlFor="pickup" className="flex gap-1">
                       Pickup Location <span className="text-destructive">*</span>
                       {errors.pickup && <span className="text-destructive text-sm ml-1">({errors.pickup})</span>}
                     </Label>
                     <div className="relative">
                       <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                       <Input
                         id="pickup"
                         placeholder="Enter pickup location"
                         value={pickup}
                         onChange={(e) => {
                           handlePickupChange(e.target.value);
                           setErrors({ ...errors, pickup: validateField('pickup', e.target.value) });
                         }}
                         className={cn("pl-10", errors.pickup && "border-destructive")}
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
                           >
                             {s.display_name}
                           </li>
                         ))}
                       </ul>
                     )}
                   </div>

                   <div className="space-y-2 relative">
                     <Label htmlFor="dropoff" className="flex gap-1">
                       Drop Location <span className="text-destructive">*</span>
                       {errors.dropoff && <span className="text-destructive text-sm ml-1">({errors.dropoff})</span>}
                     </Label>
                     <div className="relative">
                       <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                       <Input
                         id="dropoff"
                         placeholder="Enter drop location"
                         value={dropoff}
                         onChange={(e) => {
                           handleDropoffChange(e.target.value);
                           setErrors({ ...errors, dropoff: validateField('dropoff', e.target.value) });
                         }}
                         className={cn("pl-10", errors.dropoff && "border-destructive")}
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
                           >
                             {s.display_name}
                           </li>
                         ))}
                       </ul>
                     )}
                   </div>

                   <div className="space-y-2">
                     <Label htmlFor="date" className="flex gap-1">
                       Pickup Date <span className="text-destructive">*</span>
                       {errors.date && <span className="text-destructive text-sm ml-1">({errors.date})</span>}
                     </Label>
                     <Popover>
                       <PopoverTrigger asChild>
                         <Button
                           id="date"
                           variant="outline"
                           className={cn(
                             "w-full pl-10 text-left font-normal",
                             !date && "text-muted-foreground",
                             errors.date && "border-destructive"
                           )}
                         >
                           <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                           {date ? format(date, "PPP") : <span>Pick a date</span>}
                         </Button>
                       </PopoverTrigger>
                       <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                           mode="single"
                           selected={date}
                          onSelect={(d) => {
                            setDate(d);
                            setTimeout(() => (document.activeElement as HTMLElement | null)?.blur(), 0);
                          }}
                           disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                           initialFocus
                         />
                       </PopoverContent>
                     </Popover>
                   </div>

                   {tripType === 'round-trip' && (
                     <div className="space-y-2">
                       <Label htmlFor="returnDate" className="flex gap-1">
                         Return Date <span className="text-destructive">*</span>
                         {errors.returnDate && <span className="text-destructive text-sm ml-1">({errors.returnDate})</span>}
                       </Label>
                       <Popover>
                         <PopoverTrigger asChild>
                           <Button
                             id="returnDate"
                             variant="outline"
                             className={cn(
                               "w-full pl-10 text-left font-normal",
                               !returnDate && "text-muted-foreground",
                               errors.returnDate && "border-destructive"
                             )}
                           >
                             <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                             {returnDate ? format(returnDate, "PPP") : <span>Pick return date</span>}
                           </Button>
                         </PopoverTrigger>
                         <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                             mode="single"
                             selected={returnDate}
                            onSelect={(d) => {
                              setReturnDate(d);
                              setTimeout(() => (document.activeElement as HTMLElement | null)?.blur(), 0);
                            }}
                             disabled={(dateVal) => {
                               const today = new Date(new Date().setHours(0, 0, 0, 0));
                               if (dateVal < today) return true;
                               if (date && dateVal <= date) return true;
                               return false;
                             }}
                             initialFocus
                           />
                         </PopoverContent>
                       </Popover>
                     </div>
                   )}

                   <div className="space-y-2">
                     <Label className="flex gap-1">
                       Travel Time <span className="text-destructive">*</span>
                       {errors.time && <span className="text-destructive text-sm ml-1">({errors.time})</span>}
                     </Label>
                     <div className="flex gap-2">
                       <div className="relative flex-1">
                         <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                         <Select
                           value={time.hour}
                           onValueChange={(value) => setTime({ ...time, hour: value })}
                         >
                           <SelectTrigger className={cn("pl-10", errors.time && "border-destructive")}>
                             <SelectValue placeholder="Hour" />
                           </SelectTrigger>
                           <SelectContent>
                             {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((hour) => (
                               <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                             ))}
                           </SelectContent>
                         </Select>
                       </div>
                       <Select
                         value={time.period}
                         onValueChange={(value) => setTime({ ...time, period: value as 'AM' | 'PM' })}
                       >
                         <SelectTrigger className={cn("w-20", errors.time && "border-destructive")}>
                           <SelectValue placeholder="AM/PM" />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="AM">AM</SelectItem>
                           <SelectItem value="PM">PM</SelectItem>
                         </SelectContent>
                       </Select>
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
                     />
                   </div>
                 </div>

                <div className="space-y-3">
                  <Label>Select Vehicle Type *</Label>
                  <RadioGroup value={vehicleType} onValueChange={setVehicleType}>
                    {vehicles.map((vehicle) => (
                      <div key={vehicle.id} className="flex items-center space-x-3 border rounded-md p-4 hover-elevate">
                        <RadioGroupItem value={vehicle.id} id={vehicle.id} />
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
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Base Fare</span>
                        <span className="font-medium">₹{baseFare.toFixed(2)}</span>
                      </div>
                      {driverBata > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Driver Bata (Round Trip)</span>
                          <span className="font-medium">₹{driverBata.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="h-px bg-border" />
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">Estimated Total:</span>
                        <div className="flex items-center gap-1 text-3xl font-bold text-primary pulse-glow">
                          <IndianRupee className="w-7 h-7" />
                          <span>{estimatedFare.toFixed(2)}</span>
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
                  onClick={() => {
                    const newErrors: { [key: string]: string } = {};
                    const fieldsToValidate = ['pickup', 'dropoff', 'date', 'time', 'vehicleType'];
                    if (tripType === 'round-trip') {
                      fieldsToValidate.push('returnDate');
                    }
                    const localData = { pickup, dropoff, date, returnDate, time, vehicleType };

                    fieldsToValidate.forEach(field => {
                      const error = validateField(field, localData[field as keyof typeof localData]);
                      if (error) {
                        newErrors[field] = error;
                      }
                    });

                    if (Object.keys(newErrors).length > 0) {
                      setErrors(newErrors);
                      return;
                    }
                    setStep(2);
                  }}
                  disabled={loading || !pickup || !dropoff || !date || !time.hour || !vehicleType || (tripType === 'round-trip' && !returnDate)}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                 Book Now →
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex gap-1">
                      Full Name <span className="text-destructive">*</span>
                      {errors.name && <span className="text-destructive text-sm ml-1">({errors.name})</span>}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrors({ ...errors, name: validateField('name', e.target.value) });
                        }}
                        className={cn("pl-10", errors.name && "border-destructive")}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile" className="flex gap-1">
                      Mobile Number <span className="text-destructive">*</span>
                      {errors.mobile && <span className="text-destructive text-sm ml-1">({errors.mobile})</span>}
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={mobile}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setMobile(value);
                          setErrors({ ...errors, mobile: validateField('mobile', value) });
                        }}
                        className={cn("pl-10", errors.mobile && "border-destructive")}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex gap-1">
                      Email Address <span className="text-muted-foreground">(Optional)</span>
                      {errors.email && <span className="text-destructive text-sm ml-1">({errors.email})</span>}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (e.target.value) {
                            setErrors({ ...errors, email: validateField('email', e.target.value) });
                          } else {
                            const { email, ...rest } = errors;
                            setErrors(rest);
                          }
                        }}
                        className={cn("pl-10", errors.email && "border-destructive")}
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
                  >
                    ← Back
                  </Button>
                  <Button
                    className="flex-2 md:flex-1 btn-ripple bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={loading || !name || !mobile || mobile.length !== 10}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
                        <div>
                          <p className="text-sm text-muted-foreground">Pickup Date</p>
                          <span className="font-semibold">{date ? format(date, "PPP") : ''}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <span>{time.hour ? `${time.hour}:00 ${time.period}` : ''}</span>
                      </div>
                    </div>
                    {tripType === 'round-trip' && returnDate && (
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-orange-600" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Return Date</p>
                          <p className="font-semibold">{format(returnDate, "PPP")}</p>
                        </div>
                      </div>
                    )}
                    <div className="h-px bg-border" />
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Vehicle</span>
                      <span className="font-semibold">{selectedVehicle?.name}</span>
                    </div>
                    <div className="flex items-center justify-between bg-white dark:bg-card p-3 rounded-lg">
                      <span className="font-semibold">Estimated Fare</span>
                      <span className="text-2xl font-bold text-green-600 flex items-center">
                        <IndianRupee className="w-5 h-5" />
                        {estimatedFare.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={resetForm}
                  className="btn-ripple bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                >
                  Plan Another Journey →
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* This dialog is available if you want to add a confirmation step in the future */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Booking</DialogTitle>
            <DialogDescription>
              Please review your booking details before confirming.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
             {/* Summary details here... */}
             
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Back
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}