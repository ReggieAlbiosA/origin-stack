"use client";

import * as React from "react";
import { ResultSummaryCard } from "../ui/result-summary-card";
import type { CostResult } from "../../types";

type CostDisplayProps = {
  cost: CostResult;
  plan: string;
  providerName: string;
  providerIcon?: React.ReactNode;
};

export function CostDisplay({
  cost,
  plan,
  providerName,
  providerIcon,
}: CostDisplayProps) {
  const secondaryMetrics = [
    { label: "Base", value: `$${cost.basePrice.toFixed(2)}` },
    { label: "Usage", value: `$${cost.usageCharges.toFixed(2)}` },
  ];

  if (cost.creditsApplied > 0) {
    secondaryMetrics.push({
      label: "Credits Applied",
      value: `-$${cost.creditsApplied.toFixed(2)}`,
    });
  }

  return (
    <ResultSummaryCard
      title={`${providerName} ${plan}`}
      icon={providerIcon}
      primaryMetric={{
        label: "Estimated Monthly Cost",
        value: `$${cost.total.toFixed(2)}`,
      }}
      secondaryMetrics={secondaryMetrics}
    />
  );
}
