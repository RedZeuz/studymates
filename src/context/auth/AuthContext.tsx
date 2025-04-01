
import { createContext, useContext } from "react";
import { AuthContextType } from "./types";

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoading: true,
  isAuthenticated: false,
  session: null,
  login: async () => null,
  signup: async () => null,
  logout: async () => {},
  updateUser: async () => null
});

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
