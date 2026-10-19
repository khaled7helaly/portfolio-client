import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SiteNav } from '@/components/layout/SiteNav';
import { ScrollManager } from './ScrollManager';
import { UI } from '@/content/ui';
import './AppShell.css';

/**
 * AppShell — wraps every page with:
 *   - Skip-to-content link (first focusable element)
 *   - SiteNav (rail on desktop, top bar on mobile)
 *   - <main> with the outlet (offset by rail on desktop)
 *   - ScrollManager (hash scrolling)
 */
export function AppShell() {
  return (
    <>
      <a className="skip-link" href="#main-content">{UI.skipToContent}</a>
      <SiteNav />
      <main id="main-content" className="app-shell__main" tabIndex={-1}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <ScrollManager />
    </>
  );
}
