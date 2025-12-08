// Shared types for hosting calculator (provider-agnostic)

export type CostBreakdownItem = {
    label: string
    value: number
    category: string
    included?: number | string
}

export type CostResult = {
    basePrice: number
    usageCharges: number
    creditsApplied: number
    total: number
    breakdown: CostBreakdownItem[]
}

export type Plan = string // Generic plan type (e.g., "hobby" | "pro" | "enterprise" | "free" | "paid" | "custom")

export type ProviderConfig<TInputs, TPlan extends Plan> = {
    name: string
    defaultInputs: TInputs
    planLimits: Record<TPlan, TInputs>
    calculate: (inputs: TInputs, plan: TPlan, ...args: any[]) => CostResult
    cookieKey: string
    teamMembersKey?: string
}

export type CalculatorContextValue<TInputs, TPlan extends Plan> = {
    inputs: TInputs
    setInputs: (inputs: TInputs | ((prev: TInputs) => TInputs)) => void
    plan: TPlan
    setPlan: (plan: TPlan) => void
    cost: CostResult
    reset: () => void
    config: ProviderConfig<TInputs, TPlan>
    teamMembers?: number
    setTeamMembers?: (members: number) => void
}

