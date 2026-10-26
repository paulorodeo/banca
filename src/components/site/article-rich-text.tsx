import type { ReactNode } from "react";
import type { RichNode } from "@/content/payload";
import { EditorialImageTrigger } from "@/components/site/editorial-lightbox";

/** Safe React rendering of validated Lexical DTOs, never dangerouslySetInnerHTML. */
export function ArticleRichText({ nodes }: { nodes: RichNode[] }) {
  const render = (node: RichNode, key: number): ReactNode => {
    const children = node.children?.map(render);
    switch (node.type) {
      case "text": {
        let text: ReactNode = node.text;
        const format = node.format ?? 0;
        if (format & 1) text = <strong>{text}</strong>;
        if (format & 2) text = <em>{text}</em>;
        if (format & 4) text = <s>{text}</s>;
        if (format & 8) text = <u>{text}</u>;
        if (format & 16) text = <code>{text}</code>;
        return <span key={key}>{text}</span>;
      }
      case "paragraph":
        return (
          <p key={key} className="my-5 leading-relaxed text-muted-foreground">
            {children}
          </p>
        );
      // The article title owns H1. Editor H1 is displayed as H2 to preserve hierarchy.
      case "heading":
        return node.tag === "h3" ? (
          <h3 key={key} className="mt-8 mb-4 text-2xl">
            {children}
          </h3>
        ) : (
          <h2 key={key} className="mt-10 mb-4 text-3xl">
            {children}
          </h2>
        );
      case "list":
        return node.listType === "number" ? (
          <ol
            key={key}
            start={node.start}
            className="my-5 list-decimal space-y-2 pl-6 text-muted-foreground"
          >
            {children}
          </ol>
        ) : (
          <ul key={key} className="my-5 list-disc space-y-2 pl-6 text-muted-foreground">
            {children}
          </ul>
        );
      case "listitem":
        return <li key={key}>{children}</li>;
      case "quote":
        return (
          <blockquote
            key={key}
            className="my-8 border-l-2 border-gold pl-6 text-xl leading-relaxed"
          >
            {children}
          </blockquote>
        );
      case "link":
        return (
          <a
            key={key}
            href={node.url}
            rel="noopener noreferrer"
            className="text-gold underline underline-offset-4"
          >
            {children}
          </a>
        );
      case "linebreak":
        return <br key={key} />;
      case "horizontalrule":
        return <hr key={key} className="my-8 border-border" />;
      case "image":
        return node.media ? (
          <figure key={key} className="my-8">
            <EditorialImageTrigger image={node.media}>
              <img
                src={node.media.url}
                alt={node.media.alt}
                width={node.media.width}
                height={node.media.height}
                loading="lazy"
                className="h-auto w-full max-w-full"
              />
            </EditorialImageTrigger>
            {node.media.caption && (
              <figcaption className="mt-3 text-sm text-muted-foreground">
                {node.media.caption}
              </figcaption>
            )}
          </figure>
        ) : null;
      default:
        return null;
    }
  };
  return <div className="min-w-0 break-words">{nodes.map(render)}</div>;
}
