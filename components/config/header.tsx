/**
 * Composable Header Components
 *
 * A collection of composable header components that can be assembled together
 * to create custom headers without the constraints of a config-based approach.
 *
 * Unlike the composite header in composite-ui/server/header.tsx which uses
 * a configuration object, these components give you full flexibility to
 * compose your header exactly how you need it.
 *
 * @example
 * ```tsx
 * <HeaderRoot>
 *   <HeaderContainer>
 *     <HeaderLogo name="My App" href="/" />
 *     <HeaderNav items={navItems} />
 *     <HeaderActions>
 *       <HeaderSearch />
 *       <HeaderDivider />
 *       <HeaderThemeToggle />
 *       <HeaderGitHubLink href="https://github.com/..." />
 *     </HeaderActions>
 *   </HeaderContainer>
 * </HeaderRoot>
 * ```
 */

import { type Route } from "next";
import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import NavigationMenu, {
  type NavItem,
} from "@/components/header/client/navigation-menu";
import CommandPalette from "@/components/header/client/search-interface";
import type { SidebarConfig } from "@/components/composables/client/sidebar";
import { SiGithub } from "react-icons/si";
import { DesktopViewThemeToggle } from "@/components/header/client/theme-toggle";
import MenuButton from "@/components/header/client/mobile-main-nav-menu";

// ==================== Type Definitions ====================

export interface HeaderRootProps {
  children: ReactNode;
  className?: string;
  sticky?: boolean;
}

export interface HeaderContainerProps {
  children: ReactNode;
  className?: string;
}

export interface HeaderLogoProps {
  logo?: React.FC<React.SVGProps<SVGSVGElement>>;
  name?: string;
  description?: string;
  href: string;
  children?: ReactNode;
  className?: string;
  logoClassName?: string;
  textClassName?: string;
}

