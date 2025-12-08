import { redirect } from "next/navigation"
import { Route } from "next"

export default function HostingCalculatorPage() {
    redirect("/hosting-calculator/full-stack/vercel" as Route)
}
