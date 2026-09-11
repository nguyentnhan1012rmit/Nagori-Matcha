import { useScrollAnimationGroup } from '../hooks/useScrollAnimation';

const experiences = [
  {
    image: '/images/experience-yoga.png',
    title: 'Mindful Restoration',
    subtitle: 'Yoga & Meditation',
    description: 'Utilizing low-stimulation periods in a vast, quiet natural environment to help individuals see their problems from a lighter, smaller perspective.',
  },
  {
    image: '/images/experience-kayak.png',
    title: 'Ecological Interpretation',
    subtitle: 'Mangrove Exploration',
    description: 'Exploring the mangrove ecology through boat-based activities where Local Experience Guides share local knowledge and stories.',
  },
  {
    image: '/images/experience-planting.png',
    title: 'Conservation Footprint',
    subtitle: 'Tree Planting & QR Tagging',
    description: "Participating directly in ecosystem protection by planting trees and tagging them with a QR code for tourists to follow and check their tree's situation.",
  },
  {
    image: '/images/spa.png',
    title: 'Restorative Spa',
    subtitle: 'Natural Wellness',
    description: 'Offering gentle body treatments and quiet recovery rituals designed to support relaxation after time in the mangrove environment.',
  },
];

export default function Experiences() {
  const groupRef = useScrollAnimationGroup();

  return (
    <section id="experience" className="py-24 md:py-36 bg-linen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-amber text-xs tracking-[0.3em] uppercase mb-4">What Awaits</p>
          <h2 className="font-heading text-charred text-3xl sm:text-4xl md:text-5xl leading-tight">
            Curated <span className="italic">Experiences</span>
          </h2>
          <p className="mt-6 text-charred-light max-w-2xl mx-auto leading-relaxed">
            Visitors actively participate rather than passively consume, enhancing the experience by allowing individuals to create impact, making it more memorable and purposeful.
          </p>
          <div className="section-divider mt-8" />
        </div>

        {/* Experience Grid */}
        <div ref={groupRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {experiences.map((exp, index) => (
            <div
              key={exp.title}
              className={`scroll-child scroll-hidden delay-${(index + 1) * 100} group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer`}
            >
              {/* Image */}
              <img
                src={exp.image}
                alt={exp.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charred/80 via-charred/20 to-transparent transition-all duration-500 group-hover:from-charred/90" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-amber text-xs tracking-[0.2em] uppercase mb-2">
                  {exp.subtitle}
                </p>
                <h3 className="font-heading text-white text-xl md:text-2xl lg:text-3xl mb-2">
                  {exp.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-sm opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
