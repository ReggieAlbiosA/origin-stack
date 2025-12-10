"use client";

import { CalculatorProvider } from "../../components/core/provider";
import { useCalculator } from "../../components/core/provider";
import { vercelConfig } from "./config";
import { CalculatorLayout } from "../../components/composables/calculator-layout";
import { PlanSelector } from "../../components/composables/plan-selector";
import { ResetButton } from "../../components/composables/reset-button";
import { CostDisplay } from "../../components/composables/cost-display";
import { BreakdownList } from "../../components/composables/breakdown-list";
import { VercelInputs } from "./inputs";
import { SiNextdotjs } from "react-icons/si";
import type { VercelPlan } from "./types";
import { TrendingUp } from "lucide-react";
import { Sidebar, SidebarContent } from "@/components/sidebar/client/sidebar";

export default function VercelPage() {
  return (
    <CalculatorProvider config={vercelConfig}>
      <VercelCalculator />
    </CalculatorProvider>
  );
}

function VercelCalculator() {
  const { cost, plan, setPlan, reset } = useCalculator<any, VercelPlan>();

  const plans = [
    { id: "hobby" as const, label: "Vercel Hobby", icon: <SiNextdotjs /> },
    { id: "pro" as const, label: "Vercel Pro", icon: <SiNextdotjs /> },
    { id: "enterprise" as const, label: "Enterprise", icon: <SiNextdotjs /> },
  ];

  return (
    <CalculatorLayout className="grid grid-cols-1 lg:!grid-cols-[1.5fr_0.2fr]">
      {/* Inputs Section */}
      <div className="space-y-6 lg:space-y-10 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 px-4 sm:px-[30px] border-b border-zinc-200 last-stack dark:bg-zinc-900 bg-white dark:border-zinc-800 py-4 sm:py-0 sm:h-[65.5px] sticky top-0 justify-between z-10">
          <PlanSelector plans={plans} value={plan} onChange={setPlan} />
          <ResetButton onReset={reset} />
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-[30px] pb-6 lg:pb-0">
          <VercelInputs />
        </div>
      </div>

      {/* Results Section - Visible on mobile, below inputs */}
      <div className="lg:hidden px-4 pb-6 space-y-6">
        <CostDisplay
          cost={cost}
          plan={plan}
          providerName="Vercel"
          providerIcon={<SiNextdotjs className="h-6 w-6" />}
        />

        <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-500/10 px-3 py-2 rounded-lg">
          <TrendingUp className="h-4 w-4" />
          <span className="font-medium">Global Edge Network</span>
        </div>

        <BreakdownList breakdown={cost.breakdown} />
      </div>

      {/* Results Section - Fixed sidebar on desktop */}
      <Sidebar className="hidden lg:block right-0" width={350}>
        <SidebarContent>
          <CostDisplay
            cost={cost}
            plan={plan}
            providerName="Vercel"
            providerIcon={<SiNextdotjs className="h-6 w-6" />}
          />

          <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-500/10 px-3 py-2 rounded-lg">
            <TrendingUp className="h-4 w-4" />
            <span className="font-medium">Global Edge Network</span>
          </div>

          <BreakdownList breakdown={cost.breakdown} />
        </SidebarContent>
      </Sidebar>
    </CalculatorLayout>
  );
}
