import { FaWhatsapp, FaTelegramPlane, FaPhoneAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export default function FloatingContactButtons() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      'Hi! I would like to book a taxi. Please help me with the booking.'
    );
    window.open(`https://wa.me/919787099804?text=${message}`, '_blank');
  };

  const handleTelegram = () => {
    window.open('https://t.me/9787099804', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:9787099804';
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4">
      {/* WhatsApp */}
      <div className="flex items-center gap-3 group">
        <span className="bg-background/95 backdrop-blur-sm text-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          WhatsApp
        </span>
        <Button
          size="icon"
          className="h-12 w-12 rounded-full border-2 border-yellow-400 bg-green-500 hover:bg-green-600 text-white transition-colors shadow-lg"
          onClick={handleWhatsApp}
          data-testid="button-whatsapp-float"
        >
        
          <FaWhatsapp style={{ height: '1.7rem', width: '1.5rem' }} />
        </Button>
      </div>

      {/* Telegram */}
      <div className="flex items-center gap-3 group">
        <span className="bg-background/95 backdrop-blur-sm text-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Telegram
        </span>
        <Button
          size="icon"
          className="h-12 w-12 rounded-full border-2 border-yellow-400 bg-sky-500 hover:bg-sky-600 text-white transition-colors shadow-lg"
          onClick={handleTelegram}
          data-testid="button-telegram-float"
        >
        
          <FaTelegramPlane  style={{ height: '1.5rem', width: '1.5rem' }} />
        </Button>
      </div>

      {/* Call Now */}
      <div className="flex items-center gap-3 group">
        <span className="bg-background/95 backdrop-blur-sm text-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Call Now
        </span>
        <Button
          size="icon"
          className="w-12 h-12 rounded-full border-2 border-yellow-400 bg-orange-500 hover:bg-orange-600 text-white transition-colors shadow-lg"
          onClick={handleCall}
          data-testid="button-call-float"
        >
        
          <FaPhoneAlt style={{ height: '1.3rem', width: '1.5rem' }}  />
        </Button>
      </div>
    </div>
  );
}