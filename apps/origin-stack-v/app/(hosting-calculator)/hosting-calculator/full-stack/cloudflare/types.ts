export type CloudflarePlan = "free" | "paid" | "custom"

export type CloudflareInputs = {
    // Workers
    workerRequests: number // per month
    cpuTimeMs: number // total CPU milliseconds per month

    // KV Storage
    kvReads: number // per month
    kvWrites: number // per month
    kvStorageGb: number // GB

    // R2 Storage
    r2StorageGb: number // GB
    r2ClassAOps: number // writes/lists per month
    r2ClassBOps: number // reads per month

    // D1 Database
    d1RowsRead: number // per month
    d1RowsWritten: number // per month
    d1StorageGb: number // GB

    // Images
    imageTransformations: number // unique per month
    imagesStored: number // total images
    imagesDelivered: number // per month
}

