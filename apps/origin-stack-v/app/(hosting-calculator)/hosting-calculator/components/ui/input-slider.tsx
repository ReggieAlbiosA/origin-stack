"use client"

import * as React from "react"
import { Slider } from "/ui/src/components/shadcn-ui/slider"
import { cn } from "/ui/src/lib/utils"

type InputSliderProps = {
    label: string
    value: number
    onValueChange: (value: number) => void
    min?: number
    max?: number
    step?: number
    unit?: string
    icon?: React.ReactNode
    className?: string
}

export function InputSlider({
    label,
    value,
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    unit,
    icon,
    className,
}: InputSliderProps) {
    const [inputValue, setInputValue] = React.useState(value.toString())
    const [isFocused, setIsFocused] = React.useState(false)

    React.useEffect(() => {
        if (!isFocused) {
            setInputValue(value.toLocaleString())
        }
    }, [value, isFocused])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove commas for easier typing
        const newValue = e.target.value.replace(/,/g, '')
        setInputValue(newValue)
    }

    const handleInputFocus = () => {
        setIsFocused(true)
        // Remove commas when focused for easier editing
        setInputValue(value.toString())
    }

    const handleInputBlur = () => {
        setIsFocused(false)
        // Parse and remove any commas
        const cleanValue = inputValue.replace(/,/g, '')
        const numValue = parseFloat(cleanValue)
        if (!isNaN(numValue)) {
            const clampedValue = Math.max(min, Math.min(max, numValue))
            onValueChange(clampedValue)
            setInputValue(clampedValue.toLocaleString())
        } else {
            setInputValue(value.toLocaleString())
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleInputBlur()
            e.currentTarget.blur()
        }
    }

    return (
        <div className={cn("space-y-3 rounded border border-border/60 bg-card p-3 sm:p-4", className)}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    {icon && <span className="text-muted-foreground/80">{icon}</span>}
                    <span className="text-xs sm:text-sm">{label}</span>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onKeyDown={handleKeyDown}
                        className="min-w-[6rem] sm:min-w-[7rem] rounded border border-border bg-background px-2 sm:px-3 py-1.5 text-right text-xs sm:text-sm font-mono font-semibold text-foreground transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    {unit && <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{unit}</span>}
                </div>
            </div>

            <Slider
                value={[value]}
                min={min}
                max={max}
                step={step}
                onValueChange={(vals) => onValueChange(vals[0])}
                className="pt-1"
            />

            <div className="flex justify-between text-xs text-muted-foreground/70">
                <span>{`${min.toLocaleString()}${unit ? ` ${unit}` : ""}`}</span>
                <span>{`${max.toLocaleString()}${unit ? ` ${unit}` : ""}`}</span>
            </div>
        </div>
    )
}

