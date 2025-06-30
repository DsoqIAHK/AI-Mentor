import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface SignUpData {
  firstName: string;
  lastName: string;
  jobTitle?: string;
  company?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event, 'Email confirmed:', session?.user?.email_confirmed_at ? 'Yes' : 'No');
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData?: SignUpData) => {
    console.log('Attempting to sign up user:', email);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: userData ? {
          first_name: userData.firstName,
          last_name: userData.lastName,
          job_title: userData.jobTitle || '',
          company: userData.company || ''
        } : undefined
      }
    });

    console.log('Sign up response:', {
      user: data.user?.id,
      email: data.user?.email,
      emailConfirmed: data.user?.email_confirmed_at,
      needsConfirmation: data.user && !data.user.email_confirmed_at
    });

    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    console.log('Attempting to sign in user:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Enhanced error handling for unconfirmed emails
    if (error) {
      console.log('Sign in error:', error.message);
      
      // Check for various email confirmation error patterns
      if (error.message.includes('Email not confirmed') || 
          error.message.includes('signup_disabled') ||
          error.message.includes('email_not_confirmed') ||
          error.message.includes('confirm') ||
          error.message.includes('verification')) {
        throw new Error('UNCONFIRMED_EMAIL');
      }
      
      if (error.message.includes('Invalid login credentials')) {
        // This could be either wrong credentials OR unconfirmed email
        // Supabase sometimes returns this generic error for unconfirmed emails
        throw new Error('Please check your credentials. If you recently signed up, make sure to verify your email address first.');
      }
    }

    console.log('Sign in successful:', {
      user: data.user?.id,
      email: data.user?.email,
      emailConfirmed: data.user?.email_confirmed_at
    });

    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const resendConfirmation = async (email: string) => {
    console.log('Resending confirmation email to:', email);
    
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    });
    
    console.log('Resend confirmation response:', { data, error });
    return { data, error };
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resendConfirmation,
  };
}