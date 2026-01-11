import {
  Header,
  HeaderBrand,
  HeaderBrandLink,
  HeaderNavigation,
  HeaderNavItem,
  HeaderActions,
  HeaderActionButton,
  HeaderMobileMenu,
  HeaderMobileMenuTrigger,
  HeaderMobileMenuContent,
} from "@/components/header/client/header";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { Skeleton } from "@/components/shadcn-ui/skeleton";
import { Suspense } from "react";
import { UserProfileDropdown } from "@/components/globals/client/user-profile-dropdown";
import { cacheLife } from "next/cache";

async function UserProfile() {
  "use cache: private";
  cacheLife({ stale: 60 });
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const isAuthenticated = !!user;

  return (
    <>
      {isAuthenticated && user ? (
        <UserProfileDropdown user={user} />
      ) : (
        <HeaderActionButton href="/sign-in" variant="primary">
          Sign In
        </HeaderActionButton>
      )}
    </>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Header */}
      <Header className="mx-auto  px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          <HeaderBrand>
            <HeaderBrandLink href="/">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                OriginStack
              </span>
            </HeaderBrandLink>
          </HeaderBrand>

          <HeaderNavigation className="hidden md:flex gap-1">
            <HeaderNavItem href="/nextjs-demo" external>
              Next.js Demo
            </HeaderNavItem>
            <HeaderNavItem href="/react-demo" external>
              React Demo
            </HeaderNavItem>
          </HeaderNavigation>

          <div className="flex items-center gap-4">
            <HeaderActions className="hidden md:flex">
              <Suspense
                fallback={<Skeleton className="w-9 h-9 rounded-full" />}
              >
                <UserProfile />
              </Suspense>
            </HeaderActions>

            <HeaderMobileMenu className="md:hidden">
              <HeaderMobileMenuTrigger />
              <HeaderMobileMenuContent>
                <HeaderNavItem href="/nextjs-demo" external>
                  Next.js Demo
                </HeaderNavItem>
                <HeaderNavItem href="/react-demo" external>
                  React Demo
                </HeaderNavItem>
                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 mt-2">
                  <Suspense fallback={<Skeleton className="w-full h-10" />}>
                    <UserProfile />
                  </Suspense>
                </div>
              </HeaderMobileMenuContent>
            </HeaderMobileMenu>
          </div>
        </div>
      </Header>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-20 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo/Brand */}
            <div className="mb-8">
              <h1 className="text-6xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
                OriginStack
              </h1>
              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full" />
            </div>

            {/* Tagline */}
            <h2 className="text-2xl lg:text-4xl font-semibold mb-6 text-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              Learn Fundamentals Through Real-World Implementation
            </h2>

            {/* Description */}
            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              Not just documentation. Experience actual working demos with
              real-world implementation patterns to strengthen your
              understanding of core web development fundamentals.
            </p>
          </div>
        </section>

        {/* Demo Cards Section */}
        <section className="container mx-auto px-6 pb-20 lg:pb-32">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-200">
              Explore Live Demos
            </h3>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Next.js Demo Card */}
              <a
                href="/nextjs-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
              >
                <div className="relative h-full p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 transition-all duration-500 hover:scale-105 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20">
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:to-blue-600/10 transition-all duration-500" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-500">
                      N
                    </div>

                    {/* Title */}
                    <h4 className="text-2xl lg:text-3xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors duration-300">
                      Next.js Demo
                    </h4>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      Deep dive into Next.js fundamentals with comprehensive
                      examples covering caching strategies, Server Components,
                      PPR, and modern data fetching patterns.
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 mb-8">
                      <li className="flex items-center text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-3" />
                        Cache Components & PPR
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3" />
                        Advanced Caching & Revalidation
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-3" />
                        Server & Client Components
                      </li>
                    </ul>

                    {/* CTA Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 font-semibold group-hover:text-purple-300 transition-colors duration-300">
                        Launch Demo
                      </span>
                      <svg
                        className="w-5 h-5 text-purple-400 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>

              {/* React Demo Card */}
              <a
                href="/react-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
              >
                <div className="relative h-full p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 transition-all duration-500 hover:scale-105 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20">
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-600/0 to-blue-600/0 group-hover:from-cyan-600/10 group-hover:to-blue-600/10 transition-all duration-500" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-3xl font-bold shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-500">
                      R
                    </div>

                    {/* Title */}
                    <h4 className="text-2xl lg:text-3xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors duration-300">
                      React Demo
                    </h4>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      Master React fundamentals through practical examples
                      showcasing hooks, state management, component patterns,
                      and real-world application architecture.
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 mb-8">
                      <li className="flex items-center text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-3" />
                        Modern Hooks & Patterns
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3" />
                        State Management Strategies
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-3" />
                        Component Architecture
                      </li>
                    </ul>

                    {/* CTA Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors duration-300">
                        Launch Demo
                      </span>
                      <svg
                        className="w-5 h-5 text-cyan-400 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t border-gray-800/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Tech Stack */}
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <span className="text-sm text-gray-500">Built with:</span>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 text-xs font-medium bg-gray-800/50 border border-gray-700/50 rounded-full text-gray-300">
                    Next.js
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-gray-800/50 border border-gray-700/50 rounded-full text-gray-300">
                    React
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-gray-800/50 border border-gray-700/50 rounded-full text-gray-300">
                    TypeScript
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-gray-800/50 border border-gray-700/50 rounded-full text-gray-300">
                    Tailwind CSS
                  </span>
                </div>
              </div>

              {/* Copyright */}
              <div className="text-sm text-gray-500">
                © 2025 OriginStack. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
