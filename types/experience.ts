/**
 * Experience type definitions
 * Timeline data structure for professional experience
 */

export interface Experience {
  /** Company name */
  company: string;
  /** Role / Job title */
  role: string;
  /** Project or context the role centered on - e.g. "SKArt" */
  focus?: string;
  /** Start date - ISO or readable string e.g. "Jan 2023" */
  startDate: string;
  /** End date - "Present" if current */
  endDate: string;
  /** Short description of role */
  description: string;
  /** Key achievements */
  achievements: string[];
  /** Technologies used in this role */
  technologies: string[];
  /** Location - remote, city */
  location?: string;
  /** Company logo path */
  logo?: string;
  /** Company URL */
  companyUrl?: string;
  /** Employment type */
  type?: "full-time" | "part-time" | "contract" | "internship" | "freelance";
}

export interface ExperienceData {
  experiences: Experience[];
  totalYears: number;
}
