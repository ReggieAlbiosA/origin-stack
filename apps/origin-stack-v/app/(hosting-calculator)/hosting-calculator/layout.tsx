import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "@/app/globals.css"
import { ThemeProvider } from "next-themes"
import DraggableFavButton from "/ui/src/components/globals/client/draggable-fab-button"
import { Sidebar, SidebarHeader, SidebarContent, SidebarNavigation, SidebarNavigationSection, SidebarNavigationTrigger, SidebarNavigationGroup, SidebarNavigationItemLink } from "/ui/src/components/sidebar/client/sidebar"
import { Layers, Database, Calculator } from "lucide-react"
import { SiNextdotjs, SiCloudflare } from "react-icons/si"
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const jetBrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
    title: "Hosting Calculator",
    description: "Compare costs across hosting providers with interactive calculators",
}

export default function HostingCalculatorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetBrains.variable}`}>
            <body className="min-h-screen bg-background font-sans antialiased">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >

                    <div className="flex min-h-[calc(100vh-65px)] bg-white dark:bg-zinc-900">
                        <aside className="hidden lg:block" role="complementary" aria-label="Table of contents">
                            <Sidebar width={300} className="flex flex-col " sticky>
                                <SidebarHeader className="h-[65px] flex items-center justify-center gap-2 px-2">
                                    <Calculator className="h-6 w-6 text-primary" />
                                    <span className="text-lg font-semibold">Hosting Calculator</span>
                                </SidebarHeader>
                                <SidebarContent className="flex flex-col ">
                                    <SidebarNavigation>
                                        <SidebarNavigationSection collapsible defaultOpen>
                                            <SidebarNavigationTrigger className="justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Layers className="h-4 w-4" />
                                                    <span>Full-stack Hosting</span>
                                                </div>
                                            </SidebarNavigationTrigger>
                                            <SidebarNavigationGroup>
                                                <SidebarNavigationItemLink href="/hosting-calculator/full-stack/vercel">
                                                    <div className="flex items-center gap-2">
                                                        <SiNextdotjs className="h-4 w-4" />
                                                        <span>Vercel</span>
                                                    </div>
                                                </SidebarNavigationItemLink>
                                                <SidebarNavigationItemLink href="/hosting-calculator/full-stack/cloudflare">
                                                    <div className="flex items-center gap-2">
                                                        <SiCloudflare className="h-4 w-4" />
                                                        <span>Cloudflare</span>
                                                    </div>
                                                </SidebarNavigationItemLink>
                                            </SidebarNavigationGroup>
                                        </SidebarNavigationSection>
                                    </SidebarNavigation>
                                </SidebarContent>
                            </Sidebar>
                        </aside>

                        <div className="flex-1 bg-white dark:bg-zinc-900 h-min">
                            <div className="w-full">
                                {children}
                            </div>
                        </div>
                    </div>
                    <DraggableFavButton />
                </ThemeProvider>
            </body>
        </html>
    )
}


