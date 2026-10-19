import { Link } from 'react-router-dom';
import { UI } from '@/content/ui';

/** 404 page — shown for any unmatched route. */
export default function NotFoundPage() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '100svh', padding: '2rem',
      fontFamily: 'var(--font-body)', textAlign: 'center', gap: '1rem',
    }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-display)' }}>
        404
      </h1>
      <p style={{ color: 'var(--color-muted)' }}>{UI.notFoundBody}</p>
      <Link to="/" style={{
        display: 'inline-block', padding: '0.5rem 1.25rem',
        border: '1px solid var(--color-line)', borderRadius: 'var(--radius-sm)',
        fontSize: 'var(--text-label)', textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-label)',
      }}>
        {UI.notFoundCta}
      </Link>
    </div>
  );
}