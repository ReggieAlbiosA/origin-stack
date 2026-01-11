"use client";

import { useState, useRef } from "react";
import { ChevronRight, Folder, FolderOpen, File } from "lucide-react";
import { ClipboardCopy, Check } from "lucide-react";
import { 
  SiReact, 
  SiTypescript, 
  SiJavascript, 
  SiCss3, 
  SiHtml5, 
  SiJson,
  SiPython,
  SiCplusplus,
  SiOpenjdk
} from "react-icons/si";

type FileSystemObject = {
  type: "file" | "directory";
  name: string;
  children?: FileSystemObject[];
  path: string;
  code?: string;
};

interface CodeViewerProps {
  fileSystem: FileSystemObject[];
}

// Global Prism manager - loads once and stays loaded
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prismPromise: Promise<any> | null = null;
let prismLoaded = false;

const loadPrism = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (prismLoaded) return Promise.resolve((window as any).Prism);
  if (prismPromise) return prismPromise;

  prismPromise = new Promise(async (resolve) => {
    try {
      // Load Prism JS
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(window as any).Prism) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
        document.head.appendChild(script);
        await new Promise(r => {
          if (script.onload) {
            script.onload = r;
          }
        });

        // Load language components in parallel
        const languages = ['typescript', 'tsx', 'jsx', 'css', 'json'];
        await Promise.all(languages.map(lang => {
          return new Promise(resolve => {
            const langScript = document.createElement('script');
            langScript.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${lang}.min.js`;
            if (langScript.onload) {
              langScript.onload = resolve;
            }
            if (langScript.onerror) {
              langScript.onerror = resolve;
            }
            document.head.appendChild(langScript);
          });
        }));

        // Small delay to ensure all is ready
        await new Promise(r => setTimeout(r, 50));
      }

      prismLoaded = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolve((window as any).Prism);
    } catch {
      resolve(null);
    }
  });

  return prismPromise;
};

// Update theme immediately
const updatePrismTheme = (isDark: boolean) => {
  let link = document.querySelector('#prism-css') as HTMLLinkElement;
  const href = isDark
    ? 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css'
    : 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css';

  if (!link) {
    link = document.createElement('link');
    link.id = 'prism-css';
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  } else if (link.href !== href) {
    link.href = href;
  }
};

// Start loading Prism immediately when this module loads
loadPrism();

// Simple file icons
function getFileIcon(fileName: string) {
  const extension = fileName.split('.').pop()?.toLowerCase();
  const iconProps = { className: "mr-1", size: 16 };

  switch (extension) {
    case 'tsx':
    case 'jsx':
      return <SiReact {...iconProps} color="#61DAFB" />;
    case 'ts':
      return <SiTypescript {...iconProps} color="#3178C6" />;
    case 'js':
      return <SiJavascript {...iconProps} color="#F7DF1E" />;
    case 'css':
      return <SiCss3 {...iconProps} color="#1572B6" />;
    case 'html':
      return <SiHtml5 {...iconProps} color="#E34F26" />;
    case 'json':
      return <SiJson {...iconProps} color="#A0A0A0" />;
    case 'py':
      return <SiPython {...iconProps} color="#3776AB" />;
    case 'java':
      return <SiOpenjdk {...iconProps} color="#5382A1" />;
    case 'cpp':
    case 'c':
      return <SiCplusplus {...iconProps} color="#00599C" />;
    default:
      return <File {...iconProps} />;
  }
}

// Get language for syntax highlighting
function getLanguage(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'tsx':
    case 'jsx':
      return 'tsx';
    case 'ts':
      return 'typescript';
    case 'js':
      return 'javascript';
    case 'css':
      return 'css';
    case 'html':
      return 'html';
    case 'json':
      return 'json';
    case 'py':
      return 'python';
    case 'java':
      return 'java';
    case 'cpp':
    case 'c':
      return 'cpp';
    default:
      return 'javascript';
  }
}

// Synchronous syntax highlighter
function SyntaxHighlighter({ code, language, isDark }: { code: string; language: string; isDark: boolean }) {
  const [, forceUpdate] = useState({});
  const highlightedRef = useRef<string | null>(null);
  const lastCodeRef = useRef<string>('');

  // Update theme immediately
  updatePrismTheme(isDark);

  // Reset cache if code changed
  if (lastCodeRef.current !== code) {
    highlightedRef.current = null;
    lastCodeRef.current = code;
  }

  // Try to highlight immediately if Prism is loaded
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Prism = (window as any).Prism;
  if (prismLoaded && Prism && !highlightedRef.current) {
    try {
      highlightedRef.current = Prism.highlight(
        code,
        Prism.languages[language] || Prism.languages.javascript,
        language
      );
    } catch {
      highlightedRef.current = code;
    }
  }

  // If not highlighted yet, try async
  if (!highlightedRef.current && !prismLoaded) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadPrism().then((PrismInstance: any) => {
      if (PrismInstance) {
        try {
          highlightedRef.current = PrismInstance.highlight(
            code,
            PrismInstance.languages[language] || PrismInstance.languages.javascript,
            language
          );
        } catch {
          highlightedRef.current = code;
        }
        forceUpdate({});
      }
    });
  }

  const displayCode = highlightedRef.current || code;
  const isHighlighted = highlightedRef.current !== null;

  return (
    <pre className="whitespace-pre-wrap">
      {displayCode.split("\n").map((line, index) => (
        <div key={index} className="flex">
          <span className="inline-block w-8 text-right pr-2 text-gray-500 select-none">
            {index + 1}
          </span>
          {isHighlighted ? (
            <span dangerouslySetInnerHTML={{ __html: line }} />
          ) : (
            <span>{line}</span>
          )}
        </div>
      ))}
    </pre>
  );
}

function FileTree({
  item,
  level = 0,
  onSelect,
  selectedPath,
}: {
  item: FileSystemObject;
  level?: number;
  onSelect: (file: FileSystemObject) => void;
  selectedPath: string | null;
}) {
  const [open, setOpen] = useState(true);

  if (item.type === "directory") {
    return (
      <li>
        <div
          onClick={() => setOpen(!open)}
          tabIndex={0}
          title={item.path}
          className="py-1 flex items-center text-[.9rem] focus:bg-[#e6e6e6] hover:bg-[#efefef] font-semibold cursor-pointer dark:focus:bg-[#4f4f51] dark:focus:hover:bg-[#3f3f41] dark:hover:bg-[#4f4f51] hover:text-accent-foreground pr-2"
          style={{ paddingLeft: `${level * 20 + 12}px` }}
        >
          <ChevronRight
            className={`mr-1 transition-transform shrink-0 ${open ? "rotate-90" : ""}`}
            size={16}
          />
          {open ? (
            <FolderOpen className="mr-1 shrink-0" size={16} />
          ) : (
            <Folder className="mr-1 shrink-0" size={16} />
          )}
          <span className="truncate min-w-0">{item.name}</span>
        </div>

        {open && item.children && (
          <ul>
            {item.children.map((child) => (
              <FileTree
                key={child.path}
                item={child}
                level={level + 1}
                onSelect={onSelect}
                selectedPath={selectedPath}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li
      onClick={() => onSelect(item)}
      title={item.path}
      className={`px-4 py-1 flex text-[.9rem] items-center font-semibold cursor-pointer pr-2 ${selectedPath === item.path
        ? "dark:bg-[#3f3f41] bg-[#e6e6e6] text-accent-foreground"
        : "dark:hover:bg-[#4f4f51] hover:bg-[#efefef] hover:text-accent-foreground"
        }`}
      style={{ paddingLeft: `${level * 20 + 12}px` }}
    >
      <span className="shrink-0 mr-1">{getFileIcon(item.name)}</span>
      <span className="truncate min-w-0">{item.name}</span>
    </li>
  );
}

export default function CodeViewer({ fileSystem }: CodeViewerProps) {
  const [selectedFile, setSelectedFile] = useState<FileSystemObject | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Simple dark mode detection
  const isDark = document.documentElement.classList.contains('dark') ||
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Auto-select first file - runs only once per fileSystem change
  if (!selectedFile && fileSystem.length > 0) {
    const findFirstFile = (fs: FileSystemObject[]): FileSystemObject | null => {
      for (const item of fs) {
        if (item.type === "file") return item;
        if (item.type === "directory" && item.children) {
          const found = findFirstFile(item.children);
          if (found) return found;
        }
      }
      return null;
    };

    const first = findFirstFile(fileSystem);
    if (first) setSelectedFile(first);
  }

  // Copy code to clipboard
  const handleCopyCode = () => {
    if (isCopied) return;

    if (selectedFile?.code) {
      navigator.clipboard.writeText(selectedFile.code);
      setIsCopied(true);

      // Simple toast notification
      const toast = document.createElement('div');
      toast.textContent = 'Code copied to clipboard!';
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 1000;
        font-size: 14px;
        font-weight: 500;
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 2000);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  return (
    <div className="h-[900px] dark:border-[#4f4f51] border-[1px] dark:bg-[#4f4f51] grid grid-rows-[50px_1fr] grid-cols-[.3fr_1fr] overflow-y-auto rounded-[15px]">
      {/* Left Header */}
      <div className="px-5 bg-muted flex items-center font-semibold border-b-[1px] border-r-[1px] dark:border-[#4f4f51]">
        Files
      </div>

      {/* Right Header */}
      <div className="px-5 bg-muted flex items-center justify-between font-semibold border-b-[1px] dark:border-[#4f4f51]">
        <div className="flex items-center space-x-2">
          {selectedFile ? (
            <>
              {getFileIcon(selectedFile.name)}
              <span className="dark:text-white/50 font-[400] text-[.9rem]">
                {(() => {
                  const parts = selectedFile.path.split("/");
                  if (parts.length > 1) {
                    return parts.slice(1).join("/");
                  }
                  return selectedFile.name;
                })()}
              </span>
            </>
          ) : (
            <span className="text-gray-400">No file selected</span>
          )}
        </div>
        {selectedFile?.code && (
          <button
            onClick={handleCopyCode}
            disabled={isCopied}
            className="p-1 hover:bg-[#e6e6e6] dark:hover:bg-[#4f4f51] rounded disabled:opacity-50 disabled:cursor-not-allowed"
            title={isCopied ? "Copied!" : "Copy code"}
          >
            {isCopied ? <Check size={16} /> : <ClipboardCopy size={16} />}
          </button>
        )}
      </div>

      {/* File Explorer */}
      <div className="overflow-y-auto bg-muted border-r-[1px] dark:border-[#4f4f51]">
        <ul>
          {fileSystem.map((item) => (
            <FileTree
              key={item.path}
              item={item}
              onSelect={setSelectedFile}
              selectedPath={selectedFile?.path || null}
            />
          ))}
        </ul>
      </div>

      {/* Code View with Syntax Highlighting */}
      <div className="overflow-y-auto bg-muted p-4 text-sm font-mono">
        {selectedFile ? (
          selectedFile.code ? (
            <SyntaxHighlighter
              code={selectedFile.code}
              language={getLanguage(selectedFile.name)}
              isDark={isDark}
            />
          ) : (
            <span className="text-gray-400">{/* No code available */}</span>
          )
        ) : (
          <span className="text-gray-400">
            Select a file to view its content
          </span>
        )}
      </div>
    </div>
  );
}
