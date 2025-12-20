"use client";

import * as React from "react";
import type {
  DiagramConfig,
  DiagramContextValue,
  DiagramNode,
  DiagramLink,
  BranchConfig,
  AnimationStep,
} from "../../types";

// ============================================================================
// Context
// ============================================================================

const DiagramContext = React.createContext<DiagramContextValue | null>(null);

export function useDiagram() {
  const context = React.useContext(DiagramContext);
  if (!context) {
    throw new Error("useDiagram must be used within a DiagramProvider");
  }
  return context;
}

// ============================================================================
// Provider
// ============================================================================

interface DiagramProviderProps {
  config: DiagramConfig;
  children: React.ReactNode;
}

export function DiagramProvider({ config, children }: DiagramProviderProps) {
  // State
  const [nodes, setNodes] = React.useState<DiagramNode[]>(config.initialNodes);
  const [links, setLinks] = React.useState<DiagramLink[]>(config.initialLinks);
  const [branches, setBranches] = React.useState<BranchConfig[]>(config.branches);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);

  // Get current step info
  const stepInfo: AnimationStep | null = React.useMemo(() => {
    return config.steps[currentStep] ?? null;
  }, [config.steps, currentStep]);

  // Reset to initial state
  const reset = React.useCallback(() => {
    setNodes(config.initialNodes);
    setLinks(config.initialLinks);
    setBranches(config.branches);
    setCurrentStep(0);
    setIsAnimating(false);
    setIsComplete(false);
  }, [config]);

  // Go to specific step (for manual navigation)
  const goToStep = React.useCallback((step: number) => {
    if (step >= 0 && step < config.steps.length) {
      setCurrentStep(step);
    }
  }, [config.steps.length]);

  // Run animation sequence
  const runAnimation = React.useCallback(async () => {
    if (isAnimating) return;

    setIsAnimating(true);

    for (let i = 0; i < config.steps.length; i++) {
      const step = config.steps[i];
      if (!step) continue;

      setCurrentStep(i);

      // Apply step changes
      if (step.addNodes) {
        const nodesToAdd = step.addNodes;
        setNodes((prev) => [...prev, ...nodesToAdd]);
      }

      if (step.addLinks) {
        const linksToAdd = step.addLinks;
        setLinks((prev) => [...prev, ...linksToAdd]);
      }

      if (step.fadeNodes) {
        const fadeNodeIds = step.fadeNodes;
        setNodes((prev) =>
          prev.map((node) =>
            fadeNodeIds.includes(node.id)
              ? { ...node, hidden: true }
              : node
          )
        );
      }

      if (step.fadeLinks) {
        const fadeLinkTargets = step.fadeLinks;
        setLinks((prev) =>
          prev.map((link) =>
            fadeLinkTargets.includes(link.target)
              ? { ...link, dashed: true, opacity: 0.3 }
              : link
          )
        );
      }

      // Wait for step duration
      if (step.duration > 0) {
        await new Promise((resolve) => setTimeout(resolve, step.duration));
      }
    }

    setIsAnimating(false);
    setIsComplete(true);
  }, [config.steps, isAnimating]);

  // Context value
  const value: DiagramContextValue = React.useMemo(
    () => ({
      config,
      nodes,
      links,
      branches,
      currentStep,
      isAnimating,
      isComplete,
      runAnimation,
      reset,
      goToStep,
      stepInfo,
    }),
    [
      config,
      nodes,
      links,
      branches,
      currentStep,
      isAnimating,
      isComplete,
      runAnimation,
      reset,
      goToStep,
      stepInfo,
    ]
  );

  return (
    <DiagramContext.Provider value={value}>{children}</DiagramContext.Provider>
  );
}
