
import { UserProfile, Match, Message, SwipeAction } from "@/data/models";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

/**
 * Fetch demo profiles to show as potential matches
 */
export const getDemoProfiles = async (): Promise<UserProfile[]> => {
  try {
    // Get demo profiles
    const { data: profiles, error } = await supabase
      .from("demo_profiles")
      .select("*");

    if (error) {
      console.error("Error fetching demo profiles:", error);
      return [];
    }

    // For each profile, get their strengths, weaknesses, and preferences
    const completeProfiles = await Promise.all(
      profiles.map(async (profile) => {
        // Get strengths
        const { data: strengths } = await supabase
          .from("demo_strengths")
          .select("subject")
          .eq("profile_id", profile.id);

        // Get weaknesses
        const { data: weaknesses } = await supabase
          .from("demo_weaknesses")
          .select("subject")
          .eq("profile_id", profile.id);

        // Get study preferences
        const { data: preferences } = await supabase
          .from("demo_preferences")
          .select("preference")
          .eq("profile_id", profile.id);

        // Format into UserProfile object
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          avatar: profile.avatar,
          major: profile.major || undefined,
          year: profile.year || undefined,
          bio: profile.bio || undefined,
          strengths: strengths?.map(s => s.subject) || [],
          weaknesses: weaknesses?.map(w => w.subject) || [],
          studyPreferences: preferences?.map(p => p.preference) || [],
          matches: [],
          profileCompleted: true
        } as UserProfile;
      })
    );

    return completeProfiles;
  } catch (error) {
    console.error("Error in getDemoProfiles:", error);
    return [];
  }
};

/**
 * Get the current user's profile
 */
