import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function CallToAction() {
  const ref = useScrollAnimation();

  return (
    <section id="cta" className="relative py-24 md:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/gallery-sunset.png"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-charred/70" />
      </div>

      {/* Content */}
      <div ref={ref} className="scroll-hidden relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="text-amber text-xs tracking-[0.3em] uppercase mb-6">Begin Your Journey</p>
        <h2 className="font-heading text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
          Ready for a <span className="italic">Meaningful Pause?</span>
        </h2>
        <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Spaces are intentionally limited to prioritize experiential depth, privacy, and environmental protection.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#rooms"
            className="px-10 py-4 bg-amber text-charred text-sm tracking-widest uppercase rounded-full hover:bg-amber-light transition-all duration-500 font-medium"
          >
            Book Now
          </a>
          <a
            href="#experience"
            className="px-10 py-4 border border-white/30 text-white text-sm tracking-widest uppercase rounded-full hover:bg-white/10 transition-all duration-500"
          >
            Explore More
          </a>
        </div>
      </div>
    </section>
  );
}
