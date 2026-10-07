
import { createContext, useContext, useEffect, useState } from "react";
import { observeAuthState } from "@/lib/auth";
import type { LocalUser, UserRole } from "@/types/auth";

type AuthContextType = {
  user: LocalUser | null;
  userRole: UserRole | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return observeAuthState((nextUser, nextRole) => {
      setUser(nextUser);
      setUserRole(nextRole);
      setLoading(false);
    });
  }, []);

  const value: AuthContextType = {
    user,
    userRole,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
