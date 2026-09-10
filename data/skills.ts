/**
 * Skills data
 * Populated from the CV (Phase 5)
 *
 * Proficiency values are self-assessed (0-100) - not a standardized
 * or certified measurement. UI labels them accordingly.
 */

import type { Skill, SkillCategory, SkillGroup } from "@/types/skill";

export const skills: Skill[] = [
  // Languages
  { name: "Java", category: "language", proficiency: 90, featured: true },
  { name: "TypeScript", category: "language", proficiency: 90, featured: true },
  { name: "JavaScript", category: "language", proficiency: 85 },

  // Frontend
  { name: "React", category: "frontend", proficiency: 90, featured: true },
  { name: "Next.js", category: "frontend", proficiency: 90, featured: true },
  { name: "Redux", category: "frontend", proficiency: 85 },
  { name: "HTML5", category: "frontend", proficiency: 95 },
  { name: "CSS3", category: "frontend", proficiency: 90 },
  { name: "Tailwind CSS", category: "frontend", proficiency: 90 },
  { name: "Bootstrap", category: "frontend", proficiency: 85 },
  { name: "Ant Design", category: "frontend", proficiency: 90 },
  { name: "Framer Motion", category: "frontend", proficiency: 80 },

  // Backend
  { name: "Spring", category: "backend", proficiency: 85 },
  { name: "Spring Boot", category: "backend", proficiency: 90, featured: true },
  { name: "Node.js", category: "backend", proficiency: 75 },
  { name: "Next.js Route Handlers", category: "backend", proficiency: 85 },
  { name: "REST APIs", category: "backend", proficiency: 90 },

  // Databases
  { name: "PostgreSQL", category: "database", proficiency: 85, featured: true },
  { name: "MySQL", category: "database", proficiency: 90 },
  { name: "MongoDB", category: "database", proficiency: 85 },
  { name: "SQLite", category: "database", proficiency: 80 },
  { name: "Prisma", category: "database", proficiency: 80 },

  // Auth / API
  { name: "NextAuth", category: "auth", proficiency: 85 },
  { name: "JWT", category: "auth", proficiency: 85 },
  { name: "REST API Integration", category: "auth", proficiency: 90 },
  { name: "Postman", category: "auth", proficiency: 90 },
  { name: "Echo", category: "auth", proficiency: 75 },

  // Cloud / DevOps
  { name: "Hostinger VPS", category: "devops", proficiency: 90 },
  { name: "Vercel", category: "devops", proficiency: 90 },
  { name: "AWS EC2", category: "devops", proficiency: 60 },
  { name: "AWS S3", category: "devops", proficiency: 60 },
  { name: "Docker", category: "devops", proficiency: 65 },

  // Tools
  { name: "Git / GitHub", category: "tools", proficiency: 95 },
  { name: "VS Code", category: "tools", proficiency: 95 },
  { name: "Postman", category: "tools", proficiency: 90 },
  { name: "MongoDB Compass", category: "tools", proficiency: 85 },
  { name: "DBeaver", category: "tools", proficiency: 80 },
  { name: "Echo", category: "tools", proficiency: 75 },
];

// Group order and display labels - matches the CV organization
export const skillGroupOrder: {
  category: SkillCategory;
  label: string;
}[] = [
  { category: "language", label: "Languages" },
  { category: "frontend", label: "Frontend" },
  { category: "backend", label: "Backend" },
  { category: "database", label: "Databases" },
  { category: "auth", label: "Auth / API" },
  { category: "devops", label: "Cloud / DevOps" },
  { category: "tools", label: "Tools" },
];

export const skillCategories: Record<SkillCategory, string> = {
  language: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  database: "Databases",
  auth: "Auth / API",
  devops: "Cloud / DevOps",
  tools: "Tools",
  ai: "AI / ML",
  other: "Other",
};

export const groupedSkills: SkillGroup[] = skillGroupOrder.map(
  ({ category, label }) => ({
    category,
    label,
    skills: skills.filter((s) => s.category === category),
  })
);

export const featuredSkills = skills.filter((s) => s.featured);

export const getSkillsByCategory = (category: SkillCategory) =>
  skills.filter((s) => s.category === category);
