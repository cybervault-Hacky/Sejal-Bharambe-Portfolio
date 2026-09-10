/**
 * Credentials data
 * Populated from the CV (Phase 5)
 * Education, certifications and achievements - no fabricated IDs or URLs
 */

import type { Education, Certification, Achievement } from "@/types/credentials";

export const education: Education[] = [
  {
    degree: "Bachelor of Engineering",
    field: "Electronics & Telecommunication",
    institution: "Bharati Vidyapeeth's College of Engineering for Women, Pune",
    location: "Pune, India",
    year: "2024",
    score: "76.38%",
  },
];

export const certifications: Certification[] = [
  {
    title: "Full Stack Development",
    issuer: "Radiant IT Services",
    year: "2025",
  },
  {
    title: "Web Development",
    issuer: "Wegrow",
    year: "2024",
  },
];

export const achievements: Achievement[] = [
  {
    title: "Promoted to AI Project Manager at Indiation Innovation",
    year: "2026",
  },
  {
    title: "Delivered 5+ full-stack enterprise applications",
    year: "2026",
  },
  {
    title: "Developed AI-powered solutions using OpenAI and DeepSeek APIs",
    year: "2026",
  },
];
