export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          name: string | null
          mentor_personality: string
          mentor_style: string
          goals: string[] | null
          skills: string[] | null
          achievements: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name?: string | null
          mentor_personality?: string
          mentor_style?: string
          goals?: string[] | null
          skills?: string[] | null
          achievements?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string | null
          mentor_personality?: string
          mentor_style?: string
          goals?: string[] | null
          skills?: string[] | null
          achievements?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      knowledge_base: {
        Row: {
          id: string
          user_id: string
          resume: string | null
          goals: string | null
          achievements: string | null
          skills: string | null
          inspiration: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          resume?: string | null
          goals?: string | null
          achievements?: string | null
          skills?: string | null
          inspiration?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          resume?: string | null
          goals?: string | null
          achievements?: string | null
          skills?: string | null
          inspiration?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          user_id: string
          role: 'user' | 'assistant'
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: 'user' | 'assistant'
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'user' | 'assistant'
          content?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}