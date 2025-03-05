
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
        
        if (event === 'SIGNED_OUT') {
          // On sign out, immediately clear state
          setSession(null);
          setUser(null);
          // No need to reload here, we'll handle it in signOut function
        } else {
          // For other events, update session and user state
          setSession(currentSession);
          setUser(currentSession?.user || null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      // Immediately set loading to prevent UI flicker
      setLoading(true);
      
      // Clear local state before API call
      setUser(null);
      setSession(null);
      
      // Set a flag in sessionStorage to prevent automatic login after redirect
      sessionStorage.setItem('intentionalLogout', 'true');
      
      try {
        // Attempt Supabase signout but don't wait for success
        await supabase.auth.signOut().catch(e => console.error("Supabase signout error:", e));
      } catch (error) {
        console.error("Inner signout error:", error);
        // Continue even on API error
      }
      
      // Redirect to login page
      window.location.href = '/auth';
    } catch (error) {
      console.error("Error during sign out:", error);
      // Force redirect to auth page even on error
      window.location.href = '/auth';
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
