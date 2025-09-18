import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'tourist' | 'police' | 'admin';
  fallbackPath?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole, 
  fallbackPath = '/login' 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user's actual role
    const redirectPath = user.role === 'tourist' ? '/tourist' : '/police';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}

// Convenience components for specific roles
export function TouristRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="tourist">
      {children}
    </ProtectedRoute>
  );
}

export function PoliceRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="police">
      {children}
    </ProtectedRoute>
  );
}

export function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="admin">
      {children}
    </ProtectedRoute>
  );
}
