import * as React from "react";
import { cn } from "@/lib/utils";

type ValueDisplayRowProps = {
  label: string;
  helpText?: string;
  value?: string | number;
  icon?: React.ReactNode;
  emphasis?: "none" | "positive" | "negative";
  className?: string;
};

export function ValueDisplayRow({
  label,
  helpText,
  value = "—",
  icon,
  emphasis = "none",
  className,
}: ValueDisplayRowProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 rounded border border-border/60 bg-muted/20 p-3 md:p-4",
        emphasis === "positive" &&
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
        emphasis === "negative" && "bg-rose-500/10 text-rose-500",
        className
      )}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          {icon && <span className="text-muted-foreground/80">{icon}</span>}
          <span>{label}</span>
        </div>
        {helpText && (
          <p className="mt-1 text-xs text-muted-foreground/80">{helpText}</p>
        )}
      </div>
      <div className="text-right text-lg font-semibold text-foreground md:text-xl">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
    </div>
  );
}
