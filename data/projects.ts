/**
 * Projects data
 * Populated from the CV (Phase 5) - three main projects
 * Phase 6: structured for the project showcase (detail routes)
 * No fabricated URLs, metrics or screenshots - links only exist when real
 */

import type { Project, ProjectCategory } from "@/types/project";

export const projects: Project[] = [
  {
    id: "sophora",
    name: "Sophora",
    label: "E-Learning",
    description:
      "A 3-role e-learning platform built with Next.js 15 and PostgreSQL, supporting authentication, enrollment and course management across 20+ responsive pages.",
    category: "e-learning",
    technologies: [
      "Next.js 15",
      "TypeScript",
      "PostgreSQL",
      "Tailwind CSS",
      "Framer Motion",
    ],
    capabilities: [
      "3-Role Platform",
      "Authentication",
      "Enrollment",
      "Course Management",
      "Responsive UI",
    ],
    engineeringFocus: [
      "Multi-role platform architecture",
      "Authentication and enrollment workflows",
      "Course management",
      "Optimized, responsive UI across 20+ pages",
    ],
    featured: false,
    status: "completed",
  },
  {
    id: "aquablouse",
    name: "AquaBlouse",
    label: "E-Commerce",
    description:
      "A customized blouse ordering experience with authentication, product browsing, search, filtering and order management — built with React, Redux and Node.js.",
    category: "e-commerce",
    technologies: ["React", "Redux", "Node.js", "MongoDB"],
    capabilities: [
      "Authentication",
      "Product Browsing",
      "Search",
      "Filtering",
      "Customization",
      "Orders",
    ],
    engineeringFocus: [
      "Product customization flows",
      "Search and filtering",
      "Ordering workflows",
      "MongoDB database integration",
    ],
    featured: false,
    status: "completed",
  },
  {
    id: "resumint",
    name: "Resumint",
    label: "AI Resume Builder",
    description:
      "An AI-powered resume builder with 5+ ATS-optimized templates, live preview, AI generation, content optimization and PDF export.",
    category: "ai",
    technologies: ["Next.js", "TypeScript", "Prisma", "SQLite", "NextAuth"],
    capabilities: [
      "AI Generation",
      "ATS Templates",
      "Live Preview",
      "Content Optimization",
      "Resume Management",
      "PDF Export",
    ],
    engineeringFocus: [
      "AI-powered resume generation",
      "ATS-oriented templates",
      "Live preview",
      "Resume management",
      "PDF export",
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
  "e-learning": "E-Learning",
  "e-commerce": "E-Commerce",
  mobile: "Mobile",
  "open-source": "Open Source",
  other: "Other",
};

// Filter order for the project showcase (data-driven fallback labels)
export const projectFilterOrder: ProjectCategory[] = [
  "ai",
  "e-learning",
  "e-commerce",
];
