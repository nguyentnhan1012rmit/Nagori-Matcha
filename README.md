# Nagori Matcha

A premium, single-page landing website for **Nagori**, a Japanese Matcha Lounge located in Phú Mỹ Hưng, Ho Chi Minh City. 

The website offers a modern, elegant web experience with scroll-triggered animations, dual-language support (VI/EN), and a fully functional drink ordering cart system.

---

## 🌿 Concept

Nagori is designed to provide a quiet pause in the middle of the city. The digital experience reflects this through a clean, biophilic aesthetic, utilizing glassmorphism, fluid animations, and premium AI-generated imagery.

The core sections of the site include:
- **Hero:** Impactful introduction with dual CTAs.
- **Story:** Brand philosophy focusing on the concept of "Nagori" (a lingering trace).
- **Menu:** Interactive menu tabs showcasing Signature drinks, Matcha, Cold Brew & Tea, and Seasonal offerings.
- **Workshop:** Information and booking details for matcha workshops.
- **Space:** A showcase of the two distinct floors (open matcha bar & traditional tatami room).
- **Reservations:** A beautiful glass-frosted form for booking tables or workshop slots.
- **Order Page:** A dedicated, hash-routed page (`#order`) featuring a complete drink menu, customization options (size, milk), and a sliding shopping cart drawer.

---

## 🏗️ Tech Stack

| Tool | Version / Notes |
|---|---|
| **React** | v19 with Vite |
| **CSS** | Custom vanilla CSS with Tailwind v4 `@tailwindcss/vite` base |
| **Lucide React** | Icon library for UI elements |
| **Google Fonts** | Bodoni Moda (headings) · Manrope (body) |

---

## 🎨 Design System

### Color Palette
- `paper` / `white`: Warm, cream-based backgrounds
- `ink` / `deep`: Dark forest greens and charcoal for text and heavy elements
- `matcha`: Signature vibrant matcha green
- `amber`: Golden accent color for hover states, buttons, and badges
- `soft`: Muted greens/grays for secondary text

### Animations
- **IntersectionObserver:** Custom `useScrollReveal()` hook in `App.jsx` triggers CSS animations when elements enter the viewport.
- **CSS Keyframes:** `fadeInUp`, `fadeInLeft`, `fadeInRight`, `scaleIn`, `sealPulse`, `floatGentle` for smooth, micro-interactions.

---

## 📁 Project Structure

```
src/
├── components/
│   └── OrderPage.jsx       # Dedicated drink ordering page with cart state
├── App.jsx                 # Main landing page component & hash routing
├── main.jsx                # React entry point
└── index.css               # Comprehensive custom styles & Tailwind setup
public/
├── favicon.png             # Site favicon
└── nagori/                 # Premium AI-generated imagery
    ├── exterior-wide.jpg
    ├── matcha-bar.jpg
    ├── zen-display.jpg
    ├── exterior-detail.jpg
    ├── lounge.jpg
    └── tatami-room.jpg
```

---

## ✨ Features

- **Hash-based routing** — Seamlessly switches between the landing page (`/`) and the order system (`#order`) without React Router.
- **Bilingual Support** — Built-in toggle to switch between Vietnamese (VI) and English (EN) dynamically.
- **Scroll Animations** — Directional reveals (left, right, up, scale) that trigger natively as the user scrolls down the landing page.
- **Shopping Cart System** — Full frontend cart logic in `OrderPage.jsx` allowing users to customize drinks (size, milk), manage quantities, and "checkout".
- **Responsive Design** — Custom CSS media queries ensure the site looks stunning on desktop, tablet, and mobile.

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
