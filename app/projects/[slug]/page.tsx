import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, projectCategoryLabels } from "@/data/projects";
import { constructMetadata } from "@/lib/seo";
import { ProjectDetail } from "@/components/projects/ProjectDetail";

/**
 * Project detail route - /projects/[slug]
 * Data-driven from data/projects.ts.
 * The three real projects are statically generated via
 * generateStaticParams; unknown slugs hit notFound() and
 * render the project-scoped not-found boundary.
 */

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) {
    return { title: "Project not found" };
  }
  const label = project.label ?? projectCategoryLabels[project.category];
  return constructMetadata({
    title: `${project.name} — ${label}`,
    description: project.description,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) {
    notFound();
  }

  const index = projects.findIndex((p) => p.id === slug);
  const prev = index > 0 ? (projects[index - 1] ?? null) : null;
  const next = index < projects.length - 1 ? (projects[index + 1] ?? null) : null;

  return <ProjectDetail project={project} prev={prev} next={next} />;
}
