import { Link } from "react-router-dom";

import { projects } from "../data/mock/projects.mock";
import ProjectCard from "../components/projects/ProjectCard";

import "./ProjectsPage.css";

export default function ProjectsPage() {
  const publishedProjects = projects.filter(
    (project) => project.published
  );

  return (
    <main className="projects-page">
      <div className="projects-page__container">
        <header className="projects-page__header">
          <Link to="/" className="projects-page__back">
            ← Back to Home
          </Link>

          <span className="projects-page__eyebrow">
            MY WORK
          </span>

          <h1 className="projects-page__title">
            ALL PROJECTS<span>.</span>
          </h1>

          <p className="projects-page__description">
            A collection of projects, ideas, and digital experiences
            I've worked on.
          </p>
        </header>

        {publishedProjects.length > 0 ? (
          <div className="projects-page__grid">
            {publishedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        ) : (
          <p className="projects-page__empty">
            No projects available yet.
          </p>
        )}
      </div>
    </main>
  );
}