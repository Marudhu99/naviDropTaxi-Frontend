import { Users, IndianRupee, Wind, Zap, Star, Briefcase, Music } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface VehicleCardProps {
  name: string;
  type: string;
  capacity: string;
  models: string;
  rate: number;
  image: string;
  onBook: () => void;
}

export default function VehicleCard({
  name,
  type,
  capacity,
  models,
  rate,
  image,
  onBook,
}: VehicleCardProps) {
  const isPopular = name === 'Innova Premium';
  const isBestValue = name === 'Sedan';
  
  // Get features based on vehicle type
  const features = name.includes('Sedan') 
    ? ['AC', 'Spacious', 'Music System']
    : name.includes('Innova')
    ? ['Luxury', 'Premium AC', 'Spacious']
    : ['AC', 'Comfortable', 'Family'];

  // Get perfect for use cases
  const perfectFor = name.includes('Sedan')
    ? 'City trips, Airport transfers'
    : name.includes('Innova')
    ? 'Long journeys, Family trips'
    : 'Group travel, Outstation';

  return (
    <Card className="overflow-hidden card-lift h-full flex flex-col group relative border-2 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl">
      {/* Angled ribbon badges */}
      {isPopular && (
        <div className="absolute top-4 -right-10 z-20 transform rotate-45">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-12 py-2 text-xs font-black shadow-2xl flex items-center justify-center gap-1">
            <Star className="w-4 h-4 fill-white" />
            MOST POPULAR
          </div>
        </div>
      )}
      {isBestValue && (
        <div className="absolute top-4 -right-10 z-20 transform rotate-45">
          <div className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 text-white px-12 py-2 text-xs font-black shadow-2xl flex items-center justify-center gap-1">
            <Zap className="w-4 h-4 fill-white" />
            BEST VALUE
          </div>
        </div>
      )}

      {/* Image with gradient overlay */}
      <div className="relative h-56 bg-card overflow-hidden zoom-on-hover gradient-overlay">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain transition-transform duration-500 "
        />
        <div className="absolute top-4 left-4 bg-secondary/90 text-white backdrop-blur-sm border-white/20 z-10 px-2.5 py-0.5 text-xs font-semibold rounded-md border">
          {type}
        </div>
        {/* Gradient overlay that appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-sm font-medium">{models}</p>
        </div>
      </div>

      <CardContent className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold mb-2 font-heading group-hover:text-primary transition-colors" data-testid={`text-vehicle-${name.toLowerCase().replace(/\s+/g, '-')}`}>
          {name}
        </h3>
        
        {/* Perfect for label */}
        <p className="text-xs text-muted-foreground mb-3 italic">Perfect for: {perfectFor}</p>
        
        {/* Feature pills with icons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((feature, idx) => (
            <span key={idx} className="pill-badge text-xs">
              {feature.includes('AC') && <Wind className="w-3 h-3" />}
              {feature === 'Luxury' && <Star className="w-3 h-3" />}
              {feature === 'Music System' && <Music className="w-3 h-3" />}
              {feature === 'Spacious' && <Briefcase className="w-3 h-3" />}
              {feature}
            </span>
          ))}
        </div>

        {/* Vehicle specs */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-semibold">{capacity.split('+')[0]} Seats</span>
          </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Briefcase className="w-5 h-5 text-primary" />
              <span className="font-semibold">2-3 Bags</span>
            </div>
        </div>
        
        {/* Animated pricing */}
        <div className="flex items-center justify-center gap-1 text-2xl font-bold text-blue-600 pulse-glow px-4 py-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-all mb-4 mt-auto border border-blue-200">
          <span className="text-sm font-normal text-muted-foreground">Starting at</span>
          <IndianRupee className="w-6 h-6 text-blue-600" />
          <span data-testid={`text-rate-${name.toLowerCase().replace(/\s+/g, '-')}`}>{rate}</span>
          <span className="text-sm font-normal text-muted-foreground">/km</span>
        </div>
        <div className="text-md text-center text-muted-foreground italic mb-2">
          <span className='text-red-500 me-3'>*</span>
          <span>Driver Beta : {name==='Sedan'?'400':name==='SUV'?'600':'800'} Rs</span>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 "> {/* flex gap-2 changes */}
        {/* <Button
          variant="outline"
          className="flex-1 text-sm font-semibold border-2 hover:bg-primary/10 hover:border-primary transition-all"
          onClick={() => alert(`Viewing details for ${name}`)}
        >
          View Details
        </Button> */}
        <Button
          className="flex-1 text-sm font-bold btn-ripple group-hover:scale-105 transition-transform shadow-md hover:shadow-lg bg-gradient-to-r from-primary to-orange-500"
          onClick={onBook}
          data-testid={`button-book-${name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          Book Ride →
        </Button>
      </CardFooter>
    </Card>
  );
}
