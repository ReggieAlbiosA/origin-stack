import { redirect } from "next/navigation";
import { Route } from "next";

export default function ArchitectureGraphPage() {
  redirect("/architecture-graph/git/merging/squash" as Route);
}
