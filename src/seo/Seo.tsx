import { useEffect } from 'react';
import { seoConfig } from './seo.config';

interface SeoProps {
  /** Page-specific title. Rendered as: '<title> — Khaled Mahmoud Helaly'. */
  title?:       string;
  /** Page-specific meta description (<= 160 chars). */
  description?: string;
  /** Page path for canonical URL (e.g. '/projects'). */
  path?:        string;
  /** OG image absolute URL (overrides default). */
  image?:       string;
  /** Set true for pages that must not be indexed. */
  noindex?:     boolean;
  /** JSON-LD object to inject as application/ld+json. */
  jsonLd?:      Record<string, unknown>;
}

const DATA_ATTR = 'data-seo';

function setMeta(name: string, content: string, property = false): void {
  const attr  = property ? 'property' : 'name';
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    el.setAttribute(DATA_ATTR, '');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeSeoMeta(): void {
  document.querySelectorAll(`[${DATA_ATTR}]`).forEach((el) => el.remove());
}

/**
 * Manages per-route head metadata.
 * Renders nothing to the DOM; uses imperative document manipulation for broad compat.
 * Cleans up dynamic tags on unmount.
 */
export function Seo({ title, description, path, image, noindex, jsonLd }: SeoProps) {
  useEffect(() => {
    const fullTitle = title
      ? seoConfig.titleTemplate.replace('%s', title)
      : seoConfig.defaultTitle;
    const desc  = description ?? seoConfig.defaultDescription;
    const url   = seoConfig.siteUrl && path ? seoConfig.siteUrl + path : '';
    const ogImg = image ?? (seoConfig.siteUrl && seoConfig.ogImagePath
      ? seoConfig.siteUrl + seoConfig.ogImagePath
      : '');

    document.title = fullTitle;

    setMeta('description', desc);
    setMeta('robots', noindex ? 'noindex,nofollow' : 'index,follow');

    // OG
    setMeta('og:title',       fullTitle,             true);
    setMeta('og:description', desc,                  true);
    setMeta('og:site_name',   seoConfig.siteName,    true);
    setMeta('og:type',        'website',             true);
    if (url)   setMeta('og:url',   url,   true);
    if (ogImg) setMeta('og:image', ogImg, true);

    // Twitter
    setMeta('twitter:card',        'summary_large_image');
    setMeta('twitter:title',       fullTitle);
    setMeta('twitter:description', desc);
    if (ogImg) setMeta('twitter:image', ogImg);

    // Canonical
    let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (url) {
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        canonicalEl.setAttribute(DATA_ATTR, '');
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute('href', url);
    } else if (canonicalEl?.hasAttribute(DATA_ATTR)) {
      canonicalEl.remove();
    }

    // JSON-LD
    let scriptEl = document.querySelector<HTMLScriptElement>(`script[type="application/ld+json"][${DATA_ATTR}]`);
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.type = 'application/ld+json';
        scriptEl.setAttribute(DATA_ATTR, '');
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return removeSeoMeta;
  }, [title, description, path, image, noindex, jsonLd]);

  return null;
}