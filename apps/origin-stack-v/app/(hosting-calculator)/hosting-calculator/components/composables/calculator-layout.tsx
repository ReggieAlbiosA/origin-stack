"use client"

import * as React from "react"

type CalculatorLayoutProps = {
    children: React.ReactNode
    className?: string
}

export function CalculatorLayout({ children, className }: CalculatorLayoutProps) {
    return (
        <div className={`grid  ${className || ''}`}>
            {children}
        </div>
    )
}

