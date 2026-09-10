/**
 * Profile type definitions
 * Populated from the professional CV (Phase 5)
 * No fake data - all fields are CV-supported
 */

export interface Profile {
  /** Full name - displayed professionally, e.g. "Sejal Bharambe" */
  name: string;
  /** Primary professional identity, e.g. "Software Developer" */
  title: string;
  /** Secondary professional identity, e.g. "AI Engineer" */
  titleSecondary: string;
  /** Formal CV title, e.g. "AI Project Manager | Full Stack Developer" */
  cvTitle: string;
  /** Short professional summary */
  summary: string;
  /** Location - city, country */
  location: string;
  /** Contact email */
  email: string;
  /** Contact phone (display format, includes country code) */
  phone?: string;
  /** GitHub profile URL */
  github: string;
  /** LinkedIn profile URL */
  linkedin: string;
  /**
   * Resume file path in /public/resume
   * Left undefined until the real CV PDF is available (Phase 8)
   * - UI only renders resume CTAs when this is set
   */
  resume?: string;
  /** Years of professional experience (minimum, displayed as "N+") */
  yearsOfExperience: number;
}

export interface SiteMetadata {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  siteUrl: string;
  locale: string;
}
