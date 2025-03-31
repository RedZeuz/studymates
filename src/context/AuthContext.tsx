
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  profileCompleted?: boolean; // Make this optional since we're not enforcing it
  avatar?: string;
  strengths?: string[];
  weaknesses?: string[];
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

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (email === "test@example.com" && password === "password") {
        const user: User = {
          id: "user-1",
          name: "Test User",
          email: "test@example.com",
          profileCompleted: true,
          strengths: ["Mathematics", "Computer Science"],
          weaknesses: ["History", "Literature"]
        };
        setCurrentUser(user);
        localStorage.setItem("studySwipeUser", JSON.stringify(user));
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        return;
      }
      
      // Check if user exists in localStorage (simulating a database)
      const allUsers = localStorage.getItem("allStudySwipeUsers");
      let users: Record<string, User> = {};
      
      if (allUsers) {
        users = JSON.parse(allUsers);
      }
      
      // Find user by email
      const foundUser = Object.values(users).find(user => user.email === email);
      
      if (foundUser) {
        // In a real app, we would verify the password hash here
        setCurrentUser(foundUser);
        localStorage.setItem("studySwipeUser", JSON.stringify(foundUser));
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      } else {
        // For demo purposes, create a new user if not found
        // No longer setting profileCompleted to false
        const newUser: User = {
          id: `user-${Math.random().toString(36).substring(2, 9)}`,
          name: email.split('@')[0],
          email: email,
        };
        
        setCurrentUser(newUser);
        localStorage.setItem("studySwipeUser", JSON.stringify(newUser));
        toast({
          title: "Account created",
          description: "Welcome to StudySwipeMates!",
        });
      }
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

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // No longer setting profileCompleted to false
      const newUser: User = {
        id: `user-${Math.random().toString(36).substring(2, 9)}`,
        name,
        email,
      };
      
      // Store user in localStorage (simulating a database)
      const allUsers = localStorage.getItem("allStudySwipeUsers");
      let users: Record<string, User> = {};
      
      if (allUsers) {
        users = JSON.parse(allUsers);
      }
      
      users[newUser.id] = newUser;
      localStorage.setItem("allStudySwipeUsers", JSON.stringify(users));
      
      setCurrentUser(newUser);
      localStorage.setItem("studySwipeUser", JSON.stringify(newUser));
      toast({
        title: "Account created",
        description: "Welcome to StudySwipeMates!",
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

  const logout = () => {
    localStorage.removeItem("studySwipeUser");
    setCurrentUser(null);
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  const updateUser = (userData: Partial<User>) => {
    if (!currentUser) return;
    
    const updatedUser = { ...currentUser, ...userData };
    setCurrentUser(updatedUser);
    localStorage.setItem("studySwipeUser", JSON.stringify(updatedUser));
    
    // Update user in "database" too
    const allUsers = localStorage.getItem("allStudySwipeUsers");
    if (allUsers) {
      const users: Record<string, User> = JSON.parse(allUsers);
      users[updatedUser.id] = updatedUser;
      localStorage.setItem("allStudySwipeUsers", JSON.stringify(users));
    }
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
