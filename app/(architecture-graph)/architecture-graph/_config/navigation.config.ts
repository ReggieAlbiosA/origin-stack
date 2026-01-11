import {
  GitMerge,
  GitBranch,
  GitCommit,
  GitPullRequest,
  History,
  Archive,
  Tag,
  Webhook,
  Workflow,
  Cloud,
  Globe,
  Shield,
  Database,
  Lock,
  Key,
  Table,
  FileJson,
  Box,
  Layers,
  HardDrive,
  Network,
  Server,
  Settings,
  Cpu,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { SiGit, SiDocker } from "react-icons/si";
import { IconType } from "react-icons/lib";

// Navigation configuration types
export interface NavigationLink {
  type: "link";
  label: string;
  href: string;
  icon?: LucideIcon | IconType;
}

export interface NavigationSection {
  type: "section";
  label: string;
  icon?: LucideIcon | IconType;
  collapsible?: boolean;
  defaultOpen?: boolean;
  children: NavigationItem[];
}

export type NavigationItem = NavigationLink | NavigationSection;

/**
 * Navigation configuration
 *
 * To add new navigation items:
 * 1. For a simple link, add: { type: "link", label: "...", href: "..." }
 * 2. For a section with children, add: { type: "section", label: "...", children: [...] }
 * 3. Sections can be nested infinitely deep
 * 4. Icons are optional and use lucide-react
 *
 * Example of adding a new deep hierarchy:
 * {
 *   type: "section",
 *   label: "Database",
 *   icon: Database,
 *   collapsible: true,
 *   defaultOpen: false,
 *   children: [
 *     {
 *       type: "section",
 *       label: "PostgreSQL",
 *       children: [
 *         {
 *           type: "section",
 *           label: "Queries",
 *           children: [
 *             { type: "link", label: "Select", href: "/db/postgres/queries/select" },
 *             { type: "link", label: "Insert", href: "/db/postgres/queries/insert" }
 *           ]
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
export const navigationConfig: NavigationItem[] = [
  {
    type: "section",
    label: "Git",
    icon: SiGit,
    collapsible: true,
    defaultOpen: true,
    children: [
      {
        type: "section",
        label: "Branching",
        icon: GitBranch,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Branch Basics",
            href: "/architecture-graph/git/branching/basics",
          },
          {
            type: "link",
            label: "Feature Branches",
            href: "/architecture-graph/git/branching/feature",
          },
          {
            type: "link",
            label: "Release Branches",
            href: "/architecture-graph/git/branching/release",
          },
          {
            type: "link",
            label: "Hotfix Branches",
            href: "/architecture-graph/git/branching/hotfix",
          },
          {
            type: "link",
            label: "Development Branches",
            href: "/architecture-graph/git/branching/development",
          },
          {
            type: "link",
            label: "Branch Protection",
            href: "/architecture-graph/git/branching/protection",
          },
        ],
      },
      {
        type: "section",
        label: "Commits",
        icon: GitCommit,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Commit Basics",
            href: "/architecture-graph/git/commits/basics",
          },
          {
            type: "link",
            label: "Conventional Commits",
            href: "/architecture-graph/git/commits/conventional",
          },
          {
            type: "link",
            label: "Commit Amend",
            href: "/architecture-graph/git/commits/amend",
          },
          {
            type: "link",
            label: "Cherry Pick",
            href: "/architecture-graph/git/commits/cherry-pick",
          },
          {
            type: "link",
            label: "Revert",
            href: "/architecture-graph/git/commits/revert",
          },
          {
            type: "link",
            label: "Reset",
            href: "/architecture-graph/git/commits/reset",
          },
          {
            type: "link",
            label: "Commit Messages",
            href: "/architecture-graph/git/commits/messages",
          },
        ],
      },
      {
        type: "section",
        label: "Merging",
        icon: GitMerge,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Merge Strategies",
            href: "/architecture-graph/git/merge/strategies",
          },
          {
            type: "link",
            label: "Non Fast-Forward",
            href: "/architecture-graph/git/merging/non-fast-forward-merge",
          },
          {
            type: "link",
            label: "Fast-Forward",
            href: "/architecture-graph/git/merging/fast-forward-merge",
          },
          {
            type: "link",
            label: "Three-Way Merge",
            href: "/architecture-graph/git/merging/three-way",
          },
          {
            type: "link",
            label: "Squash Merge",
            href: "/architecture-graph/git/merging/squash",
          },
          {
            type: "link",
            label: "Rebase Merge",
            href: "/architecture-graph/git/merging/rebase",
          },
          {
            type: "link",
            label: "Merge Conflicts",
            href: "/architecture-graph/git/merging/conflicts",
          },
          {
            type: "link",
            label: "Conflict Resolution",
            href: "/architecture-graph/git/merging/conflict-resolution",
          },
        ],
      },
      {
        type: "section",
        label: "Rebasing",
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Rebase Basics",
            href: "/architecture-graph/git/rebase/basics",
          },
          {
            type: "link",
            label: "Interactive Rebase",
            href: "/architecture-graph/git/rebase/interactive",
          },
          {
            type: "link",
            label: "Rebase vs Merge",
            href: "/architecture-graph/git/rebase/vs-merge",
          },
          {
            type: "link",
            label: "Golden Rule",
            href: "/architecture-graph/git/rebase/golden-rule",
          },
        ],
      },
      {
        type: "section",
        label: "Pull Requests",
        icon: GitPullRequest,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "PR Basics",
            href: "/architecture-graph/git/pull-requests/basics",
          },
          {
            type: "link",
            label: "PR Best Practices",
            href: "/architecture-graph/git/pull-requests/best-practices",
          },
          {
            type: "link",
            label: "Code Review",
            href: "/architecture-graph/git/pull-requests/code-review",
          },
          {
            type: "link",
            label: "Draft PRs",
            href: "/architecture-graph/git/pull-requests/draft",
          },
          {
            type: "link",
            label: "PR Templates",
            href: "/architecture-graph/git/pull-requests/templates",
          },
        ],
      },
      {
        type: "section",
        label: "Workflows",
        icon: Workflow,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "GitFlow",
            href: "/architecture-graph/git/workflows/gitflow",
          },
          {
            type: "link",
            label: "GitHub Flow",
            href: "/architecture-graph/git/workflows/github-flow",
          },
          {
            type: "link",
            label: "GitLab Flow",
            href: "/architecture-graph/git/workflows/gitlab-flow",
          },
          {
            type: "link",
            label: "Trunk-Based Development",
            href: "/architecture-graph/git/workflows/trunk-based",
          },
          {
            type: "link",
            label: "Forking Workflow",
            href: "/architecture-graph/git/workflows/forking",
          },
        ],
      },
      {
        type: "section",
        label: "Remote Operations",
        icon: Cloud,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Clone",
            href: "/architecture-graph/git/remote/clone",
          },
          {
            type: "link",
            label: "Fetch",
            href: "/architecture-graph/git/remote/fetch",
          },
          {
            type: "link",
            label: "Pull",
            href: "/architecture-graph/git/remote/pull",
          },
          {
            type: "link",
            label: "Push",
            href: "/architecture-graph/git/remote/push",
          },
          {
            type: "link",
            label: "Force Push",
            href: "/architecture-graph/git/remote/force-push",
          },
          {
            type: "link",
            label: "Upstream Tracking",
            href: "/architecture-graph/git/remote/upstream",
          },
        ],
      },
      {
        type: "section",
        label: "History",
        icon: History,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Git Log",
            href: "/architecture-graph/git/history/log",
          },
          {
            type: "link",
            label: "Git Blame",
            href: "/architecture-graph/git/history/blame",
          },
          {
            type: "link",
            label: "Git Reflog",
            href: "/architecture-graph/git/history/reflog",
          },
          {
            type: "link",
            label: "Diff",
            href: "/architecture-graph/git/history/diff",
          },
          {
            type: "link",
            label: "Show",
            href: "/architecture-graph/git/history/show",
          },
        ],
      },
      {
        type: "section",
        label: "Stashing",
        icon: Archive,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Stash Basics",
            href: "/architecture-graph/git/stash/basics",
          },
          {
            type: "link",
            label: "Stash List",
            href: "/architecture-graph/git/stash/list",
          },
          {
            type: "link",
            label: "Apply & Pop",
            href: "/architecture-graph/git/stash/apply-pop",
          },
          {
            type: "link",
            label: "Stash Branch",
            href: "/architecture-graph/git/stash/branch",
          },
        ],
      },
      {
        type: "section",
        label: "Tags & Releases",
        icon: Tag,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Lightweight Tags",
            href: "/architecture-graph/git/tags/lightweight",
          },
          {
            type: "link",
            label: "Annotated Tags",
            href: "/architecture-graph/git/tags/annotated",
          },
          {
            type: "link",
            label: "Semantic Versioning",
            href: "/architecture-graph/git/tags/semver",
          },
          {
            type: "link",
            label: "Release Management",
            href: "/architecture-graph/git/tags/releases",
          },
        ],
      },
      {
        type: "section",
        label: "Git Hooks",
        icon: Webhook,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Hooks Overview",
            href: "/architecture-graph/git/hooks/overview",
          },
          {
            type: "link",
            label: "Pre-Commit",
            href: "/architecture-graph/git/hooks/pre-commit",
          },
          {
            type: "link",
            label: "Pre-Push",
            href: "/architecture-graph/git/hooks/pre-push",
          },
          {
            type: "link",
            label: "Commit-Msg",
            href: "/architecture-graph/git/hooks/commit-msg",
          },
          {
            type: "link",
            label: "Husky",
            href: "/architecture-graph/git/hooks/husky",
          },
        ],
      },
      {
        type: "section",
        label: "Advanced Topics",
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Submodules",
            href: "/architecture-graph/git/advanced/submodules",
          },
          {
            type: "link",
            label: "Subtrees",
            href: "/architecture-graph/git/advanced/subtrees",
          },
          {
            type: "link",
            label: "Bisect",
            href: "/architecture-graph/git/advanced/bisect",
          },
          {
            type: "link",
            label: "Worktrees",
            href: "/architecture-graph/git/advanced/worktrees",
          },
          {
            type: "link",
            label: "Sparse Checkout",
            href: "/architecture-graph/git/advanced/sparse-checkout",
          },
          {
            type: "link",
            label: "Git LFS",
            href: "/architecture-graph/git/advanced/lfs",
          },
        ],
      },
      {
        type: "section",
        label: "Best Practices",
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Clean History",
            href: "/architecture-graph/git/best-practices/clean-history",
          },
          {
            type: "link",
            label: "Atomic Commits",
            href: "/architecture-graph/git/best-practices/atomic-commits",
          },
          {
            type: "link",
            label: "Branch Naming",
            href: "/architecture-graph/git/best-practices/branch-naming",
          },
          {
            type: "link",
            label: "Gitignore",
            href: "/architecture-graph/git/best-practices/gitignore",
          },
          {
            type: "link",
            label: "Security",
            href: "/architecture-graph/git/best-practices/security",
          },
        ],
      },
    ],
  },
  // ============================================================================
  // Docker Section
  // ============================================================================
  {
    type: "section",
    label: "Docker",
    icon: SiDocker,
    collapsible: true,
    defaultOpen: false,
    children: [
      {
        type: "section",
        label: "Core Concepts",
        icon: Cpu,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Architecture",
            href: "/architecture-graph/docker/core-concepts/architecture",
          },
          {
            type: "link",
            label: "Daemon & Client",
            href: "/architecture-graph/docker/core-concepts/daemon-client",
          },
          {
            type: "link",
            label: "containerd",
            href: "/architecture-graph/docker/core-concepts/containerd",
          },
          {
            type: "link",
            label: "runc",
            href: "/architecture-graph/docker/core-concepts/runc",
          },
        ],
      },
      {
        type: "section",
        label: "Containers",
        icon: Box,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Container Basics",
            href: "/architecture-graph/docker/containers/basics",
          },
          {
            type: "link",
            label: "Container Lifecycle",
            href: "/architecture-graph/docker/containers/lifecycle",
          },
          {
            type: "link",
            label: "Isolation",
            href: "/architecture-graph/docker/containers/isolation",
          },
          {
            type: "link",
            label: "Processes",
            href: "/architecture-graph/docker/containers/processes",
          },
          {
            type: "link",
            label: "Resource Limits",
            href: "/architecture-graph/docker/containers/resource-limits",
          },
        ],
      },
      {
        type: "section",
        label: "Images",
        icon: Layers,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Image Layers",
            href: "/architecture-graph/docker/images/layers",
          },
          {
            type: "link",
            label: "Dockerfile",
            href: "/architecture-graph/docker/images/dockerfile",
          },
          {
            type: "link",
            label: "Build Context",
            href: "/architecture-graph/docker/images/build-context",
          },
          {
            type: "link",
            label: "Multi-stage Builds",
            href: "/architecture-graph/docker/images/multi-stage",
          },
          {
            type: "link",
            label: "Caching",
            href: "/architecture-graph/docker/images/caching",
          },
          {
            type: "link",
            label: "Registry",
            href: "/architecture-graph/docker/images/registry",
          },
        ],
      },
      {
        type: "section",
        label: "Volumes",
        icon: HardDrive,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Volume Basics",
            href: "/architecture-graph/docker/volumes/basics",
          },
          {
            type: "link",
            label: "Bind Mounts",
            href: "/architecture-graph/docker/volumes/bind-mounts",
          },
          {
            type: "link",
            label: "Named Volumes",
            href: "/architecture-graph/docker/volumes/named-volumes",
          },
          {
            type: "link",
            label: "tmpfs Mounts",
            href: "/architecture-graph/docker/volumes/tmpfs",
          },
          {
            type: "link",
            label: "Volume Drivers",
            href: "/architecture-graph/docker/volumes/drivers",
          },
        ],
      },
      {
        type: "section",
        label: "Networking",
        icon: Network,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Network Basics",
            href: "/architecture-graph/docker/networking/basics",
          },
          {
            type: "link",
            label: "Bridge Networks",
            href: "/architecture-graph/docker/networking/bridge",
          },
          {
            type: "link",
            label: "Host Networks",
            href: "/architecture-graph/docker/networking/host",
          },
          {
            type: "link",
            label: "Overlay Networks",
            href: "/architecture-graph/docker/networking/overlay",
          },
          {
            type: "link",
            label: "Port Mapping",
            href: "/architecture-graph/docker/networking/port-mapping",
          },
          {
            type: "link",
            label: "DNS Resolution",
            href: "/architecture-graph/docker/networking/dns",
          },
        ],
      },
      {
        type: "section",
        label: "Docker Compose",
        icon: Settings,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Compose Basics",
            href: "/architecture-graph/docker/compose/basics",
          },
          {
            type: "link",
            label: "Services",
            href: "/architecture-graph/docker/compose/services",
          },
          {
            type: "link",
            label: "Dependencies",
            href: "/architecture-graph/docker/compose/dependencies",
          },
          {
            type: "link",
            label: "Networks",
            href: "/architecture-graph/docker/compose/networks",
          },
          {
            type: "link",
            label: "Volumes",
            href: "/architecture-graph/docker/compose/volumes",
          },
          {
            type: "link",
            label: "Profiles",
            href: "/architecture-graph/docker/compose/profiles",
          },
        ],
      },
      {
        type: "section",
        label: "Orchestration",
        icon: Server,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Swarm Basics",
            href: "/architecture-graph/docker/orchestration/swarm-basics",
          },
          {
            type: "link",
            label: "Nodes",
            href: "/architecture-graph/docker/orchestration/nodes",
          },
          {
            type: "link",
            label: "Services",
            href: "/architecture-graph/docker/orchestration/services",
          },
          {
            type: "link",
            label: "Stacks",
            href: "/architecture-graph/docker/orchestration/stacks",
          },
          {
            type: "link",
            label: "Secrets",
            href: "/architecture-graph/docker/orchestration/secrets",
          },
        ],
      },
      {
        type: "section",
        label: "Security",
        icon: Shield,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Root vs Rootless",
            href: "/architecture-graph/docker/security/root-vs-rootless",
          },
          {
            type: "link",
            label: "User Namespaces",
            href: "/architecture-graph/docker/security/user-namespaces",
          },
          {
            type: "link",
            label: "Capabilities",
            href: "/architecture-graph/docker/security/capabilities",
          },
          {
            type: "link",
            label: "Seccomp",
            href: "/architecture-graph/docker/security/seccomp",
          },
          {
            type: "link",
            label: "Image Scanning",
            href: "/architecture-graph/docker/security/image-scanning",
          },
        ],
      },
      {
        type: "section",
        label: "Best Practices",
        icon: Sparkles,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Dockerfile",
            href: "/architecture-graph/docker/best-practices/dockerfile",
          },
          {
            type: "link",
            label: "Image Size",
            href: "/architecture-graph/docker/best-practices/image-size",
          },
          {
            type: "link",
            label: "Layer Optimization",
            href: "/architecture-graph/docker/best-practices/layer-optimization",
          },
          {
            type: "link",
            label: "Security",
            href: "/architecture-graph/docker/best-practices/security",
          },
          {
            type: "link",
            label: "CI/CD",
            href: "/architecture-graph/docker/best-practices/ci-cd",
          },
        ],
      },
    ],
  },
  {
    type: "section",
    label: "API",
    icon: Globe,
    collapsible: true,
    defaultOpen: false,
    children: [
      {
        type: "link",
        label: "Overview",
        href: "/architecture-graph/api/overview",
      },
      {
        type: "section",
        label: "REST",
        icon: FileJson,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "GET Requests",
            href: "/architecture-graph/api/rest/get",
          },
          {
            type: "link",
            label: "POST Requests",
            href: "/architecture-graph/api/rest/post",
          },
          {
            type: "link",
            label: "PUT Requests",
            href: "/architecture-graph/api/rest/put",
          },
          {
            type: "link",
            label: "DELETE Requests",
            href: "/architecture-graph/api/rest/delete",
          },
        ],
      },
      {
        type: "section",
        label: "GraphQL",
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Queries",
            href: "/architecture-graph/api/graphql/queries",
          },
          {
            type: "link",
            label: "Mutations",
            href: "/architecture-graph/api/graphql/mutations",
          },
          {
            type: "link",
            label: "Subscriptions",
            href: "/architecture-graph/api/graphql/subscriptions",
          },
        ],
      },
      {
        type: "section",
        label: "WebSockets",
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Connection",
            href: "/architecture-graph/api/websockets/connection",
          },
          {
            type: "link",
            label: "Events",
            href: "/architecture-graph/api/websockets/events",
          },
          {
            type: "link",
            label: "Broadcasting",
            href: "/architecture-graph/api/websockets/broadcasting",
          },
        ],
      },
    ],
  },
  {
    type: "section",
    label: "Security",
    icon: Shield,
    collapsible: true,
    defaultOpen: false,
    children: [
      {
        type: "link",
        label: "Overview",
        href: "/architecture-graph/security/overview",
      },
      {
        type: "section",
        label: "Authentication",
        icon: Lock,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "JWT",
            href: "/architecture-graph/security/authentication/jwt",
          },
          {
            type: "link",
            label: "OAuth",
            href: "/architecture-graph/security/authentication/oauth",
          },
          {
            type: "link",
            label: "Session-based",
            href: "/architecture-graph/security/authentication/session",
          },
          {
            type: "link",
            label: "API Keys",
            href: "/architecture-graph/security/authentication/api-keys",
          },
        ],
      },
      {
        type: "section",
        label: "Authorization",
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "RBAC",
            href: "/architecture-graph/security/authorization/rbac",
          },
          {
            type: "link",
            label: "ABAC",
            href: "/architecture-graph/security/authorization/abac",
          },
          {
            type: "link",
            label: "Permissions",
            href: "/architecture-graph/security/authorization/permissions",
          },
        ],
      },
      {
        type: "section",
        label: "Encryption",
        icon: Key,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "At Rest",
            href: "/architecture-graph/security/encryption/at-rest",
          },
          {
            type: "link",
            label: "In Transit",
            href: "/architecture-graph/security/encryption/in-transit",
          },
          {
            type: "link",
            label: "Hashing",
            href: "/architecture-graph/security/encryption/hashing",
          },
        ],
      },
    ],
  },
  {
    type: "section",
    label: "Database",
    icon: Database,
    collapsible: true,
    defaultOpen: false,
    children: [
      {
        type: "link",
        label: "Overview",
        href: "/architecture-graph/database/overview",
      },
      {
        type: "section",
        label: "SQL",
        icon: Table,
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "SELECT",
            href: "/architecture-graph/database/sql/select",
          },
          {
            type: "link",
            label: "INSERT",
            href: "/architecture-graph/database/sql/insert",
          },
          {
            type: "link",
            label: "UPDATE",
            href: "/architecture-graph/database/sql/update",
          },
          {
            type: "link",
            label: "DELETE",
            href: "/architecture-graph/database/sql/delete",
          },
          {
            type: "link",
            label: "Joins",
            href: "/architecture-graph/database/sql/joins",
          },
        ],
      },
      {
        type: "section",
        label: "Migrations",
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Creating Migrations",
            href: "/architecture-graph/database/migrations/creating",
          },
          {
            type: "link",
            label: "Running Migrations",
            href: "/architecture-graph/database/migrations/running",
          },
          {
            type: "link",
            label: "Rollbacks",
            href: "/architecture-graph/database/migrations/rollbacks",
          },
        ],
      },
      {
        type: "section",
        label: "Optimization",
        collapsible: true,
        defaultOpen: false,
        children: [
          {
            type: "link",
            label: "Indexing",
            href: "/architecture-graph/database/optimization/indexing",
          },
          {
            type: "link",
            label: "Query Optimization",
            href: "/architecture-graph/database/optimization/query",
          },
          {
            type: "link",
            label: "Caching",
            href: "/architecture-graph/database/optimization/caching",
          },
        ],
      },
    ],
  },
  // Add more top-level sections here
];
