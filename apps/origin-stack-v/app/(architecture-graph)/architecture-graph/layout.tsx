import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@repo/ui/globals.css";
import { ThemeProvider } from "next-themes";
import DraggableFavButton from "@/components/globals/client/draggable-fab-button";
import {
  Sidebar,
  SidebarContent,
  SidebarNavigation,
  SidebarNavigationSection,
  SidebarNavigationTrigger,
  SidebarNavigationGroup,
  SidebarNavigationItemLink,
  type SidebarConfig,
  type NavigationItem as SidebarNavigationItem,
} from "@/components/composables/client/sidebar";
import {
  Header,
  HeaderBrand,
  HeaderBrandLink,
  HeaderActions,
  HeaderActionButton,
} from "@repo/ui/components/header/client/header";
import { DesktopViewThemeToggle } from "@repo/ui/components/header/client/theme-toggle";
import SearchInterface from "@repo/ui/components/header/client/search-interface";
import { Github, Network } from "lucide-react";
import { navigationConfig, type NavigationItem } from "./_config/navigation.config";

// Helper function to extract all routes from a section's children (recursively)
function extractRoutes(items: NavigationItem[]): string[] {
  const routes: string[] = [];

  for (const item of items) {
    if (item.type === "link" && item.href) {
      routes.push(item.href);
    } else if (item.type === "section" && item.children) {
      routes.push(...extractRoutes(item.children));
    }
  }

  return routes;
}

// Transform navigationConfig to SidebarConfig format for SearchInterface
function transformToSidebarConfig(
  navItems: NavigationItem[]
): SidebarConfig {
  // Recursively convert NavigationItem to SidebarNavigationItem
  const convertItem = (item: NavigationItem): SidebarNavigationItem => {
    if (item.type === "link") {
      return {
        label: item.label,
        href: item.href,
      };
    } else {
      // type === "section"
      return {
        label: item.label,
        collapsible: item.collapsible,
        defaultOpen: item.defaultOpen,
        children: item.children?.map(convertItem),
      };
    }
  };

  const sections = navItems
    .filter((item): item is NavigationItem & { type: "section" } =>
      item.type === "section"
    )
    .map((section) => ({
      title: section.label,
      collapsible: section.collapsible ?? false,
      defaultOpen: section.defaultOpen ?? false,
      items: section.children?.map(convertItem) ?? [],
    }));

  return { sections };
}

// Create the sidebar config for the search interface
const searchConfig = transformToSidebarConfig(navigationConfig);

// Recursive navigation renderer component
function NavigationRenderer({ items }: { items: NavigationItem[] }) {
  return (
    <>
      {items.map((item, index) => {
        if (item.type === "link") {
          return (
            <SidebarNavigationItemLink
              key={`${item.href}-${index}`}
              href={item.href}
            >
              <div className="flex items-center gap-2">
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.label}</span>
              </div>
            </SidebarNavigationItemLink>
          );
        }

        if (item.type === "section") {
          const hasLinks = item.children.some((child) => child.type === "link");
          const hasSections = item.children.some(
            (child) => child.type === "section"
          );

          // Extract all routes from this section's children for auto-expand
          const routes = extractRoutes(item.children);

          return (
            <SidebarNavigationSection
              key={`${item.label}-${index}`}
              collapsible={item.collapsible}
              defaultOpen={item.defaultOpen}
              routes={routes}
            >
              <SidebarNavigationTrigger className="justify-between">
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.label}</span>
                </div>
              </SidebarNavigationTrigger>
              {hasLinks && (
                <SidebarNavigationGroup>
                  {item.children
                    .filter((child) => child.type === "link")
                    .map((child, childIndex) => (
                      <NavigationRenderer key={childIndex} items={[child]} />
                    ))}
                </SidebarNavigationGroup>
              )}
              {hasSections && (
                <SidebarNavigationGroup>
                  <NavigationRenderer
                    items={item.children.filter(
                      (child) => child.type === "section"
                    )}
                  />
                </SidebarNavigationGroup>
              )}
            </SidebarNavigationSection>
          );
        }

        return null;
      })}
    </>
  );
}

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Architecture Diagrams",
  description: "Interactive architecture diagrams and visualizations",
};

export default function ArchitectureGraphLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetBrains.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header
              sticky
              topOffset={0}
              className="bg-white flex h-14 px-6 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
            >
              {/* Brand */}
              <HeaderBrand className="ml-10">
                <HeaderBrandLink
                  href="/architecture-graph"
                  className="flex items-center gap-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                    <Network className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-zinc-900 dark:text-white">
                      OriginStack
                    </span>
                  </div>
                </HeaderBrandLink>
              </HeaderBrand>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Actions */}
              <HeaderActions className="gap-2">
                <SearchInterface docsItems={searchConfig} />
                <HeaderActionButton variant="ghost" asChild>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </HeaderActionButton>
                <DesktopViewThemeToggle />
              </HeaderActions>
            </Header>
            <div className="flex flex-1 bg-white dark:bg-zinc-900">
              <aside
                className="hidden lg:block"
                role="complementary"
                aria-label="Table of contents"
              >
                <Sidebar
                  width={280}
                  className="flex flex-col"
                  sticky
                  topOffset={56}
                >
                  <SidebarContent className="flex flex-col">
                    <SidebarNavigation>
                      <NavigationRenderer items={navigationConfig} />
                    </SidebarNavigation>
                  </SidebarContent>
                </Sidebar>
              </aside>

              <div className="flex-1 bg-white dark:bg-zinc-900 h-min">
                <div className="w-full">{children}</div>
              </div>
            </div>
          </div>
          <DraggableFavButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
