import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Philosophy', href: '#philosophy', id: 'philosophy' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Sustainability', href: '#sustainability', id: 'sustainability' },
  { label: 'Stay', href: '#accommodation', id: 'accommodation' },
  { label: 'Gallery', href: '#gallery', id: 'gallery' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const sectionEls = navLinks
      .map(link => document.getElementById(link.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.25, rootMargin: '-80px 0px -50% 0px' }
    );

    sectionEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <>
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-linen/90 backdrop-blur-md shadow-[0_1px_3px_rgba(59,51,44,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center group">
              <span className={`font-heading text-lg lg:text-xl tracking-wide transition-colors duration-300 ${scrolled ? 'text-charred' : 'text-white'}`}>
                Mangrover
                <span className="font-light ml-1 opacity-70">Retreat</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-widest uppercase transition-colors duration-300 relative group ${
                    activeSection === link.id
                      ? 'text-amber'
                      : scrolled
                      ? 'text-charred-light hover:text-amber'
                      : 'text-white/80 hover:text-amber'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-amber transition-all duration-300 ${
                      activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              ))}
              <a
                href="#rooms"
                className="ml-4 px-5 py-2 text-sm tracking-widest uppercase border border-amber text-amber rounded-full hover:bg-amber hover:text-charred transition-all duration-300"
              >
                Book Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 transition-colors duration-300 ${
                scrolled ? 'text-charred' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-charred/60 backdrop-blur-sm transition-opacity duration-500 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-linen shadow-2xl transition-transform duration-500 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col pt-24 px-8 gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={`text-lg font-heading tracking-wide transition-colors duration-300 ${
                  activeSection === link.id
                    ? 'text-amber'
                    : 'text-charred hover:text-amber'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 pt-6 border-t border-charred/10">
              <a
                href="#rooms"
                onClick={handleLinkClick}
                className="inline-block px-6 py-3 text-sm tracking-widest uppercase bg-forest text-linen rounded-full hover:bg-forest-light transition-colors duration-300"
              >
                Book Your Stay
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
