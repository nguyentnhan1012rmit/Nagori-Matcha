import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Philosophy() {
  const titleRef = useScrollAnimation();
  const textRef = useScrollAnimation();
  const imageRef = useScrollAnimation();

  return (
    <section id="philosophy" className="py-24 md:py-36 bg-linen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="scroll-hidden text-center mb-16 md:mb-24">
          <p className="text-amber text-xs tracking-[0.3em] uppercase mb-4">Our Philosophy</p>
          <h2 className="font-heading text-charred text-3xl sm:text-4xl md:text-5xl leading-tight">
            Intentional <span className="italic">Escape</span>
          </h2>
          <div className="section-divider mt-8" />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div ref={textRef} className="scroll-hidden order-2 lg:order-1">
            <blockquote className="font-heading italic text-forest text-xl sm:text-2xl md:text-3xl leading-relaxed mb-8">
              "When individuals are immersed in vast, quiet natural environments, they often begin to see their problems from a different perspective — lighter, smaller."
            </blockquote>
            <div className="space-y-5 text-charred-light leading-relaxed">
              <p>
                Life in Ho Chi Minh City is fast-paced and demanding, often leaving people mentally exhausted and disconnected. What many people are actually seeking is not distance, but a meaningful pause to reset and regain balance.
              </p>
              <p>
                This project shifts from passive mass tourism to intentional, experience-driven engagement.
              </p>
              <p className="text-forest font-medium">
                Instead of overwhelming visitors with entertainment or excessive activities, it focuses on creating space for silence, reflection, and genuine connection with both the surroundings and the self.
              </p>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="scroll-hidden order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg">
              <img
                src="/images/philosophy.png"
                alt="Morning mist over a quiet mangrove creek with a person in contemplation"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charred/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
