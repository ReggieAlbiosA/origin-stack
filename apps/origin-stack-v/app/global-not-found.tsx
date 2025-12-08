// Import global styles and fonts
import './globals.css'
import { Geist } from 'next/font/google'
import type { Metadata } from 'next'
import Link from 'next/link'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {
    return (
        <html lang="en" className={geist.className}>
            <head>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes slideInFromBottom {
                        from {
                            transform: translateY(20px);
                            opacity: 0;
                        }
                        to {
                            transform: translateY(0);
                            opacity: 1;
                        }
                    }
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }
                    .animate-in-global {
                        animation: fadeIn 0.8s ease-out, slideInFromBottom 0.8s ease-out;
                    }
                `}} />
            </head>
            <body>
                <div className="relative min-h-screen w-full bg-white dark:bg-zinc-900 flex items-center justify-center p-4">
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950"></div>

                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                            backgroundSize: '40px 40px'
                        }}></div>
                    </div>

                    {/* Main content */}
                    <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8 animate-in-global">
                        {/* 404 Number - Clean Typography */}
                        <div className="space-y-6">
                            <h1 className="text-[120px] md:text-[180px] font-bold text-zinc-900 dark:text-zinc-100 leading-none tracking-tighter">
                                404
                            </h1>

                            <div className="flex items-center justify-center gap-3">
                                <div className="h-px w-12 bg-zinc-300 dark:bg-zinc-700"></div>
                                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                                    Page Not Found
                                </span>
                                <div className="h-px w-12 bg-zinc-300 dark:bg-zinc-700"></div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-3">
                            <p className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 max-w-lg mx-auto leading-relaxed">
                                The page you're looking for doesn't exist.
                            </p>
                            <p className="text-base text-zinc-500 dark:text-zinc-400">
                                It might have been moved or deleted.
                            </p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
                            <Link
                                href="/"
                                className="group inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                            >
                                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Home
                            </Link>

                            <Link
                                href="/nextjs-demo"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                            >
                                Explore Demos
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>

                        {/* Footer info */}
                        <div className="pt-12 text-sm text-zinc-500 dark:text-zinc-400">
                            <p>Error 404</p>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}
