import type { SidebarConfig } from "@/components/composables/client/sidebar";

/**
 * Demo page content values
 */
export const demoPageTitle = "Next.js Component Demo";

export const demoPageDescription =
  "This page demonstrates the reusable composite UI components with Next.js-specific navigation and content structure.";

export const demoFeatures = [
  "App Router compatibility with nested layouts",
  "Server and Client Component integration",
  "File-system based routing structure",
  "Metadata API for SEO optimization",
  "TypeScript-first development experience",
  "Dark mode with next-themes integration",
  "Responsive navigation with mobile support",
];

export const demoConfigurationTypes = [
  {
    title: "Routing Structure",
    description:
      "The demo follows Next.js App Router conventions with route groups, parallel routes, and nested layouts for maximum flexibility.",
  },
  {
    title: "Server Components",
    description:
      "Most components are Server Components by default, with 'use client' directive only where needed for interactivity (like theme toggle and navigation).",
  },
  {
    title: "Metadata Management",
    description:
      "Each route can export metadata for SEO, including Open Graph tags, Twitter cards, and structured data for search engines.",
  },
  {
    title: "Performance Optimization",
    description:
      "Built-in image optimization, font optimization, and automatic code splitting ensure fast page loads and optimal Core Web Vitals.",
  },
];

export const demoCallToAction = {
  title: "Try the Navigation",
  description:
    "Explore the sidebar navigation on the left, use the table of contents on the right, and test the mobile menu to see how all components work together seamlessly!",
};

/**
 * Page navigation for previous/next links
 */
export const demoPageNavigation = {
  previous: {
    label: "Previous Page",
    title: "Introduction",
    href: "/nextjs-demo",
  },
  next: {
    label: "Next Page",
    title: "Getting Started",
    href: "/nextjs-demo/getting-started/installation",
  },
};

/**
 * Sidebar configuration for Next.js Demo
 * Used in the demo layout to display navigation
 */
export const sidebarConfig: SidebarConfig = {
  sections: [
    {
      title: "GETTING STARTED",
      collapsible: false,
      defaultOpen: true,
      items: [
        {
          label: "Installation",
          href: "/nextjs-demo/demo/getting-started/installation",
        },
        {
          label: "Project Structure",
          href: "/nextjs-demo/demo/getting-started/project-structure",
        },
        {
          label: "Layouts and Pages",
          href: "/nextjs-demo/demo/getting-started/layouts-and-pages",
        },
        {
          label: "Linking and Navigating",
          href: "/nextjs-demo/demo/getting-started/linking-and-navigating",
        },
        {
          label: "Server and Client Components",
          href: "/nextjs-demo/demo/getting-started/server-and-client-components",
        },
        {
          label: "Cache Components",
          href: "/nextjs-demo/demo/getting-started/cache-components",
        },
        {
          label: "Fetching Data",
          href: "/nextjs-demo/demo/getting-started/fetching-data",
        },
        {
          label: "Updating Data",
          href: "/nextjs-demo/demo/getting-started/updating-data",
        },
        {
          label: "Caching and Revalidating",
          href: "/nextjs-demo/demo/getting-started/caching-and-revalidating",
        },
        {
          label: "Error Handling",
          href: "/nextjs-demo/demo/getting-started/error-handling",
        },
        {
          label: "CSS",
          href: "/nextjs-demo/demo/getting-started/css",
        },
        {
          label: "Image Optimization",
          href: "/nextjs-demo/demo/getting-started/image-optimization",
        },
        {
          label: "Font Optimization",
          href: "/nextjs-demo/demo/getting-started/font-optimization",
        },
        {
          label: "Metadata and OG images",
          href: "/nextjs-demo/demo/getting-started/metadata-og-images",
        },
        {
          label: "Route Handlers",
          href: "/nextjs-demo/demo/getting-started/route-handlers",
        },
        {
          label: "Proxy",
          href: "/nextjs-demo/demo/getting-started/proxy",
        },
        {
          label: "Deploying",
          href: "/nextjs-demo/demo/getting-started/deploying",
        },
        {
          label: "Upgrading",
          href: "/nextjs-demo/demo/getting-started/upgrading",
        },
      ],
    },
    {
      title: "CORE FEATURES",
      collapsible: true,
      defaultOpen: true,
      items: [
        {
          label: "App Router",
          href: "/nextjs-demo/features/app-router",
        },
        {
          label: "Server Components",
          href: "/nextjs-demo/features/server-components",
        },
        {
          label: "Data fetching",
          href: "/nextjs-demo/features/data-fetching",
        },
        {
          label: "Caching",
          href: "/nextjs-demo/features/caching",
        },
        {
          label: "Streaming",
          href: "/nextjs-demo/features/streaming",
        },
        {
          label: "Partial Prerendering",
          href: "/nextjs-demo/features/ppr",
        },
        {
          label: "Middleware",
          href: "/nextjs-demo/features/middleware",
        },
        {
          label: "API Routes",
          href: "/nextjs-demo/features/api-routes",
        },
      ],
    },
    {
      title: "OPTIMIZATION",
      collapsible: true,
      defaultOpen: false,
      items: [
        {
          label: "Performance",
          collapsible: true,
          defaultOpen: false,
          children: [
            {
              label: "Image Optimization",
              href: "/nextjs-demo/optimization/images",
              description: "Automatic image optimization",
            },
            {
              label: "Font Optimization",
              href: "/nextjs-demo/optimization/fonts",
              description: "Built-in font loading",
            },
          ],
        },
        {
          label: "SEO",
          collapsible: true,
          defaultOpen: false,
          children: [
            {
              label: "Metadata",
              href: "/nextjs-demo/seo/metadata",
              description: "Metadata API for SEO",
            },
            {
              label: "Sitemap & Robots",
              href: "/nextjs-demo/seo/sitemap",
              description: "Generate sitemaps",
            },
          ],
        },
        {
          label: "Bundle Analysis",
          href: "/nextjs-demo/optimization/bundle",
        },
        {
          label: "Code Splitting",
          href: "/nextjs-demo/optimization/code-splitting",
        },
      ],
    },
    {
      title: "Advanced Topics",
      collapsible: false,
      defaultOpen: false,
      items: [
        {
          label: "Parallel Routes",
          href: "/nextjs-demo/advanced/parallel-routes",
        },
        {
          label: "Intercepting Routes",
          href: "/nextjs-demo/advanced/intercepting-routes",
        },
        {
          label: "Route Handlers",
          href: "/nextjs-demo/advanced/route-handlers",
        },
      ],
    },
  ],
};
