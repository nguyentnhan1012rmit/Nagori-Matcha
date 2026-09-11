import { Heart, Compass, Sprout } from 'lucide-react';
import { useScrollAnimationGroup } from '../hooks/useScrollAnimation';

const pillars = [
  {
    icon: Heart,
    title: 'Restore',
    subtitle: 'Mental and Physical Reset',
    description:
      'Providing a structured environment for mental recovery and reducing cognitive overload through low-stimulation periods, guided meditation, and yoga sessions.',
    color: 'text-amber',
    bgColor: 'bg-amber/8',
  },
  {
    icon: Compass,
    title: 'Reconnect',
    subtitle: 'Nature Engagement',
    description:
      'Transforming the natural environment from a passive visual element into an active and immersive component through mangrove exploration and boat-based activities.',
    color: 'text-forest',
    bgColor: 'bg-forest/8',
  },
  {
    icon: Sprout,
    title: 'Regenerate',
    subtitle: 'Participation and Impact',
    description:
      'Shifting visitors from passive participants to active contributors to create a tangible and lasting connection to the site through tree planting activities and personal tagging.',
    color: 'text-amber-dark',
    bgColor: 'bg-amber-dark/8',
  },
];

export default function Pillars() {
  const groupRef = useScrollAnimationGroup();

  return (
    <section className="py-24 md:py-36 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-amber text-xs tracking-[0.3em] uppercase mb-4">The Journey</p>
          <h2 className="font-heading text-charred text-3xl sm:text-4xl md:text-5xl leading-tight">
            Three-Layered <span className="italic">Experience System</span>
          </h2>
          <div className="section-divider mt-8" />
        </div>

        {/* Pillars Grid */}
        <div ref={groupRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`scroll-child scroll-hidden delay-${(index + 1) * 200} group text-center p-8 md:p-10 rounded-2xl bg-linen hover:shadow-lg transition-all duration-500 hover:-translate-y-1`}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${pillar.bgColor} mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className={`${pillar.color}`} size={28} strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-heading text-charred text-2xl md:text-3xl mb-2">
                  {pillar.title}
                </h3>
                <p className={`text-xs tracking-[0.2em] uppercase ${pillar.color} mb-5`}>
                  {pillar.subtitle}
                </p>

                {/* Description */}
                <p className="text-charred-light leading-relaxed text-sm md:text-base">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
