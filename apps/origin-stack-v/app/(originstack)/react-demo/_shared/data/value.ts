import type { NavItem } from "@repo/ui/components/header/client/navigation-menu";

/**
 * Navigation items for React Demo header
 * Used in the main navigation menu
 */
export const navigationItems: NavItem[] = [
  {
    label: "Learn",
    type: "sub",
    children: [
      {
        label: "useState",
        href: "/react-demo/hooks/use-state",
        type: "main",
        description:
          "Learn how to manage component state with the useState hook.",
      },
      {
        label: "useEffect",
        href: "/react-demo/hooks/use-effect",
        type: "main",
        description:
          "Understand side effects and lifecycle with the useEffect hook.",
      },
      {
        label: "useContext",
        href: "/react-demo/hooks/use-context",
        type: "main",
        description:
          "Share data across components without prop drilling using Context.",
      },
      {
        label: "useRef",
        href: "/react-demo/hooks/use-ref",
        type: "main",
        description: "Access DOM elements and persist values across renders.",
      },
      {
        label: "useMemo",
        href: "/react-demo/hooks/use-memo",
        type: "main",
        description:
          "Optimize performance by memoizing expensive calculations.",
      },
      {
        label: "useCallback",
        href: "/react-demo/hooks/use-callback",
        type: "main",
        description:
          "Memoize callback functions to prevent unnecessary re-renders.",
      },
    ],
  },
  {
    label: "Demo",
    href: "/react-demo/demo",
    type: "main",
  },
];
