/**
 * Skill type definitions
 * Supports categorization and self-assessed proficiency
 */

export type SkillCategory =
  | "language"
  | "frontend"
  | "backend"
  | "database"
  | "auth"
  | "devops"
  | "tools"
  | "ai"
  | "other";

export interface Skill {
  /** Skill name - e.g. "React" */
  name: string;
  /** Category for grouping */
  category: SkillCategory;
  /**
   * Self-assessed proficiency (0-100)
   * NOT a standardized or certified measurement - UI must label accordingly
   */
  proficiency: number;
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
