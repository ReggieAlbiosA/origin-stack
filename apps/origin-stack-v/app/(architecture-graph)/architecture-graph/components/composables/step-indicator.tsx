"use client";

import { cn } from "@/lib/utils";
import { useDiagram } from "../core/provider";

interface StepIndicatorProps {
  className?: string;
}

export function StepIndicator({ className }: StepIndicatorProps) {
  const { stepInfo, config, currentStep } = useDiagram();

  if (!stepInfo) return null;

  const totalSteps = config.steps.length;

  return (
    <div className={cn("space-y-3", className)}>
      {/* Progress bar */}
      <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500 transition-all duration-300 ease-out"
          style={{ width: `${stepInfo.progress}%` }}
        />
      </div>

      {/* Step info */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {stepInfo.title}
          </h3>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>
        <p
          className="text-sm text-zinc-600 dark:text-zinc-400"
          dangerouslySetInnerHTML={{ __html: stepInfo.description }}
        />
      </div>
    </div>
  );
}
