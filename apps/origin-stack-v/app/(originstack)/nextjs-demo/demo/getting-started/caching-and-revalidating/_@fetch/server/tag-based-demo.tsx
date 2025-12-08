import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Badge } from '@/components/shadcn-ui/badge';
import { RevalidateButton } from '../client/revalidate-button';
import { revalidatePostsTag } from '../actions';
import { connection } from 'next/server';
import { DemoError } from './demo-error';

/**
 * TAG-BASED REVALIDATION DEMO
 * Uses next: { tags: ['posts'] } to enable on-demand cache invalidation
 * Perfect for content that updates based on user actions or webhooks
 */

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

// Fallback posts data
const FALLBACK_POSTS: Post[] = [
    {
        userId: 1,
        id: 1,
        title: 'Understanding Next.js Caching Strategies',
        body: 'Next.js provides powerful caching mechanisms to optimize your application performance. Learn how to leverage ISR, revalidation, and cache tags for the best results.',
    },
    {
        userId: 1,
        id: 2,
        title: 'The Power of Server Components',
        body: 'Server Components in Next.js allow you to build fast, dynamic applications while keeping your bundle size small. They run on the server and can directly access your data sources.',
    },
    {
        userId: 1,
        id: 3,
        title: 'Optimizing Web Performance with Edge Computing',
        body: 'Edge computing brings your application closer to your users, reducing latency and improving response times. Discover how to deploy your Next.js app to the edge.',
    },
    {
        userId: 1,
        id: 4,
        title: 'Modern Data Fetching Patterns',
        body: 'From static generation to server-side rendering, Next.js offers multiple data fetching patterns. Choose the right one for your use case to maximize performance.',
    },
    {
        userId: 1,
        id: 5,
        title: 'Building Scalable React Applications',
        body: 'Scalability is key for modern web applications. Learn best practices for structuring your React components, managing state, and optimizing rendering performance.',
    },
];

async function getPosts(): Promise<{ data: Post[]; error?: string; isFallback: boolean }> {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
            next: {
                tags: ['posts'], // Tag for on-demand revalidation
            },
            signal: AbortSignal.timeout(10000), // 10 second timeout for WSL2 compatibility
        });

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = await res.json() as Post[];
        return { data, isFallback: false };
    } catch (error) {
        console.warn('Posts API unavailable, using fallback data:', error);
        return {
            data: FALLBACK_POSTS,
            error: error instanceof Error ? error.message : 'Unknown error',
            isFallback: true,
        };
    }
}

export default async function TagBasedDemo() {
    // Access connection to ensure dynamic rendering
    await connection();

    const { data: posts, error, isFallback } = await getPosts();
    const fetchTime = new Date().toLocaleTimeString();

    // If using fallback data, show error state
    if (isFallback) {
        return (
            <DemoError
                title="Tag-based Revalidation Demo"
                description="next: { tags: ['posts'] }"
                error={error || 'API unavailable'}
                badgeText="On-Demand"
                badgeClassName="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-800"
            />
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Tag-based Revalidation Demo</CardTitle>
                        <CardDescription>
                            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                next: &#123; tags: ['posts'] &#125;
                            </code>
                        </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-800">
                        On-Demand
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {posts.map((post, index) => (
                        <div
                            key={post.id}
                            className="border rounded-lg p-4 bg-gradient-to-br from-orange-50/50 to-amber-50/50 dark:from-orange-950/10 dark:to-amber-950/10"
                        >
                            <div className="flex items-start gap-3">
                                <Badge variant="secondary" className="shrink-0">
                                    {index + 1}
                                </Badge>
                                <div className="flex-1 space-y-1">
                                    <h4 className="font-semibold text-sm leading-tight line-clamp-2">
                                        {post.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                        {post.body}
                                    </p>
                                    <div className="text-xs text-muted-foreground pt-1">
                                        Post ID: {post.id} • User: {post.userId}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-xs text-muted-foreground pt-4 border-t space-y-1">
                    <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-mono text-orange-600 dark:text-orange-400">Tagged Cache ✓</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Fetched at:</span>
                        <span className="font-mono">{fetchTime}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Cache tag:</span>
                        <span className="font-mono">'posts'</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Revalidation:</span>
                        <span className="font-mono">On-demand via revalidateTag()</span>
                    </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <p className="text-xs text-muted-foreground">
                        Click to invalidate 'posts' cache:
                    </p>
                    <RevalidateButton
                        action={revalidatePostsTag}
                        label="Invalidate Cache"
                        variant="default"
                    />
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-md p-3">
                    <p className="text-xs text-indigo-800 dark:text-indigo-200">
                        <strong>How it works:</strong> This data is cached indefinitely until you manually trigger
                        invalidation. When you click "Invalidate Cache", all fetch requests tagged with 'posts' are
                        marked as stale. The next page visit will refetch the data. Perfect for CMS updates, form
                        submissions, or webhook-triggered updates!
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
