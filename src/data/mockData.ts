import { UserProfile, Match, Message } from "./models";

// Generate a list of 15 mock user profiles
export const mockUsers: UserProfile[] = [
  {
    id: "user-1",
    name: "Emma Wilson",
    email: "emma@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "Computer Science",
    year: "3rd Year",
    bio: "CS student focusing on AI and machine learning. Looking for study partners for algorithm practice.",
    strengths: ["Computer Science", "Mathematics", "Physics"],
    weaknesses: ["Chemistry", "Biology", "Literature"],
    studyPreferences: ["Evening", "Library", "Group Study"],
    matches: ["user-3", "user-5", "user-7"],
    profileCompleted: true
  },
  {
    id: "user-2",
    name: "Marcus Johnson",
    email: "marcus@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "Biology",
    year: "2nd Year",
    bio: "Pre-med student with a passion for genetics and molecular biology. Looking for help with organic chemistry.",
    strengths: ["Biology", "Chemistry", "Psychology"],
    weaknesses: ["Physics", "Computer Science", "Mathematics"],
    studyPreferences: ["Morning", "Cafe", "Visual Learning"],
    matches: [],
    profileCompleted: true
  },
  {
    id: "user-3",
    name: "Sophia Chen",
    email: "sophia@example.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "Economics",
    year: "4th Year",
    bio: "Economics major with a minor in statistics. Happy to help with economic theory or data analysis.",
    strengths: ["Economics", "Mathematics", "Statistics"],
    weaknesses: ["Philosophy", "Literature", "Art"],
    studyPreferences: ["Afternoon", "Online", "Reading/Writing"],
    matches: ["user-1"],
    profileCompleted: true
  },
  {
    id: "user-4",
    name: "Alex Rodriguez",
    email: "alex@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "Literature",
    year: "1st Year",
    bio: "English Lit major with a love for poetry and creative writing. Struggling with research methods.",
    strengths: ["Literature", "Philosophy", "History"],
    weaknesses: ["Mathematics", "Chemistry", "Computer Science"],
    studyPreferences: ["Evening", "Cafe", "Group Study"],
    matches: [],
    profileCompleted: true
  },
  {
    id: "user-5",
    name: "Jasmine Patel",
    email: "jasmine@example.com",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "Psychology",
    year: "3rd Year",
    bio: "Psychology student interested in cognitive neuroscience. Looking for study partners for stats help.",
    strengths: ["Psychology", "Sociology", "Biology"],
    weaknesses: ["Physics", "Computer Science", "Chemistry"],
    studyPreferences: ["Morning", "Library", "Visual Learning"],
    matches: ["user-1"],
    profileCompleted: true
  },
  {
    id: "user-6",
    name: "Ethan Clark",
    email: "ethan@example.com",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "Physics",
    year: "4th Year",
    bio: "Physics major with a focus on astrophysics. Happy to help with math or physics problems!",
    strengths: ["Physics", "Mathematics", "Computer Science"],
    weaknesses: ["Literature", "Art", "History"],
    studyPreferences: ["Evening", "Online", "Practical/Hands-on"],
    matches: [],
    profileCompleted: true
  },
  {
    id: "user-7",
    name: "Olivia Taylor",
    email: "olivia@example.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "Art History",
    year: "2nd Year",
    bio: "Art history enthusiast with a minor in foreign languages. Looking for help with academic writing.",
    strengths: ["Art", "History", "Foreign Languages"],
    weaknesses: ["Mathematics", "Physics", "Chemistry"],
    studyPreferences: ["Afternoon", "Cafe", "Visual Learning"],
    matches: ["user-1"],
    profileCompleted: true
  },
  {
    id: "user-8",
    name: "Noah Williams",
    email: "noah@example.com",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "Chemistry",
    year: "3rd Year",
    bio: "Chemistry major focusing on organic synthesis. Looking for study groups for physical chemistry.",
    strengths: ["Chemistry", "Biology", "Mathematics"],
    weaknesses: ["Literature", "Philosophy", "Art"],
    studyPreferences: ["Morning", "Library", "Practical/Hands-on"],
    matches: [],
    profileCompleted: true
  },
  {
    id: "user-9",
    name: "Zoe Martinez",
    email: "zoe@example.com",
    avatar: "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "Sociology",
    year: "1st Year",
    bio: "Sociology student interested in urban studies. Looking for partners for research methods courses.",
    strengths: ["Sociology", "Psychology", "History"],
    weaknesses: ["Physics", "Computer Science", "Mathematics"],
    studyPreferences: ["Afternoon", "Online", "Reading/Writing"],
    matches: [],
    profileCompleted: true
  },
  {
    id: "user-10",
    name: "Daniel Kim",
    email: "daniel@example.com",
    avatar: "https://images.unsplash.com/photo-1492681290082-e932832941e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "Music",
    year: "4th Year",
    bio: "Music theory specialist with a minor in mathematics. Happy to exchange teaching in these fields.",
    strengths: ["Music", "Mathematics", "Physics"],
    weaknesses: ["Biology", "Chemistry", "Literature"],
    studyPreferences: ["Evening", "Cafe", "Auditory Learning"],
    matches: [],
    profileCompleted: true
  },
  {
    id: "user-11",
    name: "Ryan Thompson",
    email: "ryan@example.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "Engineering",
    year: "3rd Year",
    bio: "Mechanical engineering student interested in renewable energy. Looking for help with advanced calculus.",
    strengths: ["Engineering", "Physics", "Computer Science"],
    weaknesses: ["Chemistry", "Literature", "Foreign Languages"],
    studyPreferences: ["Morning", "Library", "Practical/Hands-on"],
    matches: [],
    profileCompleted: true
  },
  {
    id: "user-12",
    name: "Isabella Rodriguez",
    email: "isabella@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "Nursing",
    year: "4th Year",
    bio: "Nursing student passionate about patient care. Looking to exchange knowledge on anatomy and medical terminology.",
    strengths: ["Biology", "Chemistry", "Psychology"],
    weaknesses: ["Physics", "Mathematics", "Computer Science"],
    studyPreferences: ["Afternoon", "Online", "Visual Learning"],
    matches: [],
    profileCompleted: true
  },
  {
    id: "user-13",
    name: "Tyler Brooks",
    email: "tyler@example.com",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "Business Administration",
    year: "2nd Year",
    bio: "Business student focusing on entrepreneurship. Can help with marketing and management concepts.",
    strengths: ["Business", "Economics", "Statistics"],
    weaknesses: ["Science", "Literature", "Art"],
    studyPreferences: ["Evening", "Cafe", "Group Study"],
    matches: [],
    profileCompleted: true
  },
  {
    id: "user-14",
    name: "Harper Davis",
    email: "harper@example.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "Graphic Design",
    year: "3rd Year",
    bio: "Design student with a knack for visual storytelling. Looking for help with art history research.",
    strengths: ["Art", "Design", "Photography"],
    weaknesses: ["Mathematics", "Physics", "Chemistry"],
    studyPreferences: ["Afternoon", "Online", "Visual Learning"],
    matches: [],
    profileCompleted: true
  },
  {
    id: "user-15",
    name: "Liam Parker",
    email: "liam@example.com",
    avatar: "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "Environmental Science",
    year: "4th Year",
    bio: "Environmental scientist interested in climate change research. Can exchange knowledge on ecology and sustainability.",
    strengths: ["Environmental Science", "Biology", "Chemistry"],
    weaknesses: ["Computer Science", "Mathematics", "Economics"],
    studyPreferences: ["Morning", "Outdoors", "Practical/Hands-on"],
    matches: [],
    profileCompleted: true
  },
  {
    id: "user-16",
    name: "Ava Washington",
    email: "ava@example.com",
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "Communications",
    year: "2nd Year",
    bio: "Communications major focusing on digital media. Looking for study partners for research methods.",
    strengths: ["Communications", "Sociology", "English"],
    weaknesses: ["Science", "Mathematics", "Computer Science"],
    studyPreferences: ["Evening", "Cafe", "Group Study"],
    matches: [],
    profileCompleted: true
  },
  {
    id: "user-17",
    name: "Elijah Foster",
    email: "elijah@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "History",
    year: "3rd Year",
    bio: "History major specializing in 20th century events. Can offer help with research and essay writing.",
    strengths: ["History", "Political Science", "Literature"],
    weaknesses: ["Mathematics", "Science", "Computer Science"],
    studyPreferences: ["Morning", "Library", "Reading/Writing"],
    matches: [],
    profileCompleted: true
  },
  {
    id: "user-18",
    name: "Zoe Mitchell",
    email: "zoe@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "Mathematics",
    year: "4th Year",
    bio: "Math major specializing in pure mathematics. Looking to help others with calculus and linear algebra.",
    strengths: ["Mathematics", "Statistics", "Physics"],
    weaknesses: ["Literature", "Art", "Foreign Languages"],
    studyPreferences: ["Afternoon", "Library", "Visual Learning"],
    matches: [],
    profileCompleted: true
  },
  {
    id: "user-19",
    name: "Nathan Cooper",
    email: "nathan@example.com",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "Film Studies",
    year: "2nd Year",
    bio: "Film student passionate about cinematography. Looking for partners for film analysis projects.",
    strengths: ["Film", "Art", "Literature"],
    weaknesses: ["Mathematics", "Science", "Computer Science"],
    studyPreferences: ["Evening", "Online", "Visual Learning"],
    matches: [],
    profileCompleted: true
  },
  {
    id: "user-20",
    name: "Grace Lee",
    email: "grace@example.com",
    avatar: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    major: "Neuroscience",
    year: "3rd Year",
    bio: "Neuroscience student researching memory formation. Can help with biology and psychology topics.",
    strengths: ["Neuroscience", "Biology", "Psychology"],
    weaknesses: ["Physics", "Computer Science", "Literature"],
    studyPreferences: ["Morning", "Library", "Reading/Writing"],
    matches: [],
    profileCompleted: true
  }
];

// Generate mock matches
export const mockMatches: Match[] = [
  {
    id: "match-1",
    users: ["user-1", "user-3"],
    createdAt: new Date(Date.now() - 86400000 * 3),
    lastMessage: {
      id: "msg-5",
      matchId: "match-1",
      senderId: "user-3",
      content: "Would tomorrow at 3pm at the library work for you?",
      createdAt: new Date(Date.now() - 3600000 * 2),
      read: true
    }
  },
  {
    id: "match-2",
    users: ["user-1", "user-5"],
    createdAt: new Date(Date.now() - 86400000 * 5),
    lastMessage: {
      id: "msg-10",
      matchId: "match-2",
      senderId: "user-1",
      content: "Thanks for the help with that psychology paper!",
      createdAt: new Date(Date.now() - 86400000),
      read: false
    }
  },
  {
    id: "match-3",
    users: ["user-1", "user-7"],
    createdAt: new Date(Date.now() - 86400000 * 10),
    lastMessage: {
      id: "msg-15",
      matchId: "match-3",
      senderId: "user-7",
      content: "I found some great resources for your literature project. I'll share them when we meet.",
      createdAt: new Date(Date.now() - 86400000 * 2),
      read: true
    }
  }
];

// Generate mock messages for the first match
export const mockMessages: Record<string, Message[]> = {
  "match-1": [
    {
      id: "msg-1",
      matchId: "match-1",
      senderId: "user-1",
      content: "Hi Sophia! I saw that you're good at economics. I'm having trouble with my microeconomics homework.",
      createdAt: new Date(Date.now() - 86400000 * 3 - 3600000 * 2),
      read: true
    },
    {
      id: "msg-2",
      matchId: "match-1",
      senderId: "user-3",
      content: "Hey Emma! Yes, I'd be happy to help. What specific topics are you struggling with?",
      createdAt: new Date(Date.now() - 86400000 * 3 - 3600000),
      read: true
    },
    {
      id: "msg-3",
      matchId: "match-1",
      senderId: "user-1",
      content: "It's mostly about game theory and Nash equilibrium. The practice problems are confusing.",
      createdAt: new Date(Date.now() - 86400000 * 2 - 3600000 * 5),
      read: true
    },
    {
      id: "msg-4",
      matchId: "match-1",
      senderId: "user-3",
      content: "I'm actually really good at game theory! Would you like to meet up to go through the problems?",
      createdAt: new Date(Date.now() - 86400000 * 2 - 3600000 * 4),
      read: true
    },
    {
      id: "msg-5",
      matchId: "match-1",
      senderId: "user-3",
      content: "Would tomorrow at 3pm at the library work for you?",
      createdAt: new Date(Date.now() - 3600000 * 2),
      read: true
    }
  ],
  "match-2": [
    {
      id: "msg-6",
      matchId: "match-2",
      senderId: "user-5",
      content: "Hello Emma! I noticed you're looking for help with biology. I think I can assist with that!",
      createdAt: new Date(Date.now() - 86400000 * 5 - 3600000 * 3),
      read: true
    },
    {
      id: "msg-7",
      matchId: "match-2",
      senderId: "user-1",
      content: "That would be amazing, Jasmine! I'm struggling with cellular biology concepts.",
      createdAt: new Date(Date.now() - 86400000 * 5 - 3600000 * 2),
      read: true
    },
    {
      id: "msg-8",
      matchId: "match-2",
      senderId: "user-5",
      content: "Perfect! That's my specialty. And I saw you're good at computer science. Maybe you could help me with my programming assignment?",
      createdAt: new Date(Date.now() - 86400000 * 4),
      read: true
    },
    {
      id: "msg-9",
      matchId: "match-2",
      senderId: "user-1",
      content: "Absolutely! That sounds like a fair exchange. When would you like to meet?",
      createdAt: new Date(Date.now() - 86400000 * 2),
      read: true
    },
    {
      id: "msg-10",
      matchId: "match-2",
      senderId: "user-1",
      content: "Thanks for the help with that psychology paper!",
      createdAt: new Date(Date.now() - 86400000),
      read: false
    }
  ],
  "match-3": [
    {
      id: "msg-11",
      matchId: "match-3",
      senderId: "user-7",
      content: "Hi Emma! I could really use some help with the computer science project.",
      createdAt: new Date(Date.now() - 86400000 * 10 - 3600000 * 5),
      read: true
    },
    {
      id: "msg-12",
      matchId: "match-3",
      senderId: "user-1",
      content: "Hey Olivia! I'd be happy to help. What are you working on?",
      createdAt: new Date(Date.now() - 86400000 * 10 - 3600000 * 4),
      read: true
    },
    {
      id: "msg-13",
      matchId: "match-3",
      senderId: "user-7",
      content: "It's a website project, and I'm struggling with CSS layout. In return, I can help with your literature elective if you'd like!",
      createdAt: new Date(Date.now() - 86400000 * 9),
      read: true
    },
    {
      id: "msg-14",
      matchId: "match-3",
      senderId: "user-1",
      content: "That would be perfect! I have a poetry analysis that I'm completely lost on.",
      createdAt: new Date(Date.now() - 86400000 * 5),
      read: true
    },
    {
      id: "msg-15",
      matchId: "match-3",
      senderId: "user-7",
      content: "I found some great resources for your literature project. I'll share them when we meet.",
      createdAt: new Date(Date.now() - 86400000 * 2),
      read: true
    }
  ]
};

// Function to get potential matches for the current user
export const getPotentialMatches = (currentUserId: string): UserProfile[] => {
  // Get current user
  const currentUser = mockUsers.find(user => user.id === currentUserId);
  
  if (!currentUser) return [];
  
  // Filter out the current user
  let potentialMatches = mockUsers.filter(user => user.id !== currentUserId);
  
  // Check if we have any potential matches that aren't already matched
  const unmatched = potentialMatches.filter(user => !currentUser.matches.includes(user.id));
  
  // If there are unmatched users, return those
  if (unmatched.length > 0) {
    return unmatched;
  }
  
  // Otherwise, just return all other users (except current user)
  // In a real app, you might want to reset matches or show a message
  return potentialMatches;
};

// Function to get matches for the current user
export const getUserMatches = (currentUserId: string): Match[] => {
  return mockMatches.filter(match => 
    match.users.includes(currentUserId)
  );
};

// Function to get messages for a specific match
export const getMessages = (matchId: string): Message[] => {
  return mockMessages[matchId] || [];
};

// Function to get user by ID
export const getUserById = (userId: string): UserProfile | undefined => {
  return mockUsers.find(user => user.id === userId);
};

// Function to get match by ID
export const getMatchById = (matchId: string): Match | undefined => {
  return mockMatches.find(match => match.id === matchId);
};

