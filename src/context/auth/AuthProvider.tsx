
import React from "react";
import AuthContext from "./AuthContext";
import { useAuthProvider } from "./useAuthProvider";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authState = useAuthProvider();

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};
