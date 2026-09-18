# Jambotek Oy — Next.js website

Cinematic multi-page marketing site for **Jambotek Oy**, an independent auto workshop in Jyväskylä, Finland.

Built with:
- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS 3**
- **Framer Motion** — scroll-based transforms, gallery reveals, interactive service tabs
- **next/image + next/font** — optimized images and Google fonts (Anton, Cormorant italic, Inter)

## Run it

```bash
cd jambotek-next
npm install
npm run dev
```

Open http://localhost:3000

Production build:
```bash
npm run build && npm start
```

## Structure

```
app/
  layout.tsx          # Root shell — fonts, <Nav>, <Footer>
  page.tsx            # Home
  services/page.tsx
  about/page.tsx
  contact/page.tsx    # Client component with form state
components/
  Nav.tsx             # Glass nav with mobile sheet
  Footer.tsx
  Logo.tsx            # Real brand icon (public/images/logo-icon.png) — matches shirt / signage
  Hero.tsx            # Split cinematic hero, CSS keyframes intro, Framer parallax
  BrandMarquee.tsx    # Infinite CSS marquee
  ServiceShowcase.tsx # Interactive service tabs → animated image swap
  WorkshopGallery.tsx # Bento grid of bay tiles, reveal on scroll
  StatsGrid.tsx       # CountUp stats
  Testimonials.tsx    # Paused-on-hover review marquee
  LocationCard.tsx    # Details + embedded Google Map
  BigCTA.tsx          # Fullscreen finale
public/
  favicon.png
  images/             # See public/images/README.md — drop your real photos here
```

## Swap in the real photos

The site references local images by exact filenames — replace the placeholder JPGs in `public/images/` and everything updates automatically. See [`public/images/README.md`](./public/images/README.md) for the filename map (`hero-car.jpg`, `owner.jpg`, `bay-01.jpg`, etc.).

## Business info wired in

- **Address**: Jokivarrentie 12 H 1, 40520 Jyväskylä
- **Phone**: 045 182 4414 → `tel:+358451824414`
- **Email**: joekiuna@yahoo.com
- **Founder**: Joseph Kiuna Kamau (EureCar-certified master technician)
- **Tagline**: *Aina valmiina auttamaan* — used throughout
- **Google Map**: embedded on Contact & LocationCard

## Design system

| Token | Value |
|---|---|
| Background | `#0a0a0a` |
| Brand red | `#E11D2E` (matches shirt/logo) |
| Brand glow | `#FF3547` |
| Accent gold | `#EAB308` |
| Display font | Anton (impact headings) |
| Serif italic | Cormorant italic (accent phrases: *hood.*, *engineered*, *alignment*) |
| Body font | Inter |

Motion respects `prefers-reduced-motion`. Nav has a glass blur state after scrolling 40px. Custom scrollbar. Grid mask on hero. Ghost background wordmark.
