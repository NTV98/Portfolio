import type { ComponentProps } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

/** External links in articles open safely in a new tab; internal links stay as-is. */
function Anchor(props: ComponentProps<"a">) {
  const external = props.href?.startsWith("http");
  return <a {...props} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} />;
}

/**
 * Server-only MDX renderer. Code highlighting runs at build time with Shiki. Code blocks always use the
 * dark code-card look (DESIGN_SYSTEM §8) — the dual-theme form is kept only because it emits --shiki-dark;
 * zero client JS. JS expressions in MDX are blocked.
 */
export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose">
      <MDXRemote
        source={source}
        components={{ a: Anchor }}
        options={{
          blockJS: true,
          mdxOptions: {
            rehypePlugins: [
              [
                rehypePrettyCode,
                { theme: { light: "github-dark", dark: "github-dark" }, keepBackground: false },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
