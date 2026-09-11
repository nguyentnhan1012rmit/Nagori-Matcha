import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Tent, Wind, Flame, ArrowRight } from 'lucide-react';

const features = [
  { icon: Tent, text: 'Approximately 17 glamping units' },
  { icon: Wind, text: 'Privacy and quality of experience' },
  { icon: Flame, text: 'Capacity control to prevent over-tourism' },
];

export default function Accommodation() {
  const titleRef = useScrollAnimation();
  const contentRef = useScrollAnimation();
  const imageRef = useScrollAnimation();

  return (
    <section id="accommodation" className="py-24 md:py-36 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={titleRef} className="scroll-hidden text-center mb-16 md:mb-20">
          <p className="text-amber text-xs tracking-[0.3em] uppercase mb-4">Your Stay</p>
          <h2 className="font-heading text-charred text-3xl sm:text-4xl md:text-5xl leading-tight">
            Low-Density <span className="italic">Glamping Model</span>
          </h2>
          <div className="section-divider mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div ref={imageRef} className="scroll-hidden-left">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/accommodation.png"
                alt="Eco-luxury glamping tent elevated on wooden stilts among mangrove trees at dusk"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charred/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-4 py-1.5 bg-amber/90 text-charred text-xs tracking-widest uppercase rounded-full">
                  ~17 Units Only
                </span>
              </div>
            </div>
          </div>

          <div ref={contentRef} className="scroll-hidden-right">
            <h3 className="font-heading text-charred text-2xl md:text-3xl mb-6">
              Value Through <span className="italic">Restraint</span>
            </h3>
            <div className="space-y-4 text-charred-light leading-relaxed mb-8">
              <p>
                The retreat is intentionally limited to approximately 17 glamping units.
              </p>
              <p>
                The objective is not to maximize the number of visitors, but to maximize the value generated per visitor.
              </p>
              <p>
                This low-density model ensures privacy and quality of experience while preserving the ecological integrity of the mangrove environment and preventing over-tourism.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.text} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-forest/8 flex items-center justify-center flex-shrink-0">
                      <Icon className="text-forest" size={18} strokeWidth={1.5} />
                    </div>
                    <span className="text-charred text-sm">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            <a
              href="#rooms"
              className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 bg-forest text-linen text-sm tracking-widest uppercase rounded-full hover:bg-forest-light hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              View Room Options
              <ArrowRight size={16} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
