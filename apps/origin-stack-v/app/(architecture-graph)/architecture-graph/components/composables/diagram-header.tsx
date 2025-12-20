"use client";

import { cn } from "@/lib/utils";
import { useDiagram } from "../core/provider";

interface DiagramHeaderProps {
  className?: string;
}

export function DiagramHeader({ className }: DiagramHeaderProps) {
  const { config } = useDiagram();

  return (
    <header className={cn("space-y-3", className)}>
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {config.title}
        </h1>
        {config.badges && config.badges.length > 0 && (
          <div className="flex items-center gap-2">
            {config.badges.map((badge) => (
              <span
                key={badge.label}
                className={cn(
                  "px-2.5 py-1 text-xs font-medium rounded-full border",
                  badge.color,
                  badge.borderColor
                )}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}
      </div>
      <p className="text-zinc-600 dark:text-zinc-400">{config.subtitle}</p>
    </header>
  );
}
