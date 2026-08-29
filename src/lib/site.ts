import siteData from '../../content/site.yaml';
import publicationData from '../../content/publications.yaml';

export interface SiteLink {
  label: string;
  url: string;
  me?: boolean;
}

export interface PubLink {
  label: string;
  url: string;
}

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  url: string;
  award?: string;
  links?: PubLink[];
}

export interface Site {
  name: string;
  nameVariants: string[];
  tagline: string;
  description: string;
  keywords: string[];
  url: string;
  locale: string;
  photo: string;
  photoAlt: string;
  links: SiteLink[];
  affiliation?: { name: string; url?: string };
  alumniOf?: { name: string; url?: string }[];
  jobTitle?: string;
  worksFor?: string;
  knowsAbout?: string[];
  verification?: { google?: string; bing?: string };
}

export const site = siteData as Site;
export const publications = publicationData as Publication[];

/** Every profile URL we assert ownership of — feeds JSON-LD `sameAs`. */
export const sameAs = site.links
  .filter((l) => l.me && !l.url.startsWith('mailto:') && !l.url.startsWith('/'))
  .map((l) => l.url);

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Bold the site owner's name wherever it appears in an author list.
 * Variants are matched longest-first so "Kevin X. Han" wins over "K. Han".
 * Returns escaped HTML, safe to drop in with set:html.
 */
export function highlightAuthor(authors: string): string {
  const variants = [site.name, ...(site.nameVariants ?? [])]
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegex);

  if (variants.length === 0) return escapeHtml(authors);

  // One capture group => String.split places the matched names at odd
  // indices and the surrounding text at even ones. No stateful .test().
  const parts = authors.split(new RegExp(`(${variants.join('|')})`, 'g'));

  return parts
    .map((part, i) =>
      i % 2 === 1 ? `<strong>${escapeHtml(part)}</strong>` : escapeHtml(part)
    )
    .join('');
}

/** Absolute URL for a site-relative path. Required for og:image and canonicals. */
export function absolute(path: string, base: string | URL = site.url): string {
  return new URL(path, base).toString();
}
