import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";

export type FileSystemObject = {
  type: "file" | "directory";
  name: string;
  children?: FileSystemObject[];
  path: string;
  code?: string;
};

const ALLOWED_EXTENSIONS = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".css",
  ".json",
  ".html",
  ".md",
];

const IGNORED_DIRS = [
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build",
  ".turbo",
];

/**
 * Recursively reads a directory and returns a file system object tree
 */
async function readDirectory(
  absolutePath: string,
  basePath: string,
  maxDepth: number = 5,
  currentDepth: number = 0
): Promise<FileSystemObject[]> {
  if (currentDepth >= maxDepth) return [];

  try {
    const entries = await readdir(absolutePath, { withFileTypes: true });
    const result: FileSystemObject[] = [];

    for (const entry of entries) {
      const fullPath = join(absolutePath, entry.name);
      const relativePath = relative(basePath, fullPath);

      if (entry.isDirectory()) {
        // Skip ignored directories
        if (IGNORED_DIRS.includes(entry.name)) continue;

        const children = await readDirectory(
          fullPath,
          basePath,
          maxDepth,
          currentDepth + 1
        );

        // Only include directories that have children
        if (children.length > 0) {
          result.push({
            type: "directory",
            name: entry.name,
            path: relativePath,
            children,
          });
        }
      } else if (entry.isFile()) {
        // Check if file extension is allowed
        const hasAllowedExt = ALLOWED_EXTENSIONS.some((ext) =>
          entry.name.endsWith(ext)
        );

        if (hasAllowedExt) {
          let code: string | undefined;
          try {
            code = await readFile(fullPath, "utf-8");
          } catch {
            // If we can't read the file, just skip the code content
            code = undefined;
          }

          result.push({
            type: "file",
            name: entry.name,
            path: relativePath,
            code,
          });
        }
      }
    }

    return result;
  } catch (error) {
    console.error(`Error reading directory ${absolutePath}:`, error);
    return [];
  }
}

/**
 * Get file system tree from a path or array of paths
 * @param paths - Single path string or array of path strings (relative to project root)
 * @param projectRoot - Absolute path to the project root (defaults to process.cwd())
 */
export async function getFileSystem(
  paths: string | string[],
  projectRoot: string = process.cwd()
): Promise<FileSystemObject[]> {
  const pathArray = Array.isArray(paths) ? paths : [paths];
  const result: FileSystemObject[] = [];

  for (const path of pathArray) {
    const absolutePath = join(projectRoot, path);

    try {
      const stats = await stat(absolutePath);

      if (stats.isDirectory()) {
        const children = await readDirectory(absolutePath, projectRoot);
        result.push({
          type: "directory",
          name: path.split("/").pop() || path,
          path: relative(projectRoot, absolutePath),
          children,
        });
      } else if (stats.isFile()) {
        const hasAllowedExt = ALLOWED_EXTENSIONS.some((ext) =>
          path.endsWith(ext)
        );

        if (hasAllowedExt) {
          let code: string | undefined;
          try {
            code = await readFile(absolutePath, "utf-8");
          } catch {
            code = undefined;
          }

          result.push({
            type: "file",
            name: path.split("/").pop() || path,
            path: relative(projectRoot, absolutePath),
            code,
          });
        }
      }
    } catch (error) {
      console.error(`Error processing path ${path}:`, error);
    }
  }

  return result;
}
