// app/posts/create/page.tsx

import { revalidateTag, updateTag } from "next/cache";
import prisma from "@repo/database/lib/prisma";
import { redirect } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/components/shadcn-ui/card";
import { Route } from "next";
import QuotePostForm from "./client/quote-post-form";
import { auth } from "@repo/auth/auth";
import { headers } from "next/headers";

// ✅ Server Action - creates post with authenticated user
async function createQuotePost(formData: FormData) {
  "use server";

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("You must be signed in to create a post");
    }

    const content = formData.get("content") as string;

    if (!content) {
      throw new Error("Content is required");
    }

    // Create the quote post with authenticated user
    await prisma.quotePost.create({
      data: {
        content,
        userId: session.user.id,
      },
    });

    // ✅ Invalidate the cache
    revalidateTag("all-posts", "max");
    updateTag("my-posts");

    // Redirect to all posts page
    redirect(
      "/nextjs-demo/demo/getting-started/caching-and-revalidating/my-posts" as Route
    );
  } catch (error) {
    console.error("Failed to create post:", error);
    throw error;
  }
}

export default function CreatePostPage() {
  return (
    <div className="container mx-auto max-w-2xl p-6 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Create New Quote
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            Share your favorite quotes with the community. Inspire others with
            words of wisdom.
          </p>
        </div>

        <Card className="border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl shadow-xl shadow-zinc-200/20 dark:shadow-zinc-900/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 via-transparent to-transparent dark:from-zinc-800/10 pointer-events-none" />

          <CardContent className="p-8 relative">
            <QuotePostForm createQuotePost={createQuotePost} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
