import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import Services from '@/components/Services';
import FleetSection from '@/components/FleetSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import BookingForm from '@/components/BookingForm';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import FloatingContactButtons from '@/components/FloatingContactButtons';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <Services />
      <FleetSection />
      <WhyChooseUs />
      <BookingForm />
      <Testimonials />
      <FAQ />
      <Footer />
      <FloatingContactButtons />
    </div>
  );
}
