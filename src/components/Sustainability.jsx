import { TreePine, Waves, Droplets, Moon } from 'lucide-react';
import { useScrollAnimationGroup } from '../hooks/useScrollAnimation';

const commitments = [
  {
    icon: TreePine,
    title: 'Adaptive Design',
    description: 'Implementing elevated or semi-floating structures to accommodate tidal conditions, minimizing ground intervention to protect mangrove root systems and maintain natural flow.',
    stat: 'Low',
    statLabel: 'Ground Intervention',
  },
  {
    icon: Waves,
    title: 'Seasonal Operation',
    description: 'Temporary closure during the rainy season to reduce environmental stress, with 20% of revenue used for preservation and maintenance to avoid overexploitation.',
    stat: '20%',
    statLabel: 'Preservation Fund',
  },
  {
    icon: Droplets,
    title: 'Community Integration',
    description: 'Local communities are not positioned as service providers, but as active partners serving as experience hosts and conservation partners.',
    stat: 'Local',
    statLabel: 'Active Partners',
  },
  {
    icon: Moon,
    title: 'Revenue Share',
    description: 'A fixed portion of visitor package revenue is allocated to the local community, ensuring the model is fair, financially viable, and socially inclusive.',
    stat: '20-30%',
    statLabel: 'Net Revenue Share',
  },
];

export default function Sustainability() {
  const groupRef = useScrollAnimationGroup();

  return (
    <section id="sustainability" className="py-24 md:py-36 bg-forest text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-amber text-xs tracking-[0.3em] uppercase mb-4">Our Promise</p>
          <h2 className="font-heading text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
            Sustainable & Community-Based <span className="italic">Integration</span>
          </h2>
          <p className="mt-6 text-white/60 max-w-2xl mx-auto leading-relaxed">
            The project is shaped by operational limits, ecological care, and a fair economic model for the communities connected to the site.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber to-transparent mx-auto mt-8" />
        </div>

        <div ref={groupRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {commitments.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`scroll-child scroll-hidden delay-${(index + 1) * 100} group p-8 md:p-10 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-sm hover:bg-white/10 transition-all duration-500`}
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber/15 flex items-center justify-center group-hover:bg-amber/25 transition-colors duration-500">
                    <Icon className="text-amber" size={22} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-white text-xl md:text-2xl mb-3">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">{item.description}</p>
                    <div className="flex items-baseline gap-2 pt-3 border-t border-white/10">
                      <span className="font-heading text-amber text-2xl md:text-3xl">{item.stat}</span>
                      <span className="text-white/40 text-xs tracking-widest uppercase">{item.statLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
