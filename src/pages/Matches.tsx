
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Match, UserProfile } from "@/data/models";
import { getUserMatches, getUserById } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, UserX } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const Matches = () => {
  const { currentUser } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchedUsers, setMatchedUsers] = useState<Record<string, UserProfile>>({});

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

  // Check if a message is unread
  const isUnreadMessage = (match: Match) => {
    if (!currentUser || !match.lastMessage) return false;
    return match.lastMessage.senderId !== currentUser.id && !match.lastMessage.read;
  };

  // Empty state when there are no matches
  if (matches.length === 0) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center">
        <UserX className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No matches yet</h2>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Start swiping to find your perfect study partners!
        </p>
        <Button asChild>
          <Link to="/home">Find Study Partners</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Matches</h1>
      
      <div className="space-y-4">
        {matches.map(match => {
          const matchedUser = getMatchedUser(match);
          
          if (!matchedUser) return null;
          
          // Find the common subjects (current user's weaknesses that match the other user's strengths)
          const commonSubjects = currentUser?.weaknesses?.filter(
            subject => matchedUser.strengths.includes(subject)
          ) || [];
          
          return (
            <Link to={`/chat/${match.id}`} key={match.id}>
              <Card className={`hover:bg-muted/30 transition-colors ${isUnreadMessage(match) ? 'border-primary/50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={matchedUser.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {matchedUser.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
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
                      
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {commonSubjects.length > 0 ? (
                          <>
                            <span className="text-xs text-muted-foreground">Can help with:</span>
                            {commonSubjects.map(subject => (
                              <Badge key={subject} variant="outline" className="text-xs py-0">
                                {subject}
                              </Badge>
                            ))}
                          </>
                        ) : (
                          <span className="text-xs text-muted-foreground">Matched {formatDistanceToNow(new Date(match.createdAt), { addSuffix: true })}</span>
                        )}
                      </div>
                    </div>
                    
                    {isUnreadMessage(match) && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                    
                    <Button size="icon" variant="ghost" asChild>
                      <span>
                        <MessageSquare className="h-5 w-5" />
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Matches;
