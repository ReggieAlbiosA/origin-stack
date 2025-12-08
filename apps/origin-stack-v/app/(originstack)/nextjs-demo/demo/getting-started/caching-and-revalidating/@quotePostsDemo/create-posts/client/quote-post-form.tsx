"use client";

import Link from "next/link";
import { useState } from "react";
import { Route } from "next";

interface QuotePostFormProps {
  createQuotePost: (formData: FormData) => Promise<void>;
}

export default function QuotePostForm({ createQuotePost }: QuotePostFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    await createQuotePost(form);

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Quote Content */}
      <div className="space-y-2">
        <label
          htmlFor="content"
          className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          Quote
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={6}
          placeholder="Enter your inspiring quote here..."
          className="w-full px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 transition-all resize-none"
        />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Share a meaningful quote that inspires you
        </p>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-6 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-all duration-200 font-medium"
        >
          {loading ? "Creating..." : "Create Post"}
          <svg
            className="ml-2 w-4 h-4"
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

        <Link
          href={"/posts" as Route}
          className="inline-flex items-center px-6 py-2 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 font-medium"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
