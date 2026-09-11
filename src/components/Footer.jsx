import { Camera, Globe, Mail, Phone } from 'lucide-react';

const footerLinks = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Experience', href: '#experience' },
  { label: 'Sustainability', href: '#sustainability' },
  { label: 'Stay', href: '#accommodation' },
  { label: 'Gallery', href: '#gallery' },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-charred text-white/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-white text-xl mb-4">
              Mangrover <span className="font-light opacity-70">Slow Living Retreat</span>
            </h3>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Mangrover Slow Living Retreat — Prioritizing depth, intention, and meaningful engagement over volume and superficial entertainment.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-amber hover:text-amber transition-all duration-300" aria-label="Instagram">
                <Camera size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-amber hover:text-amber transition-all duration-300" aria-label="Facebook">
                <Globe size={16} />
              </a>
              <a href="mailto:hello@mangroveretreat.vn" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-amber hover:text-amber transition-all duration-300" aria-label="Email">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white text-xs tracking-[0.2em] uppercase mb-6">Navigate</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm hover:text-amber transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs tracking-[0.2em] uppercase mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-amber flex-shrink-0" />
                <a href="mailto:hello@mangroveretreat.vn" className="text-sm hover:text-amber transition-colors duration-300">
                  hello@mangroveretreat.vn
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-amber flex-shrink-0" />
                <a href="tel:+84901234567" className="text-sm hover:text-amber transition-colors duration-300">
                  +84 90 123 4567
                </a>
              </div>
              <p className="text-sm leading-relaxed pt-2">
                Dần Xây Mangrove Ecosystem<br />
                Cần Giờ District, Ho Chi Minh City<br />
                Vietnam
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Mangrover Slow Living Retreat. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Designed with care for the Cần Giờ Biosphere
          </p>
        </div>
      </div>
    </footer>
  );
}
