"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Book,
  ChevronRight,
  Sun,
  Moon,
  Laptop,
  Server,
  UserPlus,
  LogOut,
} from "lucide-react";
import { SiReact, SiNextdotjs } from "react-icons/si";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@repo/auth/auth-client";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shadcn-ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";
type Position = { x: number; y: number };

type MenuItem = {
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  href?: string;
  type: "main" | "sub";
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  { label: "React Demo", icon: SiReact, href: "/react-demo", type: "main" },
  {
    label: "Next.js Demo",
    icon: SiNextdotjs,
    href: "/nextjs-demo",
    type: "main",
  },
  {
    label: "Hosting Calculator",
    icon: Server,
    href: "/hosting-calculator",
    type: "main",
  },
];

const themeOptions = [
  { label: "Light", value: "light" as const, icon: Sun },
  { label: "Dark", value: "dark" as const, icon: Moon },
  { label: "System", value: "system" as const, icon: Laptop },
];

const BUTTON_MARGIN = 20;
const BUTTON_SIZE = 44;

function getPositionFromCorner(corner: Corner): Position {
  if (typeof window === "undefined") return { x: 0, y: 0 };
  switch (corner) {
    case "top-left":
      return { x: BUTTON_MARGIN, y: BUTTON_MARGIN };
    case "top-right":
      return {
        x: window.innerWidth - BUTTON_SIZE - BUTTON_MARGIN,
        y: BUTTON_MARGIN,
      };
    case "bottom-left":
      return {
        x: BUTTON_MARGIN,
        y: window.innerHeight - BUTTON_SIZE - BUTTON_MARGIN,
      };
    case "bottom-right":
    default:
      return {
        x: window.innerWidth - BUTTON_SIZE - BUTTON_MARGIN,
        y: window.innerHeight - BUTTON_SIZE - BUTTON_MARGIN,
      };
  }
}

function getClosestCorner(x: number, y: number): Corner {
  if (typeof window === "undefined") return "bottom-right";
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  if (x < centerX && y < centerY) return "top-left";
  if (x >= centerX && y < centerY) return "top-right";
  if (x < centerX && y >= centerY) return "bottom-left";
  return "bottom-right";
}

function getDropdownPosition(corner: Corner): React.CSSProperties {
  switch (corner) {
    case "top-left":
      return { top: 60, left: 20 };
    case "top-right":
      return { top: 60, right: 25 };
    case "bottom-left":
      return { bottom: 70, left: 20 };
    case "bottom-right":
    default:
      return { bottom: 70, right: 25 };
  }
}

function getSubmenuPosition(corner: Corner): React.CSSProperties {
  switch (corner) {
    case "top-left":
      return { top: 0, left: "100%" };
    case "top-right":
      return { top: 0, right: "100%" };
    case "bottom-left":
      return { bottom: 0, left: "100%" };
    case "bottom-right":
    default:
      return { bottom: 0, right: "100%" };
  }
}

// Memoized corner highlights to prevent re-renders during dragging
const CornerHighlights = React.memo(() => (
  <>
    <div className="fixed top-2 left-2 w-10 h-10 border-2 border-dashed border-neutral-700 rounded-tl-lg opacity-40" />
    <div className="fixed top-2 right-2 w-10 h-10 border-2 border-dashed border-neutral-700 rounded-tr-lg opacity-40" />
    <div className="fixed bottom-2 left-2 w-10 h-10 border-2 border-dashed border-neutral-700 rounded-bl-lg opacity-40" />
    <div className="fixed bottom-2 right-2 w-10 h-10 border-2 border-dashed border-neutral-700 rounded-br-lg opacity-40" />
  </>
));
CornerHighlights.displayName = "CornerHighlights";

