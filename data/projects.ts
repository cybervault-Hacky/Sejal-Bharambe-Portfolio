/**
 * Projects data
 * Populated from the CV (Phase 5) - three main projects
 * No fabricated URLs - links only exist when real
 */

import type { Project, ProjectCategory } from "@/types/project";

export const projects: Project[] = [
  {
    id: "sophora",
    name: "Sophora",
    description:
      "A 3-role e-learning platform with authentication, enrollment and course management across 20+ responsive pages.",
    category: "fullstack",
    technologies: [
      "Next.js 15",
      "TypeScript",
      "PostgreSQL",
      "Tailwind CSS",
      "Framer Motion",
    ],
    highlights: [
      "3-role learning platform",
      "Authentication and enrollment flows",
      "Course management",
      "20+ optimized, responsive pages",
    ],
    featured: true,
    status: "completed",
  },
  {
    id: "aquablouse",
    name: "AquaBlouse",
    description:
      "A customized blouse ordering experience with authentication, search, filtering and order management.",
    category: "fullstack",
    technologies: ["React", "Redux", "Node.js", "MongoDB"],
    highlights: [
      "Customized blouse ordering and customization flows",
      "Browsing, search and filtering",
      "Authentication and order management",
      "MongoDB database integration",
    ],
    featured: true,
    status: "completed",
  },
  {
    id: "resumint",
    name: "Resumint",
    description:
      "An AI-powered resume builder with 5+ ATS-optimized templates, live preview and PDF export.",
    category: "ai",
    technologies: ["Next.js", "TypeScript", "Prisma", "SQLite", "NextAuth"],
    highlights: [
      "AI resume generation with ATS and content optimization",
      "5+ ATS-optimized templates with live preview",
      "Resume management and PDF export",
      "NextAuth authentication",
    ],
    featured: true,
    status: "completed",
  },
];

export const featuredProjects: Project[] = projects.filter((p) => p.featured);

export const projectsByCategory = (category: ProjectCategory) =>
  projects.filter((p) => p.category === category);

export const getProjectById = (id: string) =>
  projects.find((p) => p.id === id);

// Display labels for project categories
export const projectCategoryLabels: Record<ProjectCategory, string> = {
  fullstack: "Full Stack",
  frontend: "Frontend",
  backend: "Backend",
  ai: "AI",
  "ai-agent": "AI Agent",
  mobile: "Mobile",
  "open-source": "Open Source",
  other: "Other",
};
