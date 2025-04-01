
import { useState, useEffect } from "react";
import { AuthState } from "./types";
import { UserProfile } from "@/data/models";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { getCurrentUserProfile, createUserProfile } from "@/data/supabaseService";
import { Session } from "@supabase/supabase-js";

export const useAuthProvider = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Get current session
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);

        if (currentSession?.user) {
          // Get user profile from our database
          const userProfile = await getCurrentUserProfile();
          setCurrentUser(userProfile);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Auth state changed:", event);
        setSession(newSession);
        
        if (event === "SIGNED_IN" && newSession?.user) {
          // Get user profile when signed in
          const userProfile = await getCurrentUserProfile();
          setCurrentUser(userProfile);
        } else if (event === "SIGNED_OUT") {
          setCurrentUser(null);
        }
      }
    );

    return () => {
      // Clean up subscription
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<UserProfile | null> => {
    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      // Get the user profile
      const userProfile = await getCurrentUserProfile();
      
      if (userProfile) {
        setCurrentUser(userProfile);
        return userProfile;
      }
      
      return null;
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Failed to login. Please check your credentials."
      });
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<UserProfile | null> => {
    try {
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error("User creation failed");
      }

      // Create the user profile
      const userProfile = await createUserProfile(data.user.id, {
        name,
        email,
        profileCompleted: false
      });

      if (userProfile) {
        setCurrentUser(userProfile);
        return userProfile;
      }

      return null;
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message || "Failed to create account. Please try again."
      });
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Sign out with Supabase
      await supabase.auth.signOut();
      setCurrentUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out."
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: error.message || "Failed to logout. Please try again."
      });
    }
  };

  const updateUser = async (userData: Partial<UserProfile>): Promise<UserProfile | null> => {
    try {
      if (!currentUser) {
        throw new Error("No authenticated user");
      }

      // Update profile with Supabase
      const updatedProfile = await createUserProfile(currentUser.id, userData);
      
      if (updatedProfile) {
        setCurrentUser(updatedProfile);
        return updatedProfile;
      }
      
      return null;
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message || "Failed to update profile. Please try again."
      });
      return null;
    }
  };

  return {
    currentUser,
    isLoading,
    isAuthenticated: !!currentUser,
    session,
    login,
    signup,
    logout,
    updateUser
  };
};
