/**
 * Profile type definitions
 * Data will be populated from CV in later phases
 * No fake data should be invented in Phase 1
 */

export interface Profile {
  /** Full name */
  name: string;
  /** Professional title - e.g. Software Developer + AI Engineer */
  title: string;
  /** Short professional summary */
  summary: string;
  /** Location - city, country */
  location: string;
  /** Contact email */
  email: string;
  /** GitHub profile URL */
  github: string;
  /** LinkedIn profile URL */
  linkedin: string;
  /** Resume file path in /public/resume */
  resume: string;
  /** Years of professional experience */
  yearsOfExperience: number;
  /** Optional additional fields for future expansion */
  website?: string;
  twitter?: string;
  availability?: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  siteUrl: string;
  locale: string;
}
