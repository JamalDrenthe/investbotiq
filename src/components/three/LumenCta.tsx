import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

export type LumenCtaVariant = "gradient" | "ghost" | "paper";
export type LumenCtaSize = "md" | "sm";

type BaseProps = {
  variant?: LumenCtaVariant;
  size?: LumenCtaSize;
  dot?: boolean;
  children: ReactNode;
  className?: string;
};

function classes({ variant = "gradient", size = "md", className }: BaseProps) {
  return cn(
    "lumen-cta",
    variant === "ghost" && "lumen-cta--ghost",
    variant === "paper" && "lumen-cta--paper",
    size === "sm" && "lumen-cta--sm",
    className,
  );
}

function Dot({ show }: { show?: boolean }) {
  return show ? <span aria-hidden="true" className="lumen-cta__dot" /> : null;
}

export type LumenCtaButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export const LumenCtaButton = forwardRef<HTMLButtonElement, LumenCtaButtonProps>(
  ({ variant, size, dot, className, children, type = "button", ...rest }, ref) => (
    <button ref={ref} type={type} className={classes({ variant, size, className, children })} {...rest}>
      <Dot show={dot} />
      {children}
    </button>
  ),
);
LumenCtaButton.displayName = "LumenCtaButton";

export type LumenCtaLinkProps = BaseProps & Omit<LinkProps, "className" | "children">;

export function LumenCtaLink({ variant, size, dot, className, children, ...rest }: LumenCtaLinkProps) {
  return (
    <Link className={classes({ variant, size, className, children })} {...rest}>
      <Dot show={dot} />
      {children}
    </Link>
  );
}

export type LumenCtaAnchorProps = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">;

export function LumenCtaAnchor({ variant, size, dot, className, children, ...rest }: LumenCtaAnchorProps) {
  return (
    <a className={classes({ variant, size, className, children })} {...rest}>
      <Dot show={dot} />
      {children}
    </a>
  );
}
