/**
 * Profile entity — the single source of truth for personal data.
 * esumeUrl is optional: the CV button renders only when it is set.
 */
export interface Profile {
  /** Display name shown in h1 and meta tags. */
  name: string;
  /** Short tagline shown below the name in the Hero. */
  headline: string;
  /** Path to portrait image (under public/). Must have matching photoAlt. */
  photo: string;
  /** Descriptive alt text for the portrait. Required (never empty). */
  photoAlt: string;
  /**
   * Path to the CV PDF (under public/cv/).
   * Set to undefined until the file exists; button is hidden when absent.
   * Example: '/cv/khaled-helaly-cv.pdf'
   */
  resumeUrl?: string;
  /**
   * About section copy as an ordered array of paragraph strings.
   * Verified facts only — no lorem ipsum or invented claims.
   */
  aboutParagraphs: string[];
}