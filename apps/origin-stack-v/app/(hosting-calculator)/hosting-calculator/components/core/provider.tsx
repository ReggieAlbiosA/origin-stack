"use client"

import * as React from "react"
import type { CalculatorContextValue, ProviderConfig, Plan } from "../../types"
import { getCookie, setCookie } from "../utils/cookies"

const CalculatorContext = React.createContext<CalculatorContextValue<any, any> | null>(null)

export function CalculatorProvider<TInputs, TPlan extends Plan>({
    config,
    children,
    teamMembers = 1,
    onTeamMembersChange,
}: {
    config: ProviderConfig<TInputs, TPlan>
    children: React.ReactNode
    teamMembers?: number
    onTeamMembersChange?: (members: number) => void
}) {
    const [inputs, setInputsState] = React.useState<TInputs>(config.defaultInputs)
    const [plan, setPlanState] = React.useState<TPlan>(Object.keys(config.planLimits)[0] as TPlan)
    const [teamMembersState, setTeamMembersState] = React.useState(teamMembers)

    // Load from cookies on mount
    React.useEffect(() => {
        const savedInputs = getCookie(config.cookieKey)
        if (savedInputs) {
            try {
                const parsed = JSON.parse(savedInputs)
                setInputsState(parsed)
            } catch (e) {
                console.error(`Failed to parse ${config.cookieKey} from cookie`)
            }
        }

        if (config.teamMembersKey) {
            const savedTeam = getCookie(config.teamMembersKey)
            if (savedTeam) {
                const parsed = parseInt(savedTeam)
                if (!isNaN(parsed)) {
                    setTeamMembersState(parsed)
                }
            }
        }
    }, [config.cookieKey, config.teamMembersKey])

    // Save to cookies on change
    React.useEffect(() => {
        setCookie(config.cookieKey, JSON.stringify(inputs))
    }, [inputs, config.cookieKey])

    // Calculate cost
    const cost = React.useMemo(() => {
        return config.calculate(inputs, plan, teamMembersState)
    }, [inputs, plan, teamMembersState, config])

    // Set inputs wrapper
    const setInputs = React.useCallback((newInputs: TInputs | ((prev: TInputs) => TInputs)) => {
        setInputsState((prev) => {
            if (typeof newInputs === 'function') {
                return (newInputs as (prev: TInputs) => TInputs)(prev)
            }
            return newInputs
        })
    }, [])

    // Set plan wrapper
    const setPlan = React.useCallback((newPlan: TPlan) => {
        setPlanState(newPlan)
        // Optionally update inputs to plan defaults
        const planDefaults = config.planLimits[newPlan]
        if (planDefaults) {
            setInputsState(planDefaults)
        }
    }, [config])

    // Reset function
    const reset = React.useCallback(() => {
        setInputsState(config.defaultInputs)
        setPlanState(Object.keys(config.planLimits)[0] as TPlan)
    }, [config])

    // Save team members to cookie
    React.useEffect(() => {
        if (config.teamMembersKey) {
            setCookie(config.teamMembersKey, teamMembersState.toString())
        }
    }, [teamMembersState, config.teamMembersKey])

    // Handle team members change
    const handleTeamMembersChange = React.useCallback((members: number) => {
        setTeamMembersState(members)
        onTeamMembersChange?.(members)
    }, [onTeamMembersChange])

    const value: CalculatorContextValue<TInputs, TPlan> = {
        inputs,
        setInputs,
        plan,
        setPlan,
        cost,
        reset,
        config,
        teamMembers: teamMembersState,
        setTeamMembers: handleTeamMembersChange,
    } as CalculatorContextValue<TInputs, TPlan> & { teamMembers: number; setTeamMembers: (members: number) => void }

    return (
        <CalculatorContext.Provider value={value}>
            {children}
        </CalculatorContext.Provider>
    )
}

export function useCalculator<TInputs = any, TPlan extends Plan = Plan>() {
    const context = React.useContext(CalculatorContext)
    if (!context) {
        throw new Error('useCalculator must be used within CalculatorProvider')
    }
    return context as CalculatorContextValue<TInputs, TPlan> & { teamMembers?: number; setTeamMembers?: (members: number) => void }
}

