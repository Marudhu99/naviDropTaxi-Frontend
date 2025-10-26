import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const handleCall = () => {
    window.location.href = 'tel:9787099804';
  };

  const handleEmail = () => {
    window.location.href = 'mailto:navidroptaxi@gmail.com';
  };

  return (
    <footer id="contact" className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Company Info */}
          <div>
            <div className="mb-2 md:mb-0">
              {/* <span className="text-4xl">🚖</span>
              <h3 className="text-2xl font-bold font-heading">Navi Drop Taxi</h3> */}
              <img src="./logo.png" alt="logo" className='w-[80vw] md:w-[100vw] h-[20vh] md:h-[20vh] object-cover'/>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              Your trusted partner for safe & hassle-free travel in Thiruvannamalai District. 
              Serving travelers since 2010.
            </p>
            <div className="space-y-3">
              <p className="text-sm text-white/70">
                ✓ 4,500+ Happy Travelers
              </p>
              <p className="text-sm text-white/70">
                ✓ 5.0★ Rating on 500+ Reviews
              </p>
              <p className="text-sm text-white/70">
                ✓ GPS-Tracked & Sanitized Vehicles
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-bold mb-6 font-heading">Get In Touch</h4>
            <div className="space-y-4 text-white/90">
              <a
                href="tel:9787099804"
                className="flex items-center gap-3 hover:text-yellow-300 transition-colors group"
                data-testid="button-call-footer"
              >
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500/30 flex items-center justify-center transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Call Anytime</p>
                  <p className="font-semibold">9787099804</p>
                </div>
              </a>
              <a
                href="mailto:navidroptaxi@gmail.com"
                className="flex items-center gap-3 hover:text-yellow-300 transition-colors group"
                data-testid="button-email-footer"
              >
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500/30 flex items-center justify-center transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Email Us</p>
                  <p className="font-semibold text-sm">navidroptaxi@gmail.com</p>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-white/60 mb-1">Our Location</p>
                  <p className="text-sm leading-relaxed">
                    291 South Street, Panaiolaipadi,<br />
                    Padiagragram Post, Chengam Tk,<br />
                    Thiruvannamalai District
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Follow Us & About */}
          <div>
            <h4 className="text-xl font-bold mb-6 font-heading">Follow Us</h4>
            <p className="text-white/80 mb-4 text-sm">
              Stay connected for updates, offers, and travel tips!
            </p>
            <div className="flex gap-3 mb-8">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" fill="white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>

            {/* About Snippet */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <h5 className="font-bold mb-2 text-yellow-300">About Us</h5>
              <p className="text-sm text-white/70 leading-relaxed">
                Founded in 2010, we've been serving Thiruvannamalai with reliable, 
                affordable transportation. Your safety and comfort are our top priorities.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="text-center text-white/60 text-sm">
            <p>&copy; {new Date().getFullYear()} Navi Drop Taxi. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
