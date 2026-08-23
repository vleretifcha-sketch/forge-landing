import type { ComponentProps, ReactNode } from "react";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-[1126px] px-5 md:px-8", className)}>{children}</div>;
}

export function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-8 items-center justify-center rounded-full border border-black/10 bg-white px-2.5">
      <span className="font-[family-name:var(--font-cabinet)] text-base font-bold tracking-[-0.32px] text-ink">
        {children}
      </span>
    </div>
  );
}

export function SectionTitle({
  children,
  align = "left",
}: {
  children: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <h2
      className={cx(
        "text-[36px] font-bold leading-[1.1] tracking-[-1.04px] text-ink md:text-[52px]",
        align === "center" && "text-center",
      )}
    >
      {children}
    </h2>
  );
}

type ButtonVariant = "solid-dark" | "solid-white" | "ghost-dark" | "ghost-light" | "chip";

const buttonStyles: Record<ButtonVariant, string> = {
  "solid-dark":
    "bg-ink text-white shadow-[0px_2px_2px_rgba(0,0,0,0.2),0px_8px_4px_rgba(0,0,0,0.18),0px_18px_5.5px_rgba(0,0,0,0.1)]",
  "solid-white": "bg-white text-ink",
  "ghost-dark": "border border-white/20 bg-[#27292c] text-white",
  "ghost-light": "border border-black/10 bg-chip text-ink",
  chip: "border border-black/10 bg-page text-muted",
};

export function Button({
  variant,
  className,
  children,
  ...props
}: ComponentProps<"a"> & { variant: ButtonVariant }) {
  return (
    <a
      className={cx(
        "inline-flex h-12 shrink-0 items-center justify-center gap-2.5 rounded-xl px-4 py-3 text-base font-bold tracking-[-0.32px] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]",
        buttonStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function Asset({
  src,
  alt = "",
  width,
  height,
  className,
}: {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ width, height }}
    />
  );
}
