// ============================================================================
// Node Types
// ============================================================================

export type NodeType = "main" | "feature" | "squash" | "merge" | "rebase" | "stash";

export interface DiagramNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: NodeType;
  radius?: number; // Default: 18
  hidden?: boolean; // For animation states
}

// ============================================================================
// Link Types
// ============================================================================

export interface DiagramLink {
  source: string; // Node ID
  target: string; // Node ID
  curved?: boolean; // Auto-detect if source.y !== target.y
  dashed?: boolean; // For ghost/old links
  opacity?: number; // For fading effects
}

// ============================================================================
// Branch Types
// ============================================================================

export interface BranchConfig {
  name: string;
  color: string;
  y: number; // Y position for the branch line
  startX?: number; // Where the branch line starts
  endX?: number; // Where the branch line ends
  visible?: boolean; // Can be hidden during animations
}

// ============================================================================
// Animation Step Types
// ============================================================================

export interface AnimationStep {
  id: string;
  title: string;
  description: string; // HTML allowed for bold, etc.
  progress: number; // 0-100 for progress bar
  duration: number; // ms

  // State changes for this step
  highlightNodes?: string[]; // Node IDs to highlight
  highlightColor?: string; // Highlight stroke color
  fadeNodes?: string[]; // Node IDs to fade/gray out
  fadeLinks?: string[]; // Link targets to fade
  addNodes?: DiagramNode[]; // New nodes to add
  addLinks?: DiagramLink[]; // New links to add
  moveParticles?: {
    // Particle animation
    fromNodes: string[];
    toPosition: { x: number; y: number };
  };
  updateBranches?: Partial<BranchConfig>[]; // Branch visibility changes
}

// ============================================================================
// Diagram Config (Main Config Object)
// ============================================================================

export interface DiagramConfig {
  // Metadata
  id: string;
  title: string;
  subtitle: string;

  // Visual settings
  dimensions: {
    width: number;
    height: number;
    margin: { top: number; right: number; bottom: number; left: number };
  };

  // Color palette
  colors: {
    main: string;
    feature: string;
    squash: string;
    merge?: string;
    rebase?: string;
    particle?: string;
    highlight?: string;
  };

  // Branch definitions
  branches: BranchConfig[];

  // Initial state
  initialNodes: DiagramNode[];
  initialLinks: DiagramLink[];

  // Animation configuration
  steps: AnimationStep[];

  // Action button config
  primaryAction: {
    label: string;
    icon?: string; // Lucide icon name
  };

  // Badges/tags to show
  badges?: Array<{
    label: string;
    color: string;
    borderColor: string;
  }>;
}

// ============================================================================
// Context Types
// ============================================================================

export interface DiagramContextValue {
  config: DiagramConfig;

  // State
  nodes: DiagramNode[];
  links: DiagramLink[];
  branches: BranchConfig[];
  currentStep: number;
  isAnimating: boolean;
  isComplete: boolean;

  // Actions
  runAnimation: () => Promise<void>;
  reset: () => void;
  goToStep: (step: number) => void;

  // Current step info
  stepInfo: AnimationStep | null;
}
