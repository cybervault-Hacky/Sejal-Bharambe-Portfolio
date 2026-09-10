/**
 * Experience data
 * Populated from the professional CV (Phase 5)
 * Four professional entries - no fabricated companies or roles
 */

import type { Experience } from "@/types/experience";

export const experiences: Experience[] = [
  {
    company: "Indiation Innovation",
    role: "AI Project Manager",
    focus: "LinkedIn Scheduler · Wurqe",
    startDate: "Feb 2026",
    endDate: "Present",
    description:
      "Leading delivery of LinkedIn Scheduler and Wurqe — working with Next.js frontends and APIs, managing deployments, collaborating directly with clients, and shipping enterprise features.",
    achievements: [
      "Leading delivery of LinkedIn Scheduler and Wurqe",
      "Working with Next.js frontends and REST APIs",
      "Managing deployments end to end",
      "Collaborating with clients to deliver enterprise features",
    ],
    technologies: ["Next.js", "REST APIs"],
    type: "full-time",
  },
  {
    company: "SPCL Infotech Services",
    role: "Sr. Software Developer",
    focus: "SKArt",
    startDate: "Oct 2025",
    endDate: "Jan 2026",
    description:
      "Built and maintained the SKArt application — authentication, CRUD functionality, REST APIs and admin modules — with Java and Spring Boot on the backend and React on the frontend.",
    achievements: [
      "Implemented authentication and CRUD functionality",
      "Developed REST APIs and admin modules",
      "Maintained a consistent Git workflow across features",
    ],
    technologies: ["Java", "Spring Boot", "React", "MySQL", "MongoDB"],
    type: "full-time",
  },
  {
    company: "Prushal Technology PVT. LTD",
    role: "Full Stack Intern",
    focus: "HSuite medical platform",
    startDate: "Feb 2025",
    endDate: "Sep 2025",
    description:
      "Contributed to the HSuite medical platform — building responsive UI, integrating APIs and supporting testing with Redux state management.",
    achievements: [
      "Built responsive UI with Redux",
      "Integrated APIs across the platform",
      "Supported testing of features and flows",
    ],
    technologies: ["React", "Redux", "REST APIs"],
    type: "internship",
  },
  {
    company: "Radiant IT Services PVT. LTD",
    role: "Full Stack Intern",
    focus: "Job Portal",
    startDate: "Aug 2024",
    endDate: "Feb 2025",
    description:
      "Built a Job Portal application — a recruitment platform with a chatbot, authentication and responsive design, integrating the backend with the frontend.",
    achievements: [
      "Implemented chatbot and authentication features",
      "Designed a responsive user interface",
      "Integrated backend services with the frontend",
    ],
    technologies: [],
    type: "internship",
  },
];

export const totalYearsOfExperience = 2;

export const getCurrentRole = () =>
  experiences.find((exp) => exp.endDate.toLowerCase() === "present");
