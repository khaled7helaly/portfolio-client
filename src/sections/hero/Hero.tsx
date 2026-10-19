import './Hero.css';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { ProfilePhoto } from '@/components/ui/ProfilePhoto';
import { scrollToSection } from '@/lib/scroll';
import { UI } from '@/content/ui';
import type { Profile } from '@/types';

interface HeroProps {
  profile: Profile;
  /** True when this is the LCP element (not inside a hidden stage layer). */
  isLcp?: boolean;
  /**
   * Slot ref set by IntroStage — the photo sits inside this invisible anchor
   * on desktop so the stage engine can measure and animate it.
   */
  photoSlotRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hero section — name, headline, and two CTAs.
 * On desktop this lives inside IntroStage; on mobile it renders standalone.
 *
 * One h1 per page rule: this component renders the only h1.
 */
export function Hero({ profile, isLcp = false, photoSlotRef }: HeroProps) {
  const { name, headline, photo, photoAlt, resumeUrl } = profile;

  function handleScrollClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    scrollToSection('about');
    history.replaceState(null, '', '/#about');
  }

  return (
    <section id="home" className="hero" aria-labelledby="hero-heading">
      <div className="hero__content">
        {/* Text block */}
        <div className="hero__text">
          <h1 id="hero-heading" className="hero__name">{name}</h1>
          <p className="hero__headline">{headline}</p>
          <div className="hero__actions">
            {resumeUrl && (
              <Button
                href={resumeUrl}
                download
                variant="primary"
                aria-label={UI.hero.downloadCvAriaLabel}
              >
                <Icon name="download" aria-hidden />
                {UI.hero.downloadCv}
              </Button>
            )}
            <a
              href="/#about"
              className="hero__scroll-link"
              aria-label={UI.hero.scrollAriaLabel}
              onClick={handleScrollClick}
            >
              {UI.hero.scrollCta}
              <Icon name="arrow-down" aria-hidden />
            </a>
          </div>
        </div>

        {/* Photo slot anchor — the actual photo is positioned here on desktop */}
        <div className="hero__photo-slot" ref={photoSlotRef} aria-hidden={photoSlotRef ? 'true' : undefined}>
          {/* On mobile (no photoSlotRef), render the photo directly here */}
          {!photoSlotRef && (
            <ProfilePhoto
              src={photo}
              alt={photoAlt}
              width={340}
              priority={isLcp}
              className="hero__photo-direct"
            />
          )}
        </div>
      </div>
    </section>
  );
}