export default function DraggableFavButton() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState<Position>({ x: 0, y: 0 });
  const [corner, setCorner] = useState<Corner>("bottom-right");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false); // ✅ fixed name
  const [user, setUser] = useState<{
    id: string;
    name: string;
    image?: string;
    email?: string | null;
  } | null>(null);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          setUser(null);
        },
      },
    });
  };

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dragThreshold = 5;
  const hasDraggedRef = useRef(false);
  const dragPosRef = useRef<Position>({ x: 0, y: 0 }); // Track position during drag without re-renders

  const handleMouseDown = (e: React.MouseEvent) => {
    if (menuOpen) return;
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    setDragStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    dragPosRef.current = { x: rect.left, y: rect.top }; // Initialize ref position
    hasDraggedRef.current = false;
  };

  const handleClick = () => {
    if (!hasDraggedRef.current && !isDragging) setMenuOpen(!menuOpen);
  };

  // Initialize - runs once on mount
  useEffect(() => {
    const savedCorner = localStorage.getItem("buttonCorner") as Corner;
    if (savedCorner) {
      setCorner(savedCorner);
      setCurrentPos(getPositionFromCorner(savedCorner));
    } else {
      setCurrentPos(getPositionFromCorner("bottom-right"));
    }
    setIsInitialized(true);

    // Get user session
    authClient
      .getSession()
      .then((result) => {
        if (result && "data" in result && result.data?.user) {
          const { id, name, image, email } = result.data.user;
          // Convert `image` from `string | null | undefined` to `string | undefined`
          setUser({
            id,
            name,
            image: image ?? undefined,
            email,
          });
        }
      })
      .catch(() => {
        // Session fetch failed, user is not authenticated
      });
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("buttonCorner", corner);
    }
  }, [corner, isInitialized]);

  useEffect(() => {
    if (dragStart.x === 0 && dragStart.y === 0) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      const deltaX = Math.abs(e.clientX - currentPos.x - dragStart.x);
      const deltaY = Math.abs(e.clientY - currentPos.y - dragStart.y);

      if (!isDragging && (deltaX > dragThreshold || deltaY > dragThreshold)) {
        setIsDragging(true);
        hasDraggedRef.current = true;
        if (buttonRef.current) {
          buttonRef.current.style.left = `${currentPos.x}px`;
          buttonRef.current.style.top = `${currentPos.y}px`;
        }
      }

      if (isDragging) {
        dragPosRef.current = { x: newX, y: newY };
        if (buttonRef.current) {
          buttonRef.current.style.left = `${newX}px`;
          buttonRef.current.style.top = `${newY}px`;
        }
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        const centerX = dragPosRef.current.x + 22;
        const centerY = dragPosRef.current.y + 22;
        const newCorner = getClosestCorner(centerX, centerY);
        const snapPos = getPositionFromCorner(newCorner);

        setCurrentPos(dragPosRef.current);
        setIsDragging(false);
        setDragStart({ x: 0, y: 0 });

        if (buttonRef.current) {
          buttonRef.current.style.left = "";
          buttonRef.current.style.top = "";
        }

        requestAnimationFrame(() => {
          setCorner(newCorner);
          setCurrentPos(snapPos);
          setIsTransitioning(true);
          setTimeout(() => setIsTransitioning(false), 300);
        });
      } else {
        setIsDragging(false);
        setDragStart({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragStart, currentPos, isDragging]);

  useEffect(() => {
    const handleResize = () => setCurrentPos(getPositionFromCorner(corner));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [corner]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!buttonRef.current?.contains(e.target as Node) && menuOpen) {
        const dropdownElement = document.querySelector(".dropdown-menu");
        if (!dropdownElement?.contains(e.target as Node)) setMenuOpen(false);
      }
    };
    if (!menuOpen) {
      setSubMenuOpen(false);
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuOpen]);

  const dropdownStyle = getDropdownPosition(corner);
  const submenuStyle = getSubmenuPosition(corner);

  const buttonStyle: React.CSSProperties = isDragging
    ? { opacity: 0.6 }
    : { left: `${currentPos.x}px`, top: `${currentPos.y}px`, opacity: 1 };

  if (!isInitialized) return null;

  return (
    <>
      {/* Floating draggable button */}
      <button
        ref={buttonRef}
        className={`fixed w-9 h-9 bg-neutral-900 text-white border border-neutral-700 flex z-[3000] items-center justify-center rounded-full shadow-md hover:border-neutral-500 hover:bg-neutral-800 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } ${isTransitioning ? "transition-all duration-300 ease-out" : ""}`}
        style={buttonStyle}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
        aria-controls="floating-menu"
      >
        <Book size={15} aria-hidden="true" />
      </button>

      {/* Dropdown menu */}
      {menuOpen && !isDragging && (
        <div
          id="floating-menu"
          className="dropdown-menu fixed w-56 dark:bg-neutral-900 bg-white overflow-hidden text-black dark:text-white border dark:border-neutral-700 border-neutral-200 rounded-lg shadow-lg z-[2999] animate-fade-in"
          style={dropdownStyle}
          role="menu"
          aria-labelledby="menu-title"
        >
          <div className="">
            <h3
              id="menu-title"
              className="font-semibold text-sm p-3 flex items-center justify-between"
            >
              <span>Menu</span>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="outline-none">
                      <Avatar className="size-4   cursor-pointer">
                        <AvatarImage
                          src={user.image || undefined}
                          alt={user.name || "User"}
                        />
                        <AvatarFallback className="bg-neutral-700 text-white text-xs">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 z-[10000]">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name || "User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      variant="destructive"
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/sign-in">
                  <UserPlus size={16} aria-hidden="true" />
                </Link>
              )}
            </h3>
            <hr />
            <ul className="text-sm" role="menu">
              {menuItems.map((item, i) =>
                item.type === "main" ? (
                  <li
                    key={i}
                    className="px-3 py-2.5  hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer flex items-center gap-2"
                    role="none"
                  >
                    <item.icon size={14} aria-hidden="true" />
                    <a href={item.href} role="menuitem">
                      {item.label}
                    </a>
                  </li>
                ) : (
                  <li key={i} className="relative group" role="none">
                    <div
                      className="px-2 py-2 rounded-md dark:hover:bg-neutral-800 hover:bg-neutral-200 cursor-pointer flex items-center gap-2"
                      onClick={() => setSubMenuOpen(!subMenuOpen)}
                      role="menuitem"
                      aria-expanded={subMenuOpen}
                      aria-haspopup="menu"
                    >
                      <item.icon size={14} aria-hidden="true" />
                      {item.label}
                      <ChevronRight
                        className="ml-auto"
                        size={14}
                        aria-hidden="true"
                      />
                    </div>
                    {/* Submenu */}
                    <ul
                      className={`absolute ml-1 max-w-max  dark:bg-neutral-800 bg-white border dark:border-neutral-700 border-neutral-200 rounded-md shadow-lg ${
                        menuOpen && subMenuOpen ? "block" : "hidden"
                      }`}
                      style={submenuStyle}
                      role="menu"
                      aria-label={`${item.label} submenu`}
                    >
                      {item.children?.map((child, j) => (
                        <React.Fragment key={j}>
                          <li
                            key={j}
                            className="px-2 py-2.5 rounded-md whitespace-nowrap  dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer flex items-center gap-2"
                            role="none"
                          >
                            <child.icon size={14} aria-hidden="true" />
                            <a href={child.href} role="menuitem">
                              {child.label}
                            </a>
                          </li>
                          {j !== (item.children?.length ?? 0) - 1 && <hr />}
                        </React.Fragment>
                      ))}
                    </ul>
                  </li>
                )
              )}
            </ul>

            <hr />

            <div className="px-3 pb-2">
              <div className="mt-2 flex items-center justify-end gap-1">
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  // Only highlight the active theme selection, not the resolved theme when "system" is selected
                  const isActive = theme === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setTheme(option.value)}
                      className={`flex h-7 w-7 items-center justify-center rounded-md border transition ${
                        isActive
                          ? "bg-neutral-200 border-neutral-400 dark:focus:border-neutral-600  text-neutral-900 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                          : "border-transparent bg-neutral-100 text-neutral-600 hover:border-neutral-400 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:bg-neutral-700"
                      }`}
                      aria-label={`Activate ${option.label} theme`}
                    >
                      <Icon size={16} aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Corner highlight boxes while dragging */}
      {isDragging && <CornerHighlights />}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.18s ease-out;
        }
      `}</style>
    </>
  );
}
