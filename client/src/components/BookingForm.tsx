import { useState } from 'react';
import { MapPin, Calendar, Clock, User, Mail, Phone, CheckCircle, IndianRupee } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const vehicles = [
  { id: 'sedan', name: 'Sedan (4+1)', rate: 14, models: 'Indica, Swift Dzire' },
  { id: 'suv', name: 'SUV (6+1)', rate: 18, models: 'Xylo, Tavera' },
  { id: 'innova', name: 'Innova Premium (6+1)', rate: 19, models: 'Toyota Innova' },
  { id: 'muv', name: 'MUV (7+1)', rate: 18, models: 'Tavera' },
];

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [distance, setDistance] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const selectedVehicle = vehicles.find(v => v.id === vehicleType);
  const estimatedFare = selectedVehicle && distance ? selectedVehicle.rate * parseFloat(distance) : 0;

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
    <section id="booking" className="py-16 md:py-24 bg-card">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading">
            Book Your Ride
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Complete your booking in simple steps
          </p>
        </div>

        <div className="flex items-center justify-center mb-8 gap-2">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  step >= num
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {num}
              </div>
              {num < 3 && (
                <div
                  className={`w-12 md:w-20 h-1 transition-colors ${
                    step > num ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && 'Trip & Vehicle Details'}
              {step === 2 && 'Your Information'}
              {step === 3 && 'Booking Confirmed!'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickup">Pickup Location *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="pickup"
                        placeholder="Enter pickup location"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        className="pl-10"
                        data-testid="input-pickup-booking"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dropoff">Drop Location *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="dropoff"
                        placeholder="Enter drop location"
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                        className="pl-10"
                        data-testid="input-dropoff-booking"
                      />
                    </div>
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
                      placeholder="Enter approximate distance"
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
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">Estimated Fare:</span>
                      <div className="flex items-center gap-1 text-2xl font-bold text-primary">
                        <IndianRupee className="w-6 h-6" />
                        <span data-testid="text-estimated-fare">{estimatedFare}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      * Final fare may vary based on actual distance and route
                    </p>
                  </div>
                )}

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleNextStep}
                  disabled={!pickup || !dropoff || !date || !time || !vehicleType}
                  data-testid="button-next-step-1"
                >
                  Continue to Personal Details
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

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(1)}
                    data-testid="button-back"
                  >
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    size="lg"
                    onClick={handleNextStep}
                    disabled={!name || !mobile || mobile.length !== 10}
                    data-testid="button-confirm-booking"
                  >
                    Confirm Booking
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="text-center py-8">
                <div className="mb-6 flex justify-center">
                  <CheckCircle className="w-20 h-20 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Booking Request Sent!</h3>
                <p className="text-muted-foreground mb-6">
                  Your booking request has been sent via WhatsApp. Our team will contact you shortly to confirm your booking.
                </p>
                <div className="bg-card border rounded-lg p-4 text-left space-y-2 mb-6">
                  <p><strong>Pickup:</strong> {pickup}</p>
                  <p><strong>Drop:</strong> {dropoff}</p>
                  <p><strong>Date & Time:</strong> {date} at {time}</p>
                  <p><strong>Vehicle:</strong> {selectedVehicle?.name}</p>
                  <p><strong>Estimated Fare:</strong> ₹{estimatedFare}</p>
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
                  }}
                  data-testid="button-new-booking"
                >
                  Book Another Ride
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
