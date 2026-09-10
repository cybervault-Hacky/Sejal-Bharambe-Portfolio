/**
 * Profile data
 * Populated from the professional CV (Phase 5)
 * Source of truth: Sejal Bharambe CV
 */

import type { Profile, SiteMetadata } from "@/types/profile";
import type { SocialLink } from "@/types/common";

export const profile: Profile = {
  name: "Sejal Bharambe",
  title: "Software Developer",
  titleSecondary: "AI Engineer",
  cvTitle: "AI Project Manager | Full Stack Developer",
  summary:
    "Full Stack Developer and AI Project Manager with 2+ years of experience building AI-powered applications, healthcare platforms, e-commerce applications and workflow systems — from REST APIs and authentication to deployment of scalable full-stack systems.",
  location: "Pune, India",
  email: "sejalbharambe2003@gmail.com",
  phone: "+91 7058657232",
  github: "https://github.com/sejal-bharambe",
  linkedin: "https://www.linkedin.com/in/sejal-bharambe-5988a720b",
  // Resume PDF arrives in Phase 8 - UI renders resume CTAs only when set
  resume: undefined,
  yearsOfExperience: 2,
};

export const siteMetadata: SiteMetadata = {
  title: "Sejal Bharambe — Software Developer + AI Engineer",
  description:
    "AI Project Manager and Full Stack Developer with 2+ years of experience building full-stack and AI-powered applications with Java, Spring Boot, React, Next.js and TypeScript.",
  keywords: [
    "Sejal Bharambe",
    "Software Developer",
    "AI Engineer",
    "AI Project Manager",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Java",
    "Spring Boot",
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
  { label: "AI", href: "#ai" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

// Real social links only - no invented profiles
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: profile.github, icon: "github", external: true },
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin", external: true },
  { label: "Email", href: `mailto:${profile.email}`, icon: "email", external: false },
];

// Phone link (tel:) for contact sections
export const phoneLink: SocialLink = {
  label: "Phone",
  href: `tel:${profile.phone?.replace(/\s/g, "") ?? ""}`,
  icon: "phone",
  external: false,
};
