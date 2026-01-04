import type { FileSystemObject } from "@repo/ui/lib/file-system";
import TabbedDashboard from "@repo/ui/components/layout/server/tabbed-dashboard";

/**
 * UNDERSTANDING FETCH CACHING & REVALIDATION IN NEXT.JS
 * =====================================================
 *
 * Based on Next.js documentation and Vercel's implementation:
 *
 * ## 1. DEFAULT BEHAVIOR
 * By default, fetch requests in Next.js are NOT cached. However, Next.js will
 * pre-render routes that contain fetch requests and cache the HTML output.
 *
 * ## 2. EXPLICIT CACHING
 * To cache individual fetch requests, use { cache: 'force-cache' }:
 *   const data = await fetch('https://...', { cache: 'force-cache' })
 *
 * For dynamic behavior (no caching), use { cache: 'no-store' }:
 *   const data = await fetch('https://...', { cache: 'no-store' })
 *
 * ## 3. TIME-BASED REVALIDATION (ISR - Incremental Static Regeneration)
 * Use next.revalidate to automatically refresh cached data after a time period:
 *   const res = await fetch('https://...', { next: { revalidate: 3600 } })
 *
 * This enables "stale-while-revalidate" behavior:
 * - First request: Data is fetched and cached
 * - Within revalidate window: Cached data is served instantly
 * - After revalidate expires: Stale data is served while fresh data is fetched in background
 * - Subsequent requests: Fresh data is served from the updated cache
 *
 * ## 4. TAG-BASED REVALIDATION (On-Demand Cache Invalidation)
 * Tag fetch requests to enable selective cache invalidation:
 *   const res = await fetch('https://...', { next: { tags: ['products'] } })
 *
 * Benefits:
 * - Multiple requests can share the same tag
 * - Invalidate all tagged requests at once
 * - More granular control than path-based revalidation
 *
 * ## 5. REVALIDATION STRATEGIES
 *
 * ### A. revalidateTag (Recommended for most use cases)
 * - Can be used in Server Actions AND Route Handlers
 * - With profile="max": Uses stale-while-revalidate (serves stale while updating)
 * - Without profile: Legacy behavior (immediately expires cache - deprecated)
 *
 * Example:
 *   revalidateTag('products', 'max') // Recommended approach
 *
 * ### B. updateTag (For immediate updates)
 * - ONLY in Server Actions (not Route Handlers)
 * - Immediately expires cache (no stale-while-revalidate)
 * - Perfect for "read-your-own-writes" scenarios (user needs to see their changes immediately)
 *
 * Example after creating a post:
 *   updateTag('posts') // User sees new post immediately
 *
 * ### C. revalidatePath (Path-based invalidation)
 * - Invalidates all cache entries for a specific route path
 * - Broader than tag-based (affects entire route, not just specific data)
 * - Useful when you want to refresh an entire page
 *
 * ## 6. KEY DIFFERENCES: revalidateTag vs updateTag
 *
 * revalidateTag:
 * - Where: Server Actions + Route Handlers
 * - Behavior: Stale-while-revalidate (with profile="max")
 * - Use case: General cache updates where stale data is acceptable temporarily
 *
 * updateTag:
 * - Where: Server Actions ONLY
 * - Behavior: Immediate cache expiration
 * - Use case: Critical updates where user must see fresh data immediately
 *
 * ## 7. COMBINING STRATEGIES
 * You can combine time-based and tag-based revalidation:
 *   const res = await fetch('https://...', {
 *     next: {
 *       revalidate: 3600,  // Auto-refresh every hour
 *       tags: ['products']  // Also allow manual refresh
 *     }
 *   })
 *
 * This provides:
 * - Automatic background updates (time-based)
 * - Manual control when needed (tag-based)
 *
 * ## 8. VERCEL INFRASTRUCTURE INTEGRATION
 * On Vercel:
 * - Edge Cache: Distributed globally for fast access
 * - Background revalidation: Happens without blocking requests
 * - REST API: Programmatic cache invalidation via /v1/edge-cache/invalidate-by-tags
 * - @vercel/functions: invalidateByTag() for runtime cache management
 *
 * ## 9. BEST PRACTICES
 *
 * ✅ DO:
 * - Use time-based revalidation for data that changes predictably
 * - Use tag-based revalidation for user-triggered updates
 * - Prefer revalidateTag with profile="max" for better UX (stale-while-revalidate)
 * - Use updateTag only when immediate visibility is critical
 * - Tag related data with the same tag to invalidate together
 *
 * ❌ DON'T:
 * - Over-invalidate (affects performance and origin load)
 * - Use very short revalidate times (consider cache: 'no-store' instead)
 * - Use updateTag everywhere (it bypasses stale-while-revalidate benefits)
 * - Forget to handle errors in revalidation logic
 *
 * ## 10. PERFORMANCE IMPLICATIONS
 *
 * - Cached requests: ⚡ Instant response from edge
 * - Time-based revalidation: 🔄 Automatic freshness, smooth UX
 * - Stale-while-revalidate: 👍 Best of both worlds (speed + freshness)
 * - Immediate invalidation: ⚠️ May cause brief delays on next request
 *
 * The examples below demonstrate these concepts in practice.
 */

