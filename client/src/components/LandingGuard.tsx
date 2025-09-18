import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface LandingGuardProps {
  children: React.ReactNode;
}

/**
 * LandingGuard prevents authenticated users from accessing the Landing page
 * and redirects them to their appropriate dashboard based on their role
 */
export default function LandingGuard({ children }: LandingGuardProps) {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // If user is authenticated, redirect to their dashboard
  if (user) {
    if (user.role === 'tourist') {
      return <Navigate to="/tourist" replace />;
    } else if (user.role === 'police') {
      return <Navigate to="/police" replace />;
    } else {
      return <Navigate to="/analytics" replace />;
    }
  }

  // If not authenticated, show the Landing page
  return <>{children}</>;
}