export const getCurrentUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    // Get user profile
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error || !profile) return null;

    // Get strengths
    const { data: strengths } = await supabase
      .from("strengths")
      .select("subject")
      .eq("profile_id", user.id);

    // Get weaknesses
    const { data: weaknesses } = await supabase
      .from("weaknesses")
      .select("subject")
      .eq("profile_id", user.id);

    // Get study preferences
    const { data: preferences } = await supabase
      .from("study_preferences")
      .select("preference")
      .eq("profile_id", user.id);

    // Get matches
    const { data: matches } = await supabase
      .from("matches")
      .select("id")
      .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`);

    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      avatar: profile.avatar,
      major: profile.major || undefined,
      year: profile.year || undefined,
      bio: profile.bio || undefined,
      strengths: strengths?.map(s => s.subject) || [],
      weaknesses: weaknesses?.map(w => w.subject) || [], 
      studyPreferences: preferences?.map(p => p.preference) || [],
      matches: matches?.map(m => m.id) || [],
      profileCompleted: profile.profile_completed || false
    };
  } catch (error) {
    console.error("Error in getCurrentUserProfile:", error);
    return null;
  }
};

/**
 * Record a swipe action (like or skip)
 */
export const recordSwipeAction = async (
  userId: string,
  targetUserId: string,
  action: "like" | "skip"
): Promise<Match | null> => {
  try {
    // Record the swipe action
    const { error } = await supabase.from("swipe_actions").insert({
      user_id: userId,
      target_user_id: targetUserId,
      action
    });

    if (error) {
      console.error("Error recording swipe action:", error);
      return null;
    }

    // If action was 'like', check if there's a match
    if (action === "like") {
      // Check if the other user has liked this user
      const { data: otherSwipe } = await supabase
        .from("swipe_actions")
        .select("*")
        .eq("user_id", targetUserId)
        .eq("target_user_id", userId)
        .eq("action", "like")
        .maybeSingle();

      // If there's a mutual like, create a match
      if (otherSwipe) {
        // Check if match already exists
        const { data: existingMatch } = await supabase
          .from("matches")
          .select("*")
          .or(`and(user1_id.eq.${userId},user2_id.eq.${targetUserId}),and(user1_id.eq.${targetUserId},user2_id.eq.${userId})`)
          .maybeSingle();

        if (existingMatch) {
          return {
            id: existingMatch.id,
            users: [existingMatch.user1_id, existingMatch.user2_id],
            createdAt: new Date(existingMatch.created_at),
            lastMessage: undefined
          };
        }

        // Create a new match
        const { data: match, error: matchError } = await supabase
          .from("matches")
          .insert({
            user1_id: userId,
            user2_id: targetUserId
          })
          .select()
          .single();

        if (matchError) {
          console.error("Error creating match:", matchError);
          return null;
        }

        return {
          id: match.id,
          users: [match.user1_id, match.user2_id],
          createdAt: new Date(match.created_at),
          lastMessage: undefined
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Error in recordSwipeAction:", error);
    return null;
  }
};

/**
 * Get user matches with their latest messages
 */
export const getUserMatches = async (userId: string): Promise<Match[]> => {
  try {
    // Get matches where the user is either user1 or user2
    const { data: matches, error } = await supabase
      .from("matches")
      .select("*")
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching matches:", error);
      return [];
    }

    // For each match, get the latest message
    const matchesWithMessages = await Promise.all(
      matches.map(async (match) => {
        const { data: messages } = await supabase
          .from("messages")
          .select("*")
          .eq("match_id", match.id)
          .order("created_at", { ascending: false })
          .limit(1);

        const lastMessage = messages && messages.length > 0
          ? {
              id: messages[0].id,
              matchId: messages[0].match_id,
              senderId: messages[0].sender_id,
              content: messages[0].content,
              createdAt: new Date(messages[0].created_at),
              read: messages[0].read
            }
          : undefined;

        // Create Match object with users as tuple to fix type error
        return {
          id: match.id,
          users: [match.user1_id, match.user2_id] as [string, string],
          createdAt: new Date(match.created_at),
          lastMessage
        };
      })
    );

    return matchesWithMessages;
  } catch (error) {
    console.error("Error in getUserMatches:", error);
    return [];
  }
};

/**
 * Get messages for a specific match
 */
export const getMatchMessages = async (matchId: string): Promise<Message[]> => {
  try {
    const { data: messages, error } = await supabase
      .from("messages")
      .select("*")
      .eq("match_id", matchId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      return [];
    }

    return messages.map(msg => ({
      id: msg.id,
      matchId: msg.match_id,
      senderId: msg.sender_id,
      content: msg.content,
      createdAt: new Date(msg.created_at),
      read: msg.read
    }));
  } catch (error) {
    console.error("Error in getMatchMessages:", error);
    return [];
  }
};

/**
 * Send a message in a match
 */
export const sendMessage = async (
  matchId: string,
  senderId: string,
  content: string
): Promise<Message | null> => {
  try {
    const { data: message, error } = await supabase
      .from("messages")
      .insert({
        match_id: matchId,
        sender_id: senderId,
        content
      })
      .select()
      .single();

    if (error) {
      console.error("Error sending message:", error);
      return null;
    }

    return {
      id: message.id,
      matchId: message.match_id,
      senderId: message.sender_id,
      content: message.content,
      createdAt: new Date(message.created_at),
      read: message.read
    };
  } catch (error) {
    console.error("Error in sendMessage:", error);
    return null;
  }
};

/**
 * Mark messages as read
 */
export const markMessagesAsRead = async (
  matchId: string, 
  userId: string
): Promise<void> => {
  try {
    const { error } = await supabase
      .from("messages")
      .update({ read: true })
      .eq("match_id", matchId)
      .neq("sender_id", userId)
      .eq("read", false);

    if (error) {
      console.error("Error marking messages as read:", error);
    }
  } catch (error) {
    console.error("Error in markMessagesAsRead:", error);
  }
};

/**
 * Create or update user profile
 */
export const createUserProfile = async (userId: string, profile: Partial<UserProfile>): Promise<UserProfile | null> => {
  try {
    // First, check if profile exists
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    // Upsert the profile
    const { data: updatedProfile, error } = await supabase
      .from("profiles")
      .upsert({
        id: userId,
        name: profile.name || (existingProfile?.name || ""),
        email: profile.email || (existingProfile?.email || ""),
        avatar: profile.avatar,
        major: profile.major,
        year: profile.year,
        bio: profile.bio,
        profile_completed: profile.profileCompleted ?? existingProfile?.profile_completed
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating/updating profile:", error);
      return null;
    }

    // If strengths are provided, delete old ones and add new ones
    if (profile.strengths && profile.strengths.length > 0) {
      // Delete existing strengths
      await supabase.from("strengths").delete().eq("profile_id", userId);

      // Add new strengths
      const strengthsToInsert = profile.strengths.map(subject => ({
        profile_id: userId,
        subject
      }));
      await supabase.from("strengths").insert(strengthsToInsert);
    }

    // If weaknesses are provided, delete old ones and add new ones
    if (profile.weaknesses && profile.weaknesses.length > 0) {
      // Delete existing weaknesses
      await supabase.from("weaknesses").delete().eq("profile_id", userId);

      // Add new weaknesses
      const weaknessesToInsert = profile.weaknesses.map(subject => ({
        profile_id: userId,
        subject
      }));
      await supabase.from("weaknesses").insert(weaknessesToInsert);
    }

    // If study preferences are provided, delete old ones and add new ones
    if (profile.studyPreferences && profile.studyPreferences.length > 0) {
      // Delete existing study preferences
      await supabase.from("study_preferences").delete().eq("profile_id", userId);

      // Add new study preferences
      const preferencesToInsert = profile.studyPreferences.map(preference => ({
        profile_id: userId,
        preference
      }));
      await supabase.from("study_preferences").insert(preferencesToInsert);
    }

    // Return the updated profile
    return await getCurrentUserProfile();
  } catch (error) {
    console.error("Error in createUserProfile:", error);
    return null;
  }
};
