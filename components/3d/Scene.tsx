"use client";

import * as React from "react";
import { CanvasWrapper } from "./CanvasWrapper";
import { HeroScene } from "./HeroScene";
import { ShowcaseScene } from "./ShowcaseScene";
import { CoreObject } from "./CoreObject";
import { Lighting } from "./Lighting";

export interface SceneProps {
  variant?: "hero" | "showcase" | "core";
  className?: string;
}

export function Scene({ variant = "hero", className }: SceneProps) {
  return (
    <CanvasWrapper variant={variant === "core" ? "hero" : variant} className={className}>
      {variant === "hero" && <HeroScene />}
      {variant === "showcase" && <ShowcaseScene />}
      {variant === "core" && (
        <>
          <Lighting variant="hero" />
          <CoreObject variant="hero" />
        </>
      )}
    </CanvasWrapper>
  );
}

export function Hero3DScene({ className }: { className?: string }) {
  return (
    <CanvasWrapper variant="hero" className={className}>
      <HeroScene />
    </CanvasWrapper>
  );
}

export function Showcase3DScene({ className }: { className?: string }) {
  return (
    <CanvasWrapper variant="showcase" className={className}>
      <ShowcaseScene />
    </CanvasWrapper>
  );
}
