import { Link } from "react-router-dom";

import { projects } from "../../data/mock/projects.mock";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
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
        <SectionHeader
          title="Selected projects"
          actionLabel="View all projects"
          actionTo="/projects"
        />

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