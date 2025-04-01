import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Layers, BookOpen, Users, MessageCircle } from "lucide-react";

const Landing = () => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if already logged in and profile completed
    if (currentUser && currentUser.profileCompleted) {
      navigate("/home");
    } else if (currentUser && !currentUser.profileCompleted) {
      navigate("/create-profile");
    }
  }, [currentUser, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-24">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <Layers className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">StudySwipeMates</span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </div>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect{" "}
              <span className="text-primary">Study Partner</span>
            </h1>
            <p className="text-lg mb-6">
              Connect with students who complement your academic strengths and
              weaknesses. Swipe, match, and excel together!
            </p>
            <div className="flex gap-4">
              <Button size="lg" onClick={() => navigate("/signup")}>
                Get Started
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/login")}>
                Learn More
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -left-8 top-8 transform rotate-[-8deg] bg-card shadow-lg rounded-xl p-6 w-64">
                <div className="mb-4 text-primary">
                  <BookOpen className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-bold">Match by Subject</h3>
                <p className="text-sm text-muted-foreground">
                  Find partners who excel in subjects you struggle with
                </p>
              </div>
              <div className="bg-card shadow-lg rounded-xl p-6 z-10 relative">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                  alt="Students studying together"
                  className="rounded-lg mb-4 aspect-video object-cover"
                />
                <h3 className="text-lg font-bold">Swipe. Match. Study.</h3>
                <p className="text-sm text-muted-foreground">
                  Academic success is better together
                </p>
              </div>
              <div className="absolute -right-8 bottom-8 transform rotate-[8deg] bg-card shadow-lg rounded-xl p-6 w-64">
                <div className="mb-4 text-accent">
                  <MessageCircle className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-bold">Chat & Collaborate</h3>
                <p className="text-sm text-muted-foreground">
                  Connect instantly with your new study partners
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-xl shadow">
            <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Create Your Profile</h3>
            <p className="text-muted-foreground">
              Tell us about your academic strengths, weaknesses, and study preferences.
            </p>
          </div>
          <div className="bg-card p-6 rounded-xl shadow">
            <div className="bg-secondary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Swipe & Match</h3>
            <p className="text-muted-foreground">
              Find compatible study partners based on complementary academic profiles.
            </p>
          </div>
          <div className="bg-card p-6 rounded-xl shadow">
            <div className="bg-accent/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <MessageCircle className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2">Connect & Study</h3>
            <p className="text-muted-foreground">
              Chat with your matches and organize study sessions to achieve academic success.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-card">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Study Partner?</h2>
            <p className="text-lg mb-8">
              Join thousands of students who found their perfect academic match
              on StudySwipeMates.
            </p>
            <Button size="lg" onClick={() => navigate("/signup")}>
              Get Started Now
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Layers className="h-6 w-6 text-primary" />
              <span className="font-bold">StudySwipeMates</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} StudySwipeMates. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
