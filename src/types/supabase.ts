
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      demo_preferences: {
        Row: {
          id: string
          profile_id: string
          preference: string
        }
        Insert: {
          id?: string
          profile_id: string
          preference: string
        }
        Update: {
          id?: string
          profile_id?: string
          preference?: string
        }
      }
      demo_profiles: {
        Row: {
          id: string
          name: string
          email: string
          avatar: string | null
          major: string | null
          year: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          avatar?: string | null
          major?: string | null
          year?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          avatar?: string | null
          major?: string | null
          year?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      demo_strengths: {
        Row: {
          id: string
          profile_id: string
          subject: string
        }
        Insert: {
          id?: string
          profile_id: string
          subject: string
        }
        Update: {
          id?: string
          profile_id?: string
          subject?: string
        }
      }
      demo_weaknesses: {
        Row: {
          id: string
          profile_id: string
          subject: string
        }
        Insert: {
          id?: string
          profile_id: string
          subject: string
        }
        Update: {
          id?: string
          profile_id?: string
          subject?: string
        }
      }
      matches: {
        Row: {
          id: string
          user1_id: string
          user2_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user1_id: string
          user2_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user1_id?: string
          user2_id?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          match_id: string
          sender_id: string
          content: string
          created_at: string
          read: boolean
        }
        Insert: {
          id?: string
          match_id: string
          sender_id: string
          content: string
          created_at?: string
          read?: boolean
        }
        Update: {
          id?: string
          match_id?: string
          sender_id?: string
          content?: string
          created_at?: string
          read?: boolean
        }
      }
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          avatar: string | null
          major: string | null
          year: string | null
          bio: string | null
          profile_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          avatar?: string | null
          major?: string | null
          year?: string | null
          bio?: string | null
          profile_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          avatar?: string | null
          major?: string | null
          year?: string | null
          bio?: string | null
          profile_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      strengths: {
        Row: {
          id: string
          profile_id: string
          subject: string
          created_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          subject: string
          created_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          subject?: string
          created_at?: string
        }
      }
      study_preferences: {
        Row: {
          id: string
          profile_id: string
          preference: string
          created_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          preference: string
          created_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          preference?: string
          created_at?: string
        }
      }
      swipe_actions: {
        Row: {
          id: string
          user_id: string
          target_user_id: string
          action: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          target_user_id: string
          action: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          target_user_id?: string
          action?: string
          created_at?: string
        }
      }
      weaknesses: {
        Row: {
          id: string
          profile_id: string
          subject: string
          created_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          subject: string
          created_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          subject?: string
          created_at?: string
        }
      }
    }
  }
}
