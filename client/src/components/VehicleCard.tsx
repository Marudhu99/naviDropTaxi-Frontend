import { Users, IndianRupee } from 'lucide-react';
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
  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-300 h-full flex flex-col">
      <div className="relative h-48 bg-card overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
          {type}
        </Badge>
      </div>
      <CardContent className="p-6 flex-1">
        <h3 className="text-xl font-semibold mb-2 font-heading" data-testid={`text-vehicle-${name.toLowerCase().replace(/\s+/g, '-')}`}>
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{models}</p>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span className="font-medium">{capacity}</span>
          </div>
          <div className="flex items-center gap-1 text-lg font-bold text-primary">
            <IndianRupee className="w-5 h-5" />
            <span data-testid={`text-rate-${name.toLowerCase().replace(/\s+/g, '-')}`}>{rate}/km</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full"
          onClick={onBook}
          data-testid={`button-book-${name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}
