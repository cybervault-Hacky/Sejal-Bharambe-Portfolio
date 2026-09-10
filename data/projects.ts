/**
 * Projects data
 * TODO: Populate from CV / GitHub in later phases
 * Architecture allows adding projects by modifying data only
 */

import type { Project } from "@/types/project";

export const projects: Project[] = [
  // TODO: Add real projects from CV
  // Example structure - leave empty until real data available
  // {
  //   id: "project-1",
  //   name: "TODO",
  //   description: "TODO",
  //   category: "fullstack",
  //   technologies: [],
  //   highlights: [],
  //   featured: true,
  //   image: "/images/projects/placeholder.jpg",
  // }
];

export const featuredProjects: Project[] = projects.filter((p) => p.featured);

export const projectsByCategory = (category: string) =>
  projects.filter((p) => p.category === category);

export const getProjectById = (id: string) =>
  projects.find((p) => p.id === id);
