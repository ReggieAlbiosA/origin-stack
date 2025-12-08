import { Suspense } from "react";
import NoCacheDemo from "./server/no-cache-demo";
import ForceCacheDemo from "./server/force-cache-demo";
import TimeBasedDemo from "./server/time-based-demo";
import TagBasedDemo from "./server/tag-based-demo";
import { Card, CardContent } from "@repo/ui/components/shadcn-ui/card";

function LoadingSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CachingRevalidatingDemoPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">
          Interactive Fetch Caching Demo
        </h3>
        <p className="text-muted-foreground">
          Explore real-world implementations of Next.js fetch caching
          strategies. Each demo uses actual public APIs to demonstrate different
          caching behaviors. Check the code examples on the left to see the
          implementation.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Demo 1: No Cache */}
        <Suspense fallback={<LoadingSkeleton />}>
          <NoCacheDemo />
        </Suspense>

        {/* Demo 2: Force Cache */}
        <Suspense fallback={<LoadingSkeleton />}>
          <ForceCacheDemo />
        </Suspense>

        {/* Demo 3: Time-based Revalidation */}
        <Suspense fallback={<LoadingSkeleton />}>
          <TimeBasedDemo />
        </Suspense>

        {/* Demo 4: Tag-based Revalidation */}
        <Suspense fallback={<LoadingSkeleton />}>
          <TagBasedDemo />
        </Suspense>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-blue-600 dark:text-blue-400"
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
          </div>
          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
              🎯 Best Practices
            </h5>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">
                  •
                </span>
                <span>
                  Use{" "}
                  <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">
                    cache: 'no-store'
                  </code>{" "}
                  for real-time data that must always be fresh
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">
                  •
                </span>
                <span>
                  Use{" "}
                  <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">
                    cache: 'force-cache'
                  </code>{" "}
                  for static content that rarely changes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">
                  •
                </span>
                <span>
                  Use{" "}
                  <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">
                    next: &#123; revalidate: N &#125;
                  </code>{" "}
                  for periodic updates with ISR
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">
                  •
                </span>
                <span>
                  Use{" "}
                  <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">
                    next: &#123; tags: [...] &#125;
                  </code>{" "}
                  for event-driven revalidation
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
