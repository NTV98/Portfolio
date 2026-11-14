import type { CodeCard as CodeCardData } from "@/lib/content/schemas";
import { cn } from "@/lib/cn";

const Str = ({ children }: { children: string }) => <span className="text-code-string">&quot;{children}&quot;</span>;

function list(items: string[]) {
  return items.map((item, i) => (
    <span key={item}>
      {i > 0 && ", "}
      <Str>{item}</Str>
    </span>
  ));
}

/** Hero "developer.ts" card — always dark (code tokens), bobs gently. */
export function CodeCard({ name, data, label, className }: { name: string; data: CodeCardData; label: string; className?: string }) {
  // Long arrays wrap two per line, like the design.
  const frontendRows: string[][] = [];
  for (let i = 0; i < data.frontend.length; i += 2) frontendRows.push(data.frontend.slice(i, i + 2));

  return (
    <figure
      aria-label={label}
      className={cn(
        "anim-bob w-full max-w-115 overflow-hidden rounded-lg border border-code-line bg-code-bg font-mono text-xs leading-code text-code-fg shadow-float",
        className,
      )}
    >
      <div aria-hidden className="flex items-center gap-2 border-b border-code-divider px-4.5 py-3.5">
        <span className="size-2.75 rounded-full bg-code-red" />
        <span className="size-2.75 rounded-full bg-code-yellow" />
        <span className="size-2.75 rounded-full bg-code-string" />
        <span className="ml-2.5 text-3xs text-code-muted">{data.filename}</span>
      </div>
      <pre className="overflow-x-auto px-5.5 pt-5 pb-6 whitespace-pre-wrap">
        <code>
          <span className="text-code-keyword">const</span> dev = <span className="text-code-muted">{"{"}</span>
          {"\n  name: "}
          <Str>{name}</Str>,{"\n  backend: ["}
          {list(data.backend)}],{"\n  frontend: [\n"}
          {frontendRows.map((row) => (
            <span key={row.join()}>
              {"    "}
              {list(row)},{"\n"}
            </span>
          ))}
          {"  ],\n  openToWork: "}
          <span className="text-code-literal">{String(data.openToWork)}</span>,{"\n"}
          <span className="text-code-muted">{"}"}</span>;
        </code>
      </pre>
    </figure>
  );
}
