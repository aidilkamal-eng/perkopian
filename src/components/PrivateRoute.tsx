import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return(
      <div className="flex justify-center items-center min-h-screen">
        <Coffee className="w-6 h-6 animate-spin text-amber-500" />
        <span className="ml-2 text-amber-700">Memuat sesi...</span>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
