
import {
  Home,
  BarChartBig,
  ListChecks,
  Coins,
  TrendingUp,
  Bell,
  Users,
  Settings,
  User,
  UserPlus,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import PreferenceToggles from "@/components/PreferenceToggles";
import { usePreferences } from "@/lib/preferences";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Leads", href: "/admin/leads", icon: UserPlus },
  { name: "Gebruikers", href: "/admin/users", icon: Users },
  { name: "Taken", href: "/admin/tasks", icon: ListChecks },
  { name: "Cashflows", href: "/admin/cashflows", icon: Coins },
  { name: "Flowlutas", href: "/admin/flowlutas", icon: TrendingUp },
  { name: "Notificaties", href: "/admin/notifications", icon: Bell },
  { name: "Instellingen", href: "/admin/settings", icon: Settings },
  { name: "Profiel", href: "/admin/profile", icon: User },
];

export const AdminNavBar = () => {
  const { t } = usePreferences();
  return (
    <div className="mb-8">
      <div className="mb-4 flex justify-start">
        <PreferenceToggles />
      </div>
      <nav className="space-y-1">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-colors ${
                    isActive ? "bg-indigo/15 font-semibold text-ink" : "text-ink-muted"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{t(item.name)}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

// Add default export
export default AdminNavBar;
