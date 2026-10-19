
import { Link } from "react-router-dom";

import { projects } from "../../data/mock/projects.mock";

import ProjectCard from "../../components/projects/ProjectCard";
import ViewAllCard from "./components/ViewAllCard.jsx/ViewAllCard";

import "./SelectedProjects.css";

const MAX_FEATURED_PROJECTS = 3;

export default function SelectedProjects() {
  const featuredProjects = projects
    .filter((project) => project.featured && project.published)
    .slice(0, MAX_FEATURED_PROJECTS);

  return (
    <section className="selected-projects" id="projects">
      <div className="selected-projects__container">

        {/* Section Header */}
        <header className="selected-projects__header">
          <div className="selected-projects__heading">
            <h2>SELECTED PROJECTS</h2>

            <span
              className="selected-projects__line"
              aria-hidden="true"
            />
          </div>

          <Link
            className="selected-projects__view-all-link"
            to="/projects"
          >
            VIEW ALL PROJECTS
            <span aria-hidden="true">→</span>
          </Link>
        </header>

        {/* Featured Projects */}
        {featuredProjects.length > 0 ? (
          <div className="selected-projects__grid">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        ) : (
          <p className="selected-projects__empty">
            Projects will be available soon.
          </p>
        )}

        {/* View All Projects Card */}
        <ViewAllCard />

      </div>
    </section>
  );
}