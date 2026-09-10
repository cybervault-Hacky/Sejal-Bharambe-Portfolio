/**
 * Project type definitions
 * Supports scalable addition of portfolio projects via data files
 */

export type ProjectCategory =
  | "fullstack"
  | "frontend"
  | "backend"
  | "ai"
  | "ai-agent"
  | "mobile"
  | "open-source"
  | "other";

export interface Project {
  /** Unique identifier - slug friendly */
  id: string;
  /** Project display name */
  name: string;
  /** Short description */
  description: string;
  /** Long description for detail page (future) */
  longDescription?: string;
  /** Category for filtering */
  category: ProjectCategory;
  /** Technologies used */
  technologies: string[];
  /** Key highlights / bullet points */
  highlights: string[];
  /** GitHub repository URL */
  githubUrl?: string;
  /** Live deployment URL */
  liveUrl?: string;
  /** Featured on homepage */
  featured: boolean;
  /** Image path - relative to /public/images. Optional - no fake screenshots */
  image?: string;
  /** Optional additional images */
  images?: string[];
  /** Year or date string */
  year?: string;
  /** Status */
  status?: "completed" | "in-progress" | "archived";
}

export interface ProjectsData {
  projects: Project[];
  featured: Project[];
}
