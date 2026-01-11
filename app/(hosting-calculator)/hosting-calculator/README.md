# Hosting Calculator - DRY Architecture

A modular, extensible hosting calculator built with the DRY (Don't Repeat Yourself) principle. Easily add new providers (AWS, DigitalOcean, Railway, Render, etc.) without duplicating code.

## 📁 Architecture

```
hosting-calculator/
├── core/                           # Core system (provider-agnostic)
│   └── provider.tsx               # Context provider + useCalculator hook
│
├── ui/                            # Primitive UI components
│   ├── input-slider.tsx          # Input with slider
│   ├── value-display-row.tsx     # Display row
│   ├── toggle-group-card.tsx     # Toggle buttons
│   ├── result-summary-card.tsx   # Summary card
│   └── ...
│
├── composables/                   # Composed components (built from ui/)
│   ├── input-section.tsx         # InputSlider + description
│   ├── input-group.tsx           # Section container
│   ├── description.tsx           # Description labels (Cost, What is it, Used by)
│   ├── cost-display.tsx          # Cost summary display
│   ├── breakdown-list.tsx        # Breakdown list
│   ├── plan-selector.tsx         # Plan selector
│   └── ...
│
├── providers/                     # Provider implementations
│   ├── vercel/
│   │   ├── types.ts              # Vercel types
│   │   ├── config.ts             # Calculation + defaults
│   │   └── inputs.tsx            # Input sections
│   └── cloudflare/
│       ├── types.ts              # Cloudflare types
│       ├── config.ts             # Calculation + defaults
│       └── inputs.tsx            # Input sections
│
├── utils/
│   └── cookies.ts                # Cookie utilities
│
├── types.ts                       # Shared types
│
└── full-stack/                    # Pages (minimal wiring)
    ├── vercel/page.tsx           # ~60 lines
    └── cloudflare/page.tsx       # ~60 lines
```

## 🎯 DRY Principles Applied

### 1. Single Source of Truth
- **Calculation logic**: One function per provider in `config.ts`
- **UI components**: Reusable across all providers
- **State management**: One context, one hook for all providers

### 2. Composition Over Duplication
- **InputGroup**: Wraps sections (title + icon + children)
- **Description**: Wraps description labels (Cost, What is it, Used by)
- **InputSection**: Wraps InputSlider + description

### 3. Configuration-Driven
- **Provider config**: All provider-specific logic in `config.ts`
- **Type-safe**: TypeScript throughout
- **Extensible**: Add providers by creating config files

## 🚀 Adding a New Provider

### Step 1: Create provider types

```tsx
// providers/aws/types.ts
export type AWSPlan = "free-tier" | "standard" | "enterprise"

export type AWSInputs = {
    ec2Hours: number
    s3StorageGb: number
    lambdaInvocations: number
    // ... more fields
}
```

### Step 2: Create provider config

```tsx
// providers/aws/config.ts
import type { ProviderConfig, CostResult } from "../../types"
import type { AWSInputs, AWSPlan } from "./types"

function calculateAWSCost(inputs: AWSInputs, plan: AWSPlan): CostResult {
    // Your calculation logic here
    const EC2_PRICE = 0.0116 // per hour
    const S3_STORAGE_PRICE = 0.023 // per GB

    const ec2Cost = inputs.ec2Hours * EC2_PRICE
    const s3Cost = inputs.s3StorageGb * S3_STORAGE_PRICE

    return {
        basePrice: 0,
        usageCharges: ec2Cost + s3Cost,
        creditsApplied: 0,
        total: ec2Cost + s3Cost,
        breakdown: [
            { label: "EC2 Instances", value: ec2Cost, category: "Compute" },
            { label: "S3 Storage", value: s3Cost, category: "Storage" },
        ],
    }
}

export const awsFreeTierInputs: AWSInputs = {
    ec2Hours: 750, // 750 hours free
    s3StorageGb: 5, // 5GB free
    lambdaInvocations: 1_000_000, // 1M free
}

export const awsConfig: ProviderConfig<AWSInputs, AWSPlan> = {
    name: "AWS",
    defaultInputs: awsFreeTierInputs,
    planLimits: {
        "free-tier": awsFreeTierInputs,
        standard: awsFreeTierInputs,
        enterprise: awsFreeTierInputs,
    },
    calculate: calculateAWSCost,
    cookieKey: 'hosting-calc-aws-inputs',
}
```

### Step 3: Create input sections

```tsx
// providers/aws/inputs.tsx
"use client"

import { useCalculator } from "../../core/provider"
import { InputSection, InputGroup, Description } from "../../composables"
import { Server, Database, Zap } from "lucide-react"
import type { AWSInputs, AWSPlan } from "./types"

export function AWSInputs() {
    const { inputs, setInputs } = useCalculator<AWSInputs, AWSPlan>()

    return (
        <div className="space-y-6">
            <InputGroup title="EC2 Instances" icon={<Server />}>
                <InputSection
                    label="EC2 Hours"
                    value={inputs.ec2Hours}
                    onValueChange={(v) => setInputs(prev => ({ ...prev, ec2Hours: v }))}
                    min={0}
                    max={10_000}
                    step={10}
                    unit="hours"
                    icon={<Server className="h-4 w-4" />}
                    description={
                        <Description
                            cost="$0.0116 per hour"
                            description="Virtual server runtime hours."
                            usedBy="Web servers, API backends, application hosting."
                        />
                    }
                />
            </InputGroup>

            {/* More input groups... */}
        </div>
    )
}
```

### Step 4: Create the page

```tsx
// full-stack/aws/page.tsx
"use client"

import { CalculatorProvider, useCalculator } from "../../core/provider"
import { awsConfig } from "../../providers/aws/config"
import { CalculatorLayout, PlanSelector, ResetButton, CostDisplay, BreakdownList } from "../../composables"
import { AWSInputs } from "../../providers/aws/inputs"
import { SiAmazon } from "react-icons/si"

export default function AWSPage() {
    return (
        <CalculatorProvider config={awsConfig}>
            <AWSCalculator />
        </CalculatorProvider>
    )
}

function AWSCalculator() {
    const { cost, plan, setPlan, reset } = useCalculator()

    const plans = [
        { id: "free-tier", label: "Free Tier", icon: <SiAmazon /> },
        { id: "standard", label: "Standard", icon: <SiAmazon /> },
        { id: "enterprise", label: "Enterprise", icon: <SiAmazon /> },
    ]

    return (
        <CalculatorLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <PlanSelector plans={plans} value={plan} onChange={setPlan} />
                    <ResetButton onReset={reset} />
                </div>
                <AWSInputs />
            </div>

            <div className="space-y-6">
                <div className="sticky top-6 space-y-6">
                    <CostDisplay
                        cost={cost}
                        plan={plan}
                        providerName="AWS"
                        providerIcon={<SiAmazon className="h-6 w-6" />}
                    />
                    <BreakdownList breakdown={cost.breakdown} />
                </div>
            </div>
        </CalculatorLayout>
    )
}
```

Done! Your new provider page is ~60 lines.

## 📊 Results

### Before (WET - Write Everything Twice)
- Vercel: **1,272 lines** (calculation, state, UI, all mixed)
- Cloudflare: **917 lines** (calculation, state, UI, all mixed)
- **Total: 2,189 lines** with massive duplication

### After (DRY - Don't Repeat Yourself)
- Vercel page: **59 lines** (just wiring)
- Cloudflare page: **65 lines** (just wiring)
- Shared core: **~500 lines** (reusable across all providers)
- **Total: ~1,100 lines** (50% reduction, infinitely extensible)

### Adding a new provider
- Before: Copy 1,000+ lines, modify everything
- After: Create 3 files (~400 lines), compose with existing components

## 🔧 Core Components

### Provider (Context + Hook)
```tsx
<CalculatorProvider config={vercelConfig}>
    {children}
</CalculatorProvider>
```

Hook API:
```tsx
const {
    inputs,        // Current inputs
    setInputs,     // Update inputs
    plan,          // Current plan
    setPlan,       // Update plan
    cost,          // Calculated cost (auto-updates)
    reset,         // Reset to defaults
    teamMembers,   // Optional: team members
    setTeamMembers // Optional: set team members
} = useCalculator()
```

### Composables
- `CalculatorLayout` - Grid layout
- `PlanSelector` - Plan toggle buttons
- `ResetButton` - Reset button
- `CostDisplay` - Cost summary card
- `BreakdownList` - Breakdown list
- `InputSection` - Input + description
- `InputGroup` - Section container
- `Description` - Description labels

## 💡 Benefits

1. **Maintainability**: Change once, reflect everywhere
2. **Consistency**: Same UI/UX across providers
3. **Type Safety**: TypeScript throughout
4. **Extensibility**: Add providers in minutes
5. **Testability**: Test components once, works everywhere
6. **Performance**: Optimized components shared across providers
7. **Developer Experience**: Clean, intuitive API

## 🎨 Design Patterns Used

- **Provider Pattern**: Context for state management
- **Hook Pattern**: `useCalculator()` for API access
- **Composition Pattern**: Build complex from simple
- **Configuration Pattern**: Provider configs drive behavior
- **Compound Components**: Related components that work together
- **Slot Pattern**: Flexible content insertion

## 📝 Future Providers to Add

- AWS (EC2, Lambda, S3, RDS, etc.)
- DigitalOcean (Droplets, App Platform, Spaces)
- Railway (Deployments, Resources, Volumes)
- Render (Web Services, Databases, Cron Jobs)
- Fly.io (Machines, Volumes, Postgres)
- Supabase (Database, Auth, Storage, Edge Functions)
- PlanetScale (Database, Reads, Writes)
- Netlify (Functions, Bandwidth, Build Minutes)
- Heroku (Dynos, Add-ons, Data)

All can reuse the same core system!



