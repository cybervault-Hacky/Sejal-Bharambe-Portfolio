/**
 * Skill type definitions
 * Supports categorization and filtering
 */

export type SkillCategory =
  | "frontend"
  | "backend"
  | "language"
  | "ai"
  | "database"
  | "devops"
  | "tools"
  | "design"
  | "other";

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface Skill {
  /** Skill name - e.g. "React" */
  name: string;
  /** Category for grouping */
  category: SkillCategory;
  /** Icon identifier - maps to icon component or image */
  icon: string;
  /** Proficiency level */
  level: SkillLevel;
  /** Optional years of experience with this skill */
  years?: number;
  /** Featured skill */
  featured?: boolean;
}

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  skills: Skill[];
}

export interface SkillsData {
  skills: Skill[];
  groups: SkillGroup[];
}
