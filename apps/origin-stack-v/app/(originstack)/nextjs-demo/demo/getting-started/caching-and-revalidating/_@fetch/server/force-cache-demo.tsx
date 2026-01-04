import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/shadcn-ui/card";
import { Badge } from "@repo/ui/components/shadcn-ui/badge";
import { connection } from "next/server";
import { DemoError } from "./demo-error";

/**
 * FORCE CACHE DEMO - Data is cached indefinitely
 * Uses cache: 'force-cache' to cache the response permanently
 * Perfect for static content that rarely changes
 */

interface Advice {
  id: string;
  advice: string;
}

interface AdviceResponse {
  slip: Advice;
}

// Fallback advice in case API is unavailable
const FALLBACK_ADVICE: Advice[] = [
  {
    id: "1",
    advice: "The best way to predict the future is to invent it.",
  },
  {
    id: "2",
    advice:
      "Performance is not just about what you measure, but what you choose to optimize.",
  },
  {
    id: "3",
    advice:
      "Always write code as if the person who ends up maintaining it is a violent psychopath who knows where you live.",
  },
];

async function getRandomAdvice(): Promise<{
  data: Advice;
  error?: string;
  isFallback: boolean;
}> {
  try {
    const res = await fetch("https://api.adviceslip.com/advice", {
      cache: "force-cache", // Cache indefinitely
      next: {
        tags: ["advice"], // Tag for manual invalidation if needed
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout for WSL2 compatibility
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data = (await res.json()) as AdviceResponse;
    return { data: data.slip, isFallback: false };
  } catch (error) {
    console.warn("Advice API unavailable, using fallback data:", error);
    // Random fallback advice
    const randomAdvice =
      FALLBACK_ADVICE[Math.floor(Math.random() * FALLBACK_ADVICE.length)] ?? FALLBACK_ADVICE[0]!;
    return {
      data: randomAdvice,
      error: error instanceof Error ? error.message : "Unknown error",
      isFallback: true,
    };
  }
}

export default async function ForceCacheDemo() {
  // Access connection to ensure dynamic rendering
  await connection();

  const { data: advice, error, isFallback } = await getRandomAdvice();
  const fetchTime = new Date().toLocaleTimeString();

  // If using fallback data, show error state
  if (isFallback) {
    return (
      <DemoError
        title="Force Cache Demo"
        description="cache: 'force-cache'"
        error={error || "API unavailable"}
        badgeText="Cached"
        badgeClassName="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-800"
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Force Cache Demo</CardTitle>
            <CardDescription>
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                cache: &apos;force-cache&apos;
              </code>
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-800"
          >
            Cached
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border rounded-lg p-6">
          <blockquote className="space-y-4">
            <p className="text-lg italic leading-relaxed">&quot;{advice.advice}&quot;</p>
            <footer className="flex items-center justify-between">
              <cite className="text-sm font-semibold not-italic">
                Advice #{advice.id}
              </cite>
            </footer>
          </blockquote>
        </div>

        <div className="text-xs text-muted-foreground pt-4 border-t space-y-1">
          <div className="flex justify-between">
            <span>Status:</span>
            <span className="font-mono text-purple-600 dark:text-purple-400">
              Cached Permanently ✓
            </span>
          </div>
          <div className="flex justify-between">
            <span>First fetched at:</span>
            <span className="font-mono">{fetchTime}</span>
          </div>
          <div className="flex justify-between">
            <span>Cache tag:</span>
            <span className="font-mono">&apos;advice&apos;</span>
          </div>
          <div className="flex justify-between">
            <span>Revalidation:</span>
            <span className="font-mono">Manual only</span>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md p-3">
          <p className="text-xs text-amber-800 dark:text-amber-200">
            <strong>How it works:</strong> This advice was fetched once and
            cached indefinitely. Even if you refresh the page, the same advice
            will appear unless you rebuild the application or manually
            invalidate the cache using{" "}
            <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">
              revalidateTag(&apos;advice&apos;)
            </code>
            .
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
