import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.png"
          alt="Serene mangrove waterway at golden hour in the Cần Giờ Biosphere Reserve"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-charred/50 via-charred/20 to-charred/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-charred/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        {/* Overline */}
        <p
          className="text-amber-light text-xs sm:text-sm tracking-[0.35em] uppercase mb-6 animate-fade-in"
          style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
        >
          Dần Xây Mangrove Ecosystem, Cần Giờ Biosphere Reserve
        </p>

        {/* Main Title */}
        <h1
          className="font-heading text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-tight animate-fade-in-up"
          style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
        >
          Mangrover
          <br />
          <span className="italic font-normal opacity-90">Slow Living</span>
          <br />
          Retreat
        </h1>

        {/* Tagline */}
        <p
          className="mt-6 text-white/80 text-base sm:text-lg md:text-xl font-light max-w-lg leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '0.9s', animationFillMode: 'both' }}
        >
          Not simply a place to stay, but a place to return. A seasonal,
          low-impact glamping retreat designed as a space for restoration,
          reconnection, and reflection.
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: '1.3s', animationFillMode: 'both' }}
        >
          <a
            href="#rooms"
            className="px-8 py-3.5 bg-amber text-charred text-sm tracking-widest uppercase rounded-full hover:bg-amber-light transition-all duration-500 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Book Your Stay
          </a>
          <a
            href="#philosophy"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 text-white text-sm tracking-widest uppercase rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-500"
          >
            Discover
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '2s', animationFillMode: 'both' }}>
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="text-white/50 animate-gentle-bounce" size={20} />
      </div>
    </section>
  );
}
