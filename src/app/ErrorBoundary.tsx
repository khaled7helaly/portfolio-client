import { Component, type ErrorInfo, type ReactNode } from 'react';
import { UI } from '@/content/ui';

interface Props   { children: ReactNode; }
interface State   { hasError: boolean; }

/**
 * Top-level error boundary — catches render errors and shows a friendly fallback.
 * Shows a refresh button rather than stack traces in production.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    // TODO(Khaled): wire up error monitoring (e.g. Sentry) here.
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div role="alert" style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '100svh', padding: '2rem',
          fontFamily: 'system-ui, sans-serif', textAlign: 'center', gap: '1rem',
        }}>
          <h1 style={{ fontSize: '1.5rem' }}>{UI.errorHeading}</h1>
          <p style={{ color: '#5A5F6B' }}>{UI.errorBody}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              padding: '0.5rem 1.25rem', border: '1px solid #D8D4CA',
              borderRadius: '2px', cursor: 'pointer', fontSize: '0.875rem',
            }}
          >
            {UI.errorRefresh}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}