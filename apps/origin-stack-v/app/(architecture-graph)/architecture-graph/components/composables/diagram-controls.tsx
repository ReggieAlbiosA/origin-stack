"use client";

import { cn } from "@/lib/utils";
import { Button } from "@repo/ui/components/shadcn-ui/button";
import { Play, RotateCcw } from "lucide-react";
import { useDiagram } from "../core/provider";
import { StepIndicator } from "./step-indicator";

interface DiagramControlsProps {
  className?: string;
}

export function DiagramControls({ className }: DiagramControlsProps) {
  const { config, runAnimation, reset, isAnimating, isComplete } = useDiagram();

  return (
    <div className={cn("space-y-4", className)}>
      {/* Buttons */}
      <div className="flex items-center gap-3">
        <Button
          onClick={runAnimation}
          disabled={isAnimating || isComplete}
          className="gap-2"
        >
          <Play className="h-4 w-4" />
          {config.primaryAction.label}
        </Button>
        <Button
          onClick={reset}
          variant="outline"
          disabled={isAnimating}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Step indicator */}
      <StepIndicator />
    </div>
  );
}
