import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import HomePage from '../pages/HomePage.jsx';
// import NotFoundPage from '../pages/NotFoundPage.jsx';
// import { ProjectsPage } from '../pages/ProjectsPage.jsx';
// import { ProjectDetailsPage } from '../pages/ProjectDetailsPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      // { path: 'projects', element: <ProjectsPage /> },
      // { path: 'projects/:slug', element: <ProjectDetailsPage /> },
      // { path: '*', element: <NotFoundPage /> },
    ],
  },
]);