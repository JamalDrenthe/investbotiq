
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import {
  BarChart4,
  FileText,
  Home,
  UserCircle,
  CheckSquare,
  Users,
  Sparkles,
  Bell,
  CircleDollarSign,
  Share2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const [expanded, setExpanded] = React.useState(true);
  const { userRole } = useAuth();
  
  const memberLinks = [
    { to: '/member/dashboard', icon: <Home className="h-4 w-4" />, label: 'Dashboard' },
    { to: '/member/progress', icon: <BarChart4 className="h-4 w-4" />, label: 'Voortgang' },
    { to: '/member/tasks', icon: <CheckSquare className="h-4 w-4" />, label: 'Taken' },
    { to: '/member/referrals', icon: <Share2 className="h-4 w-4" />, label: 'Referrals' },
    { to: '/member/ai-running', icon: <Sparkles className="h-4 w-4" />, label: 'AI Bot' }
  ];

  const adminLinks = [
    { to: '/admin', icon: <Home className="h-4 w-4" />, label: 'Dashboard' },
    { to: '/admin/users', icon: <Users className="h-4 w-4" />, label: 'Gebruikers' },
    { to: '/admin/tasks', icon: <CheckSquare className="h-4 w-4" />, label: 'Taken' },
    { to: '/admin/cashflows', icon: <CircleDollarSign className="h-4 w-4" />, label: 'Cashflows' },
    { to: '/admin/flowlutas', icon: <Sparkles className="h-4 w-4" />, label: 'Flowlutas' },
    { to: '/admin/referrals', icon: <Share2 className="h-4 w-4" />, label: 'Referrals' },
    { to: '/admin/notifications', icon: <Bell className="h-4 w-4" />, label: 'Notificaties' },
  ];

  const links = userRole === 'admin' ? adminLinks : memberLinks;
  const profileLink = userRole === 'admin' ? '/admin/profile' : '/member/profile';

  return (
    <div className="relative hidden md:block">
      <aside
        className={cn(
          'fixed left-0 top-20 z-30 flex h-[calc(100vh-5rem)] flex-col border-r border-canvas-hairline bg-canvas-elevated text-ink transition-all duration-300 lg:static lg:z-0',
          expanded ? 'w-64' : 'w-16'
        )}
      >
        <div className="flex h-full flex-col">
          <nav className="grid gap-1 px-2 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all hover:bg-white/5 hover:text-ink',
                    isActive
                      ? 'bg-indigo/15 font-semibold text-ink shadow-[inset_2px_0_0_#635bff]'
                      : 'text-ink-muted'
                  )
                }
              >
                {link.icon}
                <span className={cn('truncate', !expanded && 'lg:hidden')}>
                  {link.label}
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto px-2 py-4">
            <NavLink
              to={profileLink}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all hover:bg-white/5 hover:text-ink',
                  isActive
                    ? 'bg-indigo/15 font-semibold text-ink'
                    : 'text-ink-muted'
                )
              }
            >
              <UserCircle className="h-4 w-4" />
              <span className={cn('truncate', !expanded && 'lg:hidden')}>
                Profiel
              </span>
            </NavLink>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
