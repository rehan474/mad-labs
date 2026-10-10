# Mad Labs — Creovibe adaptation

Preview: run `python3 -m http.server 8000 --bind 127.0.0.1` from this directory.

## Component structure
- `index.html`: semantic page sections, responsive navigation and supplied logo treatment.
- `components/data.js`: service and pricing content.
- `components/app.js`: service/pricing rendering, pricing controls and accessible mobile navigation.
- `components/motion.js`: template-derived staggered words, fade-up, image reveal and desktop smooth scrolling.
- `styles.css`: local template fonts, dark visual system, hero imagery, hover effects, responsive layouts and reduced-motion support.

The user-supplied Creovibe Home 1 source was inspected directly. Source files in Downloads are unchanged. Only required local fonts and animation libraries are copied. Original vendor headers retained. No new skills/plugins installed.

## Pricing
Career packages: SAR 49 / 99 / 149, from the supplied poster. Development: proposed starting prices, SAR 1,499 / 4,999 / 7,999; confirm scope, tax treatment and prices before publication.

## Photography
Illustrative Unsplash stock photography, not client work. Hero: https://images.unsplash.com/photo-1497366754035-f200968a6e72 . About: https://images.unsplash.com/photo-1498050108023-c5249f4df085 . The supplied template hero image was a placeholder.

## Verification
JavaScript syntax, local references, JSON-LD and sitemap XML checked. Browser checks passed for pricing selection, mobile menu, desktop navigation and horizontal overflow at 320, 390, 768 and 1280 pixels. No browser console errors were reported during these checks.

## Before production
Confirm domain, business identity, service scope, prices, privacy/legal content and contact details. Add dedicated service pages, crawlable service/pricing content, production canonical URLs, sitemap, robots rules, verified structured data, social previews and analytics. Production metadata uses https://mad-labs-beryl.vercel.app/. Update canonical, social metadata, structured data, robots.txt and sitemap.xml together if a custom domain is added.

## SEO and depth update
Service and pricing content is generated into `index.html` by `node scripts/build-content.mjs`; run it after changing `components/data.js`. Both pricing categories are readable without JavaScript; category controls progressively enhance the page. `robots.txt`, `sitemap.xml`, canonical/social metadata and Organization/WebSite JSON-LD are included. Submit the sitemap in Google Search Console after ownership verification.

`components/depth.js` adds cursor-following card tilt and light with requestAnimationFrame throttling. Touch pointers and reduced-motion users receive static cards. The decorative CSS orbital sculpture is hidden from assistive technology and requires no WebGL or new libraries.
