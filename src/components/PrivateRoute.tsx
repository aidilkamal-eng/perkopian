'use client';

import React, { useEffect } from 'react';
import { Coffee } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

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
