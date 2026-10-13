'use client';

import { Coffee } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/src/context/AuthContext';
import { useAuth } from '@/src/hooks/useAuth';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';

function AppLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Coffee className="w-6 h-6 animate-spin text-amber-500" />
        <span className="ml-2 text-amber-700">Loading session...</span>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col min-h-screen bg-amber-50">
        <Navbar />
        <main className="flex-grow">
            {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppLayout>{children}</AppLayout>
    </AuthProvider>
  );
}