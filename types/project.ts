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
  | "e-learning"
  | "e-commerce"
  | "mobile"
  | "open-source"
  | "other";

export interface Project {
  /** Unique identifier - slug friendly, used for /projects/[slug] */
  id: string;
  /** Project display name */
  name: string;
  /** Display category label - e.g. "AI Resume Builder" (falls back to category label) */
  label?: string;
  /** Short factual description */
  description: string;
  /** Category for filtering */
  category: ProjectCategory;
  /** Technologies used */
  technologies: string[];
  /** Key capability tags - short, factual */
  capabilities: string[];
  /** Engineering focus areas - source-supported technical emphasis */
  engineeringFocus: string[];
  /** GitHub repository URL - only real URLs */
  githubUrl?: string;
  /** Live deployment URL - only real URLs */
  liveUrl?: string;
  /** Featured treatment on the homepage showcase */
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
