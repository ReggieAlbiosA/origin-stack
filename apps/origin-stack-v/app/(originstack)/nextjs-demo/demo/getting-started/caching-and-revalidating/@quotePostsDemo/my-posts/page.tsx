// app/posts/my-posts/page.tsx

import { cacheTag } from "next/cache";
import { prisma } from "@repo/database/prisma";
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
import Link from "next/link";
import { Route } from "next";
import { auth } from "@repo/auth/auth";
import { headers } from "next/headers";
import { Prisma } from "@repo/database/client";

// Define the return type using Prisma's utility type
type QuoteWithUser = Prisma.QuotePostGetPayload<{
  include: { user: true };
}>;

// ✅ Get posts by authenticated user ID
async function getMyQuotePosts(userId: string): Promise<QuoteWithUser[]> {
  "use cache";
  cacheTag("my-posts");

  const quotes = await prisma.quotePost.findMany({
    where: {
      userId,
    },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return quotes;
}

// ✅ Component to display user's posts
async function MyPosts() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Sign In Required</EmptyTitle>
          <EmptyDescription>
            You need to be signed in to view your posts.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }
  const quotes: QuoteWithUser[] = await getMyQuotePosts(session.user.id);

  if (!quotes || quotes.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No Posts Yet</EmptyTitle>
          <EmptyDescription>
            You haven't created any posts yet, {session.user.name}. Start
            sharing your inspiring quotes!
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header with post count */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            My Posts
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            You have shared{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-200">
              {quotes.length}
            </span>{" "}
            {quotes.length === 1 ? "quote" : "quotes"} with the community
          </p>
        </div>
        <Link
          href={
            "/nextjs-demo/demo/getting-started/caching-and-revalidating/create-posts" as Route
          }
          className="inline-flex items-center px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md active:scale-95"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create New Post
        </Link>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotes.map((quote) => (
          <Card
            key={quote.id}
            className="group relative overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/50 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-zinc-50/50 dark:to-zinc-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400 tracking-tight">
                    YOUR POST
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
                  {quote.views} views
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {quote.user?.name?.[0]?.toUpperCase() || "A"}
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

              <div className="flex items-center justify-end pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                <button className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1">
                  Edit Post
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function MyPostsPage() {
  return (
    <div className="container mx-auto p-6">
      <Suspense
        fallback={
          <div className="text-center py-12 text-zinc-500">
            Loading your posts...
          </div>
        }
      >
        <MyPosts />
      </Suspense>
    </div>
  );
}
