/**
 * AI Engineering data
 * Populated from the CV (Phase 5)
 *
 * Real AI work areas - no invented agent names.
 * CV-supported: AI-powered solutions, OpenAI APIs, DeepSeek APIs,
 * AI Project Manager role.
 */

import type { AIFocusArea, AIProvider } from "@/types/ai";

/**
 * Section copy - factual, CV-supported
 */
export const aiSection = {
  label: "AI Engineering",
  title: "Building AI-powered software experiences.",
  description:
    "Experience across AI application development, LLM API integration, AI-assisted workflows and AI project management — with OpenAI and DeepSeek APIs in real product work.",
} as const;

export const aiFocusAreas: AIFocusArea[] = [
  {
    id: "ai-app-development",
    title: "AI-Powered Application Development",
    description:
      "Developed AI-powered applications — bringing LLM capabilities into full-stack products with real user workflows, from generation to export.",
    technologies: ["OpenAI API", "DeepSeek API", "Next.js", "TypeScript"],
    context: ["Resumint", "Enterprise applications at Indiation Innovation"],
    featured: true,
  },
  {
    id: "llm-api-integration",
    title: "LLM API Integration",
    description:
      "Integrated OpenAI and DeepSeek APIs to power product features — AI content generation, ATS and content optimization, and intelligent assistance.",
    technologies: ["OpenAI API", "DeepSeek API"],
    context: ["Resumint", "AI-powered solutions (2026)"],
    featured: true,
  },
  {
    id: "ai-assisted-workflows",
    title: "AI-Assisted Workflows",
    description:
      "Designed workflows where AI output stays structured and reviewable — templates, live preview and export keep the human in the loop.",
    technologies: ["Next.js", "Prisma", "NextAuth"],
    context: ["Resumint — AI resume generation with 5+ ATS templates"],
  },
  {
    id: "ai-project-management",
    title: "AI Project Management",
    description:
      "Leading AI-focused product delivery as AI Project Manager — scoping, client collaboration, deployment management and enterprise feature delivery.",
    technologies: ["Next.js", "REST APIs"],
    context: ["LinkedIn Scheduler", "Wurqe", "Indiation Innovation"],
    featured: true,
  },
];

export const featuredAiFocusAreas: AIFocusArea[] = aiFocusAreas.filter(
  (a) => a.featured
);

export const getAiFocusAreaById = (id: string) =>
  aiFocusAreas.find((a) => a.id === id);

/**
 * LLM API providers with CV-supported experience.
 * Wording stays factual - no model names, no metrics, no keys.
 */
export const aiProviders: AIProvider[] = [
  {
    name: "OpenAI",
    category: "LLM API",
    description:
      "OpenAI APIs — used for developing AI-powered solutions and application experiences.",
  },
  {
    name: "DeepSeek",
    category: "LLM API",
    description:
      "DeepSeek APIs — used as part of AI-powered solution development.",
  },
];

/** Slug of the AI project showcased in the section (Phase 6 route) */
export const aiProjectSlug = "resumint";
