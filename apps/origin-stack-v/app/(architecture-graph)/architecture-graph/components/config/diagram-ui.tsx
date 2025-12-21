"use client";

import * as React from "react";
import * as d3 from "d3";
import { cn } from "@/lib/utils";
import { Button } from "@repo/ui/components/shadcn-ui/button";
import { Card, CardContent } from "@repo/ui/components/shadcn-ui/card";
import { Play, RotateCcw } from "lucide-react";
import { useDiagram } from "../core/provider";
import {
  generateLinkPath,
  getNodeColor,
  createArrowMarker,
  createParticleAnimation,
  createFlashEffect,
} from "../utils/d3-helpers";

// ============================================================================
// Diagram Layout
// ============================================================================

interface DiagramLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DiagramLayout({ children, className }: DiagramLayoutProps) {
  return (
    <div
      className={cn(
        "w-full max-w-5xl mx-auto p-6 lg:p-8",
        "flex flex-col gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}

// ============================================================================
// Diagram Header
// ============================================================================

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

// ============================================================================
// Diagram Card
// ============================================================================

interface DiagramCardProps {
  children: React.ReactNode;
  className?: string;
}

export function DiagramCard({ children, className }: DiagramCardProps) {
  return (
    <Card
      className={cn(
        "w-full overflow-hidden",
        "bg-zinc-50 dark:bg-zinc-800/50",
        "border-zinc-200 dark:border-zinc-700",
        className
      )}
    >
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}

// ============================================================================
// Step Indicator
// ============================================================================

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

// ============================================================================
// Diagram Controls
// ============================================================================

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

// ============================================================================
// Diagram Renderer
// ============================================================================

interface DiagramRendererProps {
  className?: string;
}

export function DiagramRenderer({ className }: DiagramRendererProps) {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const {
    config,
    nodes,
    links,
    branches,
    isAnimating,
    stepInfo,
  } = useDiagram();

  const { width, height } = config.dimensions;

  // Render the diagram
  React.useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    // Clear previous content
    svg.selectAll("*").remove();

    // Create defs for markers
    const defs = svg.append("defs");
    createArrowMarker(defs, "arrow", "#9ca3af");
    createArrowMarker(defs, "arrow-faded", "#d1d5db");

    // Create groups for layering
    const branchGroup = svg.append("g").attr("class", "branches");
    const linkGroup = svg.append("g").attr("class", "links");
    const nodeGroup = svg.append("g").attr("class", "nodes");
    const labelGroup = svg.append("g").attr("class", "labels");

    // Render branch lines
    branches
      .filter((b) => b.visible !== false)
      .forEach((branch) => {
        branchGroup
          .append("line")
          .attr("class", "branch-line")
          .attr("x1", branch.startX ?? 50)
          .attr("y1", branch.y)
          .attr("x2", branch.endX ?? width - 50)
          .attr("y2", branch.y)
          .attr("stroke", branch.color)
          .attr("stroke-width", 2)
          .attr("stroke-dasharray", "5,5")
          .attr("opacity", 0.3);

        // Branch label
        labelGroup
          .append("text")
          .attr("class", "branch-label")
          .attr("x", branch.startX ?? 50)
          .attr("y", branch.y - 25)
          .attr("fill", branch.color)
          .attr("font-size", "12px")
          .attr("font-weight", "600")
          .attr("font-family", "monospace")
          .text(branch.name);
      });

    // Create node map for link rendering
    const nodeMap = new Map(nodes.map((n) => [n.id, n]));

    // Render links
    links.forEach((link) => {
      const sourceNode = nodeMap.get(link.source);
      const targetNode = nodeMap.get(link.target);

      if (!sourceNode || !targetNode) return;

      const pathData = generateLinkPath(sourceNode, targetNode, link.curved);

      linkGroup
        .append("path")
        .attr("class", "link")
        .attr("d", pathData)
        .attr("fill", "none")
        .attr("stroke", link.dashed ? "#d1d5db" : "#9ca3af")
        .attr("stroke-width", 3)
        .attr("stroke-dasharray", link.dashed ? "5,5" : "none")
        .attr("opacity", link.opacity ?? 1)
        .attr("marker-end", `url(#${link.dashed ? "arrow-faded" : "arrow"})`);
    });

    // Render nodes
    nodes
      .filter((n) => !n.hidden)
      .forEach((node) => {
        const nodeColor = getNodeColor(node.type, config.colors);
        const radius = node.radius ?? 18;

        // Check if this node should be highlighted
        const isHighlighted = stepInfo?.highlightNodes?.includes(node.id);
        const isFaded = stepInfo?.fadeNodes?.includes(node.id);

        // Node circle
        const circle = nodeGroup
          .append("circle")
          .attr("class", "node")
          .attr("cx", node.x)
          .attr("cy", node.y)
          .attr("r", radius)
          .attr("fill", isFaded ? "#94a3b8" : nodeColor)
          .attr("stroke", "white")
          .attr("stroke-width", 3)
          .style("cursor", "pointer");

        // Add highlight effect
        if (isHighlighted && stepInfo?.highlightColor) {
          circle
            .attr("stroke", stepInfo.highlightColor)
            .attr("stroke-width", 4);
        }

        // Node label
        nodeGroup
          .append("text")
          .attr("class", "node-label")
          .attr("x", node.x)
          .attr("y", node.y)
          .attr("dy", "0.35em")
          .attr("text-anchor", "middle")
          .attr("fill", "white")
          .attr("font-size", "12px")
          .attr("font-weight", "600")
          .attr("pointer-events", "none")
          .text(node.label);
      });

    // HEAD indicator - show on last node of main branch or squash node
    const headNode =
      nodes.find((n) => n.type === "squash") ??
      nodes.filter((n) => n.type === "main").pop();

    if (headNode) {
      const headGroup = labelGroup.append("g").attr("class", "head-indicator");

      headGroup
        .append("rect")
        .attr("x", headNode.x - 25)
        .attr("y", headNode.y + 30)
        .attr("width", 50)
        .attr("height", 22)
        .attr("rx", 4)
        .attr("fill", "#18181b")
        .attr("stroke", "#3f3f46")
        .attr("stroke-width", 1);

      headGroup
        .append("text")
        .attr("x", headNode.x)
        .attr("y", headNode.y + 45)
        .attr("text-anchor", "middle")
        .attr("fill", "#22c55e")
        .attr("font-size", "11px")
        .attr("font-weight", "600")
        .attr("font-family", "monospace")
        .text("HEAD");
    }
  }, [nodes, links, branches, config, stepInfo, width, height]);

  // Handle particle animations
  React.useEffect(() => {
    if (!svgRef.current || !isAnimating || !stepInfo?.moveParticles) return;

    const svg = d3.select(svgRef.current);
    const nodeMap = new Map(nodes.map((n) => [n.id, n]));

    const fromNodes = stepInfo.moveParticles.fromNodes
      .map((id) => nodeMap.get(id))
      .filter((n): n is NonNullable<typeof n> => n !== undefined);

    if (fromNodes.length > 0) {
      createParticleAnimation(
        svg,
        fromNodes,
        stepInfo.moveParticles.toPosition,
        stepInfo.duration,
        config.colors.particle ?? "#3b82f6"
      );
    }
  }, [isAnimating, stepInfo, nodes, config.colors.particle]);

  // Handle new node flash effect
  React.useEffect(() => {
    if (!svgRef.current || !stepInfo?.addNodes) return;

    const svg = d3.select(svgRef.current);

    stepInfo.addNodes.forEach((node) => {
      setTimeout(() => {
        createFlashEffect(
          svg,
          node.x,
          node.y,
          getNodeColor(node.type, config.colors)
        );
      }, 100);
    });
  }, [stepInfo?.addNodes, config.colors]);

  return (
    <div className={className}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="bg-white dark:bg-zinc-900"
        style={{ minHeight: height }}
      />
    </div>
  );
}
