import React from "react";
import { Link } from "react-router-dom";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/AuthProvider";

interface BrandLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
  subtitle?: string;
  to?: string;
  className?: string;
  collapsed?: boolean;
}

/** Logo port from investbotiq-hub: gradient tile with bot glyph + INVESTBOTIQ wordmark. */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "dark",
  size = "md",
  showSubtitle = true,
  subtitle = "IQ Bot Automated",
  to,
  className,
  collapsed = false,
}) => {
  const { user, userRole } = useAuth();

  const defaultTo = to ?? (user ? (userRole === "admin" ? "/admin" : "/member/dashboard") : "/");

  const sizeConfig = {
    sm: {
      box: "w-8 h-8 rounded-xl p-[1.5px]",
      inner: "rounded-[10px]",
      icon: "w-4 h-4",
      title: "text-base font-extrabold tracking-tight",
      subtitle: "text-[9px] font-bold tracking-wider",
      gap: "gap-2.5",
    },
    md: {
      box: "w-10 h-10 sm:w-11 sm:h-11 rounded-2xl p-0.5",
      inner: "rounded-[14px]",
      icon: "w-5 h-5",
      title: "text-lg sm:text-xl font-extrabold tracking-tight",
      subtitle: "text-[10px] font-semibold tracking-wider mt-0.5",
      gap: "gap-3",
    },
    lg: {
      box: "w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-0.5",
      inner: "rounded-[14px]",
      icon: "w-6 h-6 sm:w-7 sm:h-7",
      title: "text-2xl sm:text-3xl font-black tracking-tight",
      subtitle: "text-[11px] font-semibold tracking-wider mt-1 uppercase",
      gap: "gap-3.5",
    },
  }[size];

  const isDark = variant === "dark";

  return (
    <Link
      to={defaultTo}
      className={cn("flex items-center group select-none transition-all", sizeConfig.gap, className)}
      aria-label="INVESTBOTIQ"
    >
      <div
        className={cn(
          "bg-gradient-to-tr from-indigo-700 via-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0",
          sizeConfig.box
        )}
      >
        <div
          className={cn(
            "w-full h-full bg-slate-900 flex items-center justify-center transition-colors group-hover:bg-slate-950",
            sizeConfig.inner
          )}
        >
          <Bot
            className={cn(
              "text-indigo-100 group-hover:rotate-12 transition-transform duration-300",
              sizeConfig.icon
            )}
          />
        </div>
      </div>

      {!collapsed && (
        <div className="flex flex-col justify-center text-left">
          <span
            className={cn(
              "leading-none transition-colors",
              sizeConfig.title,
              isDark ? "text-ink group-hover:text-indigo-300" : "text-slate-900 dark:text-white group-hover:text-indigo-900 dark:group-hover:text-indigo-200"
            )}
          >
            INVESTBOTIQ
          </span>
          {showSubtitle && (
            <span
              className={cn(
                "uppercase transition-colors",
                sizeConfig.subtitle,
                isDark ? "text-ink-muted" : "text-indigo-600 dark:text-indigo-300"
              )}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </Link>
  );
};

export default BrandLogo;
