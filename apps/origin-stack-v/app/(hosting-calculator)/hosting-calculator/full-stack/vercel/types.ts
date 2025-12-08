// Example: providers/vercel/types.ts
// This shows the type structure for Vercel provider

export type VercelPlan = "hobby" | "pro" | "enterprise"

export type VercelInputs = {
    // Edge Network
    edgeRequests: number
    fastDataTransfer: number
    fastOriginTransfer: number

    // Firewall
    rateLimitingRequests: number
    botId?: number

    // ISR
    isrReads: number
    isrWrites: number

    // Blob Storage
    blobStorageSize: number
    blobSimpleOps: number
    blobAdvancedOps: number
    blobDataTransfer: number

    // Image Optimization
    imageCacheReads: number
    imageCacheWrites: number
    imageTransformations: number

    // Edge Config
    edgeConfigReads: number
    edgeConfigWrites: number

    // Vercel Functions
    functionActiveCpuTime: number
    provisionedMemory: number
    invocations: number

    // Vercel Sandbox
    sandboxActiveCpuTime: number
    sandboxProvisionedMemory: number
    sandboxInvocations: number
    sandboxCreations: number
    sandboxNetwork: number

    // Vercel Workflow
    steps: number
    storage: number

    // Build Minutes
    standardMachines: number
    enhancedMachines: number
    turboMachines: number

    // Observability
    webAnalytics: number
}

