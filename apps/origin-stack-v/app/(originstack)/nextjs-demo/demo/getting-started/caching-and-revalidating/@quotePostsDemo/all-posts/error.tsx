"use client";

import {
  Empty,
  EmptyTitle,
  EmptyHeader,
  EmptyDescription,
} from "@repo/ui/components/shadcn-ui/empty";

// ErrorBoundary Component for Next.js
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error); // Always log unexpected errors

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Something went wrong</EmptyTitle>
          <EmptyDescription>
            An unexpected error occurred. Please try again.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}
