import type { CSSProperties } from "react";

/** Splits text into masked words (and optionally chars) for GSAP reveals. */
export function Split({
  text,
  chars = false,
  className = "",
  wordClass = "",
}: {
  text: string;
  chars?: boolean;
  className?: string;
  wordClass?: string;
}) {
  const words = text.trim().split(/\s+/);
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className={`mask ${wordClass}`}>
          {chars ? (
            <span data-w>
              {[...w].map((c, j) => (
                <span key={j} data-c className="inline-block">
                  {c}
                </span>
              ))}
            </span>
          ) : (
            <span data-w>{w}</span>
          )}
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

/**
 * This is a private sales demo, so nothing may navigate off the page: every
 * outbound link keeps its styling and hover motion but is inert. With no href
 * there is nothing for the browser to follow and no click handler is needed,
 * which also keeps this usable from server components.
 */
export function DeadLink({
  children,
  className = "",
  ...rest
}: React.HTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode }) {
  return (
    <a
      {...rest}
      role="link"
      aria-disabled="true"
      tabIndex={0}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </a>
  );
}

/** Two stacked copies of a label that roll on hover. */
export function Roll({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`roll ${className}`}>
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

/** MJM logo rendered as a CSS mask so it takes `currentColor`. */
export function Logo({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <span
      role="img"
      aria-label="MJM Marine"
      className={`block bg-current ${className}`}
      style={{
        aspectRatio: "112.856 / 54.06",
        WebkitMask: "url(/images/logo.svg) center / contain no-repeat",
        mask: "url(/images/logo.svg) center / contain no-repeat",
        ...style,
      }}
    />
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden>
      <path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
