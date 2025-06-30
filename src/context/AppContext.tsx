import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { useKnowledgeBase } from '../hooks/useKnowledgeBase';
import { useChatMessages } from '../hooks/useChatMessages';

interface AppContextType {
  // Auth
  user: any;
  signOut: () => Promise<{ error: any }>;
  
  // Profile
  profile: any;
  createProfile: (data: any) => Promise<any>;
  updateProfile: (data: any) => Promise<any>;
  
  // Knowledge Base
  knowledgeBase: any;
  updateKnowledgeBase: (section: string, content: string) => Promise<any>;
  
  // Chat
  chatHistory: any[];
  addMessage: (role: 'user' | 'assistant', content: string) => Promise<any>;
  clearMessages: () => Promise<void>;
  
  // Loading states
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, signOut } = useAuth();
  const { profile, createProfile, updateProfile, loading: profileLoading } = useProfile();
  const { knowledgeBase, updateKnowledgeBase, loading: kbLoading } = useKnowledgeBase();
  const { messages: chatHistory, addMessage, clearMessages, loading: chatLoading } = useChatMessages();

  const loading = profileLoading || kbLoading || chatLoading;

  // Transform chat messages to match the old format
  const transformedChatHistory = chatHistory.map(msg => ({
    role: msg.role,
    content: msg.content,
    timestamp: new Date(msg.created_at)
  }));

  // Transform profile to match the old format
  const transformedProfile = profile ? {
    name: profile.name || '',
    mentorPersonality: profile.mentor_personality,
    mentorStyle: profile.mentor_style,
    goals: profile.goals || [],
    skills: profile.skills || [],
    achievements: profile.achievements || []
  } : {
    name: '',
    mentorPersonality: 'Professional and Strategic',
    mentorStyle: 'Direct and Action-Oriented',
    goals: [],
    skills: [],
    achievements: []
  };

  // Transform knowledge base to match the old format
  const transformedKnowledgeBase = knowledgeBase ? {
    resume: knowledgeBase.resume || '',
    goals: knowledgeBase.goals || '',
    achievements: knowledgeBase.achievements || '',
    skills: knowledgeBase.skills || '',
    inspiration: knowledgeBase.inspiration || ''
  } : {
    resume: '',
    goals: '',
    achievements: '',
    skills: '',
    inspiration: ''
  };

  return (
    <AppContext.Provider value={{
      user,
      signOut,
      profile: transformedProfile,
      createProfile,
      updateProfile,
      knowledgeBase: transformedKnowledgeBase,
      updateKnowledgeBase,
      chatHistory: transformedChatHistory,
      addMessage,
      clearMessages,
      loading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};