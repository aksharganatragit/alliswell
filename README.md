# All is well — herbal wellness storefront

Family-facing herbal wellness storefront for **All is well** (Rajkot). Angular 19,
mobile-first, WhatsApp-only ordering for now. Front-end only — a backend / payment
gateway can be added later without a rewrite (see `orderService`).

## Run locally

```bash
npm install
npm start          # ng serve → http://localhost:4200
```

## Build

```bash
npm run build      # output: dist/all-is-well/browser
```

## Deploy to Netlify

The repo is Netlify-ready — `netlify.toml` sets the build command, publish dir
(`dist/all-is-well/browser`) and the SPA redirect. Either:

- Connect the repo in the Netlify UI (it reads `netlify.toml` automatically), or
- `netlify deploy --prod` with the Netlify CLI.

## Before going live — things to fill in

- **WhatsApp number:** `src/app/config/business.ts` → `whatsappPhone` (currently the
  placeholder `91XXXXXXXXXX`; digits only, no `+`). Every order/contact CTA routes
  through this.
- **Product images:** each product in `src/app/data/products.ts` has an `images: []`
  array of icon-placeholder keys. Swap them for real image URLs — the grid thumbnail
  and the detail-page swipe carousel then show photos with no code changes.
- **Copy:** product descriptions/dosage/ingredients/warnings, About sourcing, and the
  Terms/Privacy bullets are placeholders ready to be replaced.

## Structure

```
src/app
├── config/business.ts        Brand + contact details (edit WhatsApp # here)
├── data/products.ts          Catalog (4 products, scales to ~15)
├── models/product.model.ts
├── services/
│   ├── cart.service.ts       In-memory cart (sessionStorage), drives nav badge
│   ├── order.service.ts      Order dispatch abstraction — WhatsApp now, swappable
│   └── ui.service.ts         Cart-drawer open state
├── components/               nav, footer, whatsapp-fab, leaf-background, icon,
│                             brand-logo, product-card, cart-drawer, carousel
└── pages/                    home, shop, product-detail, how-it-works,
                              about, faq, contact
```

## Notes

- **Theme:** "Herbal Apothecary" palette + Fraunces/Inter, all tokens in
  `src/styles.scss`. Flat design; soft shadow only on the floating button + hero ticket.
- **Botanical background:** enriched leaf/flower/herb watermark at ~7% opacity behind
  every page (`leaf-background.component.ts`).
- **Ordering:** all CTAs → `OrderService` → `https://wa.me/…` pre-filled message.
  Payment gateway is a documented `TODO(payments)` in `order.service.ts`.
