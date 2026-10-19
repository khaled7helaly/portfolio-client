import { useEffect, useState } from 'react';

/**
 * Returns the id of the currently active section.
 *
 * In desktop mode with the IntroStage active, uses the --p CSS variable on
 * the stage element: Home when p < 0.5, About when p >= 0.5.
 *
 * In mobile / reduced-motion mode, uses IntersectionObserver.
 *
 * @param sectionIds  Ordered list of section ids to watch.
 * @param stageId     Id of the IntroStage element (or undefined for mobile path).
 */
export function useActiveSection(
  sectionIds: string[],
  stageId?: string,
): string {
  const [active, setActive] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    if (stageId) {
      // Desktop: read --p from the stage element
      const stage = document.getElementById(stageId);
      if (!stage) return;

      let lastActive = sectionIds[0] ?? '';
      function onScroll() {
        const p = parseFloat(stage!.style.getPropertyValue('--p') || '0');
        const next = p >= 0.5 ? (sectionIds[1] ?? lastActive) : sectionIds[0] ?? '';
        if (next !== lastActive) {
          lastActive = next;
          setActive(next);
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    } else {
      // Mobile: IntersectionObserver
      const observers: IntersectionObserver[] = [];
      const visible = new Set<string>();

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              visible.add(id);
            } else {
              visible.delete(id);
            }
            const first = sectionIds.find((s) => visible.has(s));
            if (first) setActive(first);
          },
          { threshold: 0.4 },
        );
        obs.observe(el);
        observers.push(obs);
      });

      return () => observers.forEach((o) => o.disconnect());
    }
  }, [sectionIds, stageId]);

  return active;
}