import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { Database } from '../lib/database.types';

type ChatMessage = Database['public']['Tables']['chat_messages']['Row'];
type ChatMessageInsert = Database['public']['Tables']['chat_messages']['Insert'];

export function useChatMessages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMessages();
    } else {
      setMessages([]);
      setLoading(false);
    }
  }, [user]);

  const fetchMessages = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMessage = async (role: 'user' | 'assistant', content: string) => {
    if (!user) throw new Error('No user found');

    const messageData: Omit<ChatMessageInsert, 'user_id'> = {
      role,
      content,
    };

    const { data, error } = await supabase
      .from('chat_messages')
      .insert({ ...messageData, user_id: user.id })
      .select()
      .single();

    if (error) throw error;

    setMessages(prev => [...prev, data]);
    return data;
  };

  const clearMessages = async () => {
    if (!user) throw new Error('No user found');

    const { error } = await supabase
      .from('chat_messages')
      .delete()
      .eq('user_id', user.id);

    if (error) throw error;

    setMessages([]);
  };

  return {
    messages,
    loading,
    addMessage,
    clearMessages,
    refetch: fetchMessages,
  };
}