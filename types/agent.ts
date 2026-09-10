/**
 * AI Agent type definitions
 * Foundation for AI-powered solutions showcase
 * No fake agents should be invented in Phase 1
 */

export type AgentCapability =
  | "natural-language"
  | "code-generation"
  | "reasoning"
  | "tool-use"
  | "memory"
  | "rag"
  | "multi-agent"
  | "automation"
  | "vision"
  | "voice"
  | "other";

export type AgentArchitectureType =
  | "single-agent"
  | "multi-agent"
  | "rag"
  | "workflow"
  | "autonomous";

export interface AgentTool {
  name: string;
  description: string;
}

export interface Agent {
  /** Unique identifier */
  id: string;
  /** Agent name */
  name: string;
  /** Short description */
  description: string;
  /** Long description for detail view */
  longDescription?: string;
  /** Core capabilities */
  capabilities: AgentCapability[];
  /** Technologies used - e.g. LangChain, OpenAI, etc */
  technologies: string[];
  /** Tools integrated */
  tools: AgentTool[];
  /** Architecture type */
  architecture: AgentArchitectureType;
  /** GitHub URL */
  githubUrl?: string;
  /** Live demo URL */
  liveUrl?: string;
  /** Featured */
  featured: boolean;
  /** Image / diagram path */
  image?: string;
  /** Demo video */
  video?: string;
  /** Status */
  status?: "production" | "prototype" | "concept" | "archived";
}

export interface AgentsData {
  agents: Agent[];
  featured: Agent[];
}
