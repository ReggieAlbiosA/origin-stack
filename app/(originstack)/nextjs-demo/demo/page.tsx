import {
  TableOfContents,
  TableOfContentsHeader,
  TableOfContentsContent,
  TableOfContentsNav,
  TableOfContentsItem,
  type TableOfContentsItem as TocItem,
} from "@/components/page/client/table-of-contents";
import {
  PageNavigation,
  PageNavigationPrevious,
  PageNavigationNext,
} from "@/components/page/server/page-navigation";

// ============================================================================
// Page Data (All hardcoded inline - like layout.tsx pattern)
// ============================================================================

const pageData = {
  title: "Reusable Sidebar Component",
  description:
    "A flexible, reusable sidebar component built with Next.js and TypeScript. Features collapsible sections, nested navigation, and full customization.",
  features: [
    "Fully typed with TypeScript",
    "Collapsible sections with smooth animations",
    "Nested navigation support",
    "Active state management",
    "Responsive design",
    "Dark mode support",
    "Accessible (ARIA labels)",
    "Easy to customize",
  ],
  configTypes: [
    {
      title: "Basic Configuration",
      description: "Simple sidebar with static links and basic styling.",
    },
    {
      title: "Advanced Configuration",
      description:
        "Includes collapsible sections, nested items, and custom icons.",
    },
    {
      title: "Custom Styling",
      description: "Fully customizable appearance with Tailwind CSS classes.",
    },
  ],
  callToAction: {
    title: "Get Started Today",
    description:
      "Ready to implement this sidebar in your project? Check out the documentation and examples to get started.",
  },
  navigation: {
    previous: {
      label: "Previous",
      title: "Introduction",
      href: "/nextjs-demo/demo/getting-started/installation",
    },
    next: {
      label: "Next",
      title: "Configuration",
      href: "/nextjs-demo/demo/getting-started/project-structure",
    },
  },
};

const tableOfContentsData = [
  { id: "features-heading", title: "Features", level: 2 },
  { id: "config-types-heading", title: "Configuration Types", level: 2 },
  { id: "config-0", title: "Basic Configuration", level: 3 },
  { id: "config-1", title: "Advanced Configuration", level: 3 },
  { id: "config-2", title: "Custom Styling", level: 3 },
  { id: "cta-heading", title: "Get Started Today", level: 2 },
] satisfies TocItem[];

export default function DemoPage() {
  return (
    <>
      {/* ✨ Mobile TOC - Sticky collapsible breadcrumb menu */}
      <TableOfContents variant="mobile" topOffset={65}>
        <TableOfContentsHeader title="On this page" />
        <TableOfContentsContent>
          <TableOfContentsNav>
            {tableOfContentsData.map((item) => (
              <TableOfContentsItem
                key={item.id}
                href={`#${item.id}`}
                level={item.level}
              >
                {item.title}
              </TableOfContentsItem>
            ))}
          </TableOfContentsNav>
        </TableOfContentsContent>
      </TableOfContents>

      <div className="relative min-h-screen py-8">
        {/* Main content container with responsive grid */}
        <div className="xl:grid xl:grid-cols-[1fr_245.996px] ">
          {/* Main content */}
          <main className="space-y-8 max-w-4xl mx-auto px-4 xl:px-0 bg-white dark:bg-zinc-900">
            <header className="scroll-mt-20">
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                {pageData.title}
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                {pageData.description}
              </p>
            </header>

            <div className="space-y-6">
              <section
                id="features-heading"
                className="space-y-3 scroll-mt-20"
                aria-labelledby="features-heading"
              >
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Features
                </h2>
                <ul
                  className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300"
                  role="list"
                  aria-label="Component features"
                >
                  {pageData.features.map((feature, index) => (
                    <li key={index} role="listitem">
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>

              <section
                id="config-types-heading"
                className="space-y-3 scroll-mt-20"
                aria-labelledby="config-types-heading"
              >
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Configuration Types
                </h2>
                <div
                  className="space-y-4"
                  role="list"
                  aria-label="Configuration type examples"
                >
                  {pageData.configTypes.map((config, index) => (
                    <article
                      key={index}
                      id={`config-${index}`}
                      className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg scroll-mt-20"
                      role="listitem"
                    >
                      <header>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                          {config.title}
                        </h3>
                      </header>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {config.description}
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              <section
                id="cta-heading"
                className="space-y-3 scroll-mt-20"
                aria-labelledby="cta-heading"
              >
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {pageData.callToAction.title}
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300">
                  {pageData.callToAction.description}
                </p>
              </section>
            </div>

            {/* Page Navigation - Previous/Next */}
            <PageNavigation>
              <PageNavigationPrevious href={pageData.navigation.previous.href}>
                {pageData.navigation.previous.title}
              </PageNavigationPrevious>
              <PageNavigationNext href={pageData.navigation.next.href}>
                {pageData.navigation.next.title}
              </PageNavigationNext>
            </PageNavigation>
          </main>

          {/* ✨ Desktop TOC - Sidebar for large screens */}
          <TableOfContents variant="desktop">
            <TableOfContentsNav title="On this page">
              {tableOfContentsData.map((item) => (
                <TableOfContentsItem
                  key={item.id}
                  href={`#${item.id}`}
                  level={item.level}
                >
                  {item.title}
                </TableOfContentsItem>
              ))}
            </TableOfContentsNav>
          </TableOfContents>
        </div>
      </div>
    </>
  );
}
