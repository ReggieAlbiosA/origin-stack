import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Badge } from '@/components/shadcn-ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn-ui/avatar';
import { connection } from 'next/server';
import { DemoError } from './demo-error';

/**
 * NO CACHE DEMO - Always fetches fresh data
 * Uses cache: 'no-store' to bypass Next.js cache completely
 * Perfect for real-time data that must always be up-to-date
 */

interface GitHubUser {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
}

// Fallback data in case API is unavailable
const FALLBACK_USER: GitHubUser = {
    login: 'vercel',
    name: 'Vercel',
    avatar_url: 'https://avatars.githubusercontent.com/u/14985020?v=4',
    bio: 'Develop. Preview. Ship. For the best frontend teams',
    public_repos: 156,
    followers: 25800,
    following: 0,
    created_at: '2015-10-28T08:42:27Z',
};

async function getGitHubUser(): Promise<{ data: GitHubUser; error?: string; isFallback: boolean }> {
    try {
        const res = await fetch('https://api.github.com/users/vercel', {
            cache: 'no-store', // Always fetch fresh, never cache
            signal: AbortSignal.timeout(10000), // 10 second timeout for WSL2 compatibility
        });

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = await res.json() as GitHubUser;
        return { data, isFallback: false };
    } catch (error) {
        console.warn('GitHub API unavailable, using fallback data:', error);
        return {
            data: FALLBACK_USER,
            error: error instanceof Error ? error.message : 'Unknown error',
            isFallback: true,
        };
    }
}

export default async function NoCacheDemo() {
    // Access connection to ensure dynamic rendering (required for new Date())
    await connection();

    const { data: user, error, isFallback } = await getGitHubUser();
    const fetchTime = new Date().toLocaleTimeString(); // Now safe to use after dynamic data access

    // If using fallback data, show error state
    if (isFallback) {
        return (
            <DemoError
                title="No Cache Demo"
                description="cache: 'no-store'"
                error={error || 'API unavailable'}
                badgeText="Always Fresh"
                badgeClassName="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800"
            />
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>No Cache Demo</CardTitle>
                        <CardDescription>
                            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                cache: 'no-store'
                            </code>
                        </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800">
                        Always Fresh
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={user.avatar_url} alt={user.name} />
                        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">@{user.login}</p>
                        <p className="text-sm">{user.bio}</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                        <div className="text-2xl font-bold">{user.public_repos}</div>
                        <div className="text-xs text-muted-foreground">Repositories</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold">{user.followers}</div>
                        <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold">{user.following}</div>
                        <div className="text-xs text-muted-foreground">Following</div>
                    </div>
                </div>

                <div className="text-xs text-muted-foreground pt-4 border-t space-y-1">
                    <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-mono text-green-600 dark:text-green-400">Fresh Data ✓</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Fetched at:</span>
                        <span className="font-mono">{fetchTime}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Cache:</span>
                        <span className="font-mono text-red-600 dark:text-red-400">Disabled</span>
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md p-3">
                    <p className="text-xs text-blue-800 dark:text-blue-200">
                        <strong>How it works:</strong> Each time this page loads, a fresh API request is made to GitHub.
                        No caching occurs, ensuring you always see the most current data. Refresh the page to see a new fetch time.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
