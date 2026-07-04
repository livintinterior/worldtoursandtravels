# Worlds Tours and Travels — Website

A premium, production-ready, mobile-first website for a cab, bus, and tour
travel business. Built with plain HTML5, Tailwind CSS (compiled, not the CDN
build), and vanilla JavaScript — no frameworks, no build-time surprises.

## Quick Start

```bash
npm install          # installs Tailwind CSS (dev dependency only)
npm run build:css    # compiles css/input.css -> css/tailwind.css (minified)
```

Then open `index.html` directly in a browser, or serve the folder with any
static file server, e.g.:

```bash
npx http-server -p 8080
```

While editing styles, keep Tailwind rebuilding automatically:

```bash
npm run watch:css
```

## The One File You Actually Need to Edit

**`js/config.js`** is the single source of truth for every piece of business
data on the site — business name, phone number, WhatsApp number, email,
address, Google Maps embed URL, business hours, social links, and hero
stats. Every page reads from `window.SITE_CONFIG` at runtime via
`data-cfg`, `data-cfg-href`, and `data-cfg-src` attributes, so changing a
value in this one file updates it everywhere (nav, footer, contact section,
floating buttons, WhatsApp deep links, structured data, etc.).

Before going live, replace these placeholders in `js/config.js`:

- `phoneDisplay` / `phoneRaw` / `whatsappNumber` — currently a placeholder
  Indian number.
- `email`, `address`, `googleMapsEmbed` — get your embed URL from Google
  Maps → Share → Embed a map.
- `social` — links to your real profiles (leave a value empty to hide that
  icon).
- `seo.googleSiteVerification` — your Google Search Console verification code.

You'll also want to update the same domain/contact details baked into each
page's `<head>` (canonical URL, Open Graph tags, JSON-LD structured data) —
these are static per-page for SEO reasons and aren't pulled from config.js.
Search each HTML file for `worldstoursandtravels.com` and `+91-98765-43210`
to find them.

## Project Structure

```
/
├── index.html          # Home — hero, services, fleet, tours, why-us,
│                          booking form, testimonials, FAQ, CTA, contact
├── about.html
├── services.html        # Cab / Bus / Flight & Visa services (deep link anchors)
├── fleet.html            # Cab fleet + bus fleet + gallery
├── tours.html            # 10 destination packages
├── contact.html
├── privacy-policy.html
├── terms.html
├── css/
│   ├── input.css        # Tailwind source (edit this)
│   └── tailwind.css     # compiled output (generated, don't edit)
├── js/
│   ├── config.js        # ← business data lives here
│   └── main.js           # nav, animations, sliders, forms, etc.
├── images/               # logo, hero illustration, OG image — all generated/hand-drawn, no photos
├── favicon/              # generated favicon/PWA icon set
├── tools/
│   ├── generate-icons.js    # regenerates favicon/*.png from scratch (no deps)
│   └── generate-og-image.js # regenerates images/og-cover.png (no deps)
├── robots.txt
├── sitemap.xml
├── manifest.json
└── browserconfig.xml
```

## Images

`images/photos/` contains real, accurate photography sourced from
[Wikimedia Commons](https://commons.wikimedia.org) — not generic stock
placeholders:

- **Tour destinations** (9 of 10): the actual named landmark — Tirumala
  Venkateswara Temple, Charminar, Vidhana Soudha, Marina Beach, Mysore
  Palace, etc. ("Custom Tour Packages" keeps an icon since it isn't a
  real place.)
- **Fleet** (13 of 13): a real photo of the actual vehicle model per card
  — a Maruti Suzuki Swift for "Hatchback," a Toyota Innova Crysta for
  "Innova Crysta," a KSRTC Garuda Maharaja Scania for "Luxury Coach," etc.
- **Hero & every page banner**: a real ghat-road photo with a dark
  gradient overlay for text contrast.
- **About section**: real photos (an airport taxi rank, a luxury coach)
  rather than an illustration.
- **Testimonial "avatars"** are deliberately colored initials badges, not
  photos — these are example/placeholder reviews, and attaching a real
  stranger's photo to a fabricated name and quote would misrepresent them
  as an endorsement they never gave. Swap in real customer photos once you
  have real customers who've consented.

**See `images/photos/CREDITS.md`** for the source URL of every photo and a
reminder to confirm each one's specific license/attribution requirement
before commercial launch — most Wikimedia Commons photos are CC BY-SA and
need visible credit.

To swap any photo, just replace the file in `images/photos/` (same
filename) or edit the `src` in the relevant `<img>` tag.

The logo (`images/logo.svg`, `images/logo-light.svg`) and the decorative
route illustration (`images/hero-illustration.svg`, currently unused but
kept for reference) are original vector art and can be edited directly or
swapped for your real logo.

## Favicons & OG Image

`favicon/*.png`, `favicon.ico`, and `images/og-cover.png` are all generated
programmatically — no image libraries, no stock assets:

- `npm run icons` regenerates the favicon set from `tools/generate-icons.js`
  (a navy-and-green "W" monogram matching the brand colors).
- `npm run og-image` regenerates the Open Graph/Twitter share image from
  `tools/generate-og-image.js` (a branded gradient graphic).

Both are pure Node scripts (using only `zlib` to hand-encode PNGs), so they
run with no dependencies. For a polished final favicon set based on your
real logo, consider running it through
[realfavicongenerator.net](https://realfavicongenerator.net) instead.

## How Forms Work

There's no backend. The booking enquiry form and both contact forms
validate client-side, then build a formatted message and open it as a
pre-filled WhatsApp chat (`wa.me`) so the customer just taps "send" to
reach you instantly — no server, database, or email service required.

## SEO Checklist Before Launch

- [ ] Update canonical URLs and Open Graph/Twitter image URLs in every
      page's `<head>` to your real domain.
- [ ] Replace `PASTE-YOUR-GOOGLE-SITE-VERIFICATION-CODE-HERE` with your
      Google Search Console verification meta tag value.
- [ ] Update `sitemap.xml` and `robots.txt` if your domain differs from
      `worldstoursandtravels.com`.
- [ ] Submit the sitemap in Google Search Console.
- [ ] Regenerate `images/og-cover.png` (`npm run og-image`) if you change
      the brand colors, or replace it with a real 1200×630 share image.

## Customizing Colors

The brand palette is **blue (`primary`) and green (`secondary`)**, defined
once in `tailwind.config.js` and used everywhere via Tailwind utility
classes (`bg-primary`, `text-secondary`, etc.) — never hardcoded hex values
in the markup. To re-theme the site:

1. Edit the `primary`/`secondary` color scales in `tailwind.config.js`
   (and the `hero-base`/`cta-gradient` gradients just below them, plus
   `boxShadow.glow`, which reference the old hex values directly since CSS
   gradients can't consume Tailwind color tokens).
2. Run `npm run build:css`.
3. Run `npm run icons && npm run og-image` to regenerate the favicon set
   and OG image with the new colors.
4. Update the hardcoded hex values in `images/logo.svg`,
   `images/logo-light.svg`, `favicon/favicon.svg`, and the `theme-color`
   meta tag / `manifest.json` / `browserconfig.xml` to match (SVG files and
   platform manifests can't reference Tailwind tokens either).
