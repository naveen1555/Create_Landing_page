# Pageforge — Programmatic SEO & Landing Page Generator

Turn a CSV of cities, services, or product variants into hundreds of SEO-optimized landing pages. Built with **Astro**, deployed statically on **Netlify** for **$0/month**.

## The problem

Localized or long-tail SEO needs pages like “Best Programmatic Agency in [City]”. Writing hundreds by hand doesn’t scale.

## The automation

1. **Structured data** — edit `data/pages.csv`
2. **Template layer** — Astro injects location copy, schema markup, and internal links
3. **Static compile** — one HTML page per CSV row
4. **Netlify deploy** — git push → global CDN

## Quickstart

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

Validate the CSV matrix:

```bash
npm run generate
```

Production build:

```bash
npm run build
```

## Deploy on Netlify

1. Push this repo to GitHub
2. Netlify → **Add new site** → import the repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

`netlify.toml` is preconfigured. Every commit rebuilds and republishes automatically.

### CLI (optional)

```bash
npx netlify login
npx netlify init
npx netlify deploy --prod
```

## Project structure

```
data/pages.csv              # source of truth for all landing pages
src/lib/data.ts             # CSV loader + related-page helpers
src/lib/schema.ts           # JSON-LD builders (LocalBusiness, FAQ, Breadcrumb)
src/pages/pages/[slug].astro
src/pages/cities/[city].astro
src/pages/services/[service].astro
netlify.toml                # zero-config Netlify build
```

## Adding pages

Add a row to `data/pages.csv` with a unique `slug`, then rebuild. New routes appear under `/pages/<slug>/`, city hubs under `/cities/<city>/`, and service hubs under `/services/<service>/`.

## Cost

**$0/month** on Netlify’s free static hosting tier (global CDN, HTTPS, continuous deploys).
