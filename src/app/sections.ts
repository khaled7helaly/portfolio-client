/**
 * Section registry — single source of truth for nav items and page composition.
 *
 * enabled: false  = placeholder; the section code exists but is not rendered.
 * inNav: false    = hidden from nav (e.g. a full page, not a home section).
 *
 * order controls rendering order in HomePage and nav link order.
 */
export interface SectionConfig {
  id:           string;
  /** i18n key into content/ui.ts (or literal until i18n is added). */
  label:        string;
  order:        number;
  inNav:        boolean;
  enabled:      boolean;
  /** Hash target for scrolling. Defaults to id. */
  scrollTarget: string;
}

export const sections: SectionConfig[] = [
  {
    id:           'home',
    label:        'Home',
    order:        0,
    inNav:        true,
    enabled:      true,
    scrollTarget: 'home',
  },
  {
    id:           'about',
    label:        'About',
    order:        1,
    inNav:        true,
    enabled:      true,
    scrollTarget: 'about',
  },
  // --- Planned sections (enabled: false — do not render yet) ---
  {
    id:           'skills',
    label:        'Skills',
    order:        2,
    inNav:        true,
    enabled:      false,
    scrollTarget: 'skills',
  },
  {
    id:           'projects',
    label:        'Projects',
    order:        3,
    inNav:        true,
    enabled:      false,
    scrollTarget: 'projects',
  },
  {
    id:           'education',
    label:        'Education',
    order:        4,
    inNav:        false,
    enabled:      false,
    scrollTarget: 'education',
  },
  {
    id:           'experience',
    label:        'Experience',
    order:        5,
    inNav:        true,
    enabled:      false,
    scrollTarget: 'experience',
  },
  {
    id:           'services',
    label:        'Services',
    order:        6,
    inNav:        false,
    enabled:      false,
    scrollTarget: 'services',
  },
  {
    id:           'testimonials',
    label:        'Testimonials',
    order:        7,
    inNav:        false,
    enabled:      false,
    scrollTarget: 'testimonials',
  },
  {
    id:           'contact',
    label:        'Contact',
    order:        8,
    inNav:        true,
    enabled:      false,
    scrollTarget: 'contact',
  },
];

/** Sections visible in the nav. */
export const navSections = sections
  .filter((s) => s.enabled && s.inNav)
  .sort((a, b) => a.order - b.order);

/** Sections rendered on the home page. */
export const homeSections = sections
  .filter((s) => s.enabled)
  .sort((a, b) => a.order - b.order);