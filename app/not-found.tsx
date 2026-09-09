import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <h1 className="text-6xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-8xl">
        404
      </h1>
      <h2 className="mt-4 text-xl font-semibold text-[hsl(var(--foreground))] md:text-2xl">
        Page not found
      </h2>
      <p className="mt-2 max-w-md text-sm text-[hsl(var(--muted-foreground))] md:text-base">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-[var(--radius-md)] bg-[hsl(var(--foreground))] px-4 py-2 text-sm font-medium text-[hsl(var(--background))] hover:bg-[hsl(var(--foreground-secondary))] transition-colors"
        >
          Return Home
        </Link>
      </div>
    </Container>
  );
}

