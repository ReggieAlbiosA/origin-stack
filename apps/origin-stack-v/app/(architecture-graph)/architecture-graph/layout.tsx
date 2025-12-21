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
} from "@/components/composables/client/sidebar";
import {
  Header,
  HeaderBrand,
  HeaderBrandLink,
  HeaderActions,
  HeaderActionButton,
} from "@repo/ui/components/header/client/header";
import { DesktopViewThemeToggle } from "@repo/ui/components/header/client/theme-toggle";
import { GitMerge, Github, Network } from "lucide-react";

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
              className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
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
                <div className="relative hidden md:block">
                  <input
                    type="search"
                    placeholder="Search documentation..."
                    className="w-64 h-9 pl-3 pr-16 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-300 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
                  />
                  <kbd className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs text-zinc-600 dark:text-zinc-500 bg-zinc-200 dark:bg-zinc-800 rounded border border-zinc-300 dark:border-zinc-700">
                    ⌘K
                  </kbd>
                </div>
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
                      <SidebarNavigationSection collapsible defaultOpen>
                        <SidebarNavigationTrigger className="justify-between">
                          <div className="flex items-center gap-2">
                            <GitMerge className="h-4 w-4" />
                            <span>Git</span>
                          </div>
                        </SidebarNavigationTrigger>
                        <SidebarNavigationGroup>
                          <SidebarNavigationItemLink href="/architecture-graph/git/merge-squash">
                            <div className="flex items-center gap-2">
                              <span>Merge Squash</span>
                            </div>
                          </SidebarNavigationItemLink>
                        </SidebarNavigationGroup>
                      </SidebarNavigationSection>
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
