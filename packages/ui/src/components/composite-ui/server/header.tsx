/**
 * Composite Header Component (Server Component)
 *
 * A reusable, flexible header component that combines all navigation elements
 * into one cohesive interface. Designed for consistency across layouts while
 * allowing customization through props.
 *
 * Features:
 * - Responsive design (mobile/desktop)
 * - Server-rendered dropdown content support for SEO
 * - Integrated search, theme toggle, and navigation
 * - Accessible with ARIA labels
 * - Pre-rendered on server for optimal SEO
 */

import { type Route } from "next";
import Link from "next/link";
import NavigationMenu, {
  type NavItem,
} from "@/components/header/client/navigation-menu";
import CommandPalette from "@/components/header/client/search-interface";
import type { SidebarConfig } from "@/src/components/composables/client/sidebar";
import { SiGithub } from "react-icons/si";
import { DesktopViewThemeToggle } from "@/components/header/client/theme-toggle";
import MenuButton from "@/components/header/client/mobile-main-nav-menu";
import { type ReactNode } from "react";

// This component is a Server Component by default (no "use client" directive)
// It pre-renders SEO-important content like navigation links and branding

// ==================== Type Definitions ====================

/**
 * Site branding configuration
 */
type SiteBrand = {
  logo: React.FC<React.SVGProps<SVGSVGElement>>;
  name: string;
  description?: string;
  href: string;
};

/**
 * GitHub link configuration
 */
type GitHubLink = {
  href: string;
  ariaLabel?: string;
};

/**
 * Main Header component props
 */
interface HeaderProps {
  // Required props
  siteBrand: SiteBrand;
  navigationItems: NavItem[];

  // Optional props with defaults
  searchDocsItems?: SidebarConfig;
  githubLink?: GitHubLink;
  showThemeToggle?: boolean;
  showSearch?: boolean;
  showGitHub?: boolean;
  showMobileMenu?: boolean;

  // Custom content slots (for advanced use cases)
  leftContent?: ReactNode;
  rightContent?: ReactNode;

  // Styling
  className?: string;
  containerClassName?: string;
}

// ==================== Sub-Components ====================

/**
 * Site Logo/Brand component
 */
function SiteLogo({ brand }: { brand: SiteBrand }) {
  const LogoComponent = brand.logo;

  return (
    <Link
      href={brand.href as Route}
      className="flex items-center gap-2 group"
      aria-label={`${brand.name} home`}
    >
      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 rounded-lg transition-transform duration-200 group-hover:scale-105">
        <LogoComponent
          className="w-6 h-6 text-white dark:text-zinc-900"
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
          {brand.name}
        </span>
        {brand.description && (
          <span className="text-xs text-zinc-500 dark:text-zinc-400 leading-tight">
            {brand.description}
          </span>
        )}
      </div>
    </Link>
  );
}

/**
 * Vertical divider component
 */
function Divider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-zinc-300 dark:bg-zinc-700 h-6 w-[1px] ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * GitHub link component
 */
function GitHubLinkButton({
  link,
  className = "",
}: {
  link: GitHubLink;
  className?: string;
}) {
  return (
    <a
      href={link.href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.ariaLabel || "Visit our GitHub repository"}
    >
      <SiGithub className="w-5 h-5" aria-hidden="true" />
    </a>
  );
}

// ==================== Main Component ====================

/**
 * Header Component
 *
 * Composite header component that provides a complete navigation solution
 * with sensible defaults and flexible customization options.
 *
 * @example
 * ```tsx
 * <Header
 *   siteBrand={{ logo: MyLogo, name: "My App", href: "/" }}
 *   navigationItems={navItems}
 *   searchDocsItems={docsConfig}
 *   githubLink={{ href: "https://github.com/..." }}
 * />
 * ```
 */
export default function Header({
  siteBrand,
  navigationItems,
  searchDocsItems,
  githubLink = { href: "https://github.com" },
  showThemeToggle = true,
  showSearch = true,
  showGitHub = true,
  showMobileMenu = true,
  leftContent,
  rightContent,
  className = "",
  containerClassName = "",
}: HeaderProps) {
  const hideOnMobile = "hidden lg:flex";
  const showOnMobile = "flex lg:hidden";

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md ${className}`}
      role="banner"
    >
      <nav
        className={`mx-auto lg:px-4 px-3 py-3 flex items-center justify-between ${containerClassName}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Left Section: Logo + Custom Content */}
        <div className="flex items-center gap-8">
          <SiteLogo brand={siteBrand} />
          {leftContent}
        </div>

        {/* Right Section: Navigation + Actions */}
        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <NavigationMenu items={navigationItems} className={hideOnMobile} />

          <Divider className={hideOnMobile} />

          {/* Search */}
          {showSearch && <CommandPalette docsItems={searchDocsItems} />}

          {showSearch && <Divider />}

          {/* GitHub Link */}
          {showGitHub && (
            <GitHubLinkButton link={githubLink} className={hideOnMobile} />
          )}

          {/* Theme Toggle */}
          {showThemeToggle && (
            <DesktopViewThemeToggle className={hideOnMobile} />
          )}

          {/* Mobile Menu Button */}
          {showMobileMenu && (
            <MenuButton
              navigationItems={navigationItems}
              githubLink={githubLink}
              showSimpleMenu={true}
              className={showOnMobile}
            />
          )}

          {/* Custom Right Content */}
          {rightContent}
        </div>
      </nav>
    </header>
  );
}

// ==================== Exported Types ====================

export type { HeaderProps, SiteBrand, GitHubLink };
