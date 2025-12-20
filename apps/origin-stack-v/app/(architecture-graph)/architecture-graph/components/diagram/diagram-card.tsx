"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@repo/ui/components/shadcn-ui/card";

interface DiagramCardProps {
  children: React.ReactNode;
  className?: string;
}

export function DiagramCard({ children, className }: DiagramCardProps) {
  return (
    <Card
      className={cn(
        "w-full overflow-hidden",
        "bg-zinc-50 dark:bg-zinc-800/50",
        "border-zinc-200 dark:border-zinc-700",
        className
      )}
    >
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}
