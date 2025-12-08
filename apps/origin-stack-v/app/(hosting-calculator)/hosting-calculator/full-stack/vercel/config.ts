import type { ProviderConfig, CostResult } from "../../types"
import type { VercelInputs, VercelPlan } from "./types"

// Calculation function (extracted from page.tsx)
function calculateVercelCost(inputs: VercelInputs, plan: VercelPlan = "hobby", teamMembers: number = 1): CostResult {
    // Base pricing - only Pro plan has subscription fee
    const PRICE_PER_SEAT = plan === "pro" ? 20 : 0 // $20/user/month for Pro, $0 for Hobby
    const CREDIT_PER_SEAT = plan === "pro" ? 20 : 0 // $20 usage credit per seat for Pro, $0 for Hobby
    const BASE_PRICE = PRICE_PER_SEAT * teamMembers
    const INCLUDED_CREDIT = CREDIT_PER_SEAT * teamMembers

    // Edge Network (different limits for Hobby vs Pro)
    const EDGE_REQUESTS_INCLUDED = plan === "pro" ? 10_000_000 : 1_000_000 // 10M for Pro, 1M for Hobby
    const EDGE_REQUESTS_PRICE = 2.00 / 1_000_000 // $2 per 1M requests (after included)
    const FAST_DATA_TRANSFER_INCLUDED = plan === "pro" ? 1000 : 100 // 1TB for Pro, 100GB for Hobby
    const FAST_DATA_TRANSFER_PRICE = 0.15 // per GB (after included)
    const FAST_ORIGIN_TRANSFER_INCLUDED = 10 // 10 GB included in both plans
    const FAST_ORIGIN_TRANSFER_PRICE = 0.06 // per GB (starting at)

    // Vercel Functions (Pro plan includes)
    const FUNCTION_ACTIVE_CPU_INCLUDED = 4 // 4 hours included in Hobby
    const FUNCTION_ACTIVE_CPU_PRICE = 0.128 // per hour (starting at)
    const FUNCTION_PROVISIONED_MEMORY_INCLUDED = 360 // 360 GB-hrs included in Hobby
    const FUNCTION_PROVISIONED_MEMORY_PRICE = 0.0106 // per GB-hour (starting at)
    const FUNCTION_INVOCATIONS_INCLUDED = 1_000_000 // 1M included in Hobby
    const FUNCTION_INVOCATIONS_PRICE = 0.60 / 1_000_000 // $0.60 per 1M (starting at)

    // Vercel Sandbox (Pro plan includes)
    const SANDBOX_ACTIVE_CPU_INCLUDED = 5 // 5 hours included in Hobby
    const SANDBOX_ACTIVE_CPU_PRICE = 0.128 // per hour (starting at)
    const SANDBOX_PROVISIONED_MEMORY_INCLUDED = 420 // 420 GB-hrs included in Hobby
    const SANDBOX_PROVISIONED_MEMORY_PRICE = 0.0106 // per GB-hour (starting at)
    const SANDBOX_CREATIONS_INCLUDED = 5_000 // 5K included in Hobby
    const SANDBOX_CREATIONS_PRICE = 0.60 / 1_000_000 // $0.60 per 1M (starting at)
    const SANDBOX_NETWORK_INCLUDED = 20 // 20 GB included in Hobby
    const SANDBOX_NETWORK_PRICE = 0.15 // per GB (starting at)

    // Vercel Workflow (Pro plan includes)
    const WORKFLOW_STEPS_INCLUDED = 50_000 // 50K steps included in Hobby
    const WORKFLOW_STEPS_PRICE = 2.50 / 100_000 // $2.50 per 100K
    const WORKFLOW_STORAGE_INCLUDED = 1 // 1 GB included in Hobby
    const WORKFLOW_STORAGE_PRICE = 0.50 // per GB

    // Build Minutes (Pro plan pricing)
    const STANDARD_MACHINE_PRICE = 0.014 // per minute (starting at)
    const ENHANCED_MACHINE_PRICE = 0.028 // per minute (starting at)
    const TURBO_MACHINE_PRICE = 0.126 // per minute (starting at)

    // Image Optimization
    const IMAGE_TRANSFORMATIONS_INCLUDED = 5_000 // 5K included in Hobby
    const IMAGE_TRANSFORMATIONS_PRICE = 0.05 / 1_000 // $0.05 per 1K (starting at)
    const IMAGE_CACHE_READS_INCLUDED = 300_000 // 300K included in Hobby
    const IMAGE_CACHE_READS_PRICE = 0.40 / 1_000_000 // $0.40 per 1M reads (starting at)
    const IMAGE_CACHE_WRITES_INCLUDED = 100_000 // 100K included in Hobby
    const IMAGE_CACHE_WRITES_PRICE = 4.00 / 1_000_000 // $4 per 1M writes (starting at)

    // Web Analytics
    const ANALYTICS_EVENTS_PRICE = 3 / 100_000 // $3 per 100k events

    // Blob Storage
    const BLOB_STORAGE_INCLUDED = 1 // GB included in Hobby
    const BLOB_STORAGE_PRICE = 0.023 // per GB/month
    const BLOB_SIMPLE_OPS_INCLUDED = 10_000 // 10K included in Hobby
    const BLOB_SIMPLE_OPS_PRICE = 0.40 / 1_000_000
    const BLOB_ADVANCED_OPS_INCLUDED = 2_000 // 2K included in Hobby
    const BLOB_ADVANCED_OPS_PRICE = 5.00 / 1_000_000
    const BLOB_DATA_TRANSFER_INCLUDED = 10 // GB per month included in Hobby
    const BLOB_DATA_TRANSFER_PRICE = 0.05 // per GB (starting at)

    // Edge Config
    const EDGE_CONFIG_READS_INCLUDED = 100_000 // 100K included in Hobby
    const EDGE_CONFIG_READS_PRICE = 3.00 / 1_000_000 // $3 per 1M reads
    const EDGE_CONFIG_WRITES_INCLUDED = 100 // 100 included in Hobby
    const EDGE_CONFIG_WRITES_PRICE = 5.00 / 500 // $5 per 500 writes

    // ISR (Incremental Static Regeneration)
    const ISR_READS_INCLUDED = 1_000_000 // 1M included in Hobby
    const ISR_READS_PRICE = 0.40 / 1_000_000 // $0.40 per 1M reads
    const ISR_WRITES_INCLUDED = 200_000 // 200K included in Hobby
    const ISR_WRITES_PRICE = 4.00 / 1_000_000 // $4 per 1M writes

    // Firewall
    const RATE_LIMITING_INCLUDED = 1_000_000 // 1M included in Hobby
    const RATE_LIMITING_PRICE = 0.50 / 1_000_000 // $0.50 per 1M allowed requests (starting at)
    const BOTID_DEEP_ANALYSIS_PRICE = 1.00 / 1_000 // $1 per 1K Deep Analysis checks

    // Edge Requests - $2 per 1M after 10M included (Pro)
    const edgeRequestsCost = Math.max(0, inputs.edgeRequests - EDGE_REQUESTS_INCLUDED) * EDGE_REQUESTS_PRICE

    // Fast Data Transfer - $0.15 per GB after 1TB included (Pro)
    const fastDataTransferCost = Math.max(0, inputs.fastDataTransfer - FAST_DATA_TRANSFER_INCLUDED) * FAST_DATA_TRANSFER_PRICE

    // Fast Origin Transfer - $0.06 per GB after 10GB included (Hobby)
    const fastOriginTransferCost = Math.max(0, inputs.fastOriginTransfer - FAST_ORIGIN_TRANSFER_INCLUDED) * FAST_ORIGIN_TRANSFER_PRICE

    // Vercel Functions
    const functionActiveCpuCost = Math.max(0, inputs.functionActiveCpuTime - FUNCTION_ACTIVE_CPU_INCLUDED) * FUNCTION_ACTIVE_CPU_PRICE
    const functionProvisionedMemoryCost = Math.max(0, inputs.provisionedMemory - FUNCTION_PROVISIONED_MEMORY_INCLUDED) * FUNCTION_PROVISIONED_MEMORY_PRICE
    const functionInvocationsCost = Math.max(0, inputs.invocations - FUNCTION_INVOCATIONS_INCLUDED) * FUNCTION_INVOCATIONS_PRICE

    // Vercel Sandbox
    const sandboxActiveCpuCost = Math.max(0, inputs.sandboxActiveCpuTime - SANDBOX_ACTIVE_CPU_INCLUDED) * SANDBOX_ACTIVE_CPU_PRICE
    const sandboxProvisionedMemoryCost = Math.max(0, inputs.sandboxProvisionedMemory - SANDBOX_PROVISIONED_MEMORY_INCLUDED) * SANDBOX_PROVISIONED_MEMORY_PRICE
    const sandboxCreationsCost = Math.max(0, inputs.sandboxCreations - SANDBOX_CREATIONS_INCLUDED) * SANDBOX_CREATIONS_PRICE
    const sandboxNetworkCost = Math.max(0, inputs.sandboxNetwork - SANDBOX_NETWORK_INCLUDED) * SANDBOX_NETWORK_PRICE

    // Vercel Workflow
    const workflowStepsCost = Math.max(0, inputs.steps - WORKFLOW_STEPS_INCLUDED) * WORKFLOW_STEPS_PRICE
    const workflowStorageCost = Math.max(0, inputs.storage - WORKFLOW_STORAGE_INCLUDED) * WORKFLOW_STORAGE_PRICE

    // Build Minutes
    const standardMachineCost = inputs.standardMachines * STANDARD_MACHINE_PRICE
    const enhancedMachineCost = inputs.enhancedMachines * ENHANCED_MACHINE_PRICE
    const turboMachineCost = inputs.turboMachines * TURBO_MACHINE_PRICE

    // Image Transformations
    const imageTransformationsCost = Math.max(0, inputs.imageTransformations - IMAGE_TRANSFORMATIONS_INCLUDED) * IMAGE_TRANSFORMATIONS_PRICE

    // Image Cache Operations
    const imageCacheReadsCost = Math.max(0, inputs.imageCacheReads - IMAGE_CACHE_READS_INCLUDED) * IMAGE_CACHE_READS_PRICE
    const imageCacheWritesCost = Math.max(0, inputs.imageCacheWrites - IMAGE_CACHE_WRITES_INCLUDED) * IMAGE_CACHE_WRITES_PRICE

    // Web Analytics
    const analyticsCost = inputs.webAnalytics * ANALYTICS_EVENTS_PRICE

    // Blob Storage
    const blobStorageCost = Math.max(0, inputs.blobStorageSize - BLOB_STORAGE_INCLUDED) * BLOB_STORAGE_PRICE
    const blobSimpleOpsCost = Math.max(0, inputs.blobSimpleOps - BLOB_SIMPLE_OPS_INCLUDED) * BLOB_SIMPLE_OPS_PRICE
    const blobAdvancedOpsCost = Math.max(0, inputs.blobAdvancedOps - BLOB_ADVANCED_OPS_INCLUDED) * BLOB_ADVANCED_OPS_PRICE
    const blobDataTransferCost = Math.max(0, inputs.blobDataTransfer - BLOB_DATA_TRANSFER_INCLUDED) * BLOB_DATA_TRANSFER_PRICE

    // Edge Config
    const edgeConfigReadsCost = Math.max(0, inputs.edgeConfigReads - EDGE_CONFIG_READS_INCLUDED) * EDGE_CONFIG_READS_PRICE
    const edgeConfigWritesCost = Math.max(0, inputs.edgeConfigWrites - EDGE_CONFIG_WRITES_INCLUDED) * EDGE_CONFIG_WRITES_PRICE

    // ISR (Incremental Static Regeneration)
    const isrReadsCost = Math.max(0, inputs.isrReads - ISR_READS_INCLUDED) * ISR_READS_PRICE
    const isrWritesCost = Math.max(0, inputs.isrWrites - ISR_WRITES_INCLUDED) * ISR_WRITES_PRICE

    // Firewall (Rate Limiting)
    const rateLimitingCost = Math.max(0, inputs.rateLimitingRequests * 1_000_000 - RATE_LIMITING_INCLUDED) * RATE_LIMITING_PRICE

    // BotID (Deep Analysis checks)
    const botIdCost = (inputs.botId || 0) * BOTID_DEEP_ANALYSIS_PRICE

    const usageTotal =
        edgeRequestsCost +
        fastDataTransferCost +
        fastOriginTransferCost +
        functionActiveCpuCost +
        functionProvisionedMemoryCost +
        functionInvocationsCost +
        sandboxActiveCpuCost +
        sandboxProvisionedMemoryCost +
        sandboxCreationsCost +
        sandboxNetworkCost +
        workflowStepsCost +
        workflowStorageCost +
        standardMachineCost +
        enhancedMachineCost +
        turboMachineCost +
        imageTransformationsCost +
        imageCacheReadsCost +
        imageCacheWritesCost +
        analyticsCost +
        blobStorageCost +
        blobSimpleOpsCost +
        blobAdvancedOpsCost +
        blobDataTransferCost +
        edgeConfigReadsCost +
        edgeConfigWritesCost +
        isrReadsCost +
        isrWritesCost +
        rateLimitingCost +
        botIdCost

    const creditsApplied = Math.min(INCLUDED_CREDIT, usageTotal)
    const finalTotal = BASE_PRICE + Math.max(0, usageTotal - INCLUDED_CREDIT)

    return {
        basePrice: BASE_PRICE,
        usageCharges: usageTotal,
        creditsApplied,
        total: finalTotal,
        breakdown: [
            { label: "Base Subscription", value: BASE_PRICE, category: "Base" },
            { label: "Edge Requests", value: edgeRequestsCost, category: "Edge Network", included: EDGE_REQUESTS_INCLUDED },
            { label: "Fast Data Transfer", value: fastDataTransferCost, category: "Edge Network", included: `${FAST_DATA_TRANSFER_INCLUDED} GB` },
            { label: "Fast Origin Transfer", value: fastOriginTransferCost, category: "Edge Network", included: `${FAST_ORIGIN_TRANSFER_INCLUDED} GB` },
            { label: "Functions Active CPU", value: functionActiveCpuCost, category: "Compute", included: `${FUNCTION_ACTIVE_CPU_INCLUDED} hrs` },
            { label: "Functions Memory", value: functionProvisionedMemoryCost, category: "Compute", included: `${FUNCTION_PROVISIONED_MEMORY_INCLUDED} GB-hrs` },
            { label: "Function Invocations", value: functionInvocationsCost, category: "Compute", included: FUNCTION_INVOCATIONS_INCLUDED },
            { label: "Sandbox Active CPU", value: sandboxActiveCpuCost, category: "Sandbox", included: `${SANDBOX_ACTIVE_CPU_INCLUDED} hrs` },
            { label: "Sandbox Memory", value: sandboxProvisionedMemoryCost, category: "Sandbox", included: `${SANDBOX_PROVISIONED_MEMORY_INCLUDED} GB-hrs` },
            { label: "Sandbox Creations", value: sandboxCreationsCost, category: "Sandbox", included: SANDBOX_CREATIONS_INCLUDED },
            { label: "Sandbox Network", value: sandboxNetworkCost, category: "Sandbox", included: `${SANDBOX_NETWORK_INCLUDED} GB` },
            { label: "Workflow Steps", value: workflowStepsCost, category: "Workflow", included: WORKFLOW_STEPS_INCLUDED },
            { label: "Workflow Storage", value: workflowStorageCost, category: "Workflow", included: `${WORKFLOW_STORAGE_INCLUDED} GB` },
            { label: "Build Standard Machines", value: standardMachineCost, category: "Build" },
            { label: "Build Enhanced Machines", value: enhancedMachineCost, category: "Build" },
            { label: "Build Turbo Machines", value: turboMachineCost, category: "Build" },
            { label: "Image Transformations", value: imageTransformationsCost, category: "Image Optimization", included: IMAGE_TRANSFORMATIONS_INCLUDED },
            { label: "Image Cache Reads", value: imageCacheReadsCost, category: "Image Optimization", included: IMAGE_CACHE_READS_INCLUDED },
            { label: "Image Cache Writes", value: imageCacheWritesCost, category: "Image Optimization", included: IMAGE_CACHE_WRITES_INCLUDED },
            { label: "Web Analytics", value: analyticsCost, category: "Analytics" },
            { label: "Blob Storage Size", value: blobStorageCost, category: "Blob Storage", included: `${BLOB_STORAGE_INCLUDED} GB` },
            { label: "Blob Simple Ops", value: blobSimpleOpsCost, category: "Blob Storage", included: BLOB_SIMPLE_OPS_INCLUDED },
            { label: "Blob Advanced Ops", value: blobAdvancedOpsCost, category: "Blob Storage", included: BLOB_ADVANCED_OPS_INCLUDED },
            { label: "Blob Data Transfer", value: blobDataTransferCost, category: "Blob Storage", included: `${BLOB_DATA_TRANSFER_INCLUDED} GB` },
            { label: "Edge Config Reads", value: edgeConfigReadsCost, category: "Edge Config", included: EDGE_CONFIG_READS_INCLUDED },
            { label: "Edge Config Writes", value: edgeConfigWritesCost, category: "Edge Config", included: EDGE_CONFIG_WRITES_INCLUDED },
            { label: "ISR Reads", value: isrReadsCost, category: "ISR", included: ISR_READS_INCLUDED },
            { label: "ISR Writes", value: isrWritesCost, category: "ISR", included: ISR_WRITES_INCLUDED },
            { label: "Rate Limiting", value: rateLimitingCost, category: "Firewall", included: RATE_LIMITING_INCLUDED },
            { label: "BotID Deep Analysis", value: botIdCost, category: "Firewall" },
            { label: "Credits Applied", value: -creditsApplied, category: "Credits" },
        ],
    }
}

