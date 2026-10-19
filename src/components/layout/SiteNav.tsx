import { useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MobileMenu } from './MobileMenu';
import { Icon } from '@/components/ui/Icon';
import { navSections } from '@/app/sections';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useActiveSection } from '@/hooks/useActiveSection';
import { scrollToSection } from '@/lib/scroll';
import { DESKTOP_NAV_QUERY } from '@/lib/media';
import { UI } from '@/content/ui';
import './SiteNav.css';

/**
 * SiteNav — desktop fixed rail (min-width 900px AND min-height 600px)
 * OR mobile fixed top bar below that breakpoint.
 * Active section is tracked via useActiveSection (scroll-spy).
 */
export function SiteNav() {
  const isDesktop = useMediaQuery(DESKTOP_NAV_QUERY);
  const location  = useLocation();
  const isHome    = location.pathname === '/';

  const sectionIds = navSections.map((s) => s.id);
  // Pass stageId only on the home page in desktop mode
  const activeId = useActiveSection(sectionIds, isHome && isDesktop ? 'intro-stage' : undefined);

  const menuBtnRef = useRef<HTMLButtonElement>(null);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    if (location.pathname === '/') {
      e.preventDefault();
      scrollToSection(id);
      history.replaceState(null, '', id === 'home' ? '/' : `/#${id}`);
    }
  }

  const navLinks = (
    <ul className="site-nav__list" role="list">
      {navSections.map((section) => {
        const isActive = activeId === section.id;
        return (
          <li key={section.id} className="site-nav__item">
            <NavLink
              to={section.id === 'home' ? '/' : `/#${section.id}`}
              className="site-nav__link"
              aria-current={isActive ? 'true' : undefined}
              onClick={(e) => handleNavClick(e, section.id)}
            >
              <span className="site-nav__line" aria-hidden="true" />
              <span className="site-nav__label">{section.label}</span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );

  if (isDesktop) {
    return (
      <nav className="site-nav site-nav--rail" aria-label={UI.nav.ariaLabel}>
        <NavLink
          to="/"
          className="site-nav__monogram"
          aria-label={UI.nav.monogramLabel}
          onClick={(e) => { e.preventDefault(); scrollToSection('home'); history.replaceState(null, '', '/'); }}
        >
          KH
        </NavLink>
        {navLinks}
      </nav>
    );
  }

  return (
    <>
      <nav className="site-nav site-nav--bar" aria-label={UI.nav.ariaLabel}>
        <NavLink
          to="/"
          className="site-nav__monogram"
          aria-label={UI.nav.monogramLabel}
        >
          KH
        </NavLink>
        <button
          id="mobile-menu-btn"
          ref={menuBtnRef}
          type="button"
          className="site-nav__menu-btn"
          aria-expanded="false"
          aria-controls="mobile-menu"
          aria-label={UI.nav.menuOpen}
          onClick={() => {
            const btn = menuBtnRef.current;
            const expanded = btn?.getAttribute('aria-expanded') === 'true';
            btn?.setAttribute('aria-expanded', String(!expanded));
            document.getElementById('mobile-menu')?.classList.toggle('mobile-menu--open');
          }}
        >
          <Icon name="menu" />
        </button>
      </nav>
      <MobileMenu
        navLinks={navLinks}
        onClose={() => {
          menuBtnRef.current?.setAttribute('aria-expanded', 'false');
          document.getElementById('mobile-menu')?.classList.remove('mobile-menu--open');
          menuBtnRef.current?.focus();
        }}
      />
    </>
  );
}
