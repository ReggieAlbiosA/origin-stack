import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/shadcn-ui/card";
import { Badge } from "@repo/ui/components/shadcn-ui/badge";

interface DemoErrorProps {
  title: string;
  description: string;
  error: string;
  badgeText: string;
  badgeVariant?: "default" | "secondary" | "outline" | "destructive";
  badgeClassName?: string;
}

export function DemoError({
  title,
  description,
  error,
  badgeText,
  badgeVariant = "outline",
  badgeClassName,
}: DemoErrorProps) {
  return (
    <Card className="border-amber-200 dark:border-amber-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge variant={badgeVariant} className={badgeClassName}>
            {badgeText}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 text-2xl">⚠️</div>
            <div className="space-y-2">
              <h4 className="font-semibold text-amber-900 dark:text-amber-100">
                Demo Mode: Using Fallback Data
              </h4>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                The real API is currently unavailable. This demo is showing
                example data to demonstrate the caching behavior. The caching
                mechanism still works exactly the same!
              </p>
              {error && (
                <details className="text-xs text-amber-700 dark:text-amber-300 mt-2">
                  <summary className="cursor-pointer hover:underline">
                    Technical details
                  </summary>
                  <code className="block mt-2 p-2 bg-amber-100 dark:bg-amber-900/50 rounded">
                    {error}
                  </code>
                </details>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
