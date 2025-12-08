/**
 * Page Navigation - Composable Architecture
 *
 * A flexible page navigation component for previous/next links.
 * Follows the same compositional pattern as Sidebar and TOC.
 *
 * @example
 * ```tsx
 * <PageNavigation>
 *   <PageNavigationPrevious href="/intro">
 *     Introduction
 *   </PageNavigationPrevious>
 *   <PageNavigationNext href="/config">
 *     Configuration
 *   </PageNavigationNext>
 * </PageNavigation>
 * ```
 */

import Link from 'next/link'
import { type Route } from 'next'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

// ============================================================================
// PageNavigation (Container)
// ============================================================================

interface PageNavigationProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode
}

export function PageNavigation({ children, className, ...props }: PageNavigationProps) {
    return (
        <nav
            {...props}
            className={cn(
                "w-full border-t border-zinc-200 dark:border-zinc-800",
                "pt-8 pb-12 mt-12",
                className
            )}
            aria-label="Page navigation"
        >
            <div className="flex items-center justify-between gap-4">
                {children}
            </div>
        </nav>
    )
}

// ============================================================================
// PageNavigationPrevious
// ============================================================================

interface PageNavigationPreviousProps extends React.HTMLAttributes<HTMLAnchorElement> {
    href: string | Route
    label?: string
    icon?: React.ReactNode
    children: React.ReactNode
}

export function PageNavigationPrevious({
    href,
    label = "Previous",
    icon,
    children,
    className,
    ...props
}: PageNavigationPreviousProps) {
    return (
        <Link
            {...props}
            href={href as Route}
            className={cn(
                "group flex flex-col items-start gap-1 px-4 py-3 rounded-lg",
                "border border-zinc-200 dark:border-zinc-800",
                "bg-white dark:bg-zinc-900",
                "hover:bg-zinc-50 dark:hover:bg-zinc-800",
                "hover:border-zinc-300 dark:hover:border-zinc-700",
                "transition-all duration-200 w-full",
                "focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2",
                className
            )}
            aria-label={`Previous page: ${typeof children === 'string' ? children : label}`}
        >
            <span className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                {icon || <IconChevronLeft size={16} className="flex-shrink-0" aria-hidden="true" />}
                <span>{label}</span>
            </span>
            <span className="text-base font-medium text-zinc-900 dark:text-zinc-100 truncate w-full">
                {children}
            </span>
        </Link>
    )
}

// ============================================================================
// PageNavigationNext
// ============================================================================

interface PageNavigationNextProps extends React.HTMLAttributes<HTMLAnchorElement> {
    href: string | Route
    label?: string
    icon?: React.ReactNode
    children: React.ReactNode
}

export function PageNavigationNext({
    href,
    label = "Next",
    icon,
    children,
    className,
    ...props
}: PageNavigationNextProps) {
    return (
        <Link
            {...props}
            href={href as Route}
            className={cn(
                "group flex flex-col items-end gap-1 px-4 py-3 rounded-lg",
                "border border-zinc-200 dark:border-zinc-800",
                "bg-white dark:bg-zinc-900",
                "hover:bg-zinc-50 dark:hover:bg-zinc-800",
                "hover:border-zinc-300 dark:hover:border-zinc-700",
                "transition-all duration-200 w-full",
                "focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2",
                className
            )}
            aria-label={`Next page: ${typeof children === 'string' ? children : label}`}
        >
            <span className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                <span>{label}</span>
                {icon || <IconChevronRight size={16} className="flex-shrink-0" aria-hidden="true" />}
            </span>
            <span className="text-base font-medium text-zinc-900 dark:text-zinc-100 truncate w-full text-right">
                {children}
            </span>
        </Link>
    )
}

// ============================================================================
// PageNavigationSpacer (For manual layout control)
// ============================================================================

interface PageNavigationSpacerProps extends React.HTMLAttributes<HTMLDivElement> { }

export function PageNavigationSpacer({ className, ...props }: PageNavigationSpacerProps) {
    return (
        <div
            {...props}
            className={cn("w-full", className)}
            aria-hidden="true"
        />
    )
}

