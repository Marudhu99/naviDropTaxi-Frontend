import { Shield, Clock, IndianRupee, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

const features = [
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Early morning flight? Late night arrival? We\'re always here when you need us most.',
    gradient: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    stat: '100',
    statLabel: '% Uptime',
  },
  {
    icon: Shield,
    title: 'Safe & Clean',
    description: 'Spotlessly sanitized vehicles. Background-verified drivers. Your safety is non-negotiable.',
    gradient: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600',
    stat: '5',
    statLabel: '★ Rating',
  },
  {
    icon: IndianRupee,
    title: 'Transparent Pricing',
    description: 'From ₹14/km. What you see is what you pay - zero surprises, no hidden charges.',
    gradient: 'from-yellow-500 to-orange-600',
    bgColor: 'bg-yellow-50',
    iconBg: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    stat: '14',
    statLabel: '₹/km Start',
  },
  {
    icon: Award,
    title: 'Local Experts',
    description: 'We know every shortcut, every scenic route, every hidden gem. Experience local expertise.',
    gradient: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50',
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
    stat: '15',
    statLabel: '+ Years',
  },
];

export default function WhyChooseUs() {
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            features.forEach((feature, idx) => {
              const targetValue = parseInt(feature.stat);
              const duration = 2000;
              const startTime = Date.now();
              
              const animate = () => {
                const now = Date.now();
                const progress = Math.min((now - startTime) / duration, 1);
                const value = Math.floor(progress * targetValue);
                
                setCounters((prev) => {
                  const newCounters = [...prev];
                  newCounters[idx] = value;
                  return newCounters;
                });
                
                if (progress < 1) {
                  requestAnimationFrame(animate);
                }
              };
              
              setTimeout(() => animate(), idx * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('why-choose-us');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-pink-500">4,500+ Travelers</span> Trust Us
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're not just a taxi service - we're your <span className="text-primary font-bold">reliable journey partner</span>
          </p>
        </div>

        <div id="why-choose-us" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="text-center card-lift group relative overflow-hidden border-2 bg-white hover:border-primary/50 animate-slide-up shadow-xl hover:shadow-2xl"
              style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'backwards' }}
            >
              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-bl-full`} />
              <div className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr ${feature.gradient} opacity-10 rounded-tr-full`} />
              
              <CardContent className="p-8 relative z-10">
                {/* Colored icon background */}
                <div className="mb-6 flex justify-center">
                  <div className={`w-16 h-16 rounded-2xl ${feature.iconBg} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Number counter - larger and bolder */}
                <div className="mb-5">
                  <div className={`text-5xl font-black bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent count-up`}>
                    {counters[index]}{feature.stat.includes('.') ? '' : feature.statLabel.includes('★') ? '' : '+'}
                  </div>
                  <div className="text-sm text-muted-foreground font-bold mt-2 uppercase tracking-wide">
                    {feature.statLabel}
                  </div>
                </div>

                <h3 className="text-xl font-black mb-4 font-heading group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>

              {/* Hover border glow */}
              <div className={`absolute inset-0 border-4 border-transparent group-hover:border-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg pointer-events-none`} />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
