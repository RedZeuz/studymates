import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, X, Layers } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// List of subject options
const subjectOptions = [
  "Mathematics", "Physics", "Chemistry", "Biology", 
  "Computer Science", "History", "Geography", "Literature", 
  "Economics", "Psychology", "Sociology", "Philosophy",
  "Art", "Music", "Foreign Languages", "Physical Education"
];

// Study preferences options
const studyPreferencesOptions = [
  "Morning", "Afternoon", "Evening", "Group Study", 
  "Individual Study", "Library", "Cafe", "Online", 
  "Visual Learning", "Auditory Learning", "Reading/Writing", "Practical/Hands-on"
];

const ProfileCreation = () => {
  const { currentUser, updateUser } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("");
  const [bio, setBio] = useState("");
  const [newStrength, setNewStrength] = useState("");
  const [newWeakness, setNewWeakness] = useState("");
  const [strengths, setStrengths] = useState<string[]>([]);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [studyPreferences, setStudyPreferences] = useState<string[]>([]);
  const [avatar, setAvatar] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Years of study options
  const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"];

  // Add strength subject
  const addStrength = () => {
    if (newStrength && !strengths.includes(newStrength)) {
      setStrengths([...strengths, newStrength]);
      setNewStrength("");
    }
  };

  // Add weakness subject
  const addWeakness = () => {
    if (newWeakness && !weaknesses.includes(newWeakness)) {
      setWeaknesses([...weaknesses, newWeakness]);
      setNewWeakness("");
    }
  };

  // Remove subject from list
  const removeStrength = (subject: string) => {
    setStrengths(strengths.filter(s => s !== subject));
  };

  const removeWeakness = (subject: string) => {
    setWeaknesses(weaknesses.filter(w => w !== subject));
  };

  // Toggle study preference
  const toggleStudyPreference = (preference: string) => {
    if (studyPreferences.includes(preference)) {
      setStudyPreferences(studyPreferences.filter(p => p !== preference));
    } else {
      setStudyPreferences([...studyPreferences, preference]);
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (strengths.length === 0 || weaknesses.length === 0) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please add at least one strength and one weakness subject."
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create profile data
      const profileData = {
        major,
        year,
        bio,
        strengths,
        weaknesses,
        studyPreferences,
        avatar: avatar || undefined,
        profileCompleted: true
      };
      
      // Update user with profile data
      updateUser(profileData);
      
      toast({
        title: "Profile created!",
        description: "Your profile has been successfully created."
      });
      
      // Navigate to home page
      navigate("/home");
    } catch (error) {
      console.error("Profile creation error:", error);
      toast({
        variant: "destructive",
        title: "Failed to create profile",
        description: "Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/50 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <Layers className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">StudySwipeMates</span>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <CardDescription>
              Tell us about your academic background to help find the perfect study partners
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Academic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="major">Major/Concentration</Label>
                    <Input
                      id="major"
                      placeholder="e.g. Computer Science"
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="year">Year of Study</Label>
                    <Select value={year} onValueChange={setYear} required>
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Select your year" />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Short Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell potential study partners about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              
              {/* Subject Strengths */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Subjects You're Good At</h3>
                <div className="flex gap-2 flex-wrap">
                  {strengths.map((subject) => (
                    <Badge key={subject} variant="secondary" className="py-1.5">
                      {subject}
                      <button
                        type="button"
                        className="ml-1 hover:text-destructive"
                        onClick={() => removeStrength(subject)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Select value={newStrength} onValueChange={setNewStrength}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectOptions.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={addStrength} disabled={!newStrength}>
                    Add
                  </Button>
                </div>
              </div>
              
              {/* Subject Weaknesses */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Subjects You Need Help With</h3>
                <div className="flex gap-2 flex-wrap">
                  {weaknesses.map((subject) => (
                    <Badge key={subject} variant="outline" className="py-1.5">
                      {subject}
                      <button
                        type="button"
                        className="ml-1 hover:text-destructive"
                        onClick={() => removeWeakness(subject)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Select value={newWeakness} onValueChange={setNewWeakness}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectOptions.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={addWeakness} disabled={!newWeakness}>
                    Add
                  </Button>
                </div>
              </div>
              
              {/* Study Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Study Preferences</h3>
                <div className="flex flex-wrap gap-2">
                  {studyPreferencesOptions.map((preference) => (
                    <Badge
                      key={preference}
                      variant={studyPreferences.includes(preference) ? "default" : "outline"}
                      className="py-1.5 cursor-pointer hover:shadow-sm transition-shadow"
                      onClick={() => toggleStudyPreference(preference)}
                    >
                      {preference}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Avatar URL (optional) */}
              <div className="space-y-2">
                <Label htmlFor="avatar">Profile Picture URL (optional)</Label>
                <Input
                  id="avatar"
                  placeholder="https://example.com/your-photo.jpg"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Profile...
                  </>
                ) : (
                  "Complete Profile"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfileCreation;
