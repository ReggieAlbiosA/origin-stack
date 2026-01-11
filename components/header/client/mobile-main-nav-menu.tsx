"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Route } from "next";
import { usePathname } from "next/navigation";
import { Button } from "@/components/shadcn-ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../shadcn-ui/accordion";
import { ChevronRightIcon } from "lucide-react";
import { type NavItem } from "@/components/header/client/navigation-menu";
import { SiGithub } from "react-icons/si";
import { MobileViewThemeToggle } from "./theme-toggle";
import type {
  SidebarLinkItem,
  SidebarParentItem,
} from "@/components/composite-ui/client/sidebar";
import { sidebarConfig } from "../../../data/value";

interface MenuButtonProps {
  className?: string;
  navigationItems?: NavItem[];
  githubLink?: {
    href: string;
    ariaLabel?: string;
  };
  showSimpleMenu?: boolean; // If true, show simple menu with navigation items only
}

// Type guard to check if an item is a parent item with children
function isParentItem(
  item: SidebarLinkItem | SidebarParentItem
): item is SidebarParentItem {
  return "children" in item && Array.isArray(item.children);
}

export default function MobileMainNavMenu({
  className,
  navigationItems = [],
  githubLink = {
    href: "https://github.com/originstack/originstack",
    ariaLabel: "Visit our GitHub repository",
  },
  showSimpleMenu = true,
}: MenuButtonProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  const overrideAccordionItemClass = "border-b-0 ";
  const overrideAccordionTriggerClass =
    "hover:no-underline hover:bg-zinc-100 dark:hover:bg-zinc-800 px-2 py-3 rounded-md";
  const overrideAccordionTriggerIcon = (
    <ChevronRightIcon className="text-muted-foreground  pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
  );
  const overrideAccordionContentClass = "px-2 py-3 flex flex-col gap-3";

  const pathname = usePathname();

  // Helper function to get indentation classes based on nesting level
  const getIndentationClass = (level: number): string => {
    switch (level) {
      case 0:
        return "";
      case 1:
        return "ml-2.5";
      case 2:
        return "ml-1";
      case 3:
        return "ml-1";
      case 4:
        return "ml-1";
      default:
        return "ml-1"; // Max indentation for deeper levels
    }
  };

  // Function to get responsive default values for accordions
  const getResponsiveDefaultValues = () => {
    if (isLargeScreen) {
      // On large screens, open sections that are marked as defaultOpen
      return sidebarConfig.sections
        .map((section, index) =>
          section.defaultOpen ? `section-${index}` : null
        )
        .filter(Boolean) as string[];
    } else {
      // On mobile, keep all sections closed by default
      return [];
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  // Track screen size for responsive accordion behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint (not md)
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Auto-close menu when screen reaches md: breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  return (
    <>
      <Button
        className={`group ${className} ninetynine-stack`}
        variant="outline"
        size="icon"
        onClick={() => setOpen((prevState) => !prevState)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-controls="mobile-navigation-menu"
      >
        <svg
          className="pointer-events-none"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M4 12L20 12"
            className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
          />
          <path
            d="M4 12H20"
            className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
          />
          <path
            d="M4 12H20"
            className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
          />
        </svg>
      </Button>

      {open && (
        <>
          {showSimpleMenu ? (
            <div
              id="mobile-navigation-menu"
              className="fixed overflow-auto inset-0 bg-white dark:bg-zinc-900 px-5 pb-4 flex flex-col gap-3 w-screen h-screen ninetyeight-stack"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
            >
              <div className="sticky top-0 pt-18 bg-white dark:bg-zinc-900" />

              <Button asChild>
                <a
                  href={githubLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    githubLink.ariaLabel || "Visit our GitHub repository"
                  }
                >
                  <SiGithub className="w-6 h-6" aria-hidden="true" />
                  <span>Github</span>
                </a>
              </Button>

              <nav role="navigation" aria-label="Mobile navigation">
                <Accordion type="single" collapsible className="w-full ">
                  {navigationItems.map((item, index) =>
                    item.type === "sub" && item.children ? (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className={overrideAccordionItemClass}
                      >
                        <AccordionTrigger
                          className={overrideAccordionTriggerClass}
                          overrideIcon={
                            overrideAccordionTriggerIcon as React.ReactNode
                          }
                        >
                          {item.label}
                        </AccordionTrigger>
                        <AccordionContent
                          className={overrideAccordionContentClass}
                        >
                          <ul role="menu">
                            {item.children.map((child, childIndex) => (
                              <li key={childIndex} role="none">
                                <Link
                                  href={(child.href || "#") as Route}
                                  onClick={() => setOpen(false)}
                                  className="flex flex-col gap-1 py-2 px-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md"
                                  role="menuitem"
                                >
                                  <span className="font-medium text-sm">
                                    {child.label}
                                  </span>
                                  {child.description && (
                                    <span className="text-sm text-zinc-500 dark:text-zinc-400 text-balance">
                                      {child.description}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ) : item.type === "main" && item.href ? (
                      <div key={index} className="py-1">
                        <Link
                          href={item.href as Route}
                          onClick={() => setOpen(false)}
                          className={`block ${overrideAccordionTriggerClass} font-medium`}
                        >
                          {item.label}
                        </Link>
                      </div>
                    ) : null
                  )}
                </Accordion>
              </nav>

              <hr className="border-zinc-200 dark:border-zinc-800" />

              <div className="flex justify-between">
                <span className="py-2 px-2 text-zinc-900 dark:text-zinc-100">
                  Theme
                </span>
                <MobileViewThemeToggle />
              </div>
            </div>
          ) : (
            pathname.startsWith("/react-demo/") && (
              <div className="fixed overflow-auto inset-0 bg-white dark:bg-zinc-900 px-5 pb-4 flex flex-col gap-3 w-screen h-screen ninetyeight-stack">
                <div className="sticky top-0 pt-18 bg-white dark:bg-zinc-900" />

                <Button asChild>
                  <a
                    href="https://github.com/originstack/originstack"
                    className=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiGithub className="w-6 h-6" />
                    <span>Github</span>
                  </a>
                </Button>

                {/* Render Sidebar Sections */}
                <Accordion
                  type="multiple"
                  defaultValue={getResponsiveDefaultValues()}
                  className="w-full flex flex-col gap-2"
                >
                  {sidebarConfig.sections.map((section, sectionIndex) => {
                    const isCollapsible = section.collapsible ?? true;

                    // If section is collapsible
                    if (isCollapsible && section.title) {
                      return (
                        <AccordionItem
                          key={sectionIndex}
                          value={`section-${sectionIndex}`}
                          className={overrideAccordionItemClass}
                        >
                          <AccordionTrigger
                            className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider px-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md"
                            overrideIcon={
                              overrideAccordionTriggerIcon as React.ReactNode
                            }
                          >
                            {section.title}
                          </AccordionTrigger>
                          <AccordionContent className="px-0 py-2">
                            <div className="flex flex-col gap-1">
                              {section.items.map((item, itemIndex) => {
                                // If it's a parent item with children
                                if (isParentItem(item)) {
                                  return (
                                    <Accordion
                                      key={itemIndex}
                                      type="single"
                                      collapsible
                                      defaultValue={
                                        isLargeScreen
                                          ? `parent-${sectionIndex}-${itemIndex}`
                                          : undefined
                                      }
                                      className={`w-full ${getIndentationClass(1)}`}
                                    >
                                      <AccordionItem
                                        value={`parent-${sectionIndex}-${itemIndex}`}
                                        className={overrideAccordionItemClass}
                                      >
                                        <AccordionTrigger
                                          className={
                                            overrideAccordionTriggerClass +
                                            " max-w-[98%] "
                                          }
                                          overrideIcon={
                                            overrideAccordionTriggerIcon as React.ReactNode
                                          }
                                        >
                                          {item.label}
                                        </AccordionTrigger>
                                        <AccordionContent
                                          className={
                                            overrideAccordionContentClass
                                          }
                                        >
                                          {item.children.map(
                                            (child, childIndex) => (
                                              <Link
                                                key={childIndex}
                                                href={
                                                  (child.href || "#") as Route
                                                }
                                                onClick={() => setOpen(false)}
                                                className={`flex flex-col gap-1 py-2 px-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 max-w-[98%] rounded-md ${getIndentationClass(2)} ${
                                                  pathname === child.href
                                                    ? "bg-zinc-100 dark:bg-zinc-800 font-semibold"
                                                    : ""
                                                }`}
                                              >
                                                <span className="text-sm">
                                                  {child.label}
                                                </span>
                                                {child.description && (
                                                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    {child.description}
                                                  </span>
                                                )}
                                              </Link>
                                            )
                                          )}
                                        </AccordionContent>
                                      </AccordionItem>
                                    </Accordion>
                                  );
                                }
                                // Regular link item
                                return (
                                  <Link
                                    key={itemIndex}
                                    href={(item.href || "#") as Route}
                                    onClick={() => setOpen(false)}
                                    className={`block ${overrideAccordionTriggerClass} font-medium  ${getIndentationClass(1)} ${
                                      pathname === item.href
                                        ? "bg-zinc-100 dark:bg-zinc-800 font-semibold"
                                        : ""
                                    }`}
                                  >
                                    {item.label}
                                  </Link>
                                );
                              })}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    }

                    // Non-collapsible section
                    return (
                      <div
                        key={sectionIndex}
                        className="flex flex-col gap-2 py-1"
                      >
                        {section.title && (
                          <div className="text-xs font-semibold text-zinc-500 p-2 dark:text-zinc-400 uppercase tracking-wider px-2">
                            {section.title}
                          </div>
                        )}
                        <div className="flex flex-col gap-1">
                          {section.items.map((item, itemIndex) => {
                            // If it's a parent item with children
                            if (isParentItem(item)) {
                              return (
                                <Accordion
                                  key={itemIndex}
                                  type="single"
                                  collapsible
                                  defaultValue={
                                    isLargeScreen
                                      ? `parent-${sectionIndex}-${itemIndex}`
                                      : undefined
                                  }
                                  className={`w-full ${getIndentationClass(1)}`}
                                >
                                  <AccordionItem
                                    value={`parent-${sectionIndex}-${itemIndex}`}
                                    className={overrideAccordionItemClass}
                                  >
                                    <AccordionTrigger
                                      className={overrideAccordionTriggerClass}
                                      overrideIcon={
                                        overrideAccordionTriggerIcon as React.ReactNode
                                      }
                                    >
                                      {item.label}
                                    </AccordionTrigger>
                                    <AccordionContent
                                      className={overrideAccordionContentClass}
                                    >
                                      {item.children.map(
                                        (child, childIndex) => (
                                          <Link
                                            key={childIndex}
                                            href={(child.href || "#") as Route}
                                            onClick={() => setOpen(false)}
                                            className={`flex flex-col gap-1 py-2 px-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md ${getIndentationClass(2)} ${
                                              pathname === child.href
                                                ? "bg-zinc-100 dark:bg-zinc-800 font-semibold"
                                                : ""
                                            }`}
                                          >
                                            <span className="text-sm">
                                              {child.label}
                                            </span>
                                            {child.description && (
                                              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                                {child.description}
                                              </span>
                                            )}
                                          </Link>
                                        )
                                      )}
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              );
                            }
                            // Regular link item
                            return (
                              <Link
                                key={itemIndex}
                                href={(item.href || "#") as Route}
                                onClick={() => setOpen(false)}
                                className={`block ${overrideAccordionTriggerClass} font-medium ${getIndentationClass(1)} ${
                                  pathname === item.href
                                    ? "bg-zinc-100 dark:bg-zinc-800 font-semibold"
                                    : ""
                                }`}
                              >
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </Accordion>

                <hr className="border-zinc-200 dark:border-zinc-800" />

                <div className="flex justify-between">
                  <span className="py-2 px-2 text-zinc-900 dark:text-zinc-100">
                    Theme
                  </span>
                  <MobileViewThemeToggle />
                </div>
              </div>
            )
          )}
        </>
      )}
    </>
  );
}
