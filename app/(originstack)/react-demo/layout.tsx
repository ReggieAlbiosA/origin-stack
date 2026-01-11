import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import DraggableFavButton from "@/components/globals/client/draggable-fab-button";
import { ThemeProvider } from "next-themes";
import Header from "@/components/composite-ui/server/header";
import { navigationItems } from "@/app/(originstack)/react-demo/_shared/data/value";
import { type Route } from "next";
import Link from "next/link";
import { searchDocsConfig } from "@/app/(originstack)/react-demo/demo/_shared/data/value";
import { type NavItem } from "@/components/header/client/navigation-menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "React Fundamentals Demo - Interactive Learning Platform",
  description:
    "Master React fundamentals through interactive demonstrations. Learn hooks, state management, performance optimization, and best practices with hands-on examples.",
};

// Logo component for the header
function ReactDemoLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17L12 22L22 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12L12 17L22 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Server Component to render dropdown content
function DropdownContent({ items }: { items: NavItem[] }) {
  return (
    <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
      {items.map((child, childIndex) => (
        <li key={childIndex}>
          <Link
            href={child.href! as Route}
            className="flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1"
          >
            <div className="text-sm leading-none font-medium">
              {child.label}
            </div>
            {child.description && (
              <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                {child.description}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Enhance navigation items with server-rendered dropdown content
  const enhancedNavItems = navigationItems.map((item) => {
    if (item.type === "sub" && item.children && item.children.length > 0) {
      return {
        ...item,
        dropdownContent: <DropdownContent items={item.children} />,
      };
    }
    return item;
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js"></script> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* ✨ New Composite Header Component - 70% less code! */}
          <Header
            siteBrand={{
              logo: ReactDemoLogo,
              name: "React Demo",
              description: "Fundamentals",
              href: "/react-demo",
            }}
            navigationItems={enhancedNavItems}
            searchDocsItems={searchDocsConfig}
            githubLink={{
              href: "https://github.com/originstack/originstack",
              ariaLabel: "Visit our GitHub repository",
            }}
          />
          {children}
          <DraggableFavButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
