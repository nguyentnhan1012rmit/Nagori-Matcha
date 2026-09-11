# Mangrover Slow Living Retreat

A premium, single-page eco-luxury landing website for the **Mangrover Slow Living Retreat** — a seasonal, low-impact glamping experience set within the Dần Xây Mangrove Ecosystem of the Cần Giờ Biosphere Reserve, near Ho Chi Minh City.

---

## 🌿 Concept

This is not a traditional resort. It is a minimal, intentional retreat designed for restoration, reconnection, and reflection — built on three core pillars:

| Pillar | Focus |
|---|---|
| **Restore** | Mental & physical reset through yoga, meditation, and low stimulation |
| **Reconnect** | Nature immersion via mangrove kayaking and local ecological activities |
| **Regenerate** | Active conservation through tree planting and QR-tagged impact tracking |

---

## 🏗️ Tech Stack

| Tool | Version / Notes |
|---|---|
| **React** | v19 with Vite |
| **Tailwind CSS** | v4 via `@tailwindcss/vite` plugin |
| **Lucide React** | Icon library |
| **Google Fonts** | Playfair Display (headings) · Inter (body) |

---

## 🎨 Design System

### Color Palette
| Token | Hex | Use |
|---|---|---|
| `linen` | `#F9F8F6` | Page background |
| `cream` | `#FDF9F3` | Alternate section background |
| `forest` | `#2C4C3B` | Primary CTAs, accents |
| `charred` | `#3B332C` | Body text, headings |
| `amber` | `#D4A373` | Highlights, overlines |

### Typography
- **Headings**: Playfair Display (italic variants for emphasis)
- **Body**: Inter (300–600 weight range)

### Animations
- Scroll-triggered fade-up via custom `useScrollAnimation` IntersectionObserver hook
- Staggered child reveal via `useScrollAnimationGroup`
- CSS keyframes: `fade-in`, `fade-in-up`, `gentle-bounce`, `soft-pulse`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Fixed nav with scroll-spy active links
│   ├── Hero.jsx            # Full-screen hero with dual CTAs
│   ├── Philosophy.jsx      # Brand philosophy + image
│   ├── Pillars.jsx         # 3-pillar experience cards
│   ├── Experiences.jsx     # 4 experience image cards with hover reveal
│   ├── Sustainability.jsx  # 4 sustainability commitment cards
│   ├── Accommodation.jsx   # Glamping model overview + CTA
│   ├── Gallery.jsx         # 6-image grid with lightbox (arrows + keyboard)
│   ├── Location.jsx        # Location cards + Google Maps embed
│   ├── CallToAction.jsx    # Full-bleed booking CTA section
│   ├── Footer.jsx          # Links, contact, social, copyright
│   ├── RoomsPage.jsx       # Booking page (hash-routed to #rooms)
│   ├── BookingModal.jsx    # Frontend booking form modal with success screen
│   └── BackToTop.jsx       # Floating back-to-top button
├── hooks/
│   └── useScrollAnimation.js  # IntersectionObserver scroll hooks
├── assets/
│   └── hero.png            # Local hero asset (also at /public/images/)
├── App.jsx                 # Hash-based routing (/ vs #rooms)
├── main.jsx                # React entry point
└── index.css               # Tailwind v4 @theme tokens + global styles
public/
├── favicon.png             # Mangrove tree logo (used as favicon)
├── icons.svg               # SVG icon set
└── images/                 # All page images (AI-generated)
    ├── hero.png
    ├── philosophy.png
    ├── accommodation.png
    ├── accommodation1–4.png
    ├── experience-yoga.png
    ├── experience-kayak.png
    ├── experience-planting.png
    ├── experience-bbq.png
    ├── spa.png
    ├── gallery-aerial.png
    ├── gallery-boardwalk.png
    ├── gallery-fireflies.png
    └── gallery-sunset.png
```

---

## ✨ Features

- **Hash-based routing** — `/` (landing) and `#rooms` (booking page), no React Router needed
- **Scroll-spy navbar** — active link highlights with animated underline as sections enter view
- **Gallery lightbox** — prev/next arrows, keyboard navigation (← → Esc), dot indicators
- **Booking modal** — frontend form with room pre-selection, date pickers, success screen
- **Back-to-top button** — appears after 400px scroll with smooth animation
- **Lazy loading** — all non-hero images use `loading="lazy"`
- **Fully responsive** — mobile drawer nav, stacked layouts on small screens

---

## 🚀 Getting Started

### Prerequisites
Node.js ≥ 18 and npm installed.

### Install & Run
```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
npm run preview
```

---

## 📸 Imagery

All images are high-quality AI-generated assets designed to match the retreat's biophilic aesthetic. Replace with real photography before going live.

---

*Designed with care for the Cần Giờ Biosphere.*
