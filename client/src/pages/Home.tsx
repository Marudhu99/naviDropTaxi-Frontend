import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FleetSection from '@/components/FleetSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import BookingForm from '@/components/BookingForm';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import FloatingContactButtons from '@/components/FloatingContactButtons';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FleetSection />
      <WhyChooseUs />
      <BookingForm />
      <Testimonials />
      <Footer />
      <FloatingContactButtons />
    </div>
  );
}
