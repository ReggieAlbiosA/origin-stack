import type { FileSystemObject } from "@/lib/file-system";
import TabbedDashboard from "@/components/layout/server/tabbed-dashboard";

export default function PartialPrerenderingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const code: FileSystemObject[] = [
    {
      type: "directory",
      name: "@externalServerActions",
      path: "/@externalServerActions",
      children: [
        {
          type: "file",
          name: "page.tsx",
          path: "/@externalServerActions/page.tsx",
          code: `// page.tsx
import { Suspense } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TabbedDashboard from '@/components/client/tabbed-dashboard';
import { FileSystemObject } from '@/components/client/types/types';
import { getRecentTributePosts, searchTributePosts } from './_shared/server/tribute-actions';

// Search Form Component
async function SearchForm({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const params = await searchParams;

  return (
    <form action="" method="GET" className="flex gap-4 mb-6">
      <div className="flex-1">
        <input
          type="text"
          name="query"
          placeholder="Enter person's name..."
          defaultValue={params.query || ''}
          className="w-full px-4 py-2 border border-input rounded-md bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>
      <Button type="submit" className="shrink-0">
        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Search
      </Button>
    </form>
  );
}

// Tribute Posts List Component
async function TributePostsList({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const params = await searchParams;
  let posts;
  let title;
  let description;

  if (params.query) {
    // Search for posts
    const formData = new FormData();
    formData.append('query', params.query);
    const result = await searchTributePosts(null, formData);

    posts = result.success ? result.data || [] : [];
    title = \`Search Results for "\${params.query}"\`;
    description = \`Found \${posts.length} tribute post\${posts.length !== 1 ? 's' : ''} matching your search.\`;
  } else {
    // Get recent posts
    posts = await getRecentTributePosts();
    title = 'Recent Tribute Posts';
    description = 'The 5 most recent tribute posts from our community.';
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        {title}
      </h3>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 mx-auto mb-4">
            <svg className="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {params.query ? 'No posts found' : 'No tribute posts yet'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {params.query
              ? 'Try adjusting your search term or create the first tribute post for this person.'
              : 'Be the first to create a tribute post for someone special.'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="group p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-in fade-in-50 slide-in-from-bottom-5"
              style={{ animationDelay: \`\${index * 100}ms\` }}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      Tribute to {post.personName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      by {post.authorName} • {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed line-clamp-3">
                  {post.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Loading component for Suspense
function TributePostsLoading() {
  return (
    <div className="space-y-4">
      <div className="h-6 w-48 bg-muted/50 rounded animate-pulse"></div>
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse p-4 border border-border/50 rounded-lg">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-48 bg-muted/50 rounded"></div>
                  <div className="h-4 w-32 bg-muted/50 rounded"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted/50 rounded"></div>
                <div className="h-4 w-3/4 bg-muted/50 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Page Component
export default async function ExternalServerActionsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const code: FileSystemObject[] = [{
    type: "directory",
    name: "@externalServerActions",
    path: "/@externalServerActions",
    children: [
      {
        type: "file",
        name: "page.tsx",
        path: "/@externalServerActions/page.tsx",
        code: \`// page.tsx - Main listing page with search functionality\`,
      },
      {
        type: "file",
        name: "tribute-actions.ts",
        path: "/_shared/server/tribute-actions.ts",
        code: \`// tribute-actions.ts - External server actions file\`,
      }
    ]
  }];

  return (
    <Card>
      <CardHeader>
        <CardTitle>External Server Actions</CardTitle>
        <CardDescription className="text-muted-foreground">
          Demonstration of external server actions stored in separate files for better organization.
          Create and search tribute posts using Next.js 15+ server actions with Prisma database integration.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <TabbedDashboard fileSystem={code}>
          <div className="space-y-6">
            {/* Search Form */}
            <SearchForm searchParams={searchParams} />

            {/* Create Post Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/docs/getting-started/updating-data/tribute-post" className="flex-1">
                <Button className="w-full" size="lg">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Tribute Post
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Anonymous posting enabled for demo
              </div>
            </div>

            {/* Tribute Posts List */}
            <Suspense fallback={<TributePostsLoading />}>
              <TributePostsList searchParams={searchParams} />
            </Suspense>
          </div>
        </TabbedDashboard>
      </CardContent>
    </Card>
  );
}
`,
        },
        {
          type: "file",
          name: "tribute-actions.ts",
          path: "/_shared/server/tribute-actions.ts",
          code: `// tribute-actions.ts - External server actions file
'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation schemas
const createTributeSchema = z.object({
  personName: z.string().min(1, 'Person name is required').max(100, 'Person name too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
  authorName: z.string().max(50, 'Author name too long').optional(),
});

// Server Actions
export async function createTributePost(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const data = Object.fromEntries(formData);
    const validatedData = createTributeSchema.parse(data);

    const tributePost = await prisma.red_UD_externalServerActions_TributePost.create({
      data: validatedData,
    });

    revalidatePath('/docs/getting-started/updating-data');
    return {
      success: true,
      data: tributePost,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      };
    }

    console.error('Error creating tribute post:', error);
    return {
      success: false,
      error: 'Failed to create tribute post',
    };
  }
}

export async function getRecentTributePosts(): Promise<TributePost[]> {
  try {
    const posts = await prisma.red_UD_externalServerActions_TributePost.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });
    return posts;
  } catch (error) {
    console.error('Error fetching tribute posts:', error);
    return [];
  }
}

export async function searchTributePosts(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const query = formData.get('query') as string;

    if (!query || query.trim().length === 0) {
      return await getRecentTributePosts();
    }

    const posts = await prisma.red_UD_externalServerActions_TributePost.findMany({
      where: {
        personName: {
          contains: query.trim(),
          mode: 'insensitive',
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data: posts,
    };
  } catch (error) {
    console.error('Error searching tribute posts:', error);
    return {
      success: false,
      error: 'Failed to search tribute posts',
    };
  }
}

// Type definitions
export interface TributePost {
  id: string;
  personName: string;
  message: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActionResult {
  success: boolean;
  data?: any;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}
`,
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <header className="text-2xl font-bold">
        <h2>Partial Prerendering</h2>
      </header>
      <TabbedDashboard fileSystem={code}>{children}</TabbedDashboard>
    </div>
  );
}
