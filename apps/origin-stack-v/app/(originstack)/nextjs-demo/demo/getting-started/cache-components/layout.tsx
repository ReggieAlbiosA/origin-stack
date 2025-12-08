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
  PageNavigationPrevious,
  PageNavigationNext,
} from "@repo/ui/components/page/server/page-navigation";

export const metadata = {
  title: "Getting Started - Partial Prerendering in Next.js",
  description:
    "Learn how to use Partial Prerendering (PPR) to combine a static shell with dynamic content for faster page loads.",
};

// ============================================================================
// Table of Contents Data (Hardcoded inline)
// ============================================================================

const tableOfContentsData = [
  { id: "introduction", title: "Introduction", level: 2 },
  { id: "ppr-overview", title: "What is Partial Prerendering?", level: 2 },
  { id: "usage", title: "How to Use PPR", level: 3 },
  { id: "examples", title: "Examples", level: 3 },
  { id: "resources", title: "Further Resources", level: 3 },
] satisfies TocItem[];

export default function PartialPrerenderingLayout({
  children,
}: {
  children: React.ReactNode;
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

      <div className="relative min-h-screen py-8">
        {/* Main content container with responsive grid */}
        <div className="xl:grid xl:grid-cols-[1fr_minmax(250px,285.996px)] ">
          <main className="space-y-8 max-w-[1200px] mx-auto px-4 xl:px-0 bg-white dark:bg-zinc-900">
            <Article
              title="Partial Prerendering"
              description={
                <>
                  Partial Prerendering (PPR) is a new rendering mode in Next.js
                  that allows you to serve a static shell of a page instantly,
                  with dynamic &quot;holes&quot; that are streamed in at request
                  time. This combines the performance of static sites with the
                  dynamism of server-rendered apps.
                </>
              }
              officialDocsLink="https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering"
              githubSrcLink="#"
            >
              <div className="space-y-8">{children}</div>
            </Article>

            <PageNavigation className="max-w-[1150px] mx-auto">
              <PageNavigationPrevious href="/docs/introduction">
                Introduction
              </PageNavigationPrevious>
              <PageNavigationNext href="/docs/getting-started">
                Getting Started
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
