import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/slices/authSlice';
import { supabase } from '@/lib/supabase';
import { AuthContext } from '@/context/use-auth';
import type { Session } from '@supabase/supabase-js';
import type { AppDispatch } from '@/store';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
      // Set Redux user if session exists
      if (data.session?.user) {
        dispatch(
          setUser({
            id: data.session.user.id || '',
            email: data.session.user.email || '',
          })
        );
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      // Update Redux user on auth state change
      if (session?.user) {
        dispatch(
          setUser({
            id: session.user.id || '',
            email: session.user.email || '',
          })
        );
      } else {
        dispatch(setUser(null));
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
