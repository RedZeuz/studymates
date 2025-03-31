
import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { UserCircle, Users, MessageSquare, LogOut, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MainLayout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 p-2 rounded-lg transition-colors ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted"
        }`
      }
      onClick={() => setMobileMenuOpen(false)}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </NavLink>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 md:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Sidebar - desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r p-4 bg-card">
        <div className="flex items-center gap-2 py-4">
          <Avatar>
            <AvatarImage src={currentUser?.avatar} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {currentUser?.name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{currentUser?.name}</h3>
            <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
          </div>
        </div>

        <nav className="space-y-2 mt-6">
          <NavItem to="/home" icon={UserCircle} label="Discover" />
          <NavItem to="/matches" icon={Users} label="Matches" />
          <NavItem to="/chat" icon={MessageSquare} label="Messages" />
        </nav>

        <div className="mt-auto pt-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background md:hidden">
          <div className="flex flex-col h-full p-4">
            <div className="flex items-center gap-2 py-4">
              <Avatar>
                <AvatarImage src={currentUser?.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {currentUser?.name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{currentUser?.name}</h3>
                <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
              </div>
            </div>

            <nav className="space-y-4 mt-6">
              <NavItem to="/home" icon={UserCircle} label="Discover" />
              <NavItem to="/matches" icon={Users} label="Matches" />
              <NavItem to="/chat" icon={MessageSquare} label="Messages" />
            </nav>

            <div className="mt-auto pt-4">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
