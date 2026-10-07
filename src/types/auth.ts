export type UserRole = "admin" | "member" | "guest";

export type LocalUser = {
  id: string;
  email: string;
  created_at: string;
  app_metadata: { role: UserRole };
  user_metadata: Record<string, unknown>;
};

export type LocalSession = {
  access_token: string;
  user: LocalUser;
};
