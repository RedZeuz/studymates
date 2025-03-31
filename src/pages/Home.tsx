
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { UserProfile } from "@/data/models";
import { getPotentialMatches, swipeUser } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, X, BookOpen } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [potentialMatches, setPotentialMatches] = useState<UserProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<null | "left" | "right">(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    if (currentUser) {
      const matches = getPotentialMatches(currentUser.id);
      setPotentialMatches(matches);
    }
  }, [currentUser]);

  // Handle end of potential matches
  useEffect(() => {
    if (potentialMatches.length > 0 && currentIndex >= potentialMatches.length) {
      toast({
        title: "You've seen everyone!",
        description: "Check back later for new potential study partners.",
      });
    }
  }, [currentIndex, potentialMatches.length]);

  const handleLike = () => {
    if (currentIndex >= potentialMatches.length) return;
    
    const targetUser = potentialMatches[currentIndex];
    setSwipeDirection("right");
    
    if (currentUser) {
      const match = swipeUser(currentUser.id, targetUser.id, "like");
      
      // If a match was created
      if (match) {
        toast({
          title: "It's a match!",
          description: `You and ${targetUser.name} can now chat with each other.`,
          action: (
            <Button variant="outline" onClick={() => navigate("/matches")}>
              View Matches
            </Button>
          ),
        });
      }
    }
    
    // Wait for animation to complete before moving to next card
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setSwipeDirection(null);
    }, 300);
  };

  const handleSkip = () => {
    if (currentIndex >= potentialMatches.length) return;
    
    const targetUser = potentialMatches[currentIndex];
    setSwipeDirection("left");
    
    if (currentUser) {
      swipeUser(currentUser.id, targetUser.id, "skip");
    }
    
    // Wait for animation to complete before moving to next card
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setSwipeDirection(null);
    }, 300);
  };

  // Touch/mouse handling for swiping
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const newOffset = clientX - startX;
    setOffsetX(newOffset);
    
    if (cardRef.current) {
      // Apply rotation based on swipe distance
      const rotate = newOffset * 0.1;
      cardRef.current.style.transform = `translateX(${newOffset}px) rotate(${rotate}deg)`;
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // If swiped far enough, trigger like/skip
    if (offsetX > 100) {
      handleLike();
    } else if (offsetX < -100) {
      handleSkip();
    } else {
      // Reset card position
      if (cardRef.current) {
        cardRef.current.style.transform = '';
      }
    }
    
    setOffsetX(0);
  };

  // Get the current profile to display
  const currentProfile = potentialMatches[currentIndex];

  // Show empty state if no more profiles
  if (!currentProfile) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No more profiles</h2>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          You've seen all potential study partners for now. Check back later for new matches!
        </p>
        <Button onClick={() => navigate("/matches")}>
          View Your Matches
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Find Study Partners</h1>
      
      <div className="relative h-[550px]">
        {/* Swipeable Card */}
        <div
          ref={cardRef}
          className={`absolute inset-0 swipe-card ${
            swipeDirection === "left" 
              ? "animate-slide-left" 
              : swipeDirection === "right" 
                ? "animate-slide-right" 
                : ""
          }`}
          onMouseDown={(e) => handleStart(e.clientX)}
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseUp={() => handleEnd()}
          onMouseLeave={() => handleEnd()}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchEnd={() => handleEnd()}
        >
          <Card className="w-full h-full overflow-hidden card-shadow">
            <div className="relative h-64">
              <img
                src={currentProfile.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentProfile.name)}&background=random`}
                alt={currentProfile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-xl font-semibold">{currentProfile.name}</h2>
                  <p className="text-muted-foreground">
                    {currentProfile.major}, {currentProfile.year}
                  </p>
                </div>
              </div>
              
              <p className="mb-4 line-clamp-2">{currentProfile.bio}</p>
              
              <div className="mb-3">
                <h3 className="text-sm font-medium mb-1.5">Strong Subjects</h3>
                <div className="flex flex-wrap gap-1.5">
                  {currentProfile.strengths.map(subject => (
                    <Badge key={`strong-${subject}`} variant="default" className="bg-green-500/10 text-green-700 hover:bg-green-500/20">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mb-3">
                <h3 className="text-sm font-medium mb-1.5">Needs Help With</h3>
                <div className="flex flex-wrap gap-1.5">
                  {currentProfile.weaknesses.map(subject => (
                    <Badge key={`weak-${subject}`} variant="outline" className="border-orange-500/30 text-orange-600">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1.5">Study Preferences</h3>
                <div className="flex flex-wrap gap-1.5">
                  {currentProfile.studyPreferences.slice(0, 3).map(pref => (
                    <Badge key={`pref-${pref}`} variant="secondary" className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20">
                      {pref}
                    </Badge>
                  ))}
                  {currentProfile.studyPreferences.length > 3 && (
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-700">
                      +{currentProfile.studyPreferences.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mt-6">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-14 w-14 rounded-full border-red-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={handleSkip}
        >
          <X className="h-7 w-7" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-14 w-14 rounded-full border-green-300 hover:border-green-500 hover:bg-green-50 hover:text-green-600"
          onClick={handleLike}
        >
          <Heart className="h-7 w-7" />
        </Button>
      </div>
      
      <div className="mt-6 text-center text-sm text-muted-foreground">
        {currentIndex + 1} of {potentialMatches.length} potential matches
      </div>
    </div>
  );
};

export default Home;
