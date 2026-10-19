import type { Profile } from '@/types';
import { seoConfig } from './seo.config';

/**
 * Builds a Person JSON-LD object from verified profile data.
 *
 * Fields intentionally omitted:
 *   jobTitle, worksFor, awards — not verified facts.
 *
 * sameAs and image are included only when URLs are provided.
 */
export function buildPersonJsonLd(profile: Profile): Record<string, unknown> {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type':    'Person',
    name:        profile.name,
    description: seoConfig.defaultDescription,
    knowsAbout:  ['MERN Stack', 'Frontend development', 'UI/UX'],
  };

  if (seoConfig.siteUrl) {
    jsonLd['url'] = seoConfig.siteUrl;
  }

  // TODO(Khaled): add sameAs (GitHub, LinkedIn) once social URLs are in the data layer.
  // TODO(Khaled): add image once og-image.png exists.

  return jsonLd;
}