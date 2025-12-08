/**
 * Table of Contents - Composable Architecture
 *
 * A flexible, composable table of contents system.
 * Follows the same compositional pattern as the new sidebar component.
 *
 * @example
 * ```tsx
 * // Define data inline (like navigationSections in layout.tsx)
 * const tableOfContentsData = [
 *   { id: "intro", title: "Introduction", level: 2 },
 *   { id: "features", title: "Features", level: 3 }
 * ] satisfies TableOfContentsItem[]
 *
 * // Mobile variant
 * <TableOfContents variant="mobile" sticky topOffset={65}>
 *   <TableOfContentsHeader title="On this page" />
 *   <TableOfContentsContent>
 *     <TableOfContentsNav>
 *       {tableOfContentsData.map(item => (
 *         <TableOfContentsItem key={item.id} href={`#${item.id}`} level={item.level}>
 *           {item.title}
 *         </TableOfContentsItem>
 *       ))}
 *     </TableOfContentsNav>
 *   </TableOfContentsContent>
 * </TableOfContents>
 *
 * // Desktop variant
 * <TableOfContents variant="desktop" sticky topOffset={100}>
 *   <TableOfContentsNav title="Table of contents">
 *     {tableOfContentsData.map(item => (
 *       <TableOfContentsItem key={item.id} href={`#${item.id}`} level={item.level}>
 *         {item.title}
 *       </TableOfContentsItem>
 *     ))}
 *   </TableOfContentsNav>
 * </TableOfContents>
 * ```
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { IconListSearch } from '@tabler/icons-react'

// ============================================================================
// Types
// ============================================================================

export interface TableOfContentsItem {
    id: string
    title: string
    level: number
}

type Variant = 'mobile' | 'desktop'

// ============================================================================
// Context (Active Section Tracking)
// ============================================================================

interface TableOfContentsContextProps {
    activeId: string
    setActiveId: (id: string) => void
    variant: Variant
}

const TableOfContentsContext = React.createContext<TableOfContentsContextProps | null>(null)

function useTableOfContents() {
    const context = React.useContext(TableOfContentsContext)
    if (!context) {
        throw new Error('TableOfContents components must be used within <TableOfContents>')
    }
    return context
}

// ============================================================================
// Context (Mobile Collapsible)
// ============================================================================

interface TableOfContentsMobileContextProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

const TableOfContentsMobileContext = React.createContext<TableOfContentsMobileContextProps | null>(null)

function useTableOfContentsMobile() {
    const context = React.useContext(TableOfContentsMobileContext)
    return context // Can be null for desktop variant
}

// ============================================================================
// TableOfContents (Root Container)
// ============================================================================

interface TableOfContentsProps extends React.HTMLAttributes<HTMLElement> {
    variant?: Variant
    topOffset?: number  // Only used for mobile variant
}

export function TableOfContents({
    variant = 'desktop',
    topOffset = 65,
    children,
    className,
    ...props
}: TableOfContentsProps) {
    const [activeId, setActiveId] = React.useState('')
    const [isOpen, setIsOpen] = React.useState(false)

    // Scroll tracking for active section
    React.useEffect(() => {
        const handleScroll = () => {
            const headings = document.querySelectorAll('h2, h3, h4, h5, h6')
            const scrollPosition = window.scrollY + 100

            for (let i = headings.length - 1; i >= 0; i--) {
                const heading = headings[i] as HTMLElement
                if (heading.offsetTop <= scrollPosition && heading.id) {
                    setActiveId(heading.id)
                    break
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Initial check

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const tocContextValue = {
        activeId,
        setActiveId,
        variant
    }

    const mobileContextValue = {
        isOpen,
        setIsOpen
    }

    if (variant === 'mobile') {
        return (
            <TableOfContentsContext.Provider value={tocContextValue}>
                <TableOfContentsMobileContext.Provider value={mobileContextValue}>
                    <div
                        {...props}
                        data-toc-mobile
                        style={{ top: `${topOffset}px` }}
                        className={cn(
                            'xl:hidden  block sticky z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md',
                            'border-b border-zinc-200 dark:border-zinc-800',
                            className
                        )}
                    >
                        {children}
                    </div>
                </TableOfContentsMobileContext.Provider>
            </TableOfContentsContext.Provider>
        )
    }

    // Desktop variant (sticky is applied on TableOfContentsNav, not here)
    return (
        <TableOfContentsContext.Provider value={tocContextValue}>
            <aside
                {...props}
                className={cn(
                    'hidden xl:block w-full',
                    className
                )}
                role="complementary"
                aria-label="On this page"
            >
                {children}
            </aside>
        </TableOfContentsContext.Provider>
    )
}

// ============================================================================
// TableOfContentsHeader (Mobile trigger/breadcrumb)
// ============================================================================

interface TableOfContentsHeaderProps extends React.HTMLAttributes<HTMLElement> {
    title?: string
    icon?: React.ReactNode
}

export function TableOfContentsHeader({
    title = "On this page",
    icon,
    className,
    ...props
}: TableOfContentsHeaderProps) {
    const { activeId } = useTableOfContents()
    const mobileContext = useTableOfContentsMobile()

    if (!mobileContext) {
        // Desktop variant doesn't use header
        return null
    }

    const { isOpen, setIsOpen } = mobileContext

    // Find active item title from DOM
    const activeTitle = (() => {
        if (!activeId) return null
        const element = document.getElementById(activeId)
        return element?.textContent || null
    })()

    // Close on outside click
    React.useEffect(() => {
        if (!isOpen) return

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (!target.closest('[data-toc-mobile]')) {
                setIsOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [isOpen, setIsOpen])

    return (
        <button
            {...props}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
                'w-full flex items-center justify-between px-3 py-3',
                'text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50',
                'transition-colors',
                className
            )}
            aria-expanded={isOpen}
            aria-controls="toc-mobile-content"
        >
            <div className="flex items-center gap-2 min-w-0 flex-1">
                {/* Hamburger Icon */}
                {icon || (
                    <svg
                        className="w-5 h-5 text-zinc-600 dark:text-zinc-400 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                )}

                {/* Breadcrumb */}
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 shrink-0">
                        {title}
                    </span>
                    {activeTitle && (
                        <>
                            <ChevronRight
                                className={cn(
                                    "text-zinc-600 dark:text-zinc-400 transition-transform duration-200 shrink-0",
                                    isOpen && "rotate-90"
                                )}
                                size={15}
                                aria-hidden="true"
                            />
                            <span className="text-sm font-medium text-zinc-900/40 dark:text-zinc-100/40 truncate">
                                {activeTitle}
                            </span>
                        </>
                    )}
                </div>
            </div>
        </button>
    )
}

