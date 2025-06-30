import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { Database } from '../lib/database.types';

type KnowledgeBase = Database['public']['Tables']['knowledge_base']['Row'];
type KnowledgeBaseInsert = Database['public']['Tables']['knowledge_base']['Insert'];
type KnowledgeBaseUpdate = Database['public']['Tables']['knowledge_base']['Update'];

export function useKnowledgeBase() {
  const { user } = useAuth();
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchKnowledgeBase();
    } else {
      setKnowledgeBase(null);
      setLoading(false);
    }
  }, [user]);

  const fetchKnowledgeBase = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('knowledge_base')
        .select('*')
        .eq('user_id', user.id)
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!data) {
        // Create initial knowledge base if it doesn't exist
        const { data: newData, error: insertError } = await supabase
          .from('knowledge_base')
          .insert({ user_id: user.id })
          .select()
          .single();

        if (insertError) throw insertError;
        setKnowledgeBase(newData);
      } else {
        setKnowledgeBase(data);
      }
    } catch (error) {
      console.error('Error fetching knowledge base:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateKnowledgeBase = async (section: string, content: string) => {
    if (!user || !knowledgeBase) throw new Error('No user or knowledge base found');

    const updates: KnowledgeBaseUpdate = {
      [section]: content,
    };

    const { data, error } = await supabase
      .from('knowledge_base')
      .update(updates)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;

    setKnowledgeBase(data);
    return data;
  };

  return {
    knowledgeBase,
    loading,
    updateKnowledgeBase,
    refetch: fetchKnowledgeBase,
  };
}