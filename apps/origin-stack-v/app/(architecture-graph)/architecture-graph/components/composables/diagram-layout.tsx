"use client";

import { cn } from "@/lib/utils";

interface DiagramLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DiagramLayout({ children, className }: DiagramLayoutProps) {
  return (
    <div
      className={cn(
        "w-full max-w-5xl mx-auto p-6 lg:p-8",
        "flex flex-col gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}
