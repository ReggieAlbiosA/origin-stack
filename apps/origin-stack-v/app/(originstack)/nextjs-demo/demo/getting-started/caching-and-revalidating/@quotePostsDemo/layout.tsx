import TabbedDashboard from "@repo/ui/components/layout/server/tabbed-dashboard";
import Link from "next/link";
import { auth } from "@repo/auth/auth";
import { headers } from "next/headers";
import { Button } from "@repo/ui/components/shadcn-ui/button";
import { Suspense } from "react";
import { Skeleton } from "@repo/ui/components/shadcn-ui/skeleton";

function AuthOverlay({ isAuthenticated }: { isAuthenticated: boolean }) {
  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      <div className="absolute inset-0  z-11 bg-black/60 backdrop-blur-sm" />
      <div className="absolute inset-0 z-11  flex items-center justify-center pointer-events-none">
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 max-w-md mx-4 shadow-xl pointer-events-auto">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Sign in to test this demo
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              You need to be signed in to create and manage quote posts.
            </p>
            <Button asChild className="w-full">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

async function LayoutContent({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAuthenticated = !!session?.user;

  return (
    <TabbedDashboard
      path="app/(originstack)/nextjs-demo/demo/getting-started/caching-and-revalidating/@quotePostsDemo"
      isAuthenticated={isAuthenticated}
    >
      {/* Overlay for unauthenticated users */}
      <AuthOverlay isAuthenticated={isAuthenticated} />

      <div className="flex flex-col h-full">
        <header className="sticky top-0 z-10 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
          <div className="px-6 py-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-1 bg-zinc-900 dark:bg-white rounded-full" />
                <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                  Quote Posts
                </h2>
              </div>

              <ul className="flex items-center p-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700/50">
                <li>
                  <Link
                    className="flex items-center px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 hover:text-zinc-900 dark:hover:text-white text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-700/50 shadow-sm hover:shadow-md"
                    href="/nextjs-demo/demo/getting-started/caching-and-revalidating/all-posts"
                  >
                    All Posts
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 hover:text-zinc-900 dark:hover:text-white text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-700/50 shadow-sm hover:shadow-md"
                    href="/nextjs-demo/demo/getting-started/caching-and-revalidating/my-posts"
                  >
                    My Posts
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 hover:text-zinc-900 dark:hover:text-white text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-700/50 shadow-sm hover:shadow-md"
                    href="/nextjs-demo/demo/getting-started/caching-and-revalidating/create-posts"
                  >
                    Create
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="flex-1 bg-zinc-50/50 dark:bg-zinc-950/50">
          {children}
        </main>
      </div>
    </TabbedDashboard>
  );
}

export default function RevalidatePathDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="space-y-[7px]">
          <Skeleton className="w-[268px] !p-[3px] rounded-lg h-[33px] animate-pulse bg-muted"></Skeleton>
          <Skeleton className="!h-[clamp(200px,90vh,900px)] rounded-lg w-full max-w-[805px] animate-pulse bg-muted"></Skeleton>
        </div>
      }
    >
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  );
}
