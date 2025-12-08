"use client"

import * as React from "react"
import { InputSlider } from "../ui/input-slider"

type InputSectionProps = {
    label: string
    value: number
    onValueChange: (value: number) => void
    min?: number
    max?: number
    step?: number
    unit?: string
    icon?: React.ReactNode
    description?: React.ReactNode
    className?: string
}

export function InputSection({
    label,
    value,
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    unit,
    icon,
    description,
    className,
}: InputSectionProps) {
    return (
        <div className="space-y-2">
            <InputSlider
                label={label}
                value={value}
                onValueChange={onValueChange}
                min={min}
                max={max}
                step={step}
                unit={unit}
                icon={icon}
                className={className}
            />
            {description && (
                <div className="pl-4 pb-2 text-xs text-muted-foreground space-y-1 border-l-2 border-primary/20">
                    {description}
                </div>
            )}
        </div>
    )
}

