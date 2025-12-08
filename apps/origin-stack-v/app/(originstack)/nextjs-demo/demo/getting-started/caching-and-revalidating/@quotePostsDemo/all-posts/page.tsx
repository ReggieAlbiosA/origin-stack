// app/posts/page.tsx

import { cacheTag } from "next/cache";
import prisma from "@repo/database/lib/prisma";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/components/shadcn-ui/card";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@repo/ui/components/shadcn-ui/empty";
import { Suspense } from "react";
import { Prisma } from "@repo/database/generated/prisma/client";

// Define the return type using Prisma's utility type
type QuoteWithUser = Prisma.QuotePostGetPayload<{
  include: { user: true };
}>;

async function getLatestQuotePosts(): Promise<QuoteWithUser[]> {
  "use cache";
  cacheTag("all-posts");
  const quotes = await prisma.quotePost.findMany({
    include: { user: true }, // include user info
    orderBy: { createdAt: "desc" }, // latest first
    take: 10, // optional: limit to latest 10 posts
  });

  return quotes;
}

async function AllPosts() {
  const quotes: QuoteWithUser[] = await getLatestQuotePosts();

  if (!quotes || quotes.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No Data Yet</EmptyTitle>
          <EmptyDescription>
            There is nothing to show at the moment. Please check back later.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {quotes.map((quote) => (
        <Card
          key={quote.id}
          className="group relative overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/50 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-zinc-50/50 dark:to-zinc-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <CardHeader className="pb-3 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {(quote.user?.name?.[0] ?? "A").toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <CardTitle className="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-none">
                    {quote.user?.name ?? "Anonymous"}
                  </CardTitle>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                    {new Date(quote.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative">
            <div className="relative">
              <span className="absolute -top-2 -left-1 text-4xl text-zinc-200 dark:text-zinc-800 font-serif leading-none select-none">
                &ldquo;
              </span>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm pt-2 pl-2 relative z-10">
                {quote.content}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <AllPosts />
    </Suspense>
  );
}
