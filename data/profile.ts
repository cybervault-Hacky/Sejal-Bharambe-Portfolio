/**
 * Profile data
 * TODO: Populate from professional CV in later phases
 * Do NOT invent companies, titles, or achievements
 */

import type { Profile, SiteMetadata } from "@/types/profile";

export const profile: Profile = {
  name: "TODO: Name from CV",
  title: "Software Developer + AI Engineer",
  summary: "TODO: Summary from CV - 2+ years professional experience",
  location: "TODO: Location",
  email: "TODO: Email",
  github: "TODO: GitHub URL",
  linkedin: "TODO: LinkedIn URL",
  resume: "/resume/resume.pdf",
  yearsOfExperience: 2,
};

export const siteMetadata: SiteMetadata = {
  title: "Sejal Bharambe — Software Developer + AI Engineer",
  description:
    "Software Developer with 2+ years of professional experience building full-stack applications and AI-powered solutions. Specializing in modern web technologies and AI agents.",
  keywords: [
    "Software Developer",
    "AI Engineer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "AI Agents",
    "Portfolio",
  ],
  author: "Sejal Bharambe",
  siteUrl: "https://sejalbharambe.dev",
  locale: "en_US",
};

// Navigation links - premium redesign per Phase 2 spec
// Order: Home, About, Experience, Projects, AI, Skills, Contact
export const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "AI", href: "#agents" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const socialLinks = [
  { label: "GitHub", href: profile.github, icon: "github" },
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "email" },
] as const;
