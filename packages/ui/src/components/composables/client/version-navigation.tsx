"use client"

import { useState, createElement } from "react"
import { Check, ChevronsUpDown, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/shadcn-ui/button"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/shadcn-ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/shadcn-ui/popover"

interface VersionNavigationProps {
    versionLabel?: string
}

export function VersionNavigation({
    versionLabel = "React 19"
}: VersionNavigationProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("latest")

    const versions = [
        {
            value: "latest",
            label: "Latest",
            description: versionLabel,
            icon: Sparkles,
        },
    ]

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between h-auto"
                >
                    <div className="flex items-center ml-1 gap-3">
                        {value && versions.find((version) => version.value === value)?.icon && (
                            createElement(versions.find((version) => version.value === value)!.icon, {
                                className: "size-5 text-muted-foreground shrink-0"
                            })
                        )}
                        <div className="flex flex-col items-start gap-0.5">
                            <span className="font-medium">
                                {value
                                    ? versions.find((version) => version.value === value)?.label
                                    : "Select version..."}
                            </span>
                            {value && (
                                <span className="text-xs text-muted-foreground">
                                    {versions.find((version) => version.value === value)?.description}
                                </span>
                            )}
                        </div>
                    </div>
                    <ChevronsUpDown className="opacity-50 ml-2" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {versions.map((version) => {
                                const Icon = version.icon
                                return (
                                    <CommandItem
                                        key={version.value}
                                        value={version.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "latest" : currentValue)
                                            setOpen(false)
                                        }}
                                        className="flex flex-col items-start gap-0.5 py-2"
                                    >
                                        <div className="flex items-center w-full gap-3 ml-1">
                                            {Icon && <Icon className="size-5 text-muted-foreground shrink-0" />}
                                            <div className="flex flex-col items-start">
                                                <span className="font-medium">{version.label}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {version.description}
                                                </span>
                                            </div>
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    value === version.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </div>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
