import { useEffect, useRef } from 'react';
import './IntroStage.css';
import { Hero } from '@/sections/hero/Hero';
import { About } from '@/sections/about/About';
import { ProfilePhoto } from '@/components/ui/ProfilePhoto';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { DESKTOP_NAV_QUERY } from '@/lib/media';
import type { Profile } from '@/types';

interface IntroStageProps {
  profile: Profile;
}

/**
 * IntroStage — scroll-linked photo transition between Hero and About.
 *
 * Desktop (min-width:900px AND min-height:600px AND no reduced-motion):
 *   A tall wrapper with a sticky 100svh frame. Hero and About share the frame.
 *   One ProfilePhoto travels from the Hero slot to the About slot as the user scrolls.
 *   CSS custom properties --p (linear) and --e (eased) drive the animation.
 *
 * Mobile / reduced-motion / short screens:
 *   Normal document flow: Hero then About. Each shows its own photo.
 *   About reveals with IntersectionObserver once.
 *
 * The #about anchor scrolls to the bottom of the runway (p=1) via lib/scroll.ts.
 */
export function IntroStage({ profile }: IntroStageProps) {
  const isDesktop    = useMediaQuery(DESKTOP_NAV_QUERY);
  const reducedMotion = useReducedMotion();
  const isStageActive = isDesktop && !reducedMotion;

  const stageRef      = useRef<HTMLDivElement>(null);
  const heroSlotRef   = useRef<HTMLDivElement>(null);
  const aboutSlotRef  = useRef<HTMLDivElement>(null);
  const photoRef      = useRef<HTMLDivElement>(null);

  // Write --p and --e CSS vars on the stage element (never React state per frame)
  useScrollProgress(stageRef, isStageActive);

  // Measure slots on mount + resize, set --photo-dx/dy/scale on the stage
  useEffect(() => {
    if (!isStageActive) return;

    function measure() {
      const stage  = stageRef.current;
      const hero   = heroSlotRef.current;
      const about  = aboutSlotRef.current;
      const photo  = photoRef.current;
      if (!stage || !hero || !about || !photo) return;

      const sr = stage.getBoundingClientRect();
      const hr = hero.getBoundingClientRect();
      const ar = about.getBoundingClientRect();

      // dx/dy: distance the photo must travel (from hero slot to about slot top-left)
      const dx = ar.left - hr.left;
      const dy = ar.top  - hr.top;
      // Scale: about photo is smaller
      const scale = ar.width / hr.width;

      stage.style.setProperty('--photo-dx',    String(dx));
      stage.style.setProperty('--photo-dy',    String(dy));
      stage.style.setProperty('--photo-scale', String(scale));

      // Position the shared photo element at the hero slot
      const offsetLeft = hr.left - sr.left;
      const offsetTop  = hr.top  - sr.top;
      photo.style.insetInlineStart = `${offsetLeft}px`;
      photo.style.insetBlockStart  = `${offsetTop}px`;
      photo.style.inlineSize       = `${hr.width}px`;
      photo.style.blockSize        = `${hr.height}px`;
    }

    document.fonts.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [isStageActive]);

  // Toggle inert on hero actions when p crosses 0.6
  useEffect(() => {
    if (!isStageActive) return;
    const stage = stageRef.current;
    if (!stage) return;

    let lastInert = false;
    function onScroll() {
      const p = parseFloat(stage!.style.getPropertyValue('--p') || '0');
      const shouldBeInert = p > 0.6;
      if (shouldBeInert !== lastInert) {
        lastInert = shouldBeInert;
        const actionsEl = stage!.querySelector<HTMLElement>('.hero__actions');
        if (actionsEl) {
          if (shouldBeInert) actionsEl.setAttribute('inert', '');
          else actionsEl.removeAttribute('inert');
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isStageActive]);

  // ── MOBILE / REDUCED-MOTION PATH ──────────────────────────────────────
  if (!isStageActive) {
    return (
      <>
        <Hero profile={profile} isLcp />
        <About profile={profile} mobileReveal />
      </>
    );
  }

  // ── DESKTOP STAGE PATH ────────────────────────────────────────────────
  return (
    <div
      id="intro-stage"
      className="intro-stage"
      ref={stageRef}
      style={{
        '--p': '0',
        '--e': '0',
        '--photo-dx':    '0',
        '--photo-dy':    '0',
        '--photo-scale': '1',
      } as React.CSSProperties}
    >
      {/* Sticky 100svh frame */}
      <div className="intro-stage__frame">
        {/* Hero layer */}
        <div className="intro-stage__layer intro-stage__layer--hero">
          <Hero profile={profile} isLcp photoSlotRef={heroSlotRef} />
        </div>

        {/* About layer */}
        <div className="intro-stage__layer intro-stage__layer--about">
          <About profile={profile} photoSlotRef={aboutSlotRef} />
        </div>

        {/* Shared travelling photo (sits above both layers) */}
        <div
          ref={photoRef}
          className="intro-stage__photo"
          aria-hidden="true"
        >
          <ProfilePhoto
            src={profile.photo}
            alt={profile.photoAlt}
            width={340}
            priority
          />
        </div>
      </div>
    </div>
  );
}
