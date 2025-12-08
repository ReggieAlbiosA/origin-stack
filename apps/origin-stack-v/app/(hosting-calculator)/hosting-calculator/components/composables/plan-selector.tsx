"use client"

import * as React from "react"
import { ToggleGroupCard, type ToggleItem } from "../ui/toggle-group-card"

type PlanSelectorProps<TPlan extends string> = {
    plans: Array<{ id: TPlan; label: string; icon?: React.ReactNode; description?: string }>
    value: TPlan
    onChange: (plan: TPlan) => void
    columns?: 1 | 2 | 3
}

export function PlanSelector<TPlan extends string>({
    plans,
    value,
    onChange,
    columns = 3,
}: PlanSelectorProps<TPlan>) {
    const options: ToggleItem[] = plans.map((plan) => ({
        label: plan.label,
        value: plan.id,
        icon: plan.icon,
        description: plan.description,
    }))

    return (
        <ToggleGroupCard
            value={value}
            onChange={(newValue) => onChange(newValue as TPlan)}
            options={options}
            columns={columns}
        />
    )
}

