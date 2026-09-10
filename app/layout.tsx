import type { Metadata, Viewport } from "next";
import "./globals.css";
import { constructMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

// Using system font stack to avoid Google Fonts network dependency in build
// Geist font will be added via local files or CDN in Phase 2 if needed
// Current tokens.css defines --font-sans and --font-mono with system fallbacks

export const metadata: Metadata = constructMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        {/* Skip to content - accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[hsl(var(--foreground))] focus:text-[hsl(var(--background))] focus:rounded-md"
        >
          Skip to main content
        </a>

        <MotionProvider>
          {/* Scroll progress - subtle 1-2px premium */}
          <ScrollProgress height={1} />

          <Header />

          <main id="main-content" className="flex-1 w-full">
            {children}
          </main>

          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
