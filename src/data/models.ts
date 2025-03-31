
// Define types for the app

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  major?: string;
  year?: string;
  bio?: string;
  strengths: string[];
  weaknesses: string[];
  studyPreferences: string[];
  matches: string[]; // IDs of matched users
  profileCompleted: boolean;
}

export interface SwipeAction {
  userId: string;
  targetUserId: string;
  action: 'like' | 'skip';
  createdAt: Date;
}

export interface Match {
  id: string;
  users: [string, string]; // Two user IDs
  createdAt: Date;
  lastMessage?: Message;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  createdAt: Date;
  read: boolean;
}
