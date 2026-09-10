import * as React from "react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { cn } from "@/lib/utils";

export interface LinkProps extends NextLinkProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  variant?: "default" | "subtle" | "accent" | "underline";
  external?: boolean;
}

const variantClasses = {
  default: "text-[hsl(var(--foreground-secondary))] hover:text-[hsl(var(--foreground))] transition-colors duration-200",
  subtle: "text-[hsl(var(--foreground-tertiary))] hover:text-[hsl(var(--foreground-secondary))] transition-colors duration-200",
  accent: "text-[hsl(var(--foreground))] hover:text-[hsl(var(--foreground-secondary))] transition-colors duration-200",
  underline: "text-[hsl(var(--foreground-secondary))] hover:text-[hsl(var(--foreground))] link-underline",
} as const;

export function Link({
  className,
  variant = "default",
  external,
  children,
  ...props
}: LinkProps) {
  const isExternal = external || (typeof props.href === "string" && (props.href.startsWith("http") || props.href.startsWith("mailto:")));

  return (
    <NextLink
      className={cn(
        "inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] rounded-sm",
        variantClasses[variant],
        className
      )}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
      {isExternal && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-60">
          <path d="M3 9L9 3M9 3H5M9 3V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </NextLink>
  );
}

export function ExternalLink(props: LinkProps) {
  return <Link external {...props} />;
}