// ============================================================================
// TableOfContentsContent (Scrollable container)
// ============================================================================

interface TableOfContentsContentProps extends React.HTMLAttributes<HTMLElement> {
    maxHeight?: string
}

export function TableOfContentsContent({
    maxHeight = '70vh',
    className,
    children,
    ...props
}: TableOfContentsContentProps) {
    const { variant } = useTableOfContents()
    const mobileContext = useTableOfContentsMobile()

    if (variant === 'mobile') {
        if (!mobileContext?.isOpen) return null

        return (
            <nav
                {...props}
                id="toc-mobile-content"
                style={{ maxHeight }}
                className={cn(
                    'border-t border-zinc-200 dark:border-zinc-800',
                    'bg-white dark:bg-zinc-900',
                    'absolute top-full left-0 w-full overflow-y-auto',
                    className
                )}
                aria-label="On this page"
            >
                {children}
            </nav>
        )
    }

    // Desktop variant
    return (
        <div {...props} className={cn('w-full', className)}>
            {children}
        </div>
    )
}

// ============================================================================
// TableOfContentsNav (Navigation wrapper)
// ============================================================================

interface TableOfContentsNavProps extends React.HTMLAttributes<HTMLElement> {
    title?: string
    icon?: React.ReactNode
    showTitle?: boolean
}

