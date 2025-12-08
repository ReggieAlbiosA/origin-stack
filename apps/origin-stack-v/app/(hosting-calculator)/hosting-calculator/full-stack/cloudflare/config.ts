import type { ProviderConfig, CostResult } from "../../types"
import type { CloudflareInputs, CloudflarePlan } from "./types"

// Calculation function (extracted from page.tsx)
function calculateCloudflareCost(inputs: CloudflareInputs, plan: CloudflarePlan = "paid"): CostResult {
    // Base price: $0 for free, $5 for paid/custom
    const BASE_PRICE = plan === "free" ? 0 : 5

    // Workers
    const WORKER_REQUESTS_INCLUDED = 10_000_000
    const WORKER_REQUESTS_PRICE = 0.30 / 1_000_000
    const CPU_TIME_INCLUDED = 30_000_000 // 30M CPU milliseconds
    const CPU_TIME_PRICE = 0.02 / 1_000_000 // per million CPU ms

    // KV Storage
    const KV_READS_INCLUDED = 10_000_000
    const KV_READS_PRICE = 0.50 / 1_000_000
    const KV_WRITES_INCLUDED = 1_000_000
    const KV_WRITES_PRICE = 5.00 / 1_000_000
    const KV_STORAGE_INCLUDED = 1 // GB
    const KV_STORAGE_PRICE = 0.50 // per GB/month

    // R2 Storage
    const R2_STORAGE_INCLUDED = 10 // GB
    const R2_STORAGE_PRICE = 0.015 // per GB/month
    const R2_CLASS_A_INCLUDED = 1_000_000
    const R2_CLASS_A_PRICE = 4.50 / 1_000_000
    const R2_CLASS_B_INCLUDED = 10_000_000
    const R2_CLASS_B_PRICE = 0.36 / 1_000_000

    // D1 Database
    const D1_ROWS_READ_INCLUDED = 25_000_000_000 // 25 billion per month
    const D1_ROWS_READ_PRICE = 0.001 / 1_000_000
    const D1_ROWS_WRITTEN_INCLUDED = 50_000_000
    const D1_ROWS_WRITTEN_PRICE = 1.00 / 1_000_000
    const D1_STORAGE_INCLUDED = 5 // GB
    const D1_STORAGE_PRICE = 0.75 // per GB/month

    // Images
    const IMAGES_TRANSFORMS_INCLUDED = 5_000
    const IMAGES_TRANSFORMS_PRICE = 0.50 / 1_000
    const IMAGES_STORED_PRICE = 5 / 100_000 // per 100k images/month
    const IMAGES_DELIVERED_PRICE = 1 / 100_000 // per 100k delivered/month

    // Workers
    const workerRequestsCost = Math.max(0, inputs.workerRequests - WORKER_REQUESTS_INCLUDED) * WORKER_REQUESTS_PRICE
    const cpuTimeCost = Math.max(0, inputs.cpuTimeMs - CPU_TIME_INCLUDED) * CPU_TIME_PRICE

    // KV
    const kvReadsCost = Math.max(0, inputs.kvReads - KV_READS_INCLUDED) * KV_READS_PRICE
    const kvWritesCost = Math.max(0, inputs.kvWrites - KV_WRITES_INCLUDED) * KV_WRITES_PRICE
    const kvStorageCost = Math.max(0, inputs.kvStorageGb - KV_STORAGE_INCLUDED) * KV_STORAGE_PRICE

    // R2
    const r2StorageCost = Math.max(0, inputs.r2StorageGb - R2_STORAGE_INCLUDED) * R2_STORAGE_PRICE
    const r2ClassACost = Math.max(0, inputs.r2ClassAOps - R2_CLASS_A_INCLUDED) * R2_CLASS_A_PRICE
    const r2ClassBCost = Math.max(0, inputs.r2ClassBOps - R2_CLASS_B_INCLUDED) * R2_CLASS_B_PRICE

    // D1
    const d1RowsReadCost = Math.max(0, inputs.d1RowsRead - D1_ROWS_READ_INCLUDED) * D1_ROWS_READ_PRICE
    const d1RowsWrittenCost = Math.max(0, inputs.d1RowsWritten - D1_ROWS_WRITTEN_INCLUDED) * D1_ROWS_WRITTEN_PRICE
    const d1StorageCost = Math.max(0, inputs.d1StorageGb - D1_STORAGE_INCLUDED) * D1_STORAGE_PRICE

    // Images
    const imageTransformsCost = Math.max(0, inputs.imageTransformations - IMAGES_TRANSFORMS_INCLUDED) * IMAGES_TRANSFORMS_PRICE
    const imagesStoredCost = inputs.imagesStored * IMAGES_STORED_PRICE
    const imagesDeliveredCost = inputs.imagesDelivered * IMAGES_DELIVERED_PRICE

    const usageTotal =
        workerRequestsCost +
        cpuTimeCost +
        kvReadsCost +
        kvWritesCost +
        kvStorageCost +
        r2StorageCost +
        r2ClassACost +
        r2ClassBCost +
        d1RowsReadCost +
        d1RowsWrittenCost +
        d1StorageCost +
        imageTransformsCost +
        imagesStoredCost +
        imagesDeliveredCost

    const finalTotal = BASE_PRICE + usageTotal

    return {
        basePrice: BASE_PRICE,
        usageCharges: usageTotal,
        creditsApplied: 0,
        total: finalTotal,
        breakdown: [
            { label: "Base Subscription", value: BASE_PRICE, category: "Base" },
            { label: "Worker Requests", value: workerRequestsCost, category: "Workers", included: WORKER_REQUESTS_INCLUDED },
            { label: "CPU Time", value: cpuTimeCost, category: "Workers", included: `${CPU_TIME_INCLUDED / 1_000_000}M ms` },
            { label: "KV Reads", value: kvReadsCost, category: "KV Storage", included: KV_READS_INCLUDED },
            { label: "KV Writes", value: kvWritesCost, category: "KV Storage", included: KV_WRITES_INCLUDED },
            { label: "KV Storage", value: kvStorageCost, category: "KV Storage", included: `${KV_STORAGE_INCLUDED} GB` },
            { label: "R2 Storage", value: r2StorageCost, category: "R2", included: `${R2_STORAGE_INCLUDED} GB` },
            { label: "R2 Class A Ops", value: r2ClassACost, category: "R2", included: R2_CLASS_A_INCLUDED },
            { label: "R2 Class B Ops", value: r2ClassBCost, category: "R2", included: R2_CLASS_B_INCLUDED },
            { label: "D1 Rows Read", value: d1RowsReadCost, category: "D1", included: `${D1_ROWS_READ_INCLUDED / 1_000_000_000}B` },
            { label: "D1 Rows Written", value: d1RowsWrittenCost, category: "D1", included: `${D1_ROWS_WRITTEN_INCLUDED / 1_000_000}M` },
            { label: "D1 Storage", value: d1StorageCost, category: "D1", included: `${D1_STORAGE_INCLUDED} GB` },
            { label: "Image Transforms", value: imageTransformsCost, category: "Images", included: IMAGES_TRANSFORMS_INCLUDED },
            { label: "Images Stored", value: imagesStoredCost, category: "Images" },
            { label: "Images Delivered", value: imagesDeliveredCost, category: "Images" },
        ],
    }
}

