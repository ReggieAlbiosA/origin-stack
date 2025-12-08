import type { Metadata } from "next";
import Link from "next/link";
import { type Route } from "next";

export const metadata: Metadata = {
  title: "Next.js Demo - Modern Full-Stack Framework",
  description: "Master Next.js through interactive demonstrations. Learn App Router, Server Components, data fetching, and optimization techniques with hands-on examples.",
  keywords: [
    "Next.js",
    "React",
    "Server Components",
    "App Router",
    "SSR",
    "SSG",
    "ISR",
    "data fetching",
    "optimization",
    "full-stack",
    "TypeScript",
    "tutorial"
  ],
  authors: [{ name: "Next.js Demo Team" }],
  creator: "Next.js Demo Platform",
  publisher: "Next.js Demo Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nextjs-demo.example.com"),
  alternates: {
    canonical: "/nextjs-demo",
  },
  openGraph: {
    title: "Next.js Demo - Modern Full-Stack Framework",
    description: "Master Next.js through interactive demonstrations. Learn App Router, Server Components, data fetching, and optimization techniques with hands-on examples.",
    url: "/nextjs-demo",
    siteName: "Next.js Demo Platform",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image-nextjs.png",
        width: 1200,
        height: 630,
        alt: "Next.js Demo - Modern Full-Stack Framework",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Demo - Modern Full-Stack Framework",
    description: "Master Next.js through interactive demonstrations. Learn App Router, Server Components, data fetching, and optimization techniques with hands-on examples.",
    images: ["/og-image-nextjs.png"],
    creator: "@nextjs",
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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900" role="main" aria-label="Next.js full-stack learning platform">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20" aria-labelledby="hero-heading">
        <header className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Full-Stack React Framework
            </span>
          </div>

          <h1 id="hero-heading" className="text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 max-w-4xl">
            Master Next.js
            <span className="block text-zinc-600 dark:text-zinc-400">Development</span>
          </h1>

          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Explore Next.js App Router, Server Components, and optimization techniques
            through interactive demonstrations. Build full-stack applications with
            modern patterns and best practices.
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
              href="#features"
              className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
              aria-label="Navigate to core features section"
            >
              Learn Features
            </a>
          </nav>
        </header>
      </section>

      {/* Core Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20" aria-labelledby="features-heading">
        <header className="mb-12 text-center">
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            Core Features
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Essential Next.js features you need to master for building production-ready applications
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Core Next.js features">
          <article className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200 focus-within:ring-2 focus-within:ring-zinc-500 focus-within:ring-offset-2" role="listitem">
            <header>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                <Link href={"/nextjs-demo/features/server-components" as Route} className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
                  Server Components
                </Link>
              </h3>
            </header>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Build faster, more efficient apps with React Server Components. Learn
              when to use server vs client components for optimal performance.
            </p>
            <footer className="mt-4">
              <Link
                href={"/nextjs-demo/features/server-components" as Route}
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
                aria-label="Learn more about Server Components"
              >
                Explore Server Components →
              </Link>
            </footer>
          </article>

          <article className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200 focus-within:ring-2 focus-within:ring-zinc-500 focus-within:ring-offset-2" role="listitem">
            <header>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                <Link href={"/nextjs-demo/features/app-router" as Route} className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
                  App Router
                </Link>
              </h3>
            </header>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Master the new file-system based routing with layouts, nested routes,
              and advanced patterns like parallel and intercepting routes.
            </p>
            <footer className="mt-4">
              <Link
                href={"/nextjs-demo/features/app-router" as Route}
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
                aria-label="Learn more about App Router"
              >
                Master App Router →
              </Link>
            </footer>
          </article>

          <article className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200 focus-within:ring-2 focus-within:ring-zinc-500 focus-within:ring-offset-2" role="listitem">
            <header>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                <Link href={"/nextjs-demo/features/data-fetching" as Route} className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
                  Data Fetching
                </Link>
              </h3>
            </header>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Learn server-side rendering, static generation, incremental static
              regeneration, and streaming for optimal data loading.
            </p>
            <footer className="mt-4">
              <Link
                href={"/nextjs-demo/features/data-fetching" as Route}
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
                aria-label="Learn more about data fetching"
              >
                Learn Data Fetching →
              </Link>
            </footer>
          </article>

          <article className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200 focus-within:ring-2 focus-within:ring-zinc-500 focus-within:ring-offset-2" role="listitem">
            <header>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                <Link href={"/nextjs-demo/optimization/images" as Route} className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
                  Optimization
                </Link>
              </h3>
            </header>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Automatic image and font optimization, code splitting, and bundle
              analysis to build the fastest possible applications.
            </p>
            <footer className="mt-4">
              <Link
                href={"/nextjs-demo/optimization/images" as Route}
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
                aria-label="Learn more about optimization"
              >
                Optimize Performance →
              </Link>
            </footer>
          </article>

          <article className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200 focus-within:ring-2 focus-within:ring-zinc-500 focus-within:ring-offset-2" role="listitem">
            <header>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                <Link href={"/nextjs-demo/features/api-routes" as Route} className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
                  API Routes
                </Link>
              </h3>
            </header>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Build full-stack applications with serverless API endpoints, route
              handlers, and middleware for authentication and data validation.
            </p>
            <footer className="mt-4">
              <Link
                href={"/nextjs-demo/features/api-routes" as Route}
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
                aria-label="Learn more about API routes"
              >
                Build APIs →
              </Link>
            </footer>
          </article>

          <article className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200 focus-within:ring-2 focus-within:ring-zinc-500 focus-within:ring-offset-2" role="listitem">
            <header>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                <Link href={"/nextjs-demo/advanced/parallel-routes" as Route} className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
                  Advanced Patterns
                </Link>
              </h3>
            </header>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Dive into parallel routes, intercepting routes, middleware, and edge
              runtime for sophisticated application architectures.
            </p>
            <footer className="mt-4">
              <Link
                href={"/nextjs-demo/advanced/parallel-routes" as Route}
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
                aria-label="Learn more about advanced patterns"
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
            Hands-on examples showcasing Next.js features in action. Each demo
            includes detailed explanations and best practices.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6" role="list" aria-label="Interactive Next.js demonstrations">
          <article className="p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 hover:shadow-lg focus-within:ring-2 focus-within:ring-zinc-500 focus-within:ring-offset-2" role="listitem">
            <header className="mb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Rendering</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                <Link href={"/nextjs-demo/features/data-fetching" as Route} className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
                  Data Fetching Demo
                </Link>
              </h3>
            </header>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
              See how SSR, SSG, and ISR work together to create fast, dynamic,
              and SEO-friendly applications with Next.js.
            </p>
            <footer>
              <Link
                href={"/nextjs-demo/features/data-fetching" as Route}
                className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 rounded"
                aria-label="Try the data fetching demonstration"
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
                  <span className="text-xs font-medium text-green-700 dark:text-green-300">Components</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                <Link href="/nextjs-demo/demo" className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
                  Component Demo
                </Link>
              </h3>
            </header>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
              Explore the composite UI components with sidebar navigation, table
              of contents, and responsive design patterns.
            </p>
            <footer>
              <Link
                href="/nextjs-demo/demo"
                className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 rounded"
                aria-label="Try the component demonstration"
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
              Built with Next.js App Router. Learn by doing.
            </p>
            <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
              <Link
                href={"/nextjs-demo/features/server-components" as Route}
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                aria-label="Learn about Server Components"
              >
                Server Components
              </Link>
              <Link
                href={"/nextjs-demo/features/app-router" as Route}
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                aria-label="Learn about App Router"
              >
                App Router
              </Link>
              <Link
                href={"/nextjs-demo/features/data-fetching" as Route}
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                aria-label="Learn about data fetching"
              >
                Data Fetching
              </Link>
              <Link
                href={"/nextjs-demo/demo" as Route}
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
