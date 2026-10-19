import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { AppShell } from './AppShell';

const HomePage    = lazy(() => import('@/pages/HomePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
// Planned routes (placeholders exist):
// const ProjectsPage      = lazy(() => import('@/pages/ProjectsPage'));
// const ProjectDetailsPage = lazy(() => import('@/pages/ProjectDetailsPage'));

export const routes: RouteObject[] = [
  {
    element: <AppShell />,
    children: [
      { path: '/',  element: <HomePage /> },
      // { path: '/projects',       element: <ProjectsPage /> },
      // { path: '/projects/:slug', element: <ProjectDetailsPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
];