export function TableOfContentsNav({
    title = "On this page",
    icon,
    showTitle = true,
    className,
    children,
    ...props
}: TableOfContentsNavProps) {
    const { variant } = useTableOfContents()

    if (variant === 'mobile') {
        return (
            <ul
                {...props}
                className={cn('list-none space-y-0', className)}
                role="list"
            >
                {children}
            </ul>
        )
    }

    // Desktop variant with optional title
    return (
        <nav {...props} className={cn('w-full sticky top-25 pt-8', className)} aria-label="On this page">
            {showTitle && (
                <div className="flex items-center gap-2 mb-3">
                    {icon || <IconListSearch size={18} stroke={1.5} className="text-zinc-700 dark:text-zinc-300" />}
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {title}
                    </span>
                </div>
            )}
            <ul className="ml-2 list-none" role="list">
                {children}
            </ul>
        </nav>
    )
}

// ============================================================================
// TableOfContentsItem (Individual link)
// ============================================================================

interface TableOfContentsItemProps extends React.HTMLAttributes<HTMLLIElement> {
    href: string
    level?: number
    children: React.ReactNode
}

export function TableOfContentsItem({
    href,
    level = 2,
    children,
    className,
    ...props
}: TableOfContentsItemProps) {
    const { activeId, setActiveId, variant } = useTableOfContents()
    const mobileContext = useTableOfContentsMobile()

    const id = href.startsWith('#') ? href.substring(1) : href
    const isActive = activeId === id

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()

        const targetElement = document.getElementById(id)
        if (targetElement) {
            const headerOffset = 80
            const elementPosition = targetElement.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })

            window.history.pushState(null, '', href)
            setActiveId(id)

            // Close mobile menu
            if (mobileContext) {
                mobileContext.setIsOpen(false)
            }
        }
    }

    // Calculate indentation based on level (h2 = 0, h3 = 1, h4 = 2, etc.)
    const indent = Math.max(0, level - 2)

    if (variant === 'mobile') {
        return (
            <li {...props} className={cn('list-none', className)} role="listitem">
                <a
                    href={href}
                    onClick={handleClick}
                    className={cn(
                        'block no-underline text-sm py-2.5 px-4 transition-colors border-l-2',
                        isActive
                            ? 'font-medium border-l-blue-600 text-blue-600 bg-blue-50 dark:border-l-blue-400 dark:text-blue-400 dark:bg-blue-950/50'
                            : 'border-l-transparent text-zinc-700 dark:text-zinc-300 hover:border-l-zinc-600 dark:hover:border-l-zinc-400'
                    )}
                    style={{ paddingLeft: `${16 + indent * 16}px` }}
                >
                    {children}
                </a>
            </li>
        )
    }

    // Desktop variant
    return (
        <li {...props} className={cn('list-none', className)} role="listitem">
            <a
                href={href}
                onClick={handleClick}
                className={cn(
                    'block no-underline text-sm leading-[1.2] py-2 px-3 rounded-r-md border-l transition-colors',
                    'hover:text-zinc-900 dark:hover:text-zinc-100',
                    'hover:border-l-zinc-600 dark:hover:border-l-zinc-400',
                    isActive
                        ? 'font-medium border-l-blue-600 text-blue-600 bg-blue-50 dark:border-l-blue-400 dark:text-blue-400 dark:bg-blue-950'
                        : 'border-l-zinc-300 dark:border-l-zinc-600 text-zinc-800 dark:text-zinc-300'
                )}
                style={{ paddingLeft: `calc(0.75rem + ${indent * 0.75}rem)` }}
            >
                {children}
            </a>
        </li>
    )
}

