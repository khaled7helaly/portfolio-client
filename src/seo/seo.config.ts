/**
 * SEO configuration constants.
 * siteUrl comes from VITE_SITE_URL (public env var — safe to embed in the client bundle).
 * When empty, canonical/og:url are omitted rather than pointing to a wrong domain.
 */
export const seoConfig = {
  siteName:        'Khaled Mahmoud Helaly',
  titleTemplate:   '%s — Khaled Mahmoud Helaly',
  defaultTitle:    'Khaled Mahmoud Helaly — Software Engineering · MERN Stack',
  defaultDescription:
    'Senior CS student at Suez University, MERN Stack developer, interested in frontend development and UI/UX. Open to internships, training and frontend roles.',
  locale:          'en',
  /** Absolute site URL, set via VITE_SITE_URL in .env. Empty string = skip canonical/og:url. */
  siteUrl:         import.meta.env['VITE_SITE_URL'] ?? '',
  /** OG image path under public/. TODO(Khaled): set once og-image.png exists. */
  ogImagePath:     '', // e.g. '/og-image.png'
} as const;