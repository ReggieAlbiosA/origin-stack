"use client";

import { useEffect } from "react";
import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
      <Card className="w-full max-w-md border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
              <AlertCircle className="w-8 h-8" />
            </div>
          </div>
          <CardTitle className="text-xl font-semibold text-red-900 dark:text-red-200">
            Something went wrong!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center pb-2">
          <p className="text-sm text-red-800/80 dark:text-red-300/80">
            {error.message || "We couldn't load your posts. Please try again."}
          </p>
        </CardContent>
        <CardFooter className="justify-center pt-6">
          <Button
            onClick={() => reset()}
            variant="destructive"
            className="w-full sm:w-auto"
          >
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