export interface HeaderNavProps {
  items?: NavItem[];
  children?: ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

export interface HeaderSearchProps {
  docsItems?: SidebarConfig;
  children?: ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

export interface HeaderActionsProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "right";
}

export interface HeaderThemeToggleProps {
  className?: string;
  hideOnMobile?: boolean;
}

export interface HeaderGitHubLinkProps {
  href: string;
  ariaLabel?: string;
  className?: string;
  hideOnMobile?: boolean;
}

export interface HeaderDividerProps {
  className?: string;
  hideOnMobile?: boolean;
}

export interface HeaderMobileMenuProps {
  navigationItems: NavItem[];
  githubLink?: { href: string; ariaLabel?: string };
  className?: string;
  showSimpleMenu?: boolean;
}

// ==================== Components ====================

/**
 * HeaderRoot - Main container for the header
 *
 * Provides the structure and styling for the header wrapper.
 * Use this as the outermost container for all header components.
 */
export function HeaderRoot({
  children,
  className,
  sticky = true,
}: HeaderRootProps) {
  return (
    <header
      className={cn(
        "left-0 right-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md w-full",
        sticky && "sticky top-0",
        className
      )}
      role="banner"
    >
      {children}
    </header>
  );
}

/**
 * HeaderContainer - Inner container for header content
 *
 * Provides consistent padding and layout for header content.
 * Wrap your header components with this inside HeaderRoot.
 */
export function HeaderContainer({
  children,
  className,
}: HeaderContainerProps) {
  return (
    <nav
      className={cn(
        "mx-auto lg:px-4 px-3 py-3 flex items-center justify-between w-full",
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {children}
    </nav>
  );
}

/**
 * HeaderLogo - Site logo and branding
 *
 * Displays the site logo and name. Supports both SVG logos
 * via props or custom children for complete flexibility.
 */
export function HeaderLogo({
  logo,
  name,
  description,
  href,
  children,
  className,
  logoClassName,
  textClassName,
}: HeaderLogoProps) {
  // Custom children mode
  if (children) {
    return (
      <Link
        href={href as Route}
        className={cn("flex items-center gap-2 group", className)}
        aria-label={name ? `${name} home` : "Home"}
      >
        {children}
      </Link>
    );
  }

  // Default logo mode
  const LogoComponent = logo;

  return (
    <Link
      href={href as Route}
      className={cn("flex items-center gap-2 group", className)}
      aria-label={name ? `${name} home` : "Home"}
    >
      {LogoComponent && (
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 rounded-lg transition-transform duration-200 group-hover:scale-105",
            logoClassName
          )}
        >
          <LogoComponent
            className="w-6 h-6 text-white dark:text-zinc-900"
            aria-hidden="true"
          />
        </div>
      )}
      {(name || description) && (
        <div className={cn("flex flex-col", textClassName)}>
          {name && (
            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
              {name}
            </span>
          )}
          {description && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400 leading-tight">
              {description}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

/**
 * HeaderNav - Navigation menu
 *
 * Provides navigation links. Can use the built-in NavigationMenu
 * component or render custom navigation via children.
 */
export function HeaderNav({
  items,
  children,
  className,
  hideOnMobile = true,
}: HeaderNavProps) {
  if (children) {
    return (
      <nav
        className={cn(
          "flex items-center gap-4",
          hideOnMobile && "hidden lg:flex",
          className
        )}
      >
        {children}
      </nav>
    );
  }

  if (items) {
    return (
      <NavigationMenu
        items={items}
        className={cn(hideOnMobile && "hidden lg:flex", className)}
      />
    );
  }

  return null;
}

/**
 * HeaderSearch - Search functionality
 *
 * Provides search via CommandPalette or custom search implementation.
 */
export function HeaderSearch({
  docsItems,
  children,
  className,
  hideOnMobile = false,
}: HeaderSearchProps) {
  if (children) {
    return (
      <div
        className={cn(
          hideOnMobile && "hidden lg:flex",
          "items-center",
          className
        )}
      >
        {children}
      </div>
    );
  }

  if (docsItems) {
    return (
      <div
        className={cn(
          hideOnMobile && "hidden lg:flex",
          "items-center",
          className
        )}
      >
        <CommandPalette docsItems={docsItems} />
      </div>
    );
  }

  return null;
}

/**
 * HeaderActions - Container for action buttons
 *
 * Groups action items like theme toggle, social links, etc.
 * Provides consistent spacing and alignment.
 */
export function HeaderActions({
  children,
  className,
  align = "right",
}: HeaderActionsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        align === "right" && "ml-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * HeaderThemeToggle - Theme switching button
 *
 * Provides light/dark/system theme switching functionality.
 */
export function HeaderThemeToggle({
  className,
  hideOnMobile = true,
}: HeaderThemeToggleProps) {
  return (
    <DesktopViewThemeToggle
      className={cn(hideOnMobile && "hidden lg:flex", className)}
    />
  );
}

/**
 * HeaderGitHubLink - GitHub repository link
 *
 * Displays a GitHub icon that links to your repository.
 */
export function HeaderGitHubLink({
  href,
  ariaLabel = "Visit our GitHub repository",
  className,
  hideOnMobile = true,
}: HeaderGitHubLinkProps) {
  return (
    <a
      href={href}
      className={cn(hideOnMobile && "hidden lg:flex", className)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      <SiGithub className="w-5 h-5" aria-hidden="true" />
    </a>
  );
}

/**
 * HeaderDivider - Vertical divider line
 *
 * Provides visual separation between header elements.
 */
export function HeaderDivider({
  className,
  hideOnMobile = false,
}: HeaderDividerProps) {
  return (
    <div
      className={cn(
        "bg-zinc-300 dark:bg-zinc-700 h-6 w-[1px]",
        hideOnMobile && "hidden lg:block",
        className
      )}
      aria-hidden="true"
    />
  );
}

/**
 * HeaderMobileMenu - Mobile menu button
 *
 * Displays a hamburger menu button for mobile navigation.
 */
export function HeaderMobileMenu({
  navigationItems,
  githubLink,
  className,
  showSimpleMenu = true,
}: HeaderMobileMenuProps) {
  return (
    <MenuButton
      navigationItems={navigationItems}
      githubLink={githubLink}
      showSimpleMenu={showSimpleMenu}
      className={cn("flex lg:hidden", className)}
    />
  );
}

// ==================== Example Usage ====================

/**
 * Example: Basic Header
 *
 * ```tsx
 * <HeaderRoot>
 *   <HeaderContainer>
 *     <HeaderLogo name="My App" href="/" />
 *     <HeaderActions>
 *       <HeaderThemeToggle />
 *     </HeaderActions>
 *   </HeaderContainer>
 * </HeaderRoot>
 * ```
 */

/**
 * Example: Full Featured Header
 *
 * ```tsx
 * <HeaderRoot>
 *   <HeaderContainer>
 *     <HeaderLogo
 *       logo={MyLogoSVG}
 *       name="My App"
 *       description="Tagline"
 *       href="/"
 *     />
 *
 *     <HeaderNav items={navigationItems} />
 *
 *     <HeaderActions>
 *       <HeaderSearch docsItems={searchConfig} />
 *       <HeaderDivider />
 *       <HeaderGitHubLink href="https://github.com/..." />
 *       <HeaderThemeToggle />
 *       <HeaderMobileMenu navigationItems={navigationItems} />
 *     </HeaderActions>
 *   </HeaderContainer>
 * </HeaderRoot>
 * ```
 */

/**
 * Example: Custom Components
 *
 * ```tsx
 * <HeaderRoot>
 *   <HeaderContainer>
 *     <HeaderLogo href="/">
 *       <img src="/logo.png" alt="Logo" />
 *       <span>Custom Logo</span>
 *     </HeaderLogo>
 *
 *     <HeaderNav>
 *       <a href="/about">About</a>
 *       <a href="/blog">Blog</a>
 *     </HeaderNav>
 *
 *     <HeaderActions>
 *       <HeaderSearch>
 *         <input type="search" placeholder="Search..." />
 *       </HeaderSearch>
 *     </HeaderActions>
 *   </HeaderContainer>
 * </HeaderRoot>
 * ```
 */
