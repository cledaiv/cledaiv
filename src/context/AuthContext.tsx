
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  session: null,
  user: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        setLoading(true);
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user || null);
      } catch (error) {
        console.error('Error fetching initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, !!currentSession);
        
        // Update session and user state
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setLoading(false);
        
        // Force reload on sign out to clear any cached state
        if (event === 'SIGNED_OUT') {
          window.location.href = '/';
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      // First clear local state immediately
      setUser(null);
      setSession(null);
      
      try {
        // Then attempt the Supabase signout - but don't wait for it if it fails
        await supabase.auth.signOut().catch(e => console.error("Supabase signout error:", e));
      } catch (innerError) {
        console.error("Inner signout error:", innerError);
        // Ignore errors from Supabase signout
      }
      
      // Always force a refresh to clear all local state
      window.location.href = '/';
    } catch (error) {
      console.error("Error during sign out:", error);
      // Even on error, force reload to ensure clean state
      window.location.href = '/';
    }
  };

  const value = {
    session,
    user,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
