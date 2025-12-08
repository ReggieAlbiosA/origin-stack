import * as React from "react"
import { cn } from "/ui/src/lib/utils"

type ValueItem = {
    label: string
    value: string | number
    icon?: React.ReactNode
    tooltip?: string
}

type ValueDisplayGridProps = {
    title?: string
    items: ValueItem[]
    columns?: 1 | 2 | 3
    className?: string
}

export function ValueDisplayGrid({ title, items, columns = 2, className }: ValueDisplayGridProps) {
    return (
        <div className={cn("rounded border border-border/60 bg-card/80 p-4 md:p-5", className)}>
            {title && <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground/80">{title}</h3>}
            <div className={cn("mt-3 grid gap-3", columns === 1 && "md:grid-cols-1", columns === 2 && "md:grid-cols-2", columns === 3 && "md:grid-cols-3")}
            >
                {items.map((item, idx) => (
                    <div key={idx} className="flex flex-col rounded bg-muted/30 px-4 py-3">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground/80">
                            {item.icon && <span className="text-muted-foreground/70">{item.icon}</span>}
                            <span>{item.label}</span>
                        </div>
                        <span className="mt-1 text-lg font-semibold text-foreground">
                            {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

