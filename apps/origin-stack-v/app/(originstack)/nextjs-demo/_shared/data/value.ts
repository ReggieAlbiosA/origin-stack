import type { NavItem } from "@repo/ui/components/header/client/navigation-menu";

/**
 * Navigation items for Next.js Demo header
 * Used in the main navigation menu
 */
export const navigationItems: NavItem[] = [
  {
    label: "Learn",
    type: "sub",
    children: [
      {
        label: "Server Components",
        href: "/nextjs-demo/features/server-components",
        type: "main",
        description:
          "Build faster apps with React Server Components in Next.js.",
      },
      {
        label: "App Router",
        href: "/nextjs-demo/features/app-router",
        type: "main",
        description:
          "Explore the new file-system based router for Next.js 13+.",
      },
      {
        label: "Data Fetching",
        href: "/nextjs-demo/features/data-fetching",
        type: "main",
        description: "Learn server-side rendering, static generation, and ISR.",
      },
      {
        label: "API Routes",
        href: "/nextjs-demo/features/api-routes",
        type: "main",
        description: "Create serverless API endpoints with Next.js API routes.",
      },
      {
        label: "Middleware",
        href: "/nextjs-demo/features/middleware",
        type: "main",
        description: "Run code before requests complete with Edge Middleware.",
      },
      {
        label: "Optimization",
        href: "/nextjs-demo/features/optimization",
        type: "main",
        description: "Optimize images, fonts, and scripts automatically.",
      },
    ],
  },
  {
    label: "Demo",
    href: "/nextjs-demo/demo",
    type: "main",
  },
];
