import { useState, useEffect } from 'react';
import { useScrollAnimationGroup } from '../hooks/useScrollAnimation';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { src: '/images/hero.png', alt: 'Golden hour mangrove waterway' },
  { src: '/images/gallery-aerial.png', alt: 'Aerial view of mangrove canopy' },
  { src: '/images/gallery-fireflies.png', alt: 'Fireflies among mangrove trees at night' },
  { src: '/images/experience-kayak.png', alt: 'Kayaking through mangrove channels' },
  { src: '/images/gallery-boardwalk.png', alt: 'Wooden boardwalk through mangrove forest' },
  { src: '/images/gallery-sunset.png', alt: 'Sunset over mangrove estuary' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const groupRef = useScrollAnimationGroup();

  const prev = (e) => {
    e.stopPropagation();
    setLightbox((l) => (l - 1 + images.length) % images.length);
  };
  const next = (e) => {
    e.stopPropagation();
    setLightbox((l) => (l + 1) % images.length);
  };

  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') setLightbox((l) => (l - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setLightbox((l) => (l + 1) % images.length);
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox]);

  return (
    <>
      <section id="gallery" className="py-24 md:py-36 bg-linen">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-amber text-xs tracking-[0.3em] uppercase mb-4">Visual Journey</p>
            <h2 className="font-heading text-charred text-3xl sm:text-4xl md:text-5xl leading-tight">
              A Glimpse of <span className="italic">Paradise</span>
            </h2>
            <div className="section-divider mt-8" />
          </div>

          <div ref={groupRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {images.map((img, index) => (
              <div
                key={img.src}
                className={`scroll-child scroll-hidden delay-${Math.min((index + 1) * 100, 500)} group relative rounded-xl overflow-hidden cursor-pointer aspect-[4/3] shadow-[0_14px_40px_rgba(59,51,44,0.08)]`}
                onClick={() => setLightbox(index)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charred/0 group-hover:bg-charred/30 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xs tracking-widest uppercase border border-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-charred/95 backdrop-blur-lg flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/60 transition-all duration-300 z-10"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/60 hover:bg-white/10 transition-all duration-300 z-10"
            onClick={prev}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next */}
          <button
            className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/60 hover:bg-white/10 transition-all duration-300 z-10"
            onClick={next}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image */}
          <img
            src={images[lightbox].src}
            alt={images[lightbox].alt}
            className="max-w-full max-h-[82vh] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Caption */}
          <p className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-wide text-center">
            {images[lightbox].alt}
          </p>

          {/* Dot indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === lightbox ? 'bg-amber w-6' : 'bg-white/30 w-1.5'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
