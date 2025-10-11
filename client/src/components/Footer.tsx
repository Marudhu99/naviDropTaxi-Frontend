import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';

export default function Footer() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/919787099804', '_blank');
  };

  const handleTelegram = () => {
    window.open('https://t.me/9787099804', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:9787099804';
  };

  const handleEmail = () => {
    window.location.href = 'mailto:naveen.taxi@example.com';
  };

  return (
    <footer id="contact" className="bg-secondary text-secondary-foreground py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 font-heading">Naveen Kumar Taxi Service</h3>
            <p className="text-secondary-foreground/90 mb-4">
              Your trusted travel partner in Thiruvannamalai District and surrounding areas.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleWhatsApp}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
                data-testid="button-whatsapp-footer"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              <button
                onClick={handleTelegram}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Telegram"
                data-testid="button-telegram-footer"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 font-heading">Contact Information</h4>
            <div className="space-y-3 text-secondary-foreground/90">
              <button
                onClick={handleCall}
                className="flex items-start gap-3 hover:text-white transition-colors w-full text-left"
                data-testid="button-call-footer"
              >
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>9787099804</span>
              </button>
              <button
                onClick={handleEmail}
                className="flex items-start gap-3 hover:text-white transition-colors w-full text-left"
                data-testid="button-email-footer"
              >
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>naveen.taxi@example.com</span>
              </button>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>
                  291 South Street, Panaiolaipadi,<br />
                  Padiagragram Post, Chengam Tk,<br />
                  Thiruvannamalai District
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 font-heading">Service Areas</h4>
            <ul className="space-y-2 text-secondary-foreground/90">
              <li>Thiruvannamalai</li>
              <li>Chengam</li>
              <li>Polur</li>
              <li>Arani</li>
              <li>Vellore</li>
              <li>Chennai & Surrounding Districts</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-secondary-foreground/80">
          <p>&copy; {new Date().getFullYear()} Naveen Kumar Taxi Service. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
