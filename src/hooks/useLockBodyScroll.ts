import { useEffect } from 'react';

/**
 * Locks body scroll when locked is true (mobile menu open).
 * Restores the scroll position on unlock to avoid a visual jump.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.inlineSize = '100%';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.inlineSize = '';
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}