// Default inputs for Hobby plan
export const vercelHobbyInputs: VercelInputs = {
    // Edge Network (Hobby limits)
    edgeRequests: 1_000_000,
    fastDataTransfer: 100,
    fastOriginTransfer: 10,

    // Firewall (Hobby limits)
    rateLimitingRequests: 1,
    botId: undefined,

    // ISR (Hobby limits)
    isrReads: 1_000_000,
    isrWrites: 200_000,

    // Blob Storage (Hobby limits)
    blobStorageSize: 1,
    blobSimpleOps: 10_000,
    blobAdvancedOps: 2_000,
    blobDataTransfer: 10,

    // Image Optimization (Hobby limits)
    imageCacheReads: 300_000,
    imageCacheWrites: 100_000,
    imageTransformations: 5_000,

    // Edge Config (Hobby limits)
    edgeConfigReads: 100_000,
    edgeConfigWrites: 100,

    // Vercel Functions (Hobby limits)
    functionActiveCpuTime: 4,
    provisionedMemory: 360,
    invocations: 1_000_000,

    // Vercel Sandbox (Hobby limits)
    sandboxActiveCpuTime: 5,
    sandboxProvisionedMemory: 420,
    sandboxInvocations: 0,
    sandboxCreations: 5_000,
    sandboxNetwork: 20,

    // Vercel Workflow (Hobby limits)
    steps: 50_000,
    storage: 1,

    // Build Minutes (Hobby has no included, all paid)
    standardMachines: 0,
    enhancedMachines: 0,
    turboMachines: 0,

    // Observability
    webAnalytics: 0,
}

