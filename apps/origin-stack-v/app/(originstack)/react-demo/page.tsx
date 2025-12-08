import type { Metadata } from "next";
import Link from "next/link";
import { type Route } from "next";

export const metadata: Metadata = {
  title: "React Fundamentals Demo - Interactive Learning Platform",
  description: "Master React fundamentals through interactive demonstrations. Learn hooks, state management, performance optimization, and best practices with hands-on examples.",
  keywords: [
    "React",
    "JavaScript",
    "hooks",
    "useState",
    "useEffect",
    "useMemo",
    "useCallback",
    "state management",
    "performance optimization",
    "interactive learning",
    "tutorial",
    "fundamentals"
  ],
  authors: [{ name: "React Demo Team" }],
  creator: "React Demo Platform",
  publisher: "React Demo Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://react-demo.example.com"),
  alternates: {
    canonical: "/react-demo",
  },
  openGraph: {
    title: "React Fundamentals Demo - Interactive Learning Platform",
    description: "Master React fundamentals through interactive demonstrations. Learn hooks, state management, performance optimization, and best practices with hands-on examples.",
    url: "/react-demo",
    siteName: "React Demo Platform",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "React Fundamentals Demo - Interactive Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "React Fundamentals Demo - Interactive Learning Platform",
    description: "Master React fundamentals through interactive demonstrations. Learn hooks, state management, performance optimization, and best practices with hands-on examples.",
    images: ["/og-image.png"],
    creator: "@reactdemo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900" role="main" aria-label="React fundamentals learning platform">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20" aria-labelledby="hero-heading">
        <header className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Interactive Learning Platform
            </span>
          </div>

          <h1 id="hero-heading" className="text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 max-w-4xl">
            Master React
            <span className="block text-zinc-600 dark:text-zinc-400">Fundamentals</span>
          </h1>

          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Explore core React concepts through interactive demonstrations.
            Learn hooks, state management, performance optimization, and best practices
            with hands-on examples.
          </p>

          <nav className="flex flex-wrap gap-4 justify-center pt-4" aria-label="Quick navigation to main sections">
            <a
              href="#demos"
              className="px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
              aria-label="Navigate to interactive demonstrations section"
            >
              View Demos
            </a>
            <a
              href="#concepts"
              className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
              aria-label="Navigate to core concepts section"
            >
              Learn Concepts
            </a>
          </nav>
        </header>
      </section>

      {/* Core Concepts Section */}
      <section id="concepts" className="max-w-7xl mx-auto px-6 py-20" aria-labelledby="concepts-heading">
        <header className="mb-12 text-center">
          <h2 id="concepts-heading" className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            Core Concepts
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Essential React concepts you need to master for building modern web applications
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Core React concepts">
          <article className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200 focus-within:ring-2 focus-within:ring-zinc-500 focus-within:ring-offset-2" role="listitem">
            <header>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                <Link href={"/react-demo/hooks/use-state" as Route} className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
                  Hooks
                </Link>
              </h3>
            </header>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Learn useState, useEffect, useMemo, useCallback, and custom hooks.
              Understand when and how to use each hook effectively.
            </p>
            <footer className="mt-4">
              <Link
                href={"/react-demo/hooks/use-state" as Route}
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
                aria-label="Learn more about React hooks"
              >
                Learn Hooks →
              </Link>
            </footer>
          </article>

          <article className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200 focus-within:ring-2 focus-within:ring-zinc-500 focus-within:ring-offset-2" role="listitem">
            <header>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                <Link href="/react-demo/demo" className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
                  State Management
                </Link>
              </h3>
            </header>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Explore different patterns for managing state in React applications,
              from local state to context and advanced patterns.
            </p>
            <footer className="mt-4">
              <Link
                href="/react-demo/demo"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
                aria-label="Learn more about state management"
              >
                Explore State →
              </Link>
            </footer>
          </article>

          <article className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200 focus-within:ring-2 focus-within:ring-zinc-500 focus-within:ring-offset-2" role="listitem">
            <header>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                <Link href={"/react-demo/hooks/use-memo" as Route} className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
                  Performance
                </Link>
              </h3>
            </header>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Optimize your React apps with memoization, lazy loading, and
              efficient rendering strategies to build fast applications.
            </p>
            <footer className="mt-4">
              <Link
                href={"/react-demo/hooks/use-memo" as Route}
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
                aria-label="Learn more about performance optimization"
              >
                Optimize Performance →
              </Link>
            </footer>
          </article>

          <article className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200 focus-within:ring-2 focus-within:ring-zinc-500 focus-within:ring-offset-2" role="listitem">
            <header>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                <Link href={"/react-demo/patterns/render-props" as Route} className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
                  Component Patterns
                </Link>
              </h3>
            </header>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Discover proven patterns for building reusable and maintainable
              components using composition and best practices.
            </p>
            <footer className="mt-4">
              <Link
                href={"/react-demo/patterns/render-props" as Route}
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
                aria-label="Learn more about component patterns"
              >
                Explore Patterns →
              </Link>
            </footer>
          </article>

          <article className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200 focus-within:ring-2 focus-within:ring-zinc-500 focus-within:ring-offset-2" role="listitem">
            <header>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                <Link href={"/react-demo/hooks/use-effect" as Route} className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
                  Side Effects
                </Link>
              </h3>
            </header>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Master handling side effects, API calls, subscriptions, and
              cleanup in your React components properly.
            </p>
            <footer className="mt-4">
              <Link
                href={"/react-demo/hooks/use-effect" as Route}
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
                aria-label="Learn more about side effects"
              >
                Master Effects →
              </Link>
            </footer>
          </article>

          <article className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200 focus-within:ring-2 focus-within:ring-zinc-500 focus-within:ring-offset-2" role="listitem">
            <header>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                <Link href={"/react-demo/patterns/hoc" as Route} className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
                  Advanced Techniques
                </Link>
              </h3>
            </header>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Dive into advanced concepts like portals, error boundaries,
              code splitting, and server components.
            </p>
            <footer className="mt-4">
              <Link
                href={"/react-demo/patterns/hoc" as Route}
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
                aria-label="Learn more about advanced techniques"
              >
                Advanced Topics →
              </Link>
            </footer>
          </article>
        </div>
      </section>

      {/* Interactive Demonstrations Section */}
      <section id="demos" className="max-w-7xl mx-auto px-6 py-20" aria-labelledby="demos-heading">
        <header className="mb-12 text-center">
          <h2 id="demos-heading" className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            Interactive Demonstrations
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Hands-on examples that showcase React fundamentals in action.
            Each demo is interactive and includes detailed explanations.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6" role="list" aria-label="Interactive React demonstrations">
          <article className="p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 hover:shadow-lg focus-within:ring-2 focus-within:ring-zinc-500 focus-within:ring-offset-2" role="listitem">
            <header className="mb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Hooks</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                <Link href={"/react-demo/hooks/use-memo" as Route} className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
                  useMemo Demo
                </Link>
              </h3>
            </header>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
              See how useMemo optimizes expensive calculations and prevents
              unnecessary re-renders in your components.
            </p>
            <footer>
              <Link
                href={"/react-demo/hooks/use-memo" as Route}
                className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 rounded"
                aria-label="Try the useMemo demonstration"
              >
                Try Demo
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </footer>
          </article>

          <article className="p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 hover:shadow-lg focus-within:ring-2 focus-within:ring-zinc-500 focus-within:ring-offset-2" role="listitem">
            <header className="mb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <span className="text-xs font-medium text-green-700 dark:text-green-300">State</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                <Link href="/react-demo/demo" className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
                  State Management
                </Link>
              </h3>
            </header>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
              Learn different approaches to managing state, from simple useState
              to complex state machines and patterns.
            </p>
            <footer>
              <Link
                href="/react-demo/demo"
                className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 rounded"
                aria-label="Try the state management demonstration"
              >
                Try Demo
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </footer>
          </article>
        </div>
      </section>



      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800" role="contentinfo" aria-label="Site footer">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Built with Next.js and React. Learn by doing.
            </p>
            <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
              <Link
                href={"/react-demo/hooks/use-state" as Route}
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                aria-label="Learn about useState hook"
              >
                useState
              </Link>
              <Link
                href={"/react-demo/hooks/use-effect" as Route}
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                aria-label="Learn about useEffect hook"
              >
                useEffect
              </Link>
              <Link
                href={"/react-demo/hooks/use-memo" as Route}
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                aria-label="Learn about useMemo hook"
              >
                useMemo
              </Link>
              <Link
                href={"/react-demo/demo" as Route}
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                aria-label="View interactive demos"
              >
                Demos
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}
