import { MapPin, Clock, Navigation } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Location() {
  const titleRef = useScrollAnimation();
  const contentRef = useScrollAnimation();

  return (
    <section className="py-24 md:py-36 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={titleRef} className="scroll-hidden text-center mb-16 md:mb-20">
          <p className="text-amber text-xs tracking-[0.3em] uppercase mb-4">Find Us</p>
          <h2 className="font-heading text-charred text-3xl sm:text-4xl md:text-5xl leading-tight">
            Time Efficiency <span className="italic">in Nature</span>
          </h2>
          <div className="section-divider mt-8" />
        </div>

        <div ref={contentRef} className="scroll-hidden grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="flex items-start gap-5 p-6 rounded-2xl bg-linen">
            <div className="w-12 h-12 rounded-xl bg-forest/8 flex items-center justify-center flex-shrink-0">
              <MapPin className="text-forest" size={22} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-heading text-charred text-lg mb-2">Cần Giờ Biosphere Reserve</h3>
              <p className="text-charred-light text-sm leading-relaxed">
                Easily accessible from Ho Chi Minh City, there is no need for long-distance travel or complex planning.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-5 p-6 rounded-2xl bg-linen">
            <div className="w-12 h-12 rounded-xl bg-forest/8 flex items-center justify-center flex-shrink-0">
              <Clock className="text-forest" size={22} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-heading text-charred text-lg mb-2">Limited-Time Recovery</h3>
              <p className="text-charred-light text-sm leading-relaxed">
                This enables meaningful recovery within a limited timeframe, supporting the needs of busy urban lifestyles.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-5 p-6 rounded-2xl bg-linen">
            <div className="w-12 h-12 rounded-xl bg-forest/8 flex items-center justify-center flex-shrink-0">
              <Navigation className="text-forest" size={22} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-heading text-charred text-lg mb-2">Practical Escape</h3>
              <p className="text-charred-light text-sm leading-relaxed">
                The retreat is positioned as a highly practical escape where nature remains close enough to fit real urban schedules.
              </p>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-12 rounded-2xl overflow-hidden h-72 md:h-96 bg-forest/5 flex items-center justify-center border border-forest/10">
          <iframe
            title="Cần Giờ Biosphere Reserve Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125560.66697089614!2d106.8!3d10.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528e2e7e3e0d1%3A0x5e3e0e8e1e3e0e8e!2zQ-G6p24gR2nhu50!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
