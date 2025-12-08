"use client"

import * as React from "react"
import { useCalculator } from "../../components/core/provider"
import { InputSection } from "../../components/composables/input-section"
import { InputGroup } from "../../components/composables/input-group"
import { Description } from "../../components/composables/description"
import { InputSlider } from "../../components/ui/input-slider"
import { Activity, Database, TrendingUp, HardDrive, GitBranch, ImageIcon, Zap, Shield, RefreshCw, Settings2 } from "lucide-react"
import { SiNextdotjs } from "react-icons/si"
import type { VercelInputs, VercelPlan } from "./types"

type InputConfig = {
    key: keyof VercelInputs
    label: string
    min: number
    max: number
    step: number
    unit: string
    icon: React.ReactNode
    cost: string
    description: string
    usedBy?: string
}

export function VercelInputs() {
    const { inputs, setInputs, plan, teamMembers, setTeamMembers } = useCalculator<VercelInputs, VercelPlan>()

    // Edge Network inputs
    const edgeNetworkInputs = [
        {
            key: "edgeRequests",
            label: "Edge Requests",
            min: 1_000_000,
            max: 100_000_000,
            step: 1_000_000,
            unit: "requests/mo",
            icon: <Activity className="h-4 w-4" />,
            cost: "$2 per 1M requests after 10M included",
            description: "Number of HTTP requests served from Vercel's global CDN/edge network to clients.",
            usedBy: "Static pages (SSG), cached API routes, ISR pages, SSR requests, Edge Functions, and any request served through Vercel's CDN. Fresh API requests count if configured with Edge Runtime instead of Node.js runtime.",
        },
        {
            key: "fastDataTransfer",
            label: "Fast Data Transfer (CDN → Users)",
            min: 0,
            max: 5000,
            step: 50,
            unit: "GB",
            icon: <TrendingUp className="h-4 w-4" />,
            cost: "$0.15 per GB after 1TB included (Pro) or 100GB (Hobby)",
            description: "Total bandwidth transferred from Vercel's CDN to end users (egress traffic).",
            usedBy: "HTML pages, JavaScript bundles, CSS files, images, API responses, and any asset served from your deployment. Increases with page size × visitor count.",
        },
        {
            key: "fastOriginTransfer",
            label: "Fast Origin Transfer",
            min: 0,
            max: 100,
            step: 1,
            unit: "GB",
            icon: <HardDrive className="h-4 w-4" />,
            cost: "$0.06 per GB after 10GB included",
            description: "Bandwidth transferred from your origin server/external APIs to Vercel's infrastructure.",
            usedBy: "ISR revalidations fetching from CMS/database, Server-Side Rendering calling external APIs, Serverless Functions fetching from third-party services.",
        },
    ] satisfies InputConfig[]

    // Functions inputs
    const functionsInputs = [
        {
            key: "functionActiveCpuTime",
            label: "Functions Active CPU Time",
            min: 0,
            max: 100,
            step: 1,
            unit: "hours",
            icon: <Activity className="h-4 w-4" />,
            cost: "Starting at $0.128 per hour after 4 hours included",
            description: "Total CPU execution time consumed by your serverless functions.",
            usedBy: "API Routes, Server-Side Rendering (SSR), Server Actions, Middleware, Background Jobs, and any compute-intensive operations in Serverless/Edge Functions.",
        },
        {
            key: "provisionedMemory",
            label: "Provisioned Memory",
            min: 0,
            max: 2000,
            step: 10,
            unit: "GB-hrs",
            icon: <Database className="h-4 w-4" />,
            cost: "Starting at $0.0106 per GB-hour after 360 GB-hrs included",
            description: "Amount of RAM allocated to functions × execution duration (GB-hours).",
            usedBy: "All Serverless Functions. Higher memory needed for: image processing, PDF generation, large data transformations, ML inference, or concurrent operations.",
        },
        {
            key: "invocations",
            label: "Function Invocations",
            min: 0,
            max: 100_000_000,
            step: 1_000_000,
            unit: "invocations",
            icon: <Activity className="h-4 w-4" />,
            cost: "Starting at $0.60 per 1M invocations after 1M included",
            description: "Number of times your serverless functions are invoked/executed.",
            usedBy: "Every API request, Server Action call, Middleware execution, or background job trigger. Each function execution counts as one invocation.",
        },
    ] satisfies InputConfig[]

    // Build & Analytics inputs
    const buildAnalyticsInputs = [
        {
            key: "standardMachines",
            label: "Build Minutes (Standard Machines)",
            min: 0,
            max: 10000,
            step: 10,
            unit: "minutes",
            icon: <GitBranch className="h-4 w-4" />,
            cost: "Starting at $0.014 per minute",
            description: "Build time on standard build machines.",
            usedBy: undefined,
        },
        {
            key: "enhancedMachines",
            label: "Build Minutes (Enhanced Machines)",
            min: 0,
            max: 10000,
            step: 10,
            unit: "minutes",
            icon: <GitBranch className="h-4 w-4" />,
            cost: "Starting at $0.028 per minute",
            description: "Build time on enhanced build machines with more resources.",
            usedBy: undefined,
        },
        {
            key: "turboMachines",
            label: "Build Minutes (Turbo Machines)",
            min: 0,
            max: 10000,
            step: 10,
            unit: "minutes",
            icon: <GitBranch className="h-4 w-4" />,
            cost: "Starting at $0.126 per minute",
            description: "Build time on turbo build machines with maximum resources.",
            usedBy: undefined,
        },
        {
            key: "webAnalytics",
            label: "Web Analytics Events",
            min: 0,
            max: 1_000_000,
            step: 10_000,
            unit: "events",
            icon: <Activity className="h-4 w-4" />,
            cost: "$3 per 100k events",
            description: "Number of user interactions tracked by Vercel Analytics (privacy-friendly, no cookies).",
            usedBy: "Page views, clicks, custom events. Provides Core Web Vitals, audience insights, and real-user monitoring without GDPR concerns.",
        },
    ] satisfies InputConfig[]

    // Image Optimization inputs
    const imageOptimizationInputs = [
        {
            key: "imageCacheReads",
            label: "Image Cache Reads",
            min: 0,
            max: 10_000_000,
            step: 100_000,
            unit: "reads",
            icon: <ImageIcon className="h-4 w-4" />,
            cost: "Starting at $0.40 per 1M reads after 300K included",
            description: "Number of times cached/optimized images are served to users.",
            usedBy: "Next.js Image component serving already-optimized images from cache. Occurs on repeat visits, cached pages, or when images are already transformed.",
        },
        {
            key: "imageCacheWrites",
            label: "Image Cache Writes",
            min: 0,
            max: 1_000_000,
            step: 10_000,
            unit: "writes",
            icon: <ImageIcon className="h-4 w-4" />,
            cost: "Starting at $4 per 1M writes after 100K included",
            description: "Number of new image transformations/optimizations performed and stored in cache.",
            usedBy: "First-time image requests requiring: format conversion (WebP/AVIF), resizing, quality adjustment, or responsive variant generation through next/image.",
        },
        {
            key: "imageTransformations",
            label: "Image Transformations (Unique)",
            min: 0,
            max: 100_000,
            step: 1_000,
            unit: "transforms",
            icon: <ImageIcon className="h-4 w-4" />,
            cost: "Starting at $0.05 per 1K transformations after 5K included",
            description: "Number of unique image transformations/variants created per month.",
            usedBy: "Resizing, format conversion (WebP/AVIF), quality adjustments, cropping operations. Each unique combination (size + format + quality) counts once.",
        },
    ] satisfies InputConfig[]

    // Blob Storage inputs
    const blobStorageInputs = [
        {
            key: "blobStorageSize",
            label: "Blob Storage Size",
            min: 0,
            max: 1000,
            step: 10,
            unit: "GB",
            icon: <HardDrive className="h-4 w-4" />,
            cost: "$0.023 per GB/month after 1GB included",
            description: "Total storage space occupied by files in Vercel Blob (S3-compatible object storage).",
            usedBy: "User-uploaded images/documents, generated PDFs/reports, video files, backups, or any binary data stored via @vercel/blob SDK.",
        },
        {
            key: "blobSimpleOps",
            label: "Blob Simple Operations",
            min: 0,
            max: 10_000_000,
            step: 100_000,
            unit: "ops",
            icon: <Database className="h-4 w-4" />,
            cost: "Starting at $0.40 per 1M ops after 10K included",
            description: "Basic file operations: reading/downloading existing blobs.",
            usedBy: "GET requests to serve files, downloading attachments, streaming video, or accessing stored assets via blob URLs.",
        },
        {
            key: "blobAdvancedOps",
            label: "Blob Advanced Operations",
            min: 0,
            max: 1_000_000,
            step: 10_000,
            unit: "ops",
            icon: <Database className="h-4 w-4" />,
            cost: "Starting at $5 per 1M ops after 2K included",
            description: "Write operations: uploading, updating, deleting blobs.",
            usedBy: "PUT/POST requests for file uploads, DELETE for cleanup, multipart uploads for large files, or metadata updates.",
        },
        {
            key: "blobDataTransfer",
            label: "Blob Data Transfer",
            min: 0,
            max: 10000,
            step: 100,
            unit: "GB",
            icon: <TrendingUp className="h-4 w-4" />,
            cost: "$0.05 per GB after 10GB included",
            description: "Bandwidth used transferring data to/from Vercel Blob storage.",
            usedBy: "Uploading files from clients, downloading large assets, video streaming, or serving user-generated content from blob storage.",
        },
    ] satisfies InputConfig[]

    // Edge Config inputs
    const edgeConfigInputs = [
        {
            key: "edgeConfigReads",
            label: "Edge Config Reads",
            min: 0,
            max: 100_000_000,
            step: 1_000_000,
            unit: "reads",
            icon: <Settings2 className="h-4 w-4" />,
            cost: "Starting at $3 per 1M reads after 100K included",
            description: "Number of times configuration data is read from Edge Config (ultra-low-latency key-value store).",
            usedBy: "Feature flag checks, A/B test variants, geo-based routing rules, maintenance mode toggles, or dynamic config loaded in Middleware/Edge Functions.",
        },
        {
            key: "edgeConfigWrites",
            label: "Edge Config Writes",
            min: 0,
            max: 100_000,
            step: 1_000,
            unit: "writes",
            icon: <Settings2 className="h-4 w-4" />,
            cost: "$5 per 500 writes after 100 included",
            description: "Number of configuration updates/writes to Edge Config.",
            usedBy: "Updating feature flags, changing A/B test percentages, enabling/disabling features, or modifying routing rules via dashboard or API without redeployment.",
        },
    ] satisfies InputConfig[]

    // ISR inputs
    const isrInputs = [
        {
            key: "isrReads",
            label: "ISR Reads",
            min: 0,
            max: 100_000_000,
            step: 1_000_000,
            unit: "reads",
            icon: <RefreshCw className="h-4 w-4" />,
            cost: "Starting at $0.40 per 1M reads after 1M included",
            description: "Number of times pre-generated ISR pages are served from cache.",
            usedBy: "Next.js pages with revalidate or on-demand revalidation. Serves cached static HTML until revalidation period expires or manual revalidation triggered.",
        },
        {
            key: "isrWrites",
            label: "ISR Writes",
            min: 0,
            max: 10_000_000,
            step: 100_000,
            unit: "writes",
            icon: <RefreshCw className="h-4 w-4" />,
            cost: "Starting at $4 per 1M writes after 200K included",
            description: "Number of page regenerations (rebuilds) for ISR pages.",
            usedBy: "Background revalidation after revalidate time expires, on-demand revalidation via revalidatePath/revalidateTag, or CMS webhook-triggered updates.",
        },
    ] satisfies InputConfig[]

    // Sandbox inputs
    const sandboxInputs = [
        {
            key: "sandboxActiveCpuTime",
            label: "Sandbox Active CPU Time",
            min: 0,
            max: 100,
            step: 1,
            unit: "hours",
            icon: <Activity className="h-4 w-4" />,
            cost: "Starting at $0.128 per hour after 5 hours included",
            description: "Total CPU execution time consumed by Sandbox environments.",
            usedBy: undefined,
        },
        {
            key: "sandboxProvisionedMemory",
            label: "Sandbox Provisioned Memory",
            min: 0,
            max: 2000,
            step: 10,
            unit: "GB-hrs",
            icon: <Database className="h-4 w-4" />,
            cost: "Starting at $0.0106 per GB-hour after 420 GB-hrs included",
            description: "Amount of RAM allocated to sandbox environments × execution duration.",
            usedBy: undefined,
        },
        {
            key: "sandboxCreations",
            label: "Sandbox Creations",
            min: 0,
            max: 10_000_000,
            step: 10_000,
            unit: "creations",
            icon: <Activity className="h-4 w-4" />,
            cost: "Starting at $0.60 per 1M creations after 5K included",
            description: "Number of sandbox environments created.",
            usedBy: undefined,
        },
        {
            key: "sandboxNetwork",
            label: "Sandbox Network",
            min: 0,
            max: 1000,
            step: 10,
            unit: "GB",
            icon: <TrendingUp className="h-4 w-4" />,
            cost: "Starting at $0.15 per GB after 20 GB included",
            description: "Network bandwidth used by sandbox environments.",
            usedBy: undefined,
        },
    ] satisfies InputConfig[]

    // Workflow inputs
    const workflowInputs = [
        {
            key: "steps",
            label: "Workflow Steps",
            min: 0,
            max: 10_000_000,
            step: 10_000,
            unit: "steps",
            icon: <Activity className="h-4 w-4" />,
            cost: "$2.50 per 100K steps after 50K included",
            description: "Number of workflow steps executed.",
            usedBy: undefined,
        },
        {
            key: "storage",
            label: "Workflow Storage",
            min: 0,
            max: 1000,
            step: 10,
            unit: "GB",
            icon: <HardDrive className="h-4 w-4" />,
            cost: "$0.50 per GB after 1 GB included",
            description: "Storage used by workflow executions.",
            usedBy: undefined,
        },
    ] satisfies InputConfig[]

    // Firewall inputs
    const firewallInputs = [
        {
            key: "rateLimitingRequests",
            label: "Rate Limiting (Allowed Requests)",
            min: 0,
            max: 1000,
            step: 10,
            unit: "M reqs",
            icon: <Activity className="h-4 w-4" />,
            cost: "Starting at $0.50 per 1M allowed requests after 1M included",
            description: "Total requests that pass rate limiting checks (requests within allowed limits).",
            usedBy: "Protecting API endpoints, login pages, form submissions. Charges apply for requests that are evaluated and allowed (not for blocked requests).",
        },
    ] satisfies InputConfig[]

    return (
        <div className="space-y-6">
            {/* Team Configuration */}
            {plan === "pro" && (
                <div className="rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-card p-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <SiNextdotjs className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold">Team Configuration</h3>
                            <p className="text-xs text-muted-foreground">Pro plan: $20/user/month + $20 credit/user</p>
                        </div>
                    </div>
                    <InputSlider
                        label="Team Members (Full Access)"
                        value={teamMembers || 1}
                        onValueChange={(v) => setTeamMembers?.(v)}
                        min={1}
                        max={20}
                        step={1}
                        unit="users"
                        icon={<SiNextdotjs className="h-4 w-4" />}
                    />
                    <div className="flex items-center justify-between rounded bg-muted/40 p-3 text-sm">
                        <span className="text-muted-foreground">Monthly Subscription</span>
                        <span className="font-semibold">${((teamMembers || 1) * 20).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-emerald-500/10 p-3 text-sm">
                        <span className="text-emerald-600 dark:text-emerald-400">Total Usage Credits</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">${((teamMembers || 1) * 20).toFixed(2)}</span>
                    </div>
                </div>
            )}

            {/* Edge Network */}
            <InputGroup title="Edge Network & CDN" icon={<Zap />}>
                {edgeNetworkInputs.map((input) => (
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

            {/* Vercel Functions */}
            <InputGroup title="Vercel Functions (Fluid Compute)" icon={<SiNextdotjs />}>
                {functionsInputs.map((input) => (
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

            {/* Build & Analytics */}
            <InputGroup title="Build & Analytics" icon={<GitBranch />}>
                {buildAnalyticsInputs.map((input) => (
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

            {/* Image Optimization */}
            <InputGroup title="Image Optimization" icon={<ImageIcon />}>
                {imageOptimizationInputs.map((input) => (
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

            {/* Blob Storage */}
            <InputGroup title="Blob Storage" icon={<Database />}>
                {blobStorageInputs.map((input) => (
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

            {/* Edge Config */}
            <InputGroup title="Edge Config" icon={<Settings2 />}>
                {edgeConfigInputs.map((input) => (
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

            {/* ISR */}
            <InputGroup title="ISR (Incremental Static Regeneration)" icon={<RefreshCw />}>
                {isrInputs.map((input) => (
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

            {/* Vercel Sandbox */}
            <InputGroup title="Vercel Sandbox" icon={<SiNextdotjs />}>
                {sandboxInputs.map((input) => (
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

            {/* Vercel Workflow */}
            <InputGroup title="Vercel Workflow" icon={<GitBranch />}>
                {workflowInputs.map((input) => (
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

            {/* Firewall */}
            <InputGroup title="Vercel Firewall" icon={<Shield />}>
                {firewallInputs.map((input) => (
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

                {/* BotID (special case - handles undefined) */}
                <InputSection
                    label="BotID Deep Analysis Checks"
                    value={inputs.botId || 0}
                    onValueChange={(v) => setInputs(prev => ({ ...prev, botId: v > 0 ? v : undefined }))}
                    min={0}
                    max={100_000}
                    step={1000}
                    unit="checks"
                    icon={<Shield className="h-4 w-4" />}
                    description={
                        <Description
                            cost="$1 per 1K Deep Analysis checks (Basic checks included)"
                            description="Number of advanced bot detection checks performed."
                            usedBy="Advanced bot detection and analysis beyond basic checks. Helps identify sophisticated bots, scrapers, and automated attacks."
                        />
                    }
                />
            </InputGroup>
        </div>
    )
}
