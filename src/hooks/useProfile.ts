import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      // If no profile exists, create a default one using user metadata
      if (!data) {
        const userData = user.user_metadata;
        const defaultProfile = {
          user_id: user.id,
          name: userData.first_name && userData.last_name 
            ? `${userData.first_name} ${userData.last_name}`
            : user.email?.split('@')[0] || 'User',
          mentor_personality: 'Professional and Strategic',
          mentor_style: 'Direct and Action-Oriented',
          goals: [],
          skills: [],
          achievements: []
        };

        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert(defaultProfile)
          .select()
          .single();

        if (createError) throw createError;
        
        setProfile(newProfile);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (profileData: Omit<ProfileInsert, 'user_id'>) => {
    if (!user) throw new Error('No user found');

    const { data, error } = await supabase
      .from('profiles')
      .insert({ ...profileData, user_id: user.id })
      .select()
      .single();

    if (error) throw error;

    setProfile(data);
    return data;
  };

  const updateProfile = async (updates: Omit<ProfileUpdate, 'user_id'>) => {
    if (!user || !profile) throw new Error('No user or profile found');

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;

    setProfile(data);
    return data;
  };

  return {
    profile,
    loading,
    createProfile,
    updateProfile,
    refetch: fetchProfile,
  };
}