import * as React from "react";
import { cn } from "@/lib/utils";
import { Container, type ContainerProps } from "./Container";
import { SectionHeading } from "./SectionHeading";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerSize?: ContainerProps["size"];
  withContainer?: boolean;
  spacing?: "none" | "sm" | "default" | "lg" | "xl";
  background?: "default" | "secondary" | "elevated" | "none";
}

const spacingClasses = {
  none: "py-0",
  sm: "py-12 md:py-16",
  default: "py-16 md:py-24",
  lg: "py-20 md:py-32",
  xl: "py-24 md:py-40",
} as const;

const backgroundClasses = {
  default: "bg-transparent",
  secondary: "bg-[hsl(var(--background-secondary))]/50",
  elevated: "bg-[hsl(var(--surface))]/30",
  none: "",
} as const;

export function Section({
  className,
  children,
  containerSize = "default",
  withContainer = true,
  spacing = "default",
  background = "default",
  id,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
      {...props}
    >
      {withContainer ? (
        <Container size={containerSize}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

// Legacy compatibility - now uses new SectionHeading
export function SectionHeader({
  title,
  subtitle,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <SectionHeading
      label={subtitle}
      title={title}
      description={description}
      align={align}
      className={cn("mb-12 md:mb-16", className)}
    />
  );
}

export interface SectionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: "full" | "narrow" | "wide";
}

export function SectionContent({
  className,
  width = "full",
  children,
  ...props
}: SectionContentProps) {
  return (
    <div
      className={cn(
        width === "narrow" && "mx-auto max-w-3xl",
        width === "wide" && "mx-auto max-w-6xl",
        width === "full" && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionDivider({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full h-px bg-[hsl(var(--border-subtle))]", className)} {...props} />
  );
}
