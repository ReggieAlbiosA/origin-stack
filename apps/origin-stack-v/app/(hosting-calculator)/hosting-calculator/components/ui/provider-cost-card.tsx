import * as React from "react"
import { cn } from "/ui/src/lib/utils"

type ProviderCostCardProps = {
    name: string
    icon?: React.ReactNode
    monthlyCost: number
    includedCredits?: number
    breakdown?: Array<{ label: string; value: string }>
    highlight?: "default" | "best" | "warning"
    footerSlot?: React.ReactNode
    className?: string
}

const highlightStyles: Record<NonNullable<ProviderCostCardProps["highlight"]>, string> = {
    default: "",
    best: "border-emerald-500/70 bg-emerald-500/10",
    warning: "border-amber-500/70 bg-amber-500/10",
}

export function ProviderCostCard({
    name,
    icon,
    monthlyCost,
    includedCredits,
    breakdown,
    highlight = "default",
    footerSlot,
    className,
}: ProviderCostCardProps) {
    return (
        <div
            className={cn(
                "group relative flex h-full flex-col rounded border border-border/60 bg-card/90 p-4 shadow-sm transition hover:shadow-lg",
                "before:absolute before:inset-0 before:-z-10 before:rounded before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-foreground/5 before:opacity-0 before:transition before:duration-300 group-hover:before:opacity-100",
                highlightStyles[highlight],
                className,
            )}
        >
            <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-muted/60 text-foreground/70">
                    {icon}
                </div>
                <div className="flex flex-1 flex-col">
                    <h3 className="text-base font-semibold text-foreground">{name}</h3>
                    {includedCredits ? (
                        <p className="text-xs text-muted-foreground">
                            Includes ${includedCredits.toLocaleString()} in monthly credits
                        </p>
                    ) : (
                        <p className="text-xs text-muted-foreground/80">Usage billed per unit</p>
                    )}
                </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">
                        ${monthlyCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-sm text-muted-foreground">/month</span>
                </div>

                {breakdown && breakdown.length > 0 && (
                    <ul className="mt-3 space-y-2 text-sm">
                        {breakdown.map((item, idx) => (
                            <li key={idx} className="flex items-center justify-between rounded bg-muted/40 px-3 py-2 text-muted-foreground">
                                <span>{item.label}</span>
                                <span className="font-medium text-foreground/80">{item.value}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {footerSlot && <div className="mt-auto pt-4 text-sm text-muted-foreground">{footerSlot}</div>}
        </div>
    )
}

