
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      try {
        // Check if this was an intentional logout
        const intentionalLogout = sessionStorage.getItem('intentionalLogout') === 'true';
        
        if (intentionalLogout) {
          // Clear the flag
          sessionStorage.removeItem('intentionalLogout');
          // Just go to auth page, no need to get session
          navigate('/auth', { replace: true });
          return;
        }
        
        // Regular auth flow for logins
        const { data, error } = await supabase.auth.getSession();
        
        console.log("Auth callback session check:", !!data.session, error ? error.message : "no error");
        
        // If we have a session, go to home, otherwise to auth
        if (data.session) {
          navigate('/', { replace: true });
        } else {
          navigate('/auth', { replace: true });
        }
      } catch (err) {
        console.error("Error in auth callback:", err);
        // Redirect to auth page on error
        navigate('/auth', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-medium mb-2">Authentification en cours...</h2>
        <p className="text-muted-foreground">Veuillez patienter pendant que nous vous connectons.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
