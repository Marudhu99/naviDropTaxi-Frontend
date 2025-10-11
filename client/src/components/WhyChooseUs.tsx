import { Shield, Clock, IndianRupee, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Round-the-clock service for your convenience. Book anytime, anywhere.',
  },
  {
    icon: Shield,
    title: 'Safe & Clean',
    description: 'Well-maintained vehicles with professional, verified drivers.',
  },
  {
    icon: IndianRupee,
    title: 'Best Rates',
    description: 'Competitive pricing starting from ₹14/km with no hidden charges.',
  },
  {
    icon: Award,
    title: 'Experienced Team',
    description: 'Years of experience serving Thiruvannamalai and surrounding areas.',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading">
            Why Choose Us
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted travel partner in Thiruvannamalai District
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover-elevate transition-all duration-300">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 font-heading">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
