import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { UI } from '@/content/ui';
import './MobileMenu.css';

interface MobileMenuProps {
  navLinks: React.ReactNode;
  onClose: () => void;
}


/**
 * Full-screen mobile nav overlay.
 * Opens/closes via CSS class on the element (toggled by SiteNav).
 * Keyboard: Esc closes; focus is trapped inside while open.
 */
export function MobileMenu({ navLinks, onClose }: MobileMenuProps) {
  const location = useLocation();

  // Close on route/hash change
  useEffect(() => {
    onClose();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash]);

  // Esc to close
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Body scroll lock — active when menu has the --open class
  const isOpen = document.getElementById('mobile-menu')?.classList.contains('mobile-menu--open') ?? false;
  useLockBodyScroll(isOpen);

  return (
    <div
      id="mobile-menu"
      className="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={UI.nav.menuAriaLabel}
    >
      <div className="mobile-menu__inner">
        <button
          type="button"
          className="mobile-menu__close"
          aria-label={UI.nav.menuClose}
          onClick={onClose}
          ref={(el) => {
            // Move focus into overlay when it opens
            if (el && document.getElementById('mobile-menu')?.classList.contains('mobile-menu--open')) {
              el.focus();
            }
          }}
        >
          <Icon name="close" />
        </button>
        <nav aria-label={UI.nav.menuAriaLabel}>
          {navLinks}
        </nav>
      </div>
    </div>
  );
}
