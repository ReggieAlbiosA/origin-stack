"use client";

import { DiagramProvider } from "../../components/core/provider";
import { DiagramLayout } from "../../components/composables/diagram-layout";
import { DiagramHeader } from "../../components/composables/diagram-header";
import { DiagramControls } from "../../components/composables/diagram-controls";
import { DiagramCard } from "../../components/diagram/diagram-card";
import { DiagramRenderer } from "../../components/diagram/diagram-renderer";
import { gitMergeSquashConfig } from "./config";

export default function GitMergeSquashPage() {
  return (
    <DiagramProvider config={gitMergeSquashConfig}>
      <GitMergeSquashDiagram />
    </DiagramProvider>
  );
}

function GitMergeSquashDiagram() {
  return (
    <DiagramLayout>
      <DiagramHeader />
      <DiagramCard>
        <DiagramRenderer />
      </DiagramCard>
      <DiagramControls />
    </DiagramLayout>
  );
}
