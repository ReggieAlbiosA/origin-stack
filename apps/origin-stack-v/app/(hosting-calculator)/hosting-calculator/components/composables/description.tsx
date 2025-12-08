import * as React from "react"

type DescriptionItemProps = {
    label: "Cost" | "What is it" | "Used by" | "Note"
    children: React.ReactNode
}

export function DescriptionItem({ label, children }: DescriptionItemProps) {
    return (
        <p>
            <span className="font-semibold text-foreground">{label}:</span> {children}
        </p>
    )
}

type DescriptionProps = {
    cost?: React.ReactNode
    description?: React.ReactNode
    usedBy?: React.ReactNode
    note?: React.ReactNode
}

export function Description({ cost, description, usedBy, note }: DescriptionProps) {
    return (
        <>
            {cost && <DescriptionItem label="Cost">{cost}</DescriptionItem>}
            {description && <DescriptionItem label="What is it">{description}</DescriptionItem>}
            {usedBy && <DescriptionItem label="Used by">{usedBy}</DescriptionItem>}
            {note && <DescriptionItem label="Note">{note}</DescriptionItem>}
        </>
    )
}

