import { Article } from "@repo/ui/components/layout/server/article";
import {
  TableOfContents,
  TableOfContentsHeader,
  TableOfContentsContent,
  TableOfContentsNav,
  TableOfContentsItem,
  type TableOfContentsItem as TocItem,
} from "@repo/ui/components/page/client/table-of-contents";
import {
  PageNavigation,
  PageNavigationNext,
  PageNavigationPrevious,
} from "@repo/ui/components/page/server/page-navigation";
import React from "react";

export const metadata = {
  title: "Getting Started - Caching and Revalidating in Next.js",
  description:
    "Learn how to cache data and revalidate it efficiently in Next.js to optimize performance and ensure fresh content.",
};

// ============================================================================
// Table of Contents Data (Hardcoded inline)
// ============================================================================

const tableOfContentsData = [
  { id: "introduction", title: "Introduction", level: 2 },
  { id: "caching-overview", title: "What is Data Caching?", level: 2 },
  { id: "revalidation-strategies", title: "Revalidation Strategies", level: 3 },
  { id: "time-based", title: "Time-based Revalidation", level: 3 },
  { id: "on-demand", title: "On-demand Revalidation", level: 3 },
  { id: "examples", title: "Examples", level: 3 },
  { id: "resources", title: "Further Resources", level: 3 },
] satisfies TocItem[];

export default function CachingRevalidatingLayout({
  // fetch,
  quotePostsDemo,
}: {
  // fetch: React.ReactNode;
  quotePostsDemo: React.ReactNode;
}) {
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

      <div className="relative  py-8">
        {/* Main content container with responsive grid */}
        <div className="grid xl:grid-cols-[1fr_230px]">
          <main className="space-y-8 max-w-[1200px] mx-auto px-4 xl:px-0 bg-white dark:bg-zinc-900">
            <Article
              title="Caching and Revalidating"
              description={
                <>
                  Caching and revalidating are essential techniques in Next.js
                  that help you optimize performance by storing fetched data and
                  controlling when that data should be refreshed. This ensures
                  your application is both fast and up-to-date with the latest
                  information.
                </>
              }
              officialDocsLink="https://nextjs.org/docs/app/getting-started/caching-and-revalidating"
              githubSrcLink="#"
            >
              <div className="space-y-10">
                {/* {fetch} */}
                {quotePostsDemo}
              </div>
            </Article>

            <PageNavigation className="max-w-[1150px] mx-auto">
              <PageNavigationPrevious href="/nextjs-demo/demo/getting-started/cache-components">
                Cache Components
              </PageNavigationPrevious>
              <PageNavigationNext href="/nextjs-demo/demo/getting-started/data-fetching">
                Partial Prerendering
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
