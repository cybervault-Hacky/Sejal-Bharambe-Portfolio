/**
 * Common shared types for the portfolio
 * Foundation for strict TypeScript architecture
 */

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Link {
  label: string;
  href: string;
  external?: boolean;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export type ThemeMode = "dark" | "light" | "system";
