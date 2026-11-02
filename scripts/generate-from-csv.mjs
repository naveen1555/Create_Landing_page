/**
 * Optional helper: validate CSV rows and print the URL matrix
 * that Astro will generate at build time.
 *
 * Usage: npm run generate
 */
import { readFileSync } from 'node:fs';
import { parse } from 'csv-parse/sync';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath = join(__dirname, '../data/pages.csv');

const required = [
  'slug',
  'city',
  'state',
  'service',
  'headline',
  'subheadline',
  'meta_title',
  'meta_description',
];

const raw = readFileSync(csvPath, 'utf-8');
const rows = parse(raw, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
});

const errors = [];
const slugs = new Set();

for (const [index, row] of rows.entries()) {
  const line = index + 2;

  for (const key of required) {
    if (!row[key]) {
      errors.push(`Line ${line}: missing "${key}"`);
    }
  }

  if (row.slug) {
    if (slugs.has(row.slug)) {
      errors.push(`Line ${line}: duplicate slug "${row.slug}"`);
    }
    slugs.add(row.slug);
  }
}

if (errors.length) {
  console.error('CSV validation failed:\n');
  for (const error of errors) console.error(`  • ${error}`);
  process.exit(1);
}

console.log(`Validated ${rows.length} rows in data/pages.csv\n`);
console.log('Pages that will be generated:\n');

for (const row of rows) {
  console.log(`  /pages/${row.slug}/  →  ${row.headline}`);
}

const cities = [...new Set(rows.map((r) => r.city))];
const services = [...new Set(rows.map((r) => r.service))];

console.log(`\n${cities.length} cities · ${services.length} services · ${rows.length} landing pages`);
console.log('\nRun `npm run build` to compile, then deploy dist/ on Netlify.');
