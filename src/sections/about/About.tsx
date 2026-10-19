import { useEffect, useRef } from 'react';
import './About.css';
import { ProfilePhoto } from '@/components/ui/ProfilePhoto';
import { UI } from '@/content/ui';
import type { Profile } from '@/types';

interface AboutProps {
  profile: Profile;
  /**
   * Slot ref set by IntroStage — the photo anchor in the About layout.
   * When provided the actual photo is NOT rendered here (it's the shared element).
   */
  photoSlotRef?: React.RefObject<HTMLDivElement | null>;
  /** When true (mobile), reveal with IntersectionObserver instead of CSS var animation. */
  mobileReveal?: boolean;
}

/**
 * About section — heading, paragraphs, quick-facts dl, and portrait anchor.
 * DOM order: Hero then About (logical for screen readers).
 * Text is always in the DOM (never display:none); opacity/transform animated.
 */
export function About({ profile, photoSlotRef, mobileReveal = false }: AboutProps) {
  const { photo, photoAlt, aboutParagraphs } = profile;
  const sectionRef = useRef<HTMLElement>(null);

  // Mobile reveal via IntersectionObserver
  useEffect(() => {
    if (!mobileReveal) return;
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('about--revealed');
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [mobileReveal]);

  const { about } = UI;

  return (
    <section
      id="about"
      className={`about${mobileReveal ? ' about--mobile' : ''}`}
      aria-labelledby="about-heading"
      ref={sectionRef}
    >
      <div className="about__inner">
        {/* Text block */}
        <div className="about__text">
          <h2 id="about-heading" className="about__heading">{about.heading}</h2>

          <div className="about__paragraphs">
            {aboutParagraphs.map((para, i) => (
              <p key={i} className="about__para">{para}</p>
            ))}
          </div>

          {/* Quick facts */}
          <dl className="about__facts">
            <div className="about__fact">
              <dt className="about__fact-label">{about.facts.education}</dt>
              <dd className="about__fact-value">{about.facts.educationValue}</dd>
            </div>
            <div className="about__fact">
              <dt className="about__fact-label">{about.facts.focus}</dt>
              <dd className="about__fact-value">{about.facts.focusValue}</dd>
            </div>
            <div className="about__fact">
              <dt className="about__fact-label">{about.facts.openTo}</dt>
              <dd className="about__fact-value">{about.facts.openToValue}</dd>
            </div>
          </dl>
        </div>

        {/* Photo slot */}
        <div className="about__photo-slot" ref={photoSlotRef} aria-hidden={photoSlotRef ? 'true' : undefined}>
          {!photoSlotRef && (
            <ProfilePhoto
              src={photo}
              alt={photoAlt}
              width={220}
              className="about__photo-direct"
            />
          )}
        </div>
      </div>
    </section>
  );
}
