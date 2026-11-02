import type { APIRoute } from 'astro';
import { getAllPages, getUniqueCities, getUniqueServices, slugify } from '../lib/data';

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, '') ?? '';
  const pages = getAllPages();
  const cities = getUniqueCities();
  const services = getUniqueServices();

  const urls = [
    '',
    'pages/',
    'docs/',
    ...pages.map((p) => `pages/${p.slug}/`),
    ...cities.map((c) => `cities/${slugify(c)}/`),
    ...services.map((s) => `services/${slugify(s)}/`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${siteUrl}/${path}</loc>
    <changefreq>weekly</changefreq>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
