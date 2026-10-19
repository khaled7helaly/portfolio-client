/**
 * Media query strings shared between JS and CSS.
 * CSS repeats these literals (keep in sync — see styles/tokens.css comment).
 *
 * Breakpoints: 640 / 900 / 1200 px
 * The desktop rail + transition activates at min-width:900px AND min-height:600px.
 */
export const BREAKPOINTS = {
  sm:   640,
  md:   900,
  lg:   1200,
} as const;

/** Returns a matchMedia query for min-width in px. */
export function minWidth(px: number): string {
  return `(min-width: ${px}px)`;
}

/** The desktop rail is shown when both conditions are met. */
export const DESKTOP_NAV_QUERY = `(min-width: ${BREAKPOINTS.md}px) and (min-height: 600px)`;

/** The scroll-linked intro stage is active on this same query plus no reduced motion. */
export const INTRO_STAGE_QUERY = DESKTOP_NAV_QUERY;