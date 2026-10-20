import { Link } from "react-router-dom";

import { projects } from "../../data/mock/projects.mock";

import ProjectCard from "../../components/projects/ProjectCard";
// import ViewAllCard from "./components/ViewAllCard.jsx/ViewAllCard";

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
          <h2 className="selected-projects__title">Selected projects</h2>

          <span className="selected-projects__line" aria-hidden="true" />

          <Link className="selected-projects__view-all-link" to="/projects">
            View all projects
            <span aria-hidden="true">→</span>
          </Link>
        </header>

        {/* Featured Projects */}
        {featuredProjects.length > 0 ? (
          <div className="selected-projects__grid">
            {featuredProjects.map((project) => (
              <div className="selected-projects__item" key={project.id}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <p className="selected-projects__empty">
            No featured projects yet. Mark a project as featured and published to show it here.
          </p>
        )}

        {/* View All Projects Card */}
        {/* <ViewAllCard /> */}
      </div>
    </section>
  );
}