// Default inputs for Pro plan
export const vercelProInputs: VercelInputs = {
    // Edge Network (Pro plan includes)
    edgeRequests: 10_000_000,
    fastDataTransfer: 1_000,
    fastOriginTransfer: 10,

    // Firewall (Pro plan)
    rateLimitingRequests: 1,
    botId: undefined,

    // ISR (Pro plan - same as Hobby)
    isrReads: 1_000_000,
    isrWrites: 200_000,

    // Blob Storage (Pro plan - same as Hobby)
    blobStorageSize: 1,
    blobSimpleOps: 10_000,
    blobAdvancedOps: 2_000,
    blobDataTransfer: 10,

    // Image Optimization (Pro plan - same as Hobby)
    imageCacheReads: 300_000,
    imageCacheWrites: 100_000,
    imageTransformations: 5_000,

    // Edge Config (Pro plan - same as Hobby)
    edgeConfigReads: 100_000,
    edgeConfigWrites: 100,

    // Vercel Functions (Pro plan - same as Hobby)
    functionActiveCpuTime: 4,
    provisionedMemory: 360,
    invocations: 1_000_000,

    // Vercel Sandbox (Pro plan - same as Hobby)
    sandboxActiveCpuTime: 5,
    sandboxProvisionedMemory: 420,
    sandboxInvocations: 0,
    sandboxCreations: 5_000,
    sandboxNetwork: 20,

    // Vercel Workflow (Pro plan - same as Hobby)
    steps: 50_000,
    storage: 1,

    // Build Minutes (Pro plan - pay per minute)
    standardMachines: 0,
    enhancedMachines: 0,
    turboMachines: 0,

    // Observability
    webAnalytics: 0,
}

// Provider config
export const vercelConfig: ProviderConfig<VercelInputs, VercelPlan> = {
    name: "Vercel",
    defaultInputs: vercelHobbyInputs,
    planLimits: {
        hobby: vercelHobbyInputs,
        pro: vercelProInputs,
        enterprise: vercelProInputs, // Enterprise uses pro limits as base
    },
    calculate: (inputs, plan, teamMembers = 1) => calculateVercelCost(inputs, plan, teamMembers),
    cookieKey: 'hosting-calc-vercel-inputs',
    teamMembersKey: 'hosting-calc-vercel-team',
}

