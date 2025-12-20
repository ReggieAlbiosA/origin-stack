import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@repo/ui/globals.css";
import { ThemeProvider } from "next-themes";
import DraggableFavButton from "@/components/globals/client/draggable-fab-button";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarNavigation,
  SidebarNavigationSection,
  SidebarNavigationTrigger,
  SidebarNavigationGroup,
  SidebarNavigationItemLink,
} from "@/components/composables/client/sidebar";
import { GitBranch, GitMerge } from "lucide-react";
import { Navbar } from "./components/navbar";

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
            <Navbar />
            <div className="flex flex-1 bg-white dark:bg-zinc-900">
              <aside
                className="hidden lg:block"
                role="complementary"
                aria-label="Table of contents"
              >
                <Sidebar
                  width={300}
                  className="flex flex-col"
                  sticky
                  topOffset={64}
                >
                  <SidebarHeader className="h-[65px] flex items-center justify-center gap-2 px-2">
                    <GitBranch className="h-6 w-6 text-primary" />
                    <span className="text-lg font-semibold">
                      Architecture Diagrams
                    </span>
                  </SidebarHeader>
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
