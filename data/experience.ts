/**
 * Experience data
 * TODO: Populate from professional CV
 * No fake companies or roles
 */

import type { Experience } from "@/types/experience";

export const experiences: Experience[] = [
  // TODO: Add real experience from CV
  // {
  //   company: "TODO",
  //   role: "TODO",
  //   startDate: "TODO",
  //   endDate: "Present",
  //   description: "TODO",
  //   achievements: [],
  //   technologies: [],
  // }
];

export const totalYearsOfExperience = 2;

export const getCurrentRole = () =>
  experiences.find((exp) => exp.endDate.toLowerCase() === "present");
