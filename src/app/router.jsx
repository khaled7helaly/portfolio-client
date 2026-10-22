
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from './layouts/MainLayout.jsx';

import HomePage from '../pages/HomePage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import ProjectsPage from '../pages/ProjectsPage.jsx';
import About from '../sections/aboutMe/About.jsx';
import ProjectDetailsPage from '../pages/ProjectDetailsPage.jsx';
import Skills from '../pages/Skills.jsx';
// import ServicePaper from '../pages/Servicepaper.jsx'
// import Servicespage from '../pages/Services/Servicespage.jsx'

import ServicesPage from '../pages/Services/Servicespage.jsx';
import ServiceDetails from '../pages/Services/Servicedetails.jsx';



// Supports local development and GitHub Pages deployment.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'projects', element: <ProjectsPage /> },
        { path: 'projects/:slug', element: <ProjectDetailsPage /> },
        { path: 'skills', element: <Skills /> },
        { path: 'about', element: <About /> },

        // { path: 'Services', element: <Servicespage /> },
        { path:'/services' , element: <ServicesPage /> },
       { path: '/services/:slug', element:<ServiceDetails /> },

        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  { basename }
);

