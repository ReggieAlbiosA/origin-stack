import * as React from "react";
import { cn } from "@/lib/utils";

type InputGroupProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function InputGroup({
  title,
  icon,
  children,
  className,
}: InputGroupProps) {
  return (
    <div
      className={cn(
        "rounded border border-border/60 bg-card/70 p-4 sm:p-6 space-y-4 sm:space-y-5",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {React.cloneElement(
          icon as React.ReactElement<{ className?: string }>,
          {
            className: "h-5 w-5 text-primary",
          }
        )}
        <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}
