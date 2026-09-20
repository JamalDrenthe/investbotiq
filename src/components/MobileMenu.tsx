
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, BarChart, CheckSquare, User, Sparkles, LogOut, 
  Users, Bell, CircleDollarSign, Settings, Share2 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetFooter,
} from "@/components/ui/sheet";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen, onClose }) => {
  const { user, userRole } = useAuth();
  const isAdmin = userRole === "admin";
  const location = useLocation();
  const navigate = useNavigate();

  const getUserInitials = () => {
    if (!user || !user.email) return "?";
    return user.email.substring(0, 2).toUpperCase();
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Error during logout:", error);
        throw error;
      }
      
      toast.success("U bent uitgelogd");
      onClose();
      // Navigeren naar homepage na uitloggen
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Er is een fout opgetreden bij het uitloggen");
    }
  };

  const memberItems = [
    { label: "Dashboard", href: "/member/dashboard", icon: Home },
    { label: "Voortgang", href: "/member/progress", icon: BarChart },
    { label: "Taken", href: "/member/tasks", icon: CheckSquare },
    { label: "Referrals", href: "/member/referrals", icon: Share2 },
    { label: "AI Running", href: "/member/ai-running", icon: Sparkles },
    { label: "Mijn Profiel", href: "/member/profile", icon: User },
  ];

  const adminItems = [
    { label: "Admin Dashboard", href: "/admin", icon: Home },
    { label: "Gebruikers", href: "/admin/users", icon: Users },
    { label: "Taken Beheer", href: "/admin/tasks", icon: CheckSquare },
    { label: "Cashflow Beheer", href: "/admin/cashflows", icon: CircleDollarSign },
    { label: "Notificaties", href: "/admin/notifications", icon: Bell },
    { label: "Instellingen", href: "/admin/settings", icon: Settings },
    { label: "Mijn Profiel", href: "/admin/profile", icon: User },
  ];

  const menuItems = isAdmin ? adminItems : memberItems;

  console.log("MobileMenu rendering, isOpen:", isOpen);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <SheetContent side="left" className="w-[80%] max-w-xs p-0 shadow-xl">
        {user && (
          <div className="flex items-center gap-3 p-4 border-b bg-primary/5">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user.email}</p>
              <p className="text-sm text-muted-foreground truncate capitalize">{userRole}</p>
            </div>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto py-2">
          <nav className="space-y-0.5 px-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-ink-muted hover:bg-white/5 hover:text-ink"
                )}
                onClick={() => {
                  console.log(`Clicked menu item: ${item.label}`); 
                  onClose();
                }}
              >
                {item.icon && <item.icon className="mr-3 h-4 w-4 shrink-0" />}
                <span className="truncate">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <SheetFooter className="border-t p-4">
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full flex items-center justify-center gap-2 py-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Uitloggen</span>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
