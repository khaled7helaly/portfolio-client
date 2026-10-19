/**
 * UI copy — every user-facing string, label and aria-label.
 * Components must not hardcode strings (except content from data/).
 * Translate by replacing this file (or adding a locale wrapper later).
 */

export const UI = {
  // Site
  siteName: 'Khaled Mahmoud Helaly',
  skipToContent: 'Skip to main content',

  // Navigation
  nav: {
    ariaLabel: 'Primary navigation',
    monogramLabel: 'Khaled — go to home',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    menuAriaLabel: 'Mobile navigation menu',
  },

  // Hero
  hero: {
    scrollCta: 'Scroll',
    scrollAriaLabel: 'Scroll to About section',
    downloadCv: 'Download CV',
    downloadCvAriaLabel: 'Download CV (PDF)',
  },

  // About
  about: {
    heading: 'About me',
    facts: {
      education: 'Education',
      educationValue: 'Computer Science, Suez University (senior year)',
      focus: 'Focus',
      focusValue: 'MERN Stack · Frontend · UI/UX',
      openTo: 'Open to',
      openToValue: 'Internships · Training · Frontend roles · Freelance',
    },
  },

  // Photo fallback
  photo: {
    monogramLabel: 'KH',
    monogramAriaLabel: "Khaled Mahmoud Helaly's initials — portrait not yet available",
  },

  // Error / loading
  errorHeading: 'Something went wrong',
  errorBody: 'An unexpected error occurred. Please try refreshing the page.',
  errorRefresh: 'Refresh page',
  notFoundHeading: 'Page not found',
  notFoundBody: "The page you're looking for doesn't exist.",
  notFoundCta: 'Go home',

  // Accessibility
  externalLinkSuffix: '(opens in a new tab)',
} as const;

export type UIKeys = typeof UI;