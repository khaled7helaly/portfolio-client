import { useEffect, useRef } from 'react';
import { clamp, easeInOutCubic } from '@/lib/easing';

/**
 * Writes --p (linear 0-1) and --e (eased) CSS custom properties directly
 * onto the stage element ref. Never updates React state per frame.
 *
 * @param stageRef  Ref to the tall IntroStage wrapper element.
 * @param active    When false (reduced motion / mobile) the hook is a no-op.
 */
export function useScrollProgress(
  stageRef: React.RefObject<HTMLElement | null>,
  active: boolean,
): void {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!active || !stage) return;

    stage.style.willChange = 'transform'; // hint for compositor

    function update() {
      const s = stageRef.current;
      if (!s) return;
      const rect = s.getBoundingClientRect();
      const runway = s.offsetHeight - window.innerHeight;
      if (runway <= 0) return;
      const scrolled = -rect.top;
      const p = clamp(scrolled / runway, 0, 1);
      const e = easeInOutCubic(p);
      s.style.setProperty('--p', String(p));
      s.style.setProperty('--e', String(e));
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    }

    // Check if stage is on screen to toggle will-change
    const observer = new IntersectionObserver(
      ([entry]) => {
        const s = stageRef.current;
        if (!s) return;
        s.style.willChange = entry.isIntersecting ? 'transform' : 'auto';
      },
      { threshold: 0 },
    );
    observer.observe(stage);

    update(); // initial paint
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (stage) stage.style.willChange = 'auto';
    };
  }, [stageRef, active]);
}