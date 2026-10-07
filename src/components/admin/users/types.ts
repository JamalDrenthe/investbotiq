
export interface UserType {
  id: string;
  email: string;
  name: string;
  cashflow: number;
  spirits: number;
  belLening: number;
  status: 'active';
  role: 'member' | 'admin' | 'unknown';
}
