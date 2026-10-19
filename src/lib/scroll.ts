/**
 * Scroll utilities.
 * All scrolling goes through here so reduced-motion is handled in one place
 * and the nav links, "Scroll" CTA and ScrollManager all behave consistently.
 */

/** Check for reduced-motion preference. */
function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Scrolls to the position corresponding to the fully-settled state of a section.
 *
 * For sections inside IntroStage (hero, about), the target position is calculated
 * from the runway rather than the element's bounding box, so the URL hash and
 * the scroll position always agree with the visual state.
 *
 * For other sections, falls back to element.scrollIntoView().
 *
 * @param id  The section id (without #).
 */
export function scrollToSection(id: string): void {
  // IntroStage managed sections: scroll to runway end so p=1 when at 'about'.
  const stageEl = document.getElementById('intro-stage');
  if (stageEl && id === 'about') {
    const stageRect = stageEl.getBoundingClientRect();
    const scrollTarget = window.scrollY + stageRect.top + stageEl.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: Math.max(0, scrollTarget),
      behavior: prefersReducedMotion() ? 'instant' : 'smooth',
    });
    return;
  }

  if (stageEl && id === 'home') {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
    return;
  }

  // Standard sections outside the stage.
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'instant' : 'smooth', block: 'start' });
}