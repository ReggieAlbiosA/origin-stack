import type { SidebarConfig } from "@repo/ui/components/composite-ui/client/sidebar";
import type { SidebarConfig as SearchSidebarConfig } from "@repo/ui/components/sidebar/client/sidebar";

/**
 * Demo page content values
 */
export const demoPageTitle = "Sidebar Demo";

export const demoPageDescription =
  "This page demonstrates the custom sidebar component with various configuration options.";

export const demoFeatures = [
  "Collapsible sections with customizable default states",
  "Parent items with nested children",
  "Optional section headers",
  "Link items with optional descriptions",
  "Fully typed with TypeScript",
  "Dark mode support",
  "Responsive design (hidden on mobile)",
];

export const demoConfigurationTypes = [
  {
    title: "Section with Title",
    description:
      'Sections can have titles (like "GETTING STARTED" and "CORE CONCEPTS") and can be collapsible or not.',
  },
  {
    title: "Parent Items with Children",
    description:
      'Parent items can have nested children (like "State Hooks" and "Effect Hooks" in the sidebar). They can be collapsible or always expanded.',
  },
  {
    title: "Simple Link Items",
    description:
      "Simple links with optional descriptions that appear on hover or below the label.",
  },
  {
    title: "Sections without Titles",
    description:
      'You can have sections without titles that just render items directly (see "Advanced Patterns" at the bottom of the sidebar).',
  },
];

export const demoCallToAction = {
  title: "Try It Out",
  description:
    "Click around the sidebar to see the different behaviors. Try expanding and collapsing sections and parent items!",
};

/**
 * Page navigation for previous/next links
 */
export const demoPageNavigation = {
  previous: {
    label: "Previous Page",
    title: "Introduction",
    href: "/react-demo",
  },
  next: {
    label: "Next Page",
    title: "Installation",
    href: "/react-demo/getting-started/installation",
  },
};

/**
 * Sidebar configuration for React Demo
 * Used in the demo layout to display navigation
 */
export const sidebarConfig: SidebarConfig = {
  sections: [
    {
      title: "GETTING STARTED",
      collapsible: true,
      defaultOpen: true,
      items: [
        {
          label: "Installation",
          href: "/react-demo/getting-started/installation",
        },
        {
          label: "Editor setup",
          href: "/react-demo/getting-started/editor-setup",
        },
        {
          label: "Compatibility",
          href: "/react-demo/getting-started/compatibility",
        },
        {
          label: "Upgrade guide",
          href: "/react-demo/getting-started/upgrade-guide",
        },
      ],
    },
    {
      title: "CORE CONCEPTS",
      collapsible: true,
      defaultOpen: true,
      items: [
        {
          label: "Styling with utility classes",
          href: "/react-demo/core-concepts/styling",
        },
        {
          label: "Hover, focus, and other states",
          href: "/react-demo/core-concepts/states",
        },
        {
          label: "Responsive design",
          href: "/react-demo/core-concepts/responsive",
        },
        {
          label: "Dark mode",
          href: "/react-demo/core-concepts/dark-mode",
        },
        {
          label: "Theme variables",
          href: "/react-demo/core-concepts/theme-variables",
        },
        {
          label: "Colors",
          href: "/react-demo/core-concepts/colors",
        },
        {
          label: "Adding custom styles",
          href: "/react-demo/core-concepts/custom-styles",
        },
        {
          label: "Detecting classes in source files",
          href: "/react-demo/core-concepts/detecting-classes",
        },
        {
          label: "Functions and directives",
          href: "/react-demo/core-concepts/functions",
        },
      ],
    },
    {
      title: "REACT HOOKS",
      collapsible: true,
      defaultOpen: false,
      items: [
        {
          label: "State Hooks",
          collapsible: true,
          defaultOpen: false,
          children: [
            {
              label: "useState",
              href: "/react-demo/hooks/use-state",
              description: "Manage component state",
            },
            {
              label: "useReducer",
              href: "/react-demo/hooks/use-reducer",
              description: "Complex state logic",
            },
          ],
        },
        {
          label: "Effect Hooks",
          collapsible: true,
          defaultOpen: false,
          children: [
            {
              label: "useEffect",
              href: "/react-demo/hooks/use-effect",
              description: "Side effects and lifecycle",
            },
            {
              label: "useLayoutEffect",
              href: "/react-demo/hooks/use-layout-effect",
              description: "Synchronous effects",
            },
          ],
        },
        {
          label: "Performance Hooks",
          collapsible: true,
          defaultOpen: false,
          children: [
            {
              label: "useMemo",
              href: "/react-demo/hooks/use-memo",
              description: "Memoize calculations",
            },
            {
              label: "useCallback",
              href: "/react-demo/hooks/use-callback",
              description: "Memoize functions",
            },
          ],
        },
        {
          label: "useContext",
          href: "/react-demo/hooks/use-context",
        },
        {
          label: "useRef",
          href: "/react-demo/hooks/use-ref",
        },
      ],
    },
    {
      // No title - just a list of items
      title: "Advanced Patterns",
      collapsible: false,
      defaultOpen: false,
      items: [
        {
          label: "Render Props",
          href: "/react-demo/patterns/render-props",
        },
        {
          label: "Higher Order Components",
          href: "/react-demo/patterns/hoc",
        },
      ],
    },
  ],
};

/**
 * Search docs configuration for Header component
 * Simplified version for search interface compatibility
 */
export const searchDocsConfig: SearchSidebarConfig = {
  sections: [
    {
      title: "GETTING STARTED",
      collapsible: true,
      defaultOpen: true,
      items: [
        {
          label: "Installation",
          href: "/react-demo/getting-started/installation",
        },
        {
          label: "Editor setup",
          href: "/react-demo/getting-started/editor-setup",
        },
      ],
    },
    {
      title: "CORE CONCEPTS",
      collapsible: true,
      defaultOpen: true,
      items: [
        {
          label: "Styling with utility classes",
          href: "/react-demo/core-concepts/styling",
        },
        {
          label: "Responsive design",
          href: "/react-demo/core-concepts/responsive",
        },
        {
          label: "Dark mode",
          href: "/react-demo/core-concepts/dark-mode",
        },
      ],
    },
    {
      title: "REACT HOOKS",
      collapsible: true,
      defaultOpen: true,
      items: [
        {
          label: "useState",
          href: "/react-demo/hooks/useState",
        },
        {
          label: "useEffect",
          href: "/react-demo/hooks/useEffect",
        },
        {
          label: "useContext",
          href: "/react-demo/hooks/useContext",
        },
      ],
    },
  ],
};
