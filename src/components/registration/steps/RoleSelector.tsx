import { Role } from "../MultiStepForm";
import { motion } from "framer-motion";
import {
  User,
  GraduationCap,
  Users,
  Share2,
  Briefcase,
  Building2,
  Palette,
  type LucideIcon,
} from "lucide-react";

const roles: { id: Role; label: string; icon: LucideIcon }[] = [
  { id: "member", label: "Member", icon: User },
  { id: "student", label: "Student", icon: GraduationCap },
  { id: "ouder", label: "Ouder", icon: Users },
  { id: "affiliated", label: "Affiliated", icon: Share2 },
  { id: "freelancer", label: "Freelancer", icon: Briefcase },
  { id: "ondernemer", label: "Ondernemer", icon: Building2 },
  { id: "artiest", label: "Artiest", icon: Palette },
];

interface RoleSelectorProps {
  selected: Role;
  onSelect: (role: Role) => void;
}

export const RoleSelector = ({ selected, onSelect }: RoleSelectorProps) => {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-semibold text-center text-ink">Kies uw rol</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {roles.map((role, index) => {
          const Icon = role.icon;
          const isSelected = selected === role.id;
          return (
            <motion.button
              type="button"
              key={role.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(role.id)}
              className={`group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                isSelected
                  ? "border-indigo-400/60 bg-indigo-500/15 shadow-glow"
                  : "border-white/10 bg-white/[0.03] hover:border-indigo-400/40 hover:bg-white/[0.06]"
              }`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                  isSelected
                    ? "bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white shadow-glow"
                    : "bg-white/5 text-indigo-300 group-hover:bg-indigo-500/20 group-hover:text-indigo-200"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className={`text-base font-semibold transition-colors ${isSelected ? "text-ink" : "text-ink-muted group-hover:text-ink"}`}>
                {role.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
