"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ToggleItem = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  description?: string;
};

type ToggleGroupCardProps = {
  title?: string;
  value: string;
  onChange: (nextValue: string) => void;
  options: ToggleItem[];
  columns?: 1 | 2 | 3;
  className?: string;
};

export function ToggleGroupCard({
  title,
  value,
  onChange,
  options,
  columns = 3,
  className,
}: ToggleGroupCardProps) {
  return (
    <div className={cn("", className)}>
      {title && (
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground/80">
          {title}
        </h3>
      )}

      <div
        className={cn(
          "flex flex-col sm:flex-row gap-2 flex-wrap",
          columns === 1 && "md:grid-cols-1",
          columns === 2 && "md:grid-cols-2",
          columns === 3 && "md:grid-cols-3"
        )}
      >
        {options.map((item) => {
          const isActive = item.value === value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onChange(item.value)}
              className={cn(
                "group flex h-full flex-col items-start gap-2 rounded border border-border/60 bg-background/80 px-3 py-2 text-left transition hover:border-primary/60 w-full sm:w-auto sm:max-w-max hover:bg-primary/5",
                isActive && "border-primary/80 bg-primary/10 text-primary "
              )}
            >
              <div className="flex items-center gap-3">
                {item.icon && (
                  <span className="text-lg text-primary/70">{item.icon}</span>
                )}
                <span className="text-sm font-semibold text-foreground">
                  {item.label}
                </span>
              </div>
              {item.description && (
                <p className="text-xs text-muted-foreground/80 transition group-hover:text-muted-foreground">
                  {item.description}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
