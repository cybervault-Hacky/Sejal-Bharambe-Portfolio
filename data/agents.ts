/**
 * AI Agents data
 * TODO: Populate with real AI agents / AI-powered solutions from CV
 * Do NOT invent fake AI agents
 */

import type { Agent } from "@/types/agent";

export const agents: Agent[] = [
  // TODO: Add real AI agents from professional work
  // {
  //   id: "agent-1",
  //   name: "TODO",
  //   description: "TODO",
  //   capabilities: [],
  //   technologies: [],
  //   tools: [],
  //   architecture: "single-agent",
  //   featured: true,
  // }
];

export const featuredAgents: Agent[] = agents.filter((a) => a.featured);

export const getAgentById = (id: string) => agents.find((a) => a.id === id);

export const getAgentsByCapability = (capability: string) =>
  agents.filter((a) => a.capabilities.includes(capability as never));