// Default inputs - Free plan
export const cloudflareFreePlanInputs: CloudflareInputs = {
    workerRequests: 100_000,
    cpuTimeMs: 10_000,
    kvReads: 100_000,
    kvWrites: 1_000,
    kvStorageGb: 1,
    r2StorageGb: 10,
    r2ClassAOps: 1_000_000,
    r2ClassBOps: 10_000_000,
    d1RowsRead: 5_000_000,
    d1RowsWritten: 100_000,
    d1StorageGb: 5,
    imageTransformations: 0,
    imagesStored: 0,
    imagesDelivered: 0,
}

// Default inputs - Paid plan
export const cloudflarePaidPlanInputs: CloudflareInputs = {
    workerRequests: 10_000_000,
    cpuTimeMs: 30_000_000,
    kvReads: 10_000_000,
    kvWrites: 1_000_000,
    kvStorageGb: 1,
    r2StorageGb: 10,
    r2ClassAOps: 1_000_000,
    r2ClassBOps: 10_000_000,
    d1RowsRead: 25_000_000_000,
    d1RowsWritten: 50_000_000,
    d1StorageGb: 5,
    imageTransformations: 5_000,
    imagesStored: 100_000,
    imagesDelivered: 100_000,
}

// Provider config
export const cloudflareConfig: ProviderConfig<CloudflareInputs, CloudflarePlan> = {
    name: "Cloudflare",
    defaultInputs: cloudflareFreePlanInputs,
    planLimits: {
        free: cloudflareFreePlanInputs,
        paid: cloudflarePaidPlanInputs,
        custom: cloudflarePaidPlanInputs, // Custom uses paid limits as base
    },
    calculate: (inputs, plan) => calculateCloudflareCost(inputs, plan),
    cookieKey: 'hosting-calc-cloudflare-inputs',
}

