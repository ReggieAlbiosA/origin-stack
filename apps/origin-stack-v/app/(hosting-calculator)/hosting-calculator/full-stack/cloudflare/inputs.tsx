"use client"

import * as React from "react"
import { useCalculator } from "../../components/core/provider"
import { InputSection } from "../../components/composables/input-section"
import { InputGroup } from "../../components/composables/input-group"
import { Description } from "../../components/composables/description"
import { Activity, Database, TrendingUp, HardDrive, ImageIcon } from "lucide-react"
import { SiCloudflare } from "react-icons/si"
import type { CloudflareInputs, CloudflarePlan } from "./types"

type InputConfig = {
    key: keyof CloudflareInputs
    label: string
    min: number
    max: number
    step: number
    unit: string
    icon: React.ReactNode
    cost: string
    description: string
    usedBy: string
}

export function CloudflareInputs() {
    const { inputs, setInputs } = useCalculator<CloudflareInputs, CloudflarePlan>()

    // Workers inputs configuration
    const workersInputs = [
        {
            key: "workerRequests",
            label: "Worker Requests",
            min: 1_000_000,
            max: 200_000_000,
            step: 1_000_000,
            unit: "requests",
            icon: <Activity className="h-4 w-4" />,
            cost: "$0.30 per 1M requests after 10M included",
            description: "Total HTTP requests handled by Cloudflare Workers (serverless functions at the edge).",
            usedBy: "API routes, Next.js with OpenNext adapter, SSR pages, middleware, cron jobs, webhooks, or any JavaScript/TypeScript code running on Workers runtime.",
        },
        {
            key: "cpuTimeMs",
            label: "CPU Time",
            min: 0,
            max: 500_000_000,
            step: 1_000_000,
            unit: "ms",
            icon: <Activity className="h-4 w-4" />,
            cost: "$0.02 per 1M CPU milliseconds after 30M included",
            description: "Total CPU execution time consumed by Workers (measured in milliseconds).",
            usedBy: "All Worker computation: JSON parsing, encryption, data transformation, API calls processing, HTML rendering. Heavy operations like crypto or large loops increase CPU time.",
        },
    ] satisfies InputConfig[]

    // KV Storage inputs configuration
    const kvInputs = [
        {
            key: "kvReads",
            label: "KV Reads",
            min: 0,
            max: 100_000_000,
            step: 1_000_000,
            unit: "reads",
            icon: <Database className="h-4 w-4" />,
            cost: "$0.50 per 1M reads after 10M included",
            description: "Number of key-value read operations from Workers KV (distributed key-value store).",
            usedBy: "Reading cached data, user sessions, feature flags, configuration, or any key-value lookups in Workers. Extremely fast for read-heavy workloads (eventually consistent).",
        },
        {
            key: "kvWrites",
            label: "KV Writes",
            min: 0,
            max: 10_000_000,
            step: 100_000,
            unit: "writes",
            icon: <Database className="h-4 w-4" />,
            cost: "$5.00 per 1M writes after 1M included",
            description: "Number of write/update/delete operations to Workers KV.",
            usedBy: "Storing cache data, updating user preferences, saving session tokens, or any key-value writes. Note: Writes are more expensive than reads in KV.",
        },
        {
            key: "kvStorageGb",
            label: "KV Storage",
            min: 0,
            max: 100,
            step: 1,
            unit: "GB",
            icon: <HardDrive className="h-4 w-4" />,
            cost: "$0.50 per GB/month after 1GB included",
            description: "Total data stored in Workers KV namespace(s).",
            usedBy: "Persistent storage for cached content, user data, session storage, or configuration. Each key can store up to 25MB.",
        },
    ] satisfies InputConfig[]

    // D1 Database inputs configuration
    const d1Inputs = [
        {
            key: "d1RowsRead",
            label: "D1 Rows Read",
            min: 0,
            max: 50_000_000_000,
            step: 1_000_000_000,
            unit: "rows",
            icon: <Database className="h-4 w-4" />,
            cost: "$0.001 per 1M rows after 25B included",
            description: "Number of database rows read from D1 (serverless SQLite at the edge).",
            usedBy: "SELECT queries, JOIN operations, data retrieval in Workers. Includes all rows scanned (not just returned rows). Perfect for relational data at the edge.",
        },
        {
            key: "d1RowsWritten",
            label: "D1 Rows Written",
            min: 0,
            max: 100_000_000,
            step: 1_000_000,
            unit: "rows",
            icon: <Database className="h-4 w-4" />,
            cost: "$1.00 per 1M rows after 50M included",
            description: "Number of rows inserted, updated, or deleted in D1 database.",
            usedBy: "INSERT, UPDATE, DELETE operations. Creating users, updating records, deleting data, or any write transactions in your SQLite database.",
        },
        {
            key: "d1StorageGb",
            label: "D1 Storage",
            min: 0,
            max: 50,
            step: 1,
            unit: "GB",
            icon: <HardDrive className="h-4 w-4" />,
            cost: "$0.75 per GB/month after 5GB included",
            description: "Total database size (all tables, indexes, data) in D1.",
            usedBy: "All stored data in SQLite database: user tables, application data, indexes, metadata. Grows with data volume and index complexity.",
        },
    ] satisfies InputConfig[]

    // R2 Storage inputs configuration
    const r2Inputs = [
        {
            key: "r2StorageGb",
            label: "R2 Storage",
            min: 0,
            max: 1000,
            step: 10,
            unit: "GB",
            icon: <HardDrive className="h-4 w-4" />,
            cost: "$0.015 per GB/month after 10GB included",
            description: "Total data stored in R2 storage (S3-compatible object storage).",
            usedBy: "User-uploaded files, media assets, backups, logs, or any object storage. Zero egress fees make it ideal for public assets.",
        },
        {
            key: "r2ClassAOps",
            label: "R2 Class A Ops (writes/lists)",
            min: 0,
            max: 10_000_000,
            step: 100_000,
            unit: "ops",
            icon: <Database className="h-4 w-4" />,
            cost: "$4.50 per 1M writes/lists after 1M included",
            description: "Number of write/list operations to R2 storage.",
            usedBy: "Writing objects to R2 storage or listing objects in R2 storage.",
        },
        {
            key: "r2ClassBOps",
            label: "R2 Class B Ops (reads)",
            min: 0,
            max: 100_000_000,
            step: 1_000_000,
            unit: "ops",
            icon: <Database className="h-4 w-4" />,
            cost: "$0.36 per 1M reads after 10M included",
            description: "Number of read operations from R2 storage.",
            usedBy: "Reading objects from R2 storage.",
        },
    ] satisfies InputConfig[]

    // Images inputs configuration
    const imagesInputs = [
        {
            key: "imageTransformations",
            label: "Image Transformations (unique)",
            min: 0,
            max: 100_000,
            step: 1_000,
            unit: "transforms",
            icon: <ImageIcon className="h-4 w-4" />,
            cost: "$0.50 per 1K transforms after 5K included",
            description: "Number of unique image transformations/variants created per month.",
            usedBy: "Resizing, format conversion (WebP/AVIF), quality adjustments, cropping operations. Each unique combination (size + format + quality) counts once.",
        },
        {
            key: "imagesStored",
            label: "Images Stored",
            min: 0,
            max: 500_000,
            step: 10_000,
            unit: "images",
            icon: <HardDrive className="h-4 w-4" />,
            cost: "$5.00 per 100k images",
            description: "Total number of original source images stored in Cloudflare Images.",
            usedBy: "User uploads, product images, profile pictures, or any images managed via Cloudflare Images service. Includes originals only (variants don't count).",
        },
        {
            key: "imagesDelivered",
            label: "Images Delivered",
            min: 0,
            max: 1_000_000,
            step: 10_000,
            unit: "delivered",
            icon: <TrendingUp className="h-4 w-4" />,
            cost: "$1.00 per 100k delivered",
            description: "Number of image requests served to end users (all variants combined).",
            usedBy: "Every image view on your site/app. Includes all transformations, cached and non-cached requests. Higher traffic = more deliveries.",
        },
    ] satisfies InputConfig[]

    return (
        <div className="space-y-6">
            {/* Workers */}
            <InputGroup title="Cloudflare Workers" icon={<SiCloudflare />}>
                {workersInputs.map((input) => (
                    <InputSection
                        key={input.key}
                        label={input.label}
                        value={inputs[input.key]}
                        onValueChange={(v) => setInputs(prev => ({ ...prev, [input.key]: v }))}
                        min={input.min}
                        max={input.max}
                        step={input.step}
                        unit={input.unit}
                        icon={input.icon}
                        description={
                            <Description
                                cost={input.cost}
                                description={input.description}
                                usedBy={input.usedBy}
                            />
                        }
                    />
                ))}
            </InputGroup>

            {/* KV Storage */}
            <InputGroup title="KV Storage" icon={<Database />}>
                {kvInputs.map((input) => (
                    <InputSection
                        key={input.key}
                        label={input.label}
                        value={inputs[input.key]}
                        onValueChange={(v) => setInputs(prev => ({ ...prev, [input.key]: v }))}
                        min={input.min}
                        max={input.max}
                        step={input.step}
                        unit={input.unit}
                        icon={input.icon}
                        description={
                            <Description
                                cost={input.cost}
                                description={input.description}
                                usedBy={input.usedBy}
                            />
                        }
                    />
                ))}
            </InputGroup>

            {/* D1 Database */}
            <InputGroup title="D1 Database (SQLite)" icon={<Database />}>
                {d1Inputs.map((input) => (
                    <InputSection
                        key={input.key}
                        label={input.label}
                        value={inputs[input.key]}
                        onValueChange={(v) => setInputs(prev => ({ ...prev, [input.key]: v }))}
                        min={input.min}
                        max={input.max}
                        step={input.step}
                        unit={input.unit}
                        icon={input.icon}
                        description={
                            <Description
                                cost={input.cost}
                                description={input.description}
                                usedBy={input.usedBy}
                            />
                        }
                    />
                ))}
            </InputGroup>

            {/* R2 Storage */}
            <InputGroup title="R2 Storage" icon={<HardDrive />}>
                {r2Inputs.map((input) => (
                    <InputSection
                        key={input.key}
                        label={input.label}
                        value={inputs[input.key]}
                        onValueChange={(v) => setInputs(prev => ({ ...prev, [input.key]: v }))}
                        min={input.min}
                        max={input.max}
                        step={input.step}
                        unit={input.unit}
                        icon={input.icon}
                        description={
                            <Description
                                cost={input.cost}
                                description={input.description}
                                usedBy={input.usedBy}
                            />
                        }
                    />
                ))}
            </InputGroup>

            {/* Images */}
            <InputGroup title="Cloudflare Images" icon={<ImageIcon />}>
                {imagesInputs.map((input) => (
                    <InputSection
                        key={input.key}
                        label={input.label}
                        value={inputs[input.key]}
                        onValueChange={(v) => setInputs(prev => ({ ...prev, [input.key]: v }))}
                        min={input.min}
                        max={input.max}
                        step={input.step}
                        unit={input.unit}
                        icon={input.icon}
                        description={
                            <Description
                                cost={input.cost}
                                description={input.description}
                                usedBy={input.usedBy}
                            />
                        }
                    />
                ))}
            </InputGroup>
        </div>
    )
}