export default function CachingRevalidatingDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const code: FileSystemObject[] = [
    {
      type: "directory",
      name: "@fetch-demos",
      path: "/@fetch-demos",
      children: [
        {
          type: "file",
          name: "no-cache-demo.tsx",
          path: "/components/no-cache-demo.tsx",
          code: `// no-cache-demo.tsx - Always fetch fresh data
/**
 * NO CACHE - Uses cache: 'no-store'
 * Perfect for real-time data that must always be fresh
 */
interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
}

async function getGitHubUser(): Promise<GitHubUser> {
  const res = await fetch('https://api.github.com/users/vercel', {
    cache: 'no-store', // Always fetch fresh, never cache
  });

  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function NoCacheDemo() {
  const fetchTime = new Date().toLocaleTimeString();
  const user = await getGitHubUser();

  return (
    <div>
      <h3>{user.name}</h3>
      <p>@{user.login}</p>
      <p>Repos: {user.public_repos} | Followers: {user.followers}</p>
      <small>Fetched at: {fetchTime} (Always Fresh)</small>
    </div>
  );
}`,
        },
        {
          type: "file",
          name: "force-cache-demo.tsx",
          path: "/components/force-cache-demo.tsx",
          code: `// force-cache-demo.tsx - Cache indefinitely
/**
 * FORCE CACHE - Uses cache: 'force-cache'
 * Perfect for static content that rarely changes
 */
interface Quote {
  content: string;
  author: string;
  tags: string[];
}

async function getRandomQuote(): Promise<Quote> {
  const res = await fetch('https://api.quotable.io/quotes/random', {
    cache: 'force-cache', // Cache indefinitely
    next: {
      tags: ['quotes'], // Tag for manual invalidation
    },
  });

  if (!res.ok) throw new Error('Failed to fetch');
  const data = await res.json();
  return data[0];
}

export default async function ForceCacheDemo() {
  const quote = await getRandomQuote();

  return (
    <blockquote>
      <p>"{quote.content}"</p>
      <footer>— {quote.author}</footer>
      <small>Cached permanently until manually invalidated</small>
    </blockquote>
  );
}`,
        },
        {
          type: "file",
          name: "time-based-demo.tsx",
          path: "/components/time-based-demo.tsx",
          code: `// time-based-demo.tsx - ISR with time-based revalidation
/**
 * TIME-BASED REVALIDATION - Uses next: { revalidate: 30 }
 * Perfect for data that updates periodically
 */
interface WeatherData {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
}

async function getWeatherData(): Promise<WeatherData> {
  const res = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current_weather=true',
    {
      next: {
        revalidate: 30, // Revalidate every 30 seconds
        tags: ['weather'],
      },
    }
  );

  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function TimeBasedDemo() {
  const fetchTime = new Date().toLocaleTimeString();
  const weather = await getWeatherData();

  return (
    <div>
      <h3>San Francisco Weather</h3>
      <p>Temperature: {weather.current_weather.temperature}°C</p>
      <p>Wind: {weather.current_weather.windspeed} km/h</p>
      <small>Fetched: {fetchTime} | Revalidates every 30s</small>
    </div>
  );
}`,
        },
        {
          type: "file",
          name: "tag-based-demo.tsx",
          path: "/components/tag-based-demo.tsx",
          code: `// tag-based-demo.tsx - On-demand revalidation with tags
/**
 * TAG-BASED REVALIDATION - Uses next: { tags: ['posts'] }
 * Perfect for event-driven cache invalidation
 */
interface Post {
  id: number;
  title: string;
  body: string;
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=5',
    {
      next: {
        tags: ['posts'], // Tag for on-demand revalidation
      },
    }
  );

  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function TagBasedDemo() {
  const posts = await getPosts();

  return (
    <div>
      <h3>Latest Posts</h3>
      {posts.map((post) => (
        <article key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.body.slice(0, 100)}...</p>
        </article>
      ))}
      <small>Cached until manually invalidated via revalidateTag('posts')</small>
    </div>
  );
}`,
        },
        {
          type: "file",
          name: "actions.ts",
          path: "/actions.ts",
          code: `// actions.ts - Server actions for cache revalidation
'use server';

import { revalidateTag, revalidatePath } from 'next/cache';

/**
 * Revalidate posts cache using tag-based invalidation
 */
export async function revalidatePostsTag() {
  try {
    revalidateTag('posts');
    return { success: true, message: 'Posts cache invalidated!' };
  } catch (error) {
    return { success: false, error: 'Failed to invalidate' };
  }
}

/**
 * Revalidate weather cache
 */
export async function revalidateWeatherTag() {
  try {
    revalidateTag('weather');
    return { success: true, message: 'Weather cache invalidated!' };
  } catch (error) {
    return { success: false, error: 'Failed to invalidate' };
  }
}

/**
 * Revalidate entire page using path-based invalidation
 */
export async function revalidateDemoPath() {
  try {
    revalidatePath('/demo');
    return { success: true, message: 'Page revalidated!' };
  } catch (error) {
    return { success: false, error: 'Failed to revalidate' };
  }
}`,
        },
        {
          type: "file",
          name: "revalidate-button.tsx",
          path: "/components/revalidate-button.tsx",
          code: `// revalidate-button.tsx - Client component for triggering revalidation
'use client';

import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface RevalidateButtonProps {
  action: () => Promise<{ success: boolean; message?: string }>;
  label?: string;
}

export function RevalidateButton({ action, label = 'Revalidate' }: RevalidateButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      const result = await action();

      if (result.success) {
        toast.success(result.message || 'Cache revalidated!');
        router.refresh(); // Refresh to show updated data
      } else {
        toast.error('Failed to revalidate');
      }
    });
  };

  return (
    <Button onClick={handleClick} disabled={isPending} size="sm">
      {isPending ? 'Revalidating...' : label}
    </Button>
  );
}`,
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <header className="text-2xl font-bold">
        <h2>Caching & Revalidating Examples</h2>
      </header>
      <TabbedDashboard fileSystem={code}>{children}</TabbedDashboard>
    </div>
  );
}
