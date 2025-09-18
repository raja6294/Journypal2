import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Landing from "./pages/Landing";
import TouristDashboard from "./pages/TouristDashboard";
import PoliceDashboard from "./pages/PoliceDashboard";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute, { TouristRoute, PoliceRoute } from "./components/ProtectedRoute";
import LandingGuard from "./components/LandingGuard";

const queryClient = new QueryClient();

// Component to handle role-based redirects after login
const DashboardRedirect = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect based on user role
  if (user.role === 'tourist') {
    return <Navigate to="/tourist" replace />;
  } else if (user.role === 'police') {
    return <Navigate to="/police" replace />;
  } else {
    return <Navigate to="/analytics" replace />;
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Routes>
              <Route path="/" element={
                <LandingGuard>
                  <Landing />
                </LandingGuard>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<DashboardRedirect />} />
              <Route path="/tourist" element={
                <TouristRoute>
                  <TouristDashboard />
                </TouristRoute>
              } />
              <Route path="/police" element={
                <PoliceRoute>
                  <PoliceDashboard />
                </PoliceRoute>
              } />
              <Route path="/incidents" element={
                <PoliceRoute>
                  <PoliceDashboard />
                </PoliceRoute>
              } />
              <Route path="/analytics" element={
                <ProtectedRoute requiredRole="admin">
                  <Analytics />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;