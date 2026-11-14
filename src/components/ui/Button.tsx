import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/**
 * Pill buttons from the design.
 * - `main`: accent fill; hover = lift + brighter + colored shadow.
 * - `ghost`: outline; hover = lift + accent outline + soft accent wash (no full invert).
 * Icons slide in their direction on hover (`btn-icon-end` → right, `btn-icon-start` → left).
 */
export const buttonVariants = cva(
  "btn-motion inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        main: "btn-main",
        ghost: "btn-ghost",
      },
      size: {
        sm: "min-h-12 px-6 text-body",
        md: "min-h-13 px-7 text-body",
        lg: "min-h-14 px-8 text-body-md",
      },
    },
    defaultVariants: { variant: "main", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;
type CommonProps = Variants & {
  className?: string;
  /** Trailing icon (e.g. →). */
  icon?: ReactNode;
  /** Leading icon (e.g. ←). */
  iconStart?: ReactNode;
  children?: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  download?: boolean;
  newTabLabel?: string;
  "aria-label"?: string;
};

function Content({ iconStart, icon, children }: Pick<CommonProps, "iconStart" | "icon" | "children">) {
  return (
    <>
      {iconStart && <span className="btn-icon btn-icon-start inline-flex">{iconStart}</span>}
      {children}
      {icon && <span className="btn-icon btn-icon-end inline-flex">{icon}</span>}
    </>
  );
}

/** Button = action. With `href` it renders a link styled as a button (navigation). */
export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant, size, className, icon, iconStart, children } = props;
  const classes = cn(buttonVariants({ variant, size }), className);
  const content = <Content iconStart={iconStart} icon={icon}>{children}</Content>;

  if (props.href !== undefined) {
    const { href, external, download, newTabLabel } = props;
    if (external || download || /^(mailto:|tel:)/.test(href)) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={props["aria-label"]}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...(download ? { download: "" } : {})}
        >
          {content}
          {external && newTabLabel && <span className="sr-only">{newTabLabel}</span>}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={props["aria-label"]}>
        {content}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    className: _c,
    icon: _i,
    iconStart: _is,
    children: _ch,
    type = "button",
    ...rest
  } = props;
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
