import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from './ErrorBoundary';
import { routes } from './routes';

const router = createBrowserRouter(routes);

/**
 * Root application component.
 * Provides the router and a top-level error boundary.
 */
export function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;