import { projects } from "../data/mock/projects.mock.js";

export function getProjects() {
  return projects.filter((project) => project.published);
}

export function getFeaturedProjects(limit = 4) {
  return getProjects()
    .filter((project) => project.featured)
    .slice(0, limit);
}

export function getProjectBySlug(slug) {
  return (
    getProjects().find((project) => project.slug === slug) ?? null
  );
}