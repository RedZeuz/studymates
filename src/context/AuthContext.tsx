
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  profileCompleted: boolean;
  avatar?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("studySwipeUser");
    
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("studySwipeUser");
      }
    }
    
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock response - in a real app this would come from a backend
      if (email === "test@example.com" && password === "password") {
        const user: User = {
          id: "user-1",
          name: "Test User",
          email: "test@example.com",
          profileCompleted: true,
        };
        setCurrentUser(user);
        localStorage.setItem("studySwipeUser", JSON.stringify(user));
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        return;
      }
      
      // For demo purposes, create a new user if credentials aren't the test ones
      const newUser: User = {
        id: `user-${Math.random().toString(36).substring(2, 9)}`,
        name: email.split('@')[0],
        email: email,
        profileCompleted: false,
      };
      
      setCurrentUser(newUser);
      localStorage.setItem("studySwipeUser", JSON.stringify(newUser));
      toast({
        title: "Login successful",
        description: "Please complete your profile",
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mock signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: `user-${Math.random().toString(36).substring(2, 9)}`,
        name,
        email,
        profileCompleted: false,
      };
      
      setCurrentUser(newUser);
      localStorage.setItem("studySwipeUser", JSON.stringify(newUser));
      toast({
        title: "Account created",
        description: "Please complete your profile",
      });
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("studySwipeUser");
    setCurrentUser(null);
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  // Update user data
  const updateUser = (userData: Partial<User>) => {
    if (!currentUser) return;
    
    const updatedUser = { ...currentUser, ...userData };
    setCurrentUser(updatedUser);
    localStorage.setItem("studySwipeUser", JSON.stringify(updatedUser));
  };

  const value = {
    currentUser,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
