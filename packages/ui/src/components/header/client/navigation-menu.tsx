"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Route } from "next"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// ============================================================================
// Types
// ============================================================================

export type NavItem = {
    label: string
    href?: string
    type: "main" | "sub"
    description?: string
    children?: NavItem[]
    dropdownContent?: React.ReactNode // New prop for custom dropdown content
}

interface CustomNavigationMenuProps {
    className?: string
    items: NavItem[]
}

// ============================================================================
// Main Navigation Component
// ============================================================================

export default function NavigationMenu({ className, items }: CustomNavigationMenuProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenIndex(null)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleMouseEnter = (index: number, hasChildren: boolean) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        if (hasChildren) {
            setOpenIndex(index)
        }
    }

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            setOpenIndex(null)
        }, 150)
    }

    const handleTriggerClick = (index: number, hasChildren: boolean) => {
        if (hasChildren) {
            setOpenIndex(openIndex === index ? null : index)
        }
    }

    return (
        <nav ref={menuRef} className={cn("relative flex items-center", className)} role="navigation" aria-label="Main navigation">
            <ul className="flex items-center gap-1" role="menubar">
                {items.map((item, index) => {
                    const isOpen = openIndex === index
                    const hasChildren = Boolean(
                        item.type === "sub" &&
                        (item.dropdownContent || (item.children && item.children.length > 0))
                    )

                    return (
                        <li
                            key={index}
                            className="relative"
                            role="none"
                            onMouseEnter={() => handleMouseEnter(index, hasChildren)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {item.type === "main" && item.href ? (
                                <Link
                                    href={item.href as Route}
                                    role="menuitem"
                                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-ring/50 transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
                                >
                                    {item.label}
                                </Link>
                            ) : hasChildren ? (
                                <>
                                    <button
                                        onClick={() => handleTriggerClick(index, hasChildren)}
                                        aria-expanded={isOpen}
                                        aria-haspopup="menu"
                                        role="menuitem"
                                        className={cn(
                                            "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-[color,box-shadow]",
                                            "hover:bg-accent hover:text-accent-foreground",
                                            "focus:bg-accent focus:text-accent-foreground",
                                            "outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1",
                                            "disabled:pointer-events-none disabled:opacity-50",
                                            isOpen && "bg-accent/50 text-accent-foreground"
                                        )}
                                    >
                                        {item.label}
                                        <ChevronDownIcon
                                            className={cn(
                                                "relative top-[1px] ml-1 size-3 transition-transform duration-300",
                                                isOpen && "rotate-180"
                                            )}
                                            aria-hidden="true"
                                        />
                                    </button>

                                    {/* Dropdown Content - Always rendered but hidden with CSS */}
                                    <div
                                        role="menu"
                                        aria-labelledby={`menu-trigger-${index}`}
                                        className={cn(
                                            "absolute sm:left-1/2 sm:-translate-x-1/2  top-full mt-1.5 w-auto z-50",
                                            "origin-top-right",
                                            "overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg",
                                            "transition-all duration-200",
                                            isOpen
                                                ? "opacity-100 visible scale-100"
                                                : "opacity-0 invisible scale-95 pointer-events-none"
                                        )}
                                        onMouseEnter={() => {
                                            if (timeoutRef.current) {
                                                clearTimeout(timeoutRef.current)
                                            }
                                        }}
                                    >
                                        {/* Use custom dropdown content if provided, otherwise use default */}
                                        {item.dropdownContent ? (
                                            <div onClick={() => setOpenIndex(null)}>
                                                {item.dropdownContent}
                                            </div>
                                        ) : (
                                            <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]" role="menu">
                                                {item.children?.map((child, childIndex) => (
                                                    <ListItem
                                                        key={childIndex}
                                                        title={child.label}
                                                        href={child.href || "#"}
                                                        description={child.description}
                                                        onClick={() => setOpenIndex(null)}
                                                    />
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </>
                            ) : null}
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

// ============================================================================
// List Item Component
// ============================================================================

interface ListItemProps {
    title: string
    description?: string
    href: string
    onClick?: () => void
}

function ListItem({ title, description, href, onClick }: ListItemProps) {
    return (
        <li onClick={onClick} role="none">
            <Link
                href={href as Route}
                role="menuitem"
                className={cn(
                    "flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground",
                    "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1"
                )}
            >
                <div className="text-sm leading-none font-medium">{title}</div>
                {description && (
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {description}
                    </p>
                )}
            </Link>
        </li>
    )
}
