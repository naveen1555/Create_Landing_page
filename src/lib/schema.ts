import type { LandingPage } from './data';

export function buildLocalBusinessSchema(page: LandingPage, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${page.service} — ${page.city}`,
    description: page.meta_description,
    url: `${siteUrl}/pages/${page.slug}/`,
    telephone: page.phone,
    email: page.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: page.city,
      addressRegion: page.state,
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: page.city,
    },
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: page.service,
        areaServed: page.city,
      },
    },
  };
}

export function buildBreadcrumbSchema(page: LandingPage, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Pages',
        item: `${siteUrl}/pages/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.headline,
        item: `${siteUrl}/pages/${page.slug}/`,
      },
    ],
  };
}

export function buildFaqSchema(page: LandingPage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What does a ${page.service.toLowerCase()} in ${page.city} typically deliver?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `A ${page.service.toLowerCase()} in ${page.city} helps local brands capture search demand, convert traffic, and build durable organic visibility. Core deliverables usually include strategy, execution, and reporting tailored to ${page.city}, ${page.state}.`,
        },
      },
      {
        '@type': 'Question',
        name: `How fast can I launch ${page.service.toLowerCase()} pages for ${page.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `With programmatic templates, you can generate SEO-ready ${page.city} landing pages from a CSV in minutes, then deploy statically to Netlify for free global CDN delivery.`,
        },
      },
      {
        '@type': 'Question',
        name: `Why use programmatic SEO for ${page.city} ${page.service.toLowerCase()} pages?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Long-tail and localized queries scale poorly when written by hand. Programmatic pages inject ${page.city}-specific copy, schema markup, and internal links so every variant stays consistent and crawlable.`,
        },
      },
    ],
  };
}
