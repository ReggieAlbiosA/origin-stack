import Link from "next/link";
import { Route } from "next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@repo/ui/components/shadcn-ui/card";
import { Button } from "@repo/ui/components/shadcn-ui/button";

export default function QuotePostsDemoPage() {
  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 mb-4">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Interactive Demo
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Quote Posts Demo
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          A practical demonstration of tag-based caching and revalidation
          strategies in Next.js. Learn how to cache data efficiently and
          invalidate it on-demand.
        </p>
      </div>

      {/* Key Concepts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <CardTitle className="text-lg">Tag-Based Caching</CardTitle>
            </div>
            <CardDescription>
              Cache data with custom tags for granular control
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-4 font-mono text-sm">
              <div className="text-zinc-500 dark:text-zinc-400 mb-1">
                {/* Using cacheTag directive */}
              </div>
              <div className="text-zinc-900 dark:text-zinc-100">
                <span className="text-purple-600 dark:text-purple-400">
                  &quot;use cache&quot;
                </span>
                <br />
                <span className="text-blue-600 dark:text-blue-400">
                  cacheTag
                </span>
                (
                <span className="text-green-600 dark:text-green-400">
                  &quot;all-posts&quot;
                </span>
                )
              </div>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Tag your cached data to enable selective invalidation. Multiple
              functions can share the same tag.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <CardTitle className="text-lg">Revalidation Strategies</CardTitle>
            </div>
            <CardDescription>
              Choose the right strategy for cache invalidation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-3 font-mono text-xs">
                <div className="text-zinc-500 dark:text-zinc-400 mb-1">
                  revalidateTag (stale-while-revalidate)
                </div>
                <div className="text-zinc-900 dark:text-zinc-100">
                  <span className="text-blue-600 dark:text-blue-400">
                    revalidateTag
                  </span>
                  (
                  <span className="text-green-600 dark:text-green-400">
                    &quot;all-posts&quot;
                  </span>
                  ,{" "}
                  <span className="text-green-600 dark:text-green-400">
                    &quot;max&quot;
                  </span>
                  )
                </div>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-3 font-mono text-xs">
                <div className="text-zinc-500 dark:text-zinc-400 mb-1">
                  updateTag (immediate expiration)
                </div>
                <div className="text-zinc-900 dark:text-zinc-100">
                  <span className="text-blue-600 dark:text-blue-400">
                    updateTag
                  </span>
                  (
                  <span className="text-green-600 dark:text-green-400">
                    &quot;my-posts&quot;
                  </span>
                  )
                </div>
              </div>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <strong>revalidateTag</strong> serves stale data while updating in
              the background. <strong>updateTag</strong> immediately expires
              cache for critical updates.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Demo Sections */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Explore the Demo
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {/* All Posts */}
          <Card className="group relative overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent dark:from-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <CardTitle className="text-lg">All Posts</CardTitle>
              </div>
              <CardDescription>
                View all community posts with cached data
              </CardDescription>
            </CardHeader>
            <CardContent className="relative space-y-3">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Demonstrates tag-based caching with{" "}
                <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                  cacheTag(&quot;all-posts&quot;)
                </code>
                . Data is cached and can be invalidated using{" "}
                <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                  revalidateTag
                </code>
                .
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link
                  href={
                    "/nextjs-demo/demo/getting-started/caching-and-revalidating/all-posts" as Route
                  }
                >
                  View All Posts
                  <svg
                    className="w-4 h-4 ml-2"
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
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* My Posts */}
          <Card className="group relative overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-transparent dark:from-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-lg">My Posts</CardTitle>
              </div>
              <CardDescription>
                View your personal posts (requires authentication)
              </CardDescription>
            </CardHeader>
            <CardContent className="relative space-y-3">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Shows user-specific caching with{" "}
                <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                  cacheTag(&quot;my-posts&quot;)
                </code>
                . Uses{" "}
                <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                  updateTag
                </code>{" "}
                for immediate cache expiration when you create a new post.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link
                  href={
                    "/nextjs-demo/demo/getting-started/caching-and-revalidating/my-posts" as Route
                  }
                >
                  View My Posts
                  <svg
                    className="w-4 h-4 ml-2"
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
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Create Post */}
          <Card className="group relative overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-transparent dark:from-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-purple-600 dark:text-purple-400"
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
                </div>
                <CardTitle className="text-lg">Create Post</CardTitle>
              </div>
              <CardDescription>
                Create a new quote post and see cache invalidation in action
              </CardDescription>
            </CardHeader>
            <CardContent className="relative space-y-3">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                When you create a post, the demo uses both{" "}
                <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                  revalidateTag
                </code>{" "}
                and{" "}
                <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                  updateTag
                </code>{" "}
                to refresh the cache.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link
                  href={
                    "/nextjs-demo/demo/getting-started/caching-and-revalidating/create-posts" as Route
                  }
                >
                  Create Post
                  <svg
                    className="w-4 h-4 ml-2"
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
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How It Works */}
      <Card className="border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl">How It Works</CardTitle>
          <CardDescription>
            Understanding the caching and revalidation flow
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Data Fetching with Cache Tags
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Functions use{" "}
                  <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                    &quot;use cache&quot;
                  </code>{" "}
                  and{" "}
                  <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                    cacheTag()
                  </code>{" "}
                  to mark cached data with specific tags like{" "}
                  <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                    &quot;all-posts&quot;
                  </code>{" "}
                  or{" "}
                  <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                    &quot;my-posts&quot;
                  </code>
                  .
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Cache Invalidation on Updates
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  When creating a new post, the server action calls{" "}
                  <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                    revalidateTag(&quot;all-posts&quot;, &quot;max&quot;)
                  </code>{" "}
                  for stale-while-revalidate behavior and{" "}
                  <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                    updateTag(&quot;my-posts&quot;)
                  </code>{" "}
                  for immediate cache expiration.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-sm font-semibold text-purple-600 dark:text-purple-400">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Automatic Cache Updates
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Next.js automatically serves fresh data on subsequent
                  requests. With{" "}
                  <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                    revalidateTag
                  </code>
                  , stale data is served while fresh data is fetched in the
                  background for optimal performance.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Takeaways */}
      <Card className="border border-amber-200/60 dark:border-amber-800/60 bg-amber-50/50 dark:bg-amber-950/20 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <svg
              className="w-5 h-5 text-amber-600 dark:text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Key Takeaways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
              <span>
                <strong>Tag-based caching</strong> provides granular control
                over what gets cached and invalidated
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
              <span>
                <strong>revalidateTag</strong> with{" "}
                <code className="text-xs bg-amber-100 dark:bg-amber-900/30 px-1.5 py-0.5 rounded">
                  &quot;max&quot;
                </code>{" "}
                profile enables stale-while-revalidate for better UX
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
              <span>
                <strong>updateTag</strong> is perfect for &quot;read-your-own-writes&quot;
                scenarios where immediate visibility is critical
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
              <span>
                You can combine both strategies: use{" "}
                <code className="text-xs bg-amber-100 dark:bg-amber-900/30 px-1.5 py-0.5 rounded">
                  revalidateTag
                </code>{" "}
                for general updates and{" "}
                <code className="text-xs bg-amber-100 dark:bg-amber-900/30 px-1.5 py-0.5 rounded">
                  updateTag
                </code>{" "}
                for user-specific data
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
