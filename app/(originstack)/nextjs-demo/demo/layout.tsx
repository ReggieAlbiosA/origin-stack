import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarNavigation,
  SidebarNavigationSection,
  SidebarNavigationTrigger,
  SidebarNavigationGroup,
  SidebarNavigationItemLink,
  type NavigationSection,
  type NavigationItem,
} from "@/components/composables/client/sidebar";
import { VersionNavigation } from "@/components/composables/client/version-navigation";

// Navigation data structure
const navigationSections = [
  {
    title: "Getting Started",
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
        label: "Layout and Pages",
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
      { label: "CSS", href: "/nextjs-demo/demo/getting-started/css" },
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
      { label: "Proxy", href: "/nextjs-demo/demo/getting-started/proxy" },
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
    title: "Guides",
    collapsible: true,
    defaultOpen: false,
    items: [
      { label: "Routing", href: "/nextjs-demo/demo/guides/routing" },
      {
        label: "Data Fetching",
        href: "/nextjs-demo/demo/guides/data-fetching",
      },
      { label: "API Routes", href: "/nextjs-demo/demo/guides/api-routes" },
      { label: "Middleware", href: "/nextjs-demo/demo/guides/middleware" },
      { label: "Caching", href: "/nextjs-demo/demo/guides/caching" },
      {
        label: "Authentication",
        href: "/nextjs-demo/demo/guides/authentication",
      },
      {
        label: "Backend for Frontend",
        href: "/nextjs-demo/demo/guides/backend-for-frontend",
      },
      {
        label: "CI Build Caching",
        href: "/nextjs-demo/demo/guides/ci-build-caching",
      },
      {
        label: "Content Security Policy",
        href: "/nextjs-demo/demo/guides/content-security-policy",
      },
      { label: "CSS-in-JS", href: "/nextjs-demo/demo/guides/css-in-js" },
      {
        label: "Custom Server",
        href: "/nextjs-demo/demo/guides/custom-server",
      },
      {
        label: "Data Security",
        href: "/nextjs-demo/demo/guides/data-security",
      },
      { label: "Debugging", href: "/nextjs-demo/demo/guides/debugging" },
      { label: "Draft Mode", href: "/nextjs-demo/demo/guides/draft-mode" },
      {
        label: "Environment Variables",
        href: "/nextjs-demo/demo/guides/environment-variables",
      },
      { label: "Forms", href: "/nextjs-demo/demo/guides/forms" },
      { label: "ISR", href: "/nextjs-demo/demo/guides/isr" },
      {
        label: "Instrumentation",
        href: "/nextjs-demo/demo/guides/instrumentation",
      },
      {
        label: "Internationalization",
        href: "/nextjs-demo/demo/guides/internationalization",
      },
      { label: "JSON-LD", href: "/nextjs-demo/demo/guides/json-ld" },
      { label: "Lazy Loading", href: "/nextjs-demo/demo/guides/lazy-loading" },
      {
        label: "Development Environment",
        href: "/nextjs-demo/demo/guides/development-environment",
      },
      {
        label: "Next.js MCP Server",
        href: "/nextjs-demo/demo/guides/mcp-server",
      },
      { label: "MDX", href: "/nextjs-demo/demo/guides/mdx" },
      { label: "Memory Usage", href: "/nextjs-demo/demo/guides/memory-usage" },
      {
        label: "Migrating",
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            label: "App Router",
            href: "/nextjs-demo/demo/guides/migrating/app-router",
          },
          {
            label: "Create React App",
            href: "/nextjs-demo/demo/guides/migrating/create-react-app",
          },
          { label: "Vite", href: "/nextjs-demo/demo/guides/migrating/vite" },
        ],
      },
      { label: "Multi-tenant", href: "/nextjs-demo/demo/guides/multi-tenant" },
      { label: "Multi-zones", href: "/nextjs-demo/demo/guides/multi-zones" },
      {
        label: "OpenTelemetry",
        href: "/nextjs-demo/demo/guides/opentelemetry",
      },
      {
        label: "Package Bundling",
        href: "/nextjs-demo/demo/guides/package-bundling",
      },
      { label: "Prefetching", href: "/nextjs-demo/demo/guides/prefetching" },
      { label: "Production", href: "/nextjs-demo/demo/guides/production" },
      { label: "PWAs", href: "/nextjs-demo/demo/guides/pwas" },
      { label: "Redirecting", href: "/nextjs-demo/demo/guides/redirecting" },
      { label: "Sass", href: "/nextjs-demo/demo/guides/sass" },
      { label: "Scripts", href: "/nextjs-demo/demo/guides/scripts" },
      { label: "Self-hosting", href: "/nextjs-demo/demo/guides/self-hosting" },
      { label: "SPAs", href: "/nextjs-demo/demo/guides/spa" },
      { label: "Static Exports", href: "/nextjs-demo/demo/guides/spa" },
      { label: "Tailwind CSS v3", href: "/nextjs-demo/demo/guides/spa" },
      { label: "Testing", href: "/nextjs-demo/demo/guides/spa" },
      { label: "Third Party Libraries", href: "/nextjs-demo/demo/guides/spa" },
      {
        label: "Testing",
        collapsible: true,
        defaultOpen: false,
        children: [
          { label: "Cypress", href: "/nextjs-demo/demo/guides/testing/jest" },
          { label: "Jest", href: "/nextjs-demo/demo/guides/testing/jest" },
          {
            label: "Playwright",
            href: "/nextjs-demo/demo/guides/testing/playwright",
          },
          { label: "Vitest", href: "/nextjs-demo/demo/guides/testing/testing" },
        ],
      },
      {
        label: "Third Party Libraries",
        href: "/nextjs-demo/demo/guides/typescript",
      },
      {
        label: "Upgrading",
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            label: "Codemods",
            href: "/nextjs-demo/demo/guides/upgrading/upgrading",
          },
          {
            label: "Version 14",
            href: "/nextjs-demo/demo/guides/upgrading/upgrading",
          },
          {
            label: "Version 15",
            href: "/nextjs-demo/demo/guides/upgrading/upgrading",
          },
          {
            label: "Version 16",
            href: "/nextjs-demo/demo/guides/upgrading/upgrading",
          },
        ],
      },
      { label: "Videos", href: "/nextjs-demo/demo/guides/view-transitions" },
    ],
  },
  {
    title: "API References",
    collapsible: false,
    defaultOpen: false,
    items: [
      {
        label: "Directives",
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            label: "use cache",
            href: "/nextjs-demo/demo/api-references/directives/use-client",
          },
          {
            label: "use cache: private",
            href: "/nextjs-demo/demo/api-references/directives/use-server",
          },
          {
            label: "use cache: remote",
            href: "/nextjs-demo/demo/api-references/directives/use-effect",
          },
          {
            label: "use client",
            href: "/nextjs-demo/demo/api-references/directives/use-layout-effect",
          },
          {
            label: "use server",
            href: "/nextjs-demo/demo/api-references/directives/use-memo",
          },
        ],
      },
      {
        label: "Components",
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            label: "Font",
            href: "/nextjs-demo/demo/api-references/functions/fetch",
          },
          {
            label: "Form Component",
            href: "/nextjs-demo/demo/api-references/functions/redirect",
          },
          {
            label: "Image Component",
            href: "/nextjs-demo/demo/api-references/functions/rewrite",
          },
          {
            label: "Script Component",
            href: "/nextjs-demo/demo/api-references/functions/headers",
          },
        ],
      },
      {
        label: "File-system convetions",
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            label: "default.js",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/layouts",
          },
          {
            label: "Dynamic Segments",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/pages",
          },
          {
            label: "error.js",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/api-routes",
          },
          {
            label: "forbidden.js",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/middleware",
          },
          {
            label: "intrumentaion.js",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/error-handling",
          },
          {
            label: "intrumentation-client.js",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/error-handling",
          },
          {
            label: "Intercepting Routes",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/error-handling",
          },
          {
            label: "layout.js",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/error-handling",
          },
          {
            label: "loading.js",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/error-handling",
          },
          {
            label: "mdx-components.js",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/error-handling",
          },
          {
            label: "not-found.js",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/error-handling",
          },
          {
            label: "page.js",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/error-handling",
          },
          {
            label: "Parallel Routes",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/error-handling",
          },
          {
            label: "proxy.js",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/error-handling",
          },
          {
            label: "public",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/error-handling",
          },
          {
            label: "route.js",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/error-handling",
          },
          {
            label: "Route Groups",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/error-handling",
          },
          {
            label: "Route Segment Config",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/error-handling",
          },
          {
            label: "src",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/error-handling",
          },
          {
            label: "template.js",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/error-handling",
          },
          {
            label: "unauthorized.js",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/error-handling",
          },
          {
            label: "Metadata Files",
            href: "/nextjs-demo/demo/api-references/file-system-conventions/error-handling",
          },
        ],
      },
      {
        label: "Functions",
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            label: "abort",
            href: "/nextjs-demo/demo/api-references/functions/abort",
          },
          {
            label: "coalesce",
            href: "/nextjs-demo/demo/api-references/functions/coalesce",
          },
          {
            label: "cacheTags",
            href: "/nextjs-demo/demo/api-references/functions/cacheTags",
          },
          {
            label: "connection",
            href: "/nextjs-demo/demo/api-references/functions/connection",
          },
          {
            label: "cookies",
            href: "/nextjs-demo/demo/api-references/functions/cookies",
          },
          {
            label: "draftMode",
            href: "/nextjs-demo/demo/api-references/functions/draftMode",
          },
          {
            label: "fetch",
            href: "/nextjs-demo/demo/api-references/functions/fetch",
          },
          {
            label: "formData",
            href: "/nextjs-demo/demo/api-references/functions/formData",
          },
          {
            label: "generateImageMetadata",
            href: "/nextjs-demo/demo/api-references/functions/generateImageMetadata",
          },
          {
            label: "generateMetadata",
            href: "/nextjs-demo/demo/api-references/functions/generateMetadata",
          },
          {
            label: "generateSitemaps",
            href: "/nextjs-demo/demo/api-references/functions/generateSitemaps",
          },
          {
            label: "generateStaticParams",
            href: "/nextjs-demo/demo/api-references/functions/generateStaticParams",
          },
          {
            label: "generateViewport",
            href: "/nextjs-demo/demo/api-references/functions/generateViewport",
          },
          {
            label: "headers",
            href: "/nextjs-demo/demo/api-references/functions/headers",
          },
          {
            label: "ImageResponse",
            href: "/nextjs-demo/demo/api-references/functions/ImageResponse",
          },
          {
            label: "NextRequest",
            href: "/nextjs-demo/demo/api-references/functions/NextRequest",
          },
          {
            label: "NextResponse",
            href: "/nextjs-demo/demo/api-references/functions/NextResponse",
          },
          {
            label: "notFound",
            href: "/nextjs-demo/demo/api-references/functions/notFound",
          },
          {
            label: "permanentRedirect",
            href: "/nextjs-demo/demo/api-references/functions/permanentRedirect",
          },
          {
            label: "redirect",
            href: "/nextjs-demo/demo/api-references/functions/redirect",
          },
          {
            label: "refresh",
            href: "/nextjs-demo/demo/api-references/functions/refresh",
          },
          {
            label: "revalidatePath",
            href: "/nextjs-demo/demo/api-references/functions/revalidatePath",
          },
          {
            label: "revalidateTag",
            href: "/nextjs-demo/demo/api-references/functions/revalidateTag",
          },
          {
            label: "setImmediate",
            href: "/nextjs-demo/demo/api-references/functions/setImmediate",
          },
          {
            label: "unstable_cache",
            href: "/nextjs-demo/demo/api-references/functions/unstable_cache",
          },
          {
            label: "unstable_redirect",
            href: "/nextjs-demo/demo/api-references/functions/unstable_redirect",
          },
          {
            label: "unstable_revalidatePath",
            href: "/nextjs-demo/demo/api-references/functions/unstable_revalidatePath",
          },
          {
            label: "unstable_rethrow",
            href: "/nextjs-demo/demo/api-references/functions/unstable_rethrow",
          },
          {
            label: "useId",
            href: "/nextjs-demo/demo/api-references/functions/useId",
          },
          {
            label: "useOptimistic",
            href: "/nextjs-demo/demo/api-references/functions/useOptimistic",
          },
          {
            label: "useFormStatus",
            href: "/nextjs-demo/demo/api-references/functions/useFormStatus",
          },
          {
            label: "usePathname",
            href: "/nextjs-demo/demo/api-references/functions/usePathname",
          },
          {
            label: "useRouter",
            href: "/nextjs-demo/demo/api-references/functions/useRouter",
          },
          {
            label: "useSearchParams",
            href: "/nextjs-demo/demo/api-references/functions/useSearchParams",
          },
          {
            label: "useSelectedLayoutSegment",
            href: "/nextjs-demo/demo/api-references/functions/useSelectedLayoutSegment",
          },
          {
            label: "useSelectedLayoutSegments",
            href: "/nextjs-demo/demo/api-references/functions/useSelectedLayoutSegments",
          },
          {
            label: "userAgent",
            href: "/nextjs-demo/demo/api-references/functions/userAgent",
          },
        ],
      },
      {
        label: "Configuration",
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            label: "next.config.js",
            href: "/nextjs-demo/demo/api-references/configuration/next-config",
          },
          {
            label: "Options",
            collapsible: true,
            defaultOpen: false,
            children: [
              {
                label: "experimental.adapterPath",
                href: "/nextjs-demo/demo/api-references/configuration/experimental-adapterPath",
              },
              {
                label: "allowedDevOrigins",
                href: "/nextjs-demo/demo/api-references/configuration/allowedDevOrigins",
              },
              {
                label: "appDir",
                href: "/nextjs-demo/demo/api-references/configuration/appDir",
              },
              {
                label: "assetPrefix",
                href: "/nextjs-demo/demo/api-references/configuration/assetPrefix",
              },
              {
                label: "authInterrupts",
                href: "/nextjs-demo/demo/api-references/configuration/authInterrupts",
              },
              {
                label: "basePath",
                href: "/nextjs-demo/demo/api-references/configuration/basePath",
              },
              {
                label: "browserDebugInfoInTier",
                href: "/nextjs-demo/demo/api-references/configuration/browserDebugInfoInTier",
              },
              {
                label: "cacheComponents",
                href: "/nextjs-demo/demo/api-references/configuration/cacheComponents",
              },
              {
                label: "cacheLife",
                href: "/nextjs-demo/demo/api-references/configuration/cacheLife",
              },
              {
                label: "compress",
                href: "/nextjs-demo/demo/api-references/configuration/compress",
              },
              {
                label: "crossOrigin",
                href: "/nextjs-demo/demo/api-references/configuration/crossOrigin",
              },
              {
                label: "cssChunking",
                href: "/nextjs-demo/demo/api-references/configuration/cssChunking",
              },
              {
                label: "devIndicators",
                href: "/nextjs-demo/demo/api-references/configuration/devIndicators",
              },
              {
                label: "distDir",
                href: "/nextjs-demo/demo/api-references/configuration/distDir",
              },
              {
                label: "env",
                href: "/nextjs-demo/demo/api-references/configuration/env",
              },
              {
                label: "expireTime",
                href: "/nextjs-demo/demo/api-references/configuration/expireTime",
              },
              {
                label: "exportPathMap",
                href: "/nextjs-demo/demo/api-references/configuration/exportPathMap",
              },
              {
                label: "generateBuildId",
                href: "/nextjs-demo/demo/api-references/configuration/generateBuildId",
              },
              {
                label: "generateEtags",
                href: "/nextjs-demo/demo/api-references/configuration/generateEtags",
              },
              {
                label: "headers",
                href: "/nextjs-demo/demo/api-references/configuration/headers",
              },
              {
                label: "htmlLimitedBots",
                href: "/nextjs-demo/demo/api-references/configuration/htmlLimitedBots",
              },
              {
                label: "httpAgentOptions",
                href: "/nextjs-demo/demo/api-references/configuration/httpAgentOptions",
              },
              {
                label: "images",
                href: "/nextjs-demo/demo/api-references/configuration/images",
              },
              {
                label: "cacheHandler",
                href: "/nextjs-demo/demo/api-references/configuration/cacheHandler",
              },
              {
                label: "inlineCss",
                href: "/nextjs-demo/demo/api-references/configuration/inlineCss",
              },
              {
                label: "isolatedDevBuild",
                href: "/nextjs-demo/demo/api-references/configuration/isolatedDevBuild",
              },
              {
                label: "logging",
                href: "/nextjs-demo/demo/api-references/configuration/logging",
              },
              {
                label: "mdxRs",
                href: "/nextjs-demo/demo/api-references/configuration/mdxRs",
              },
              {
                label: "onDemandEntries",
                href: "/nextjs-demo/demo/api-references/configuration/onDemandEntries",
              },
              {
                label: "optimizePackageImports",
                href: "/nextjs-demo/demo/api-references/configuration/optimizePackageImports",
              },
              {
                label: "output",
                href: "/nextjs-demo/demo/api-references/configuration/output",
              },
              {
                label: "pageExtensions",
                href: "/nextjs-demo/demo/api-references/configuration/pageExtensions",
              },
              {
                label: "poweredByHeader",
                href: "/nextjs-demo/demo/api-references/configuration/poweredByHeader",
              },
              {
                label: "productionBrowserSourceMaps",
                href: "/nextjs-demo/demo/api-references/configuration/productionBrowserSourceMaps",
              },
              {
                label: "proxyClientMaxBodySize",
                href: "/nextjs-demo/demo/api-references/configuration/proxyClientMaxBodySize",
              },
              {
                label: "reactCompiler",
                href: "/nextjs-demo/demo/api-references/configuration/reactCompiler",
              },
              {
                label: "reactMaxHeadersLength",
                href: "/nextjs-demo/demo/api-references/configuration/reactMaxHeadersLength",
              },
              {
                label: "reactStrictMode",
                href: "/nextjs-demo/demo/api-references/configuration/reactStrictMode",
              },
              {
                label: "redirects",
                href: "/nextjs-demo/demo/api-references/configuration/redirects",
              },
              {
                label: "rewrites",
                href: "/nextjs-demo/demo/api-references/configuration/rewrites",
              },
              {
                label: "sassOptions",
                href: "/nextjs-demo/demo/api-references/configuration/sassOptions",
              },
              {
                label: "serverActions",
                href: "/nextjs-demo/demo/api-references/configuration/serverActions",
              },
              {
                label: "serverComponentsExternalPackages",
                href: "/nextjs-demo/demo/api-references/configuration/serverComponentsExternalPackages",
              },
              {
                label: "staleTimes",
                href: "/nextjs-demo/demo/api-references/configuration/staleTimes",
              },
              {
                label: "staticGeneration",
                href: "/nextjs-demo/demo/api-references/configuration/staticGeneration",
              },
              {
                label: "taint",
                href: "/nextjs-demo/demo/api-references/configuration/taint",
              },
              {
                label: "trailingSlash",
                href: "/nextjs-demo/demo/api-references/configuration/trailingSlash",
              },
              {
                label: "transpilePackages",
                href: "/nextjs-demo/demo/api-references/configuration/transpilePackages",
              },
              {
                label: "turbopack",
                href: "/nextjs-demo/demo/api-references/configuration/turbopack",
              },
              {
                label: "turbopackFileSystemCache",
                href: "/nextjs-demo/demo/api-references/configuration/turbopackFileSystemCache",
              },
              {
                label: "typedRoutes",
                href: "/nextjs-demo/demo/api-references/configuration/typedRoutes",
              },
              {
                label: "tripleBarrel",
                href: "/nextjs-demo/demo/api-references/configuration/tripleBarrel",
              },
              {
                label: "turboSwcMinifier",
                href: "/nextjs-demo/demo/api-references/configuration/turboSwcMinifier",
              },
              {
                label: "urlImports",
                href: "/nextjs-demo/demo/api-references/configuration/urlImports",
              },
              {
                label: "useLightningcss",
                href: "/nextjs-demo/demo/api-references/configuration/useLightningcss",
              },
              {
                label: "viewTransition",
                href: "/nextjs-demo/demo/api-references/configuration/viewTransition",
              },
              {
                label: "webpack",
                href: "/nextjs-demo/demo/api-references/configuration/webpack",
              },
              {
                label: "webVitalsAttribution",
                href: "/nextjs-demo/demo/api-references/configuration/webVitalsAttribution",
              },
            ],
          },
        ],
      },
      {
        label: "TypeScript",
        href: "/nextjs-demo/demo/api-references/typescript",
      },
      { label: "ESLint", href: "/nextjs-demo/demo/api-references/eslint" },
    ],
  },
  {
    title: "Architecture",
    collapsible: false,
    defaultOpen: false,
    items: [
      {
        label: "Acessibility",
        href: "/nextjs-demo/demo/architecture/app-router",
      },
      {
        label: "Fast Refresh",
        href: "/nextjs-demo/demo/architecture/server-actions",
      },
      {
        label: "Next.js Compiler",
        href: "/nextjs-demo/demo/architecture/static-generation",
      },
      {
        label: "Supported Browsers",
        href: "/nextjs-demo/demo/architecture/incremental-static-generation",
      },
    ],
  },
  {
    title: "Community",
    collapsible: false,
    defaultOpen: false,
    items: [
      {
        label: "Contribution Guide",
        href: "/nextjs-demo/demo/community/contribution-guide",
      },
      { label: "Rspack", href: "/nextjs-demo/demo/community/github" },
    ],
  },
] satisfies NavigationSection[];

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const renderNavigationItem = (item: NavigationItem, key: string) => {
    if (item.children) {
      return (
        <SidebarNavigationSection
          key={key}
          collapsible={item.collapsible}
          defaultOpen={item.defaultOpen}
        >
          <SidebarNavigationTrigger>{item.label}</SidebarNavigationTrigger>
          <SidebarNavigationGroup>
            {item.children.map((child, idx) => (
              <SidebarNavigationItemLink
                key={`${key}-child-${idx}`}
                href={child.href || "#"}
              >
                {child.label}
              </SidebarNavigationItemLink>
            ))}
          </SidebarNavigationGroup>
        </SidebarNavigationSection>
      );
    }
    return (
      <SidebarNavigationItemLink key={key} href={item.href || "#"}>
        {item.label}
      </SidebarNavigationItemLink>
    );
  };

  return (
    <div className="flex min-h-[calc(100vh-65px)] bg-white dark:bg-zinc-900">
      <aside
        className="hidden lg:block"
        role="complementary"
        aria-label="Table of contents"
      >
        <Sidebar width={265} topOffset={65} sticky>
          <SidebarHeader>
            <VersionNavigation versionLabel="Next.js 16.0.1" />
          </SidebarHeader>

          <SidebarContent>
            <SidebarNavigation>
              {navigationSections.map((section, sectionIdx) => (
                <SidebarNavigationSection
                  key={sectionIdx}
                  collapsible={section.collapsible}
                  defaultOpen={section.defaultOpen}
                >
                  <SidebarNavigationTrigger>
                    {section.title}
                  </SidebarNavigationTrigger>
                  <SidebarNavigationGroup>
                    {section.items.map((item, itemIdx) =>
                      renderNavigationItem(item, `${sectionIdx}-${itemIdx}`)
                    )}
                  </SidebarNavigationGroup>
                </SidebarNavigationSection>
              ))}
            </SidebarNavigation>
          </SidebarContent>
        </Sidebar>
      </aside>

      <div className="flex-1 bg-white dark:bg-zinc-900 h-min">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
