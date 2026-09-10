/**
 * Central type exports
 * Keeps type imports clean and scalable
 */

export * from "./common";
export * from "./profile";
export * from "./project";
export * from "./experience";
export * from "./skill";
export * from "./ai";
export * from "./credentials";

// Re-export for convenience
export type { Profile, SiteMetadata } from "./profile";
export type { Project, ProjectCategory, ProjectsData } from "./project";
export type { Experience, ExperienceData } from "./experience";
export type { Skill, SkillCategory, SkillGroup, SkillsData } from "./skill";
export type { AIFocusArea } from "./ai";
export type { Education, Certification, Achievement } from "./credentials";
export type { SocialLink } from "./common";
