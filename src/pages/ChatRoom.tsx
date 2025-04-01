
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Message, UserProfile } from "@/data/models";
import { getMatchById, getUserById, getMessages, addMessage } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/components/ui/use-toast";

const ChatRoom = () => {
  const { id: matchId } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [match, setMatch] = useState(matchId ? getMatchById(matchId) : undefined);
  const [matchedUser, setMatchedUser] = useState<UserProfile | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchId && currentUser) {
      // Get match details
      const matchDetails = getMatchById(matchId);
      setMatch(matchDetails);
      
      if (matchDetails) {
        // Get the other user
        const otherUserId = matchDetails.users.find(id => id !== currentUser.id);
        if (otherUserId) {
          setMatchedUser(getUserById(otherUserId));
        }
        
        // Get messages for this match
        const matchMessages = getMessages(matchId);
        setMessages(matchMessages);
      } else {
        // Invalid match ID
        toast({
          variant: "destructive",
          title: "Error",
          description: "Conversation not found."
        });
        navigate("/chat");
      }
    }
  }, [matchId, currentUser, navigate]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !currentUser || !matchId) return;
    
    const message = addMessage(matchId, currentUser.id, newMessage.trim());
    setMessages([...messages, message]);
    setNewMessage("");
  };

  // Format the date for message groups
  const formatMessageDate = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    
    // If the message is from today
    if (messageDate.toDateString() === now.toDateString()) {
      return "Today";
    }
    
    // If the message is from yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    
    // Otherwise, show the date
    return messageDate.toLocaleDateString();
  };

  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = messages.reduce((groups, message) => {
    const date = formatMessageDate(new Date(message.createdAt));
    
    if (!groups[date]) {
      groups[date] = [];
    }
    
    groups[date].push(message);
    return groups;
  }, {} as { [date: string]: Message[] });

  // If no match or matched user found
  if (!match || !matchedUser) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Conversation not found</h2>
          <Button variant="outline" onClick={() => navigate("/chat")}>
            Return to Messages
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-7rem)] md:h-[calc(100vh-9rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => navigate("/chat")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <Avatar>
          <AvatarImage src={matchedUser.avatar} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {matchedUser.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h2 className="font-medium">{matchedUser.name}</h2>
          <p className="text-xs text-muted-foreground">
            {matchedUser.major}, {matchedUser.year}
          </p>
        </div>
      </div>
      
      {/* Message Container */}
      <div 
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto py-4 space-y-6"
      >
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-2 text-xs text-muted-foreground">
                  {date}
                </span>
              </div>
            </div>
            
            {dateMessages.map(message => {
              const isCurrentUser = currentUser && message.senderId === currentUser.id;
              
              return (
                <div 
                  key={message.id}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex gap-2 max-w-[80%]">
                    {!isCurrentUser && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={matchedUser.avatar} />
                        <AvatarFallback className="text-xs">
                          {matchedUser.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div>
                      <div 
                        className={`rounded-lg p-3 ${
                          isCurrentUser 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <h3 className="text-lg font-medium mb-2">Start a conversation</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Say hello to {matchedUser.name} and start planning your study sessions!
            </p>
          </div>
        )}
      </div>
      
      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="border-t pt-4 mt-auto">
        <div className="flex gap-2">
          <Input
            placeholder={`Message ${matchedUser.name}`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatRoom;
