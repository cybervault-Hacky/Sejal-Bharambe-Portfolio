import Link from "next/link";
import { Container } from "@/components/ui/Container";

/**
 * Project not-found boundary for /projects/[slug]
 * Clean design-system treatment - no framework errors exposed
 */
export const metadata = {
  title: "Project not found",
  robots: { index: false, follow: false },
};

export default function ProjectNotFound() {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--foreground-tertiary))]">
        404
      </p>
      <h1 className="mt-4 text-[28px] font-bold tracking-tight text-[hsl(var(--foreground))] md:text-[36px]">
        Project not found
      </h1>
      <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[hsl(var(--foreground-secondary))]">
        The project you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8">
        <Link
          href="/#projects"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[hsl(var(--foreground))] px-6 text-[14px] font-medium text-[hsl(var(--background))] transition-colors duration-200 hover:bg-[hsl(var(--foreground))/90] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to projects
        </Link>
      </div>
    </Container>
  );
}
