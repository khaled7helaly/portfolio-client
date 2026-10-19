import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToSection } from '@/lib/scroll';

/**
 * Handles hash-based scrolling on route and hash changes.
 * - On navigation to /#about, scrolls to the p=1 stage position.
 * - On navigation to /, scrolls to top.
 * - Works for both link-click navigations and direct URL loads.
 */
export function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      // Delay one frame to let the page settle after navigation.
      const id = requestAnimationFrame(() => scrollToSection(hash));
      return () => cancelAnimationFrame(id);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.hash]);

  return null;
}