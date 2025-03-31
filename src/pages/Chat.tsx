
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Match, UserProfile } from "@/data/models";
import { getUserMatches, getUserById } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, MessageSquare, UserX } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const Chat = () => {
  const { currentUser } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchedUsers, setMatchedUsers] = useState<Record<string, UserProfile>>({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    
    // Get matches for the current user
    const userMatches = getUserMatches(currentUser.id);
    setMatches(userMatches);
    
    // Get details of matched users
    const usersMap: Record<string, UserProfile> = {};
    
    userMatches.forEach(match => {
      // Find the ID of the matched user (not the current user)
      const matchedUserId = match.users.find(id => id !== currentUser.id);
      
      if (matchedUserId) {
        const matchedUser = getUserById(matchedUserId);
        
        if (matchedUser) {
          usersMap[matchedUserId] = matchedUser;
        }
      }
    });
    
    setMatchedUsers(usersMap);
  }, [currentUser]);

  // Get the other user in a match
  const getMatchedUser = (match: Match) => {
    if (!currentUser) return null;
    const matchedUserId = match.users.find(id => id !== currentUser.id);
    return matchedUserId ? matchedUsers[matchedUserId] : null;
  };

  // Filter matches based on search query
  const filteredMatches = matches.filter(match => {
    const matchedUser = getMatchedUser(match);
    if (!matchedUser) return false;
    
    return matchedUser.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Check if a message is unread
  const isUnreadMessage = (match: Match) => {
    if (!currentUser || !match.lastMessage) return false;
    return match.lastMessage.senderId !== currentUser.id && !match.lastMessage.read;
  };

  // Empty state when there are no matches
  if (matches.length === 0) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center">
        <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No conversations yet</h2>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Match with study partners to start messaging
        </p>
        <Button asChild>
          <Link to="/home">Find Study Partners</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search conversations"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {filteredMatches.length === 0 && (
        <div className="h-40 flex flex-col items-center justify-center text-muted-foreground">
          <UserX className="h-10 w-10 mb-2" />
          <p>No matches found for "{searchQuery}"</p>
        </div>
      )}
      
      <div className="space-y-2">
        {filteredMatches.map(match => {
          const matchedUser = getMatchedUser(match);
          
          if (!matchedUser) return null;
          
          return (
            <Link to={`/chat/${match.id}`} key={match.id}>
              <Card className={`hover:bg-muted/30 transition-colors ${isUnreadMessage(match) ? 'border-primary/50' : ''}`}>
                <div className="p-4 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={matchedUser.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {matchedUser.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-medium truncate">{matchedUser.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {match.lastMessage 
                          ? formatDistanceToNow(new Date(match.lastMessage.createdAt), { addSuffix: true }) 
                          : formatDistanceToNow(new Date(match.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    
                    {match.lastMessage ? (
                      <p className={`text-sm truncate ${isUnreadMessage(match) ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                        {match.lastMessage.senderId === currentUser?.id ? 'You: ' : ''}
                        {match.lastMessage.content}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        Start a conversation
                      </p>
                    )}
                  </div>
                  
                  {isUnreadMessage(match) && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Chat;
