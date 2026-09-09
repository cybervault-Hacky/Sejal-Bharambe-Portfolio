/**
 * Skills data
 * TODO: Populate from CV - do not invent
 * Architecture supports grouping and filtering
 */

import type { Skill, SkillGroup, SkillCategory } from "@/types/skill";

export const skills: Skill[] = [
  // TODO: Add real skills from CV
  // Example placeholder - will be replaced with real data
  // { name: "React", category: "frontend", icon: "react", level: "advanced", featured: true }
];

export const skillCategories: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  language: "Languages",
  ai: "AI / ML",
  database: "Databases",
  devops: "DevOps",
  tools: "Tools",
  design: "Design",
  other: "Other",
};

export const groupedSkills: SkillGroup[] = Object.entries(skillCategories).map(
  ([category, label]) => ({
    category: category as SkillCategory,
    label,
    skills: skills.filter((s) => s.category === category),
  })
);

export const featuredSkills = skills.filter((s) => s.featured);

export const getSkillsByCategory = (category: SkillCategory) =>
  skills.filter((s) => s.category === category);
