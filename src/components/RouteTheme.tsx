import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CANVAS_ROUTE_PREFIXES = ["/member", "/admin", "/auth", "/register"];

/**
 * Switches the shadcn semantic palette to canvas (dark) mode on the
 * member/admin/auth surfaces so every primitive — including portaled
 * dropdowns, dialogs and toasts — follows DESIGN.md's canvas band.
 */
export default function RouteTheme() {
  const { pathname } = useLocation();

  useEffect(() => {
    const isCanvas = CANVAS_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
    document.documentElement.classList.toggle("dark", isCanvas);
    document.documentElement.style.colorScheme = isCanvas ? "dark" : "light";
  }, [pathname]);

  return null;
}
