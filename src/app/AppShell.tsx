import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SiteNav } from '@/components/layout/SiteNav';
import { ScrollManager } from './ScrollManager';
import { UI } from '@/content/ui';

/**
 * AppShell — wraps every page with:
 *   - Skip-to-content link (first focusable element)
 *   - SiteNav (rail on desktop, top bar on mobile)
 *   - <main> with the outlet
 *   - ScrollManager (hash scrolling)
 */
export function AppShell() {
  return (
    <>
      <a className="skip-link" href="#main-content">{UI.skipToContent}</a>
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <ScrollManager />
    </>
  );
}