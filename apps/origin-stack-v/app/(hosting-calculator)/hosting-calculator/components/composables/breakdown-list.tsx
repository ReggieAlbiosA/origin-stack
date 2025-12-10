"use client";

import * as React from "react";
import { ValueDisplayRow } from "../ui/value-display-row";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import type { CostBreakdownItem } from "../../types";

type BreakdownListProps = {
  breakdown: CostBreakdownItem[];
  className?: string;
};

export function BreakdownList({ breakdown, className }: BreakdownListProps) {
  const filtered = breakdown.filter((item) => item.value !== 0);

  return (
    <div
      className={cn(
        "rounded border border-border/60 bg-card p-4 sm:p-6 space-y-3 max-h-[600px] overflow-y-auto",
        className
      )}
    >
      <h4 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
        <Info className="h-4 w-4" />
        Cost Breakdown
      </h4>
      {filtered.map((item, idx) => (
        <div
          key={idx}
          className={cn(
            "flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 p-3 rounded text-sm",
            item.category === "Base" && "bg-primary/10",
            item.category === "Credits" && "bg-emerald-500/10",
            !["Base", "Credits"].includes(item.category) && "bg-muted/40"
          )}
        >
          <div className="flex-1">
            <p className="font-medium text-xs sm:text-sm">{item.label}</p>
            {item.included && (
              <p className="text-xs text-muted-foreground">
                Included:{" "}
                {typeof item.included === "number"
                  ? item.included.toLocaleString()
                  : item.included}
              </p>
            )}
          </div>
          <p
            className={cn(
              "font-semibold text-sm sm:text-base self-end sm:self-auto",
              item.value < 0 && "text-emerald-600"
            )}
          >
            ${Math.abs(item.value).toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}
