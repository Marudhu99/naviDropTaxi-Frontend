import { useState } from 'react';
import { ChevronDown, Shield, CreditCard, XCircle, Clock, FileCheck, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const faqs = [
  {
    icon: Shield,
    question: 'Is insurance included in the rental?',
    answer: 'Yes, all our vehicles come with comprehensive insurance coverage. Your safety and peace of mind are our priorities. Additional coverage options are available upon request.',
  },
  {
    icon: CreditCard,
    question: 'What are the payment methods accepted?',
    answer: 'We accept multiple payment methods including Cash, UPI, Google Pay, PhonePe, Paytm, and Bank Transfers. Payment can be made after the ride or in advance through WhatsApp.',
  },
  {
    icon: XCircle,
    question: 'Can I cancel or modify my booking?',
    answer: 'Yes, you can cancel or modify your booking up to 2 hours before the scheduled pickup time with no charges. For cancellations within 2 hours, a nominal fee may apply.',
  },
  {
    icon: FileCheck,
    question: 'Are all drivers verified and licensed?',
    answer: 'Absolutely! All our drivers undergo thorough background checks, possess valid commercial driving licenses, and have years of professional driving experience. Safety first, always.',
  },
  {
    icon: Clock,
    question: 'What if the vehicle breaks down during my trip?',
    answer: 'In the rare event of a breakdown, we immediately dispatch a replacement vehicle at no extra cost. Our 24/7 support team ensures minimal disruption to your journey.',
  },
  {
    icon: MapPin,
    question: 'Do you provide outstation services?',
    answer: 'Yes! We offer both one-way and round-trip services to Chennai, Vellore, Bangalore, and other major cities. Contact us for custom quotations for longer journeys.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Questions</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Got questions? We've got answers! Clear, honest information about our service
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index}
              className="border-2 hover:border-primary/50 transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left"
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <faq.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-lg md:text-xl font-bold font-heading pr-4">
                          {faq.question}
                        </h3>
                        <ChevronDown 
                          className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                            openIndex === index ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                      <div 
                        className={`overflow-hidden transition-all duration-300 ${
                          openIndex === index ? 'max-h-96 mt-4' : 'max-h-0'
                        }`}
                      >
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </button>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-2xl p-8 border-2 border-primary/20">
          <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">
            We're here to help! Call us anytime at{' '}
            <a href="tel:9787099804" className="text-primary font-bold hover:underline">
              9787099804
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:9787099804"
              className="px-6 py-3 bg-gradient-to-r from-primary to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Call Now
            </a>
            <a
              href="https://wa.me/919787099804"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

