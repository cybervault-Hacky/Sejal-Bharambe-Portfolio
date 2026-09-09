import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg" | "xl" | "full" | "narrow";
  padding?: "none" | "default" | "tight" | "loose";
}

const sizeClasses = {
  narrow: "max-w-3xl",
  sm: "max-w-4xl",
  default: "max-w-[80rem]", // 1280px - premium, not too wide
  lg: "max-w-[88rem]",      // 1408px
  xl: "max-w-[96rem]",      // 1536px - wide desktop
  full: "max-w-full",
} as const;

const paddingClasses = {
  none: "px-0",
  tight: "px-4 sm:px-5",
  default: "px-4 sm:px-6 lg:px-8",
  loose: "px-5 sm:px-8 lg:px-12",
} as const;

export function Container({
  className,
  size = "default",
  padding = "default",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        sizeClasses[size],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function ContainerNarrow(props: ContainerProps) {
  return <Container size="narrow" {...props} />;
}

export function ContainerFull(props: ContainerProps) {
  return <Container size="full" {...props} />;
}
