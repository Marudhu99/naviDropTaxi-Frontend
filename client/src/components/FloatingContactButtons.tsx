import { Phone, MessageCircle, Send } from 'lucide-react';
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
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg bg-[#25D366] hover:bg-[#20BD5A] text-white animate-float"
        style={{ animationDelay: '0s' }}
        onClick={handleWhatsApp}
        data-testid="button-whatsapp-float"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg bg-[#0088cc] hover:bg-[#006ba3] text-white animate-float"
        style={{ animationDelay: '0.2s' }}
        onClick={handleTelegram}
        data-testid="button-telegram-float"
      >
        <Send className="h-6 w-6" />
      </Button>
      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg animate-float"
        style={{ animationDelay: '0.4s' }}
        onClick={handleCall}
        data-testid="button-call-float"
      >
        <Phone className="h-6 w-6" />
      </Button>
    </div>
  );
}
