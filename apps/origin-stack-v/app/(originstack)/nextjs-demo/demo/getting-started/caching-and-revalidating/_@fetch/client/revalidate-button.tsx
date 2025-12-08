"use client";

import { Button } from "@repo/ui/components/shadcn-ui/button";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";

interface RevalidateButtonProps {
  action: () => Promise<{ success: boolean; message?: string; error?: string }>;
  label?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
}

export function RevalidateButton({
  action,
  label = "Revalidate",
  variant = "default",
}: RevalidateButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      try {
        const result = await action();

        if (result.success) {
          setMessage(result.message || "Cache revalidated successfully!");
          router.refresh(); // Refresh the page to show updated data
          setTimeout(() => setMessage(null), 3000);
        } else {
          setMessage(result.error || "Failed to revalidate cache");
          setTimeout(() => setMessage(null), 3000);
        }
      } catch (error) {
        console.error("Revalidation error:", error);
        setMessage("An error occurred during revalidation");
        setTimeout(() => setMessage(null), 3000);
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleClick}
        disabled={isPending}
        variant={variant}
        size="sm"
        className="min-w-[120px]"
      >
        {isPending ? (
          <>
            <span className="animate-spin mr-2">⟳</span>
            Revalidating...
          </>
        ) : (
          label
        )}
      </Button>
      {message && (
        <span className="text-xs text-muted-foreground animate-in fade-in">
          {message}
        </span>
      )}
    </div>
  );
}
