
import { createContext, useContext, useEffect, useState } from "react";
import { LocalSession, LocalUser, supabase } from "@/integrations/supabase/client";

type AuthContextType = {
  user: LocalUser | null;
  session: LocalSession | null;
  userRole: "admin" | "member" | "guest" | null;
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
  const [session, setSession] = useState<LocalSession | null>(null);
  const [userRole, setUserRole] = useState<"admin" | "member" | "guest" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setUserRole(session?.user.app_metadata.role ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setUserRole(session?.user.app_metadata.role ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    session,
    userRole,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
