"use client"

import * as React from "react"
import { ResultSummaryCard } from "../ui/result-summary-card"
import { ValueDisplayGrid } from "../ui/value-display-grid"
import type { CostResult } from "../../types"

type CostDisplayProps = {
    cost: CostResult
    plan: string
    providerName: string
    providerIcon?: React.ReactNode
    teamMembers?: number
}

export function CostDisplay({
    cost,
    plan,
    providerName,
    providerIcon,
    teamMembers,
}: CostDisplayProps) {
    const secondaryMetrics = [
        { label: "Base", value: `$${cost.basePrice.toFixed(2)}` },
        { label: "Usage", value: `$${cost.usageCharges.toFixed(2)}` },
    ]

    if (cost.creditsApplied > 0) {
        secondaryMetrics.push({
            label: "Credits Applied",
            value: `-$${cost.creditsApplied.toFixed(2)}`,
        })
    }

    return (
        <ResultSummaryCard
            title={`${providerName} ${plan}`}
            icon={providerIcon}
            primaryMetric={{
                label: "Estimated Monthly Cost",
                value: `$${cost.total.toFixed(2)}`,
            }}
            secondaryMetrics={secondaryMetrics}
        />
    )
}