// Function to add a new message
export const addMessage = (matchId: string, senderId: string, content: string): Message => {
  const newMessage: Message = {
    id: `msg-${Math.random().toString(36).substring(2, 9)}`,
    matchId,
    senderId,
    content,
    createdAt: new Date(),
    read: false
  };
  
  if (!mockMessages[matchId]) {
    mockMessages[matchId] = [];
  }
  
  mockMessages[matchId].push(newMessage);
  
  // Update last message in match
  const matchIndex = mockMatches.findIndex(match => match.id === matchId);
  if (matchIndex >= 0) {
    mockMatches[matchIndex].lastMessage = newMessage;
  }
  
  return newMessage;
};

// Function to create a match between two users
export const createMatch = (userId1: string, userId2: string): Match => {
  // Create a new match
  const newMatch: Match = {
    id: `match-${Math.random().toString(36).substring(2, 9)}`,
    users: [userId1, userId2] as [string, string],
    createdAt: new Date()
  };
  
  mockMatches.push(newMatch);
  
  // Update user matches
  const user1Index = mockUsers.findIndex(user => user.id === userId1);
  const user2Index = mockUsers.findIndex(user => user.id === userId2);
  
  if (user1Index >= 0) {
    mockUsers[user1Index].matches.push(userId2);
  }
  
  if (user2Index >= 0) {
    mockUsers[user2Index].matches.push(userId1);
  }
  
  return newMatch;
};

// Function to like or skip a user
export const swipeUser = (currentUserId: string, targetUserId: string, action: 'like' | 'skip'): Match | null => {
  // If it's a like action, check if we should create a match
  if (action === 'like') {
    // In a real app, we would check if the target user also liked the current user
    // For demo purposes, randomly create matches 50% of the time
    if (Math.random() > 0.5) {
      return createMatch(currentUserId, targetUserId);
    }
  }
  
  return null;
};
