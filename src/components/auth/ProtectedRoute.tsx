
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to profile creation if profile not completed
  if (!currentUser.profileCompleted && window.location.pathname !== "/create-profile") {
    return <Navigate to="/create-profile" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
