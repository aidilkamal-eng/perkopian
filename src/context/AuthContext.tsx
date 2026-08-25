import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabaseSession, supabaseLocal, setActiveSupabaseClient } from '../lib/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

interface User extends UserProfile {
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  profileLoading: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      setLoading(true);

      const { data: sessionData, error: sessionError } = await supabaseLocal.auth.getSession();
      const session = sessionData?.session;
      console.log("Restored session from storage:", session);

      if (session?.user) {
        setActiveSupabaseClient(supabaseLocal);
        await fetchUserProfile(supabaseLocal, session.user);
      } else {
        console.warn('No session found:', sessionError);
        setUser(null);
        setLoading(false);
      }
    };

    restoreSession();

    const { data: { subscription } } = supabaseLocal.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setActiveSupabaseClient(supabaseLocal);
        fetchUserProfile(supabaseLocal, session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (client: SupabaseClient, authUser: SupabaseUser) => {
    setProfileLoading(true);
    try {
      console.log('Fetching profile for user:', authUser.id);
      const { data: profile, error } = await client
        .from('user_profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        if (error?.code === 'PGRST116' || error?.message?.includes('No rows')) {
          console.log('Profile not found, creating new profile...');
          await createUserProfile(client, authUser);
          setLoading(false);
          return;
        }
        setLoading(false);
        return;
      }

      console.log('User profile fetched:', profile);
      setUser({
        ...profile,
        email: authUser.email || '',
      });
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    } finally {
      setLoading(false);
      setProfileLoading(false);
    }
  };

  const createUserProfile = async (client: SupabaseClient, authUser: SupabaseUser) => {
    setProfileLoading(true);
    try {
      const profileData = {
        id: authUser.id,
        name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
        bio: null,
        location: null,
        avatar_url: authUser.user_metadata?.avatar_url || `/disposable-coffee-paper-cup-icon.png`,
      };

      console.log('Creating user profile:', profileData);
      const { data: profile, error } = await client
        .from('user_profiles')
        .insert(profileData)
        .select()
        .single();

      if (error) {
        console.error('Error creating user profile:', error);
        throw error;
      }

      console.log('User profile created:', profile);
      setUser({
        ...profile,
        email: authUser.email || '',
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
      setLoading(false);
      setProfileLoading(false);
    }
  };

  const login = async (email: string, password: string, rememberMe: boolean) => {
    setLoading(true);

    const client = rememberMe ? supabaseLocal : supabaseSession;

    const { data, error } = await client.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('Login error:', error);
      setLoading(false);
      throw error; // will be caught in LoginPage
    }

    if (data.session?.user) {
      setActiveSupabaseClient(client);
      await fetchUserProfile(client, data.session.user);
    }

    setLoading(false);
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    const { data, error } = await supabaseLocal.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error) {
      setLoading(false);
      console.error('Signup error:', error);
      throw error;
    }

    console.log('Signup successful:', data);
    setLoading(false);
  };

  const logout = async () => {
    const localSignOut = supabaseLocal.auth.signOut();
    const sessionSignOut = supabaseSession.auth.signOut();

    const [{ error: localError }, { error: sessionError }] = await Promise.all([localSignOut, sessionSignOut]);

    if (localError || sessionError) {
      console.error('Logout error:', localError || sessionError);
      throw localError || sessionError;
    }
    
    setActiveSupabaseClient(supabaseSession);
    setUser(null);
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');
    const client = supabaseLocal;
    const { error } = await client
      .from('user_profiles')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', user.id);

    if (error) {
      console.error('Profile update error:', error);
      throw error;
    }

    setUser(prev => prev ? { ...prev, ...data } : null);
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabaseLocal.auth.updateUser({ password: newPassword });
    if (error) {
      console.error('Password update error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading,
        profileLoading,
        login, 
        signup,
        logout, 
        updateProfile,
        updatePassword,
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
