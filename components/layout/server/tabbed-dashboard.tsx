import { Monitor, CircuitBoard, Code } from "lucide-react"

import { ScrollArea, ScrollBar } from "@/components/shadcn-ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn-ui/tabs"
import CodeViewer from "../client/code-viewer";
import { getFileSystem } from "@/lib/file-system";
import type { FileSystemObject } from "@/lib/file-system";

interface TabbedDashboardProps {
  children: React.ReactNode
  archirecture?: React.ReactNode
  fileSystem?: FileSystemObject[]
  /**
   * Path(s) to automatically generate file system from.
   * Can be a single path string or an array of paths.
   * Example: "app/demo" or ["app/demo", "lib/utils.ts"]
   */
  path?: string | string[]
  /**
   * Whether the user is authenticated. Controls overflow behavior:
   * - true or undefined: allows vertical scrolling (overflow-y-auto)
   * - false: prevents scrolling (overflow-hidden)
   */
  isAuthenticated?: boolean
}

export default async function TabbedDashboard({
  children,
  archirecture,
  fileSystem,
  path,
  isAuthenticated
}: TabbedDashboardProps) {
  // If path is provided, generate file system dynamically
  let resolvedFileSystem = fileSystem;
  if (path && !fileSystem) {
    resolvedFileSystem = await getFileSystem(path);
  }
  return (
    <Tabs defaultValue="tab-1" className="">
      <ScrollArea className=" h-full !outline-none  !border-none">
        <TabsList className=" flex h-full !border-none -space-x-px p-[3px] shadow-xs rtl:space-x-reverse">
          <TabsTrigger
            value="tab-1"
            className="h-full py-[5px] !text-[.7rem] !border-x-transparent !border-t-transparent border-b-2 px-0 w-[90px]"
          >
            <Monitor
              className="opacity-60"
              size={16}
              aria-hidden="true"
            />
            Demo
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            className="h-full py-[5px] !text-[.7rem] !border-x-transparent !border-t-transparent border-b-2 px-3  w-[90px]"
          >
            <CircuitBoard
              className=" opacity-60"
              size={16}
              aria-hidden="true"
            />
            Architecture
          </TabsTrigger>
          <TabsTrigger
            value="tab-3"
            className="h-full py-[5px] !text-[.7rem] !border-x-transparent !border-t-transparent border-b-2 px-0 w-[90px]"
          >
            <Code
              className="opacity-60"
              size={16}
              aria-hidden="true"
            />
            Code
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="tab-1">
        <div className="overflow-hidden  rounded-2xl">
          <div className={`bg-muted !h-[clamp(200px,90vh,900px)] relative ${isAuthenticated === false ? 'overflow-hidden' : 'overflow-y-auto'}`}>
            {children}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="tab-2">
        {archirecture ||
          <div className="bg-muted !h-[clamp(200px,90vh,900px)] overflow-y-auto rounded-2xl grid place-items-center">
            Content for Tab 2
          </div>
        }
      </TabsContent>
      <TabsContent value="tab-3">
        {resolvedFileSystem && resolvedFileSystem.length > 0 ? (
          <CodeViewer fileSystem={resolvedFileSystem} />
        ) : (
          <div className="bg-muted !h-[clamp(200px,90vh,900px)] overflow-y-auto rounded-2xl grid place-items-center">
            Content for Tab 3
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
