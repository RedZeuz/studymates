
import { UserProfile } from "@/data/models";
import { Session } from "@supabase/supabase-js";

export interface AuthState {
  currentUser: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  session: Session | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<UserProfile | null>;
  signup: (name: string, email: string, password: string) => Promise<UserProfile | null>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<UserProfile>) => Promise<UserProfile | null>;
}
