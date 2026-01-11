"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type ResetButtonProps = {
  onReset: () => void;
  className?: string;
};

export function ResetButton({ onReset, className }: ResetButtonProps) {
  return (
    <button
      onClick={onReset}
      className={cn(
        "flex items-center gap-2 rounded border border-border bg-card px-3 sm:px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary hover:bg-primary/5 hover:text-primary",
        className
      )}
      aria-label="Reset all values"
    >
      <RotateCcw className="h-4 w-4" />
      <span className="hidden sm:inline">Reset All Values</span>
      <span className="inline sm:hidden">Reset</span>
    </button>
  );
}
