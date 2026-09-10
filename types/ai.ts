/**
 * AI Engineering type definitions
 *
 * Describes real AI work areas supported by the CV:
 * AI-powered application development, LLM API integration (OpenAI, DeepSeek),
 * AI-assisted workflows, and AI project management.
 *
 * No invented agent names - this is an accurate replacement for the
 * Phase 1 "Agent" placeholder structure, since no real standalone
 * agent products exist in the CV yet.
 */

export interface AIFocusArea {
  /** Unique identifier - slug friendly */
  id: string;
  /** Work area title */
  title: string;
  /** Short description of real work in this area */
  description: string;
  /** CV-backed technologies / APIs used in this area */
  technologies: string[];
  /** Real projects or roles this area applies to */
  context: string[];
  /** Featured */
  featured?: boolean;
}
