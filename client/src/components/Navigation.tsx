import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCall = () => {
    window.location.href = 'tel:9787099804';
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex-shrink-0">
              <h1 className={`text-xl md:text-2xl font-bold font-heading transition-colors ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}>
                <span className="text-primary">🚖</span> Naveen Kumar Taxi
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('home')}
                className={`${
                  isScrolled ? 'text-foreground' : 'text-white'
                } hover:text-primary transition-colors font-medium`}
                data-testid="link-home"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('fleet')}
                className={`${
                  isScrolled ? 'text-foreground' : 'text-white'
                } hover:text-primary transition-colors font-medium`}
                data-testid="link-fleet"
              >
                Our Fleet
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`${
                  isScrolled ? 'text-foreground' : 'text-white'
                } hover:text-primary transition-colors font-medium`}
                data-testid="link-about"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`${
                  isScrolled ? 'text-foreground' : 'text-white'
                } hover:text-primary transition-colors font-medium`}
                data-testid="link-contact"
              >
                Contact
              </button>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="outline"
                size="default"
                onClick={handleCall}
                className="gap-2"
                data-testid="button-call-header"
              >
                <Phone className="w-4 h-4" />
                <span className="font-semibold">9787099804</span>
              </Button>
              <Button
                onClick={() => scrollToSection('booking')}
                data-testid="button-book-header"
              >
                Book Now
              </Button>
            </div>

            <button
              className={`md:hidden transition-colors ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t">
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-home-mobile"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('fleet')}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-fleet-mobile"
              >
                Our Fleet
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-about-mobile"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-contact-mobile"
              >
                Contact
              </button>
              <div className="pt-2 space-y-2">
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleCall}
                  data-testid="button-call-mobile"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">9787099804</span>
                </Button>
                <Button
                  className="w-full"
                  onClick={() => scrollToSection('booking')}
                  data-testid="button-book-mobile"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
