import { readFileSync } from 'node:fs';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath = join(__dirname, '../../data/pages.csv');

export interface LandingPage {
  slug: string;
  city: string;
  state: string;
  service: string;
  headline: string;
  subheadline: string;
  primary_benefit: string;
  secondary_benefit: string;
  tertiary_benefit: string;
  cta_label: string;
  cta_url: string;
  meta_title: string;
  meta_description: string;
  phone: string;
  email: string;
}

let cache: LandingPage[] | null = null;

export function getAllPages(): LandingPage[] {
  if (cache) return cache;

  const raw = readFileSync(csvPath, 'utf-8');
  const rows = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as LandingPage[];

  cache = rows;
  return rows;
}

export function getPageBySlug(slug: string): LandingPage | undefined {
  return getAllPages().find((page) => page.slug === slug);
}

export function getPagesByCity(city: string): LandingPage[] {
  return getAllPages().filter((page) => page.city === city);
}

export function getPagesByService(service: string): LandingPage[] {
  return getAllPages().filter((page) => page.service === service);
}

export function getRelatedPages(page: LandingPage, limit = 6): LandingPage[] {
  const sameCity = getPagesByCity(page.city).filter((p) => p.slug !== page.slug);
  const sameService = getPagesByService(page.service).filter(
    (p) => p.slug !== page.slug && p.city !== page.city,
  );

  const related = [...sameCity, ...sameService];
  const seen = new Set<string>();
  const unique: LandingPage[] = [];

  for (const item of related) {
    if (seen.has(item.slug)) continue;
    seen.add(item.slug);
    unique.push(item);
    if (unique.length >= limit) break;
  }

  return unique;
}

export function getUniqueCities(): string[] {
  return [...new Set(getAllPages().map((p) => p.city))].sort();
}

export function getUniqueServices(): string[] {
  return [...new Set(getAllPages().map((p) => p.service))].sort();
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
