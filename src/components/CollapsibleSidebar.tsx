import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import {
  Home,
  BarChart4,
  CheckSquare,
  Users,
  Sparkles,
  Bell,
  CircleDollarSign,
  Share2,
  UserCircle,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const CollapsibleSidebar = () => {
  const [expanded, setExpanded] = useState(() => {
    const storedState = localStorage.getItem("sidebar-expanded");
    return storedState === null ? true : storedState === "true";
  });
  const { userRole } = useAuth();
  const isMobile = useIsMobile();

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", String(expanded));
  }, [expanded]);
  
  if (isMobile) {
    return null;
  }
  
  const memberLinks = [
    { to: "/member/dashboard", icon: <Home className="h-4 w-4" />, label: "Dashboard" },
    { to: "/member/progress", icon: <BarChart4 className="h-4 w-4" />, label: "Voortgang" },
    { to: "/member/tasks", icon: <CheckSquare className="h-4 w-4" />, label: "Taken" },
    { to: "/member/referrals", icon: <Share2 className="h-4 w-4" />, label: "Referrals" },
    { to: "/member/ai-running", icon: <Sparkles className="h-4 w-4" />, label: "AI Bot" }
  ];

  const adminLinks = [
    { to: "/admin", icon: <Home className="h-4 w-4" />, label: "Dashboard" },
    { to: "/admin/users", icon: <Users className="h-4 w-4" />, label: "Gebruikers" },
    { to: "/admin/tasks", icon: <CheckSquare className="h-4 w-4" />, label: "Taken" },
    { to: "/admin/cashflows", icon: <CircleDollarSign className="h-4 w-4" />, label: "Cashflows" },
    { to: "/admin/flowlutas", icon: <Sparkles className="h-4 w-4" />, label: "Flowlutas" },
    { to: "/admin/referrals", icon: <Share2 className="h-4 w-4" />, label: "Referrals" },
    { to: "/admin/notifications", icon: <Bell className="h-4 w-4" />, label: "Notificaties" },
  ];

  const links = userRole === "admin" ? adminLinks : memberLinks;
  const profileLink = userRole === "admin" ? "/admin/profile" : "/member/profile";

  return (
    <div className="hidden md:block">
      <div 
        className={cn(
          "fixed z-20 left-0 top-20 h-[calc(100vh-5rem)] bg-canvas-elevated text-ink transition-all duration-300 border-r border-canvas-hairline",
          expanded ? "w-64" : "w-16"
        )}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 py-4 px-2">
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.to}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors",
                            !expanded && "justify-center px-2",
                            isActive
                              ? "bg-indigo/15 font-semibold text-ink shadow-[inset_2px_0_0_#635bff]"
                              : "text-ink-muted hover:bg-white/5 hover:text-ink"
                          )
                        }
                      >
                        {link.icon}
                        {expanded && <span className="truncate">{link.label}</span>}
                      </NavLink>
                    </TooltipTrigger>
                    {!expanded && (
                      <TooltipContent side="right">
                        {link.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-canvas-hairline pt-4 px-2 pb-4">
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <NavLink
                  to={profileLink}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-3 mb-3 rounded-xl text-sm transition-colors",
                      !expanded && "justify-center px-2",
                      isActive
                        ? "bg-indigo/15 text-ink font-medium"
                        : "text-ink-muted hover:bg-white/5 hover:text-ink"
                    )
                  }
                >
                  <UserCircle className="h-4 w-4" />
                  {expanded && <span className="truncate">Profiel</span>}
                </NavLink>
              </TooltipTrigger>
              {!expanded && (
                <TooltipContent side="right">
                  Profiel
                </TooltipContent>
              )}
            </Tooltip>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(prev => !prev)}
              className={cn(
                "w-full flex items-center justify-center rounded-xl text-ink-muted transition-transform hover:bg-white/5 hover:text-ink",
                !expanded && "rotate-180"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
              {expanded && <span className="ml-2">Inklappen</span>}
            </Button>
          </div>
        </div>
      </div>
      
      <div className={cn("hidden md:block transition-all duration-300", expanded ? "w-64" : "w-16")} />
    </div>
  );
};

export default CollapsibleSidebar;
