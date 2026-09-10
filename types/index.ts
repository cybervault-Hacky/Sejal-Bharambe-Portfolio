/**
 * Central type exports
 * Keeps type imports clean and scalable
 */

export * from "./common";
export * from "./profile";
export * from "./project";
export * from "./experience";
export * from "./skill";
export * from "./agent";

// Re-export for convenience
export type { Profile, SiteMetadata } from "./profile";
export type { Project, ProjectCategory, ProjectsData } from "./project";
export type { Experience, ExperienceData } from "./experience";
export type { Skill, SkillCategory, SkillLevel, SkillGroup, SkillsData } from "./skill";
export type { Agent, AgentCapability, AgentArchitectureType, AgentsData } from "./agent";
