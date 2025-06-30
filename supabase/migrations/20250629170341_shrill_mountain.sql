/*
  # Fix Knowledge Base RLS Policies

  1. Security Changes
    - Drop existing policies that use non-existent `is_email_confirmed()` function
    - Create new policies using standard Supabase auth functions
    - Ensure authenticated users can manage their own knowledge base data

  2. Policy Updates
    - SELECT: Allow users to view their own knowledge base
    - INSERT: Allow users to create their own knowledge base
    - UPDATE: Allow users to update their own knowledge base
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert own knowledge base" ON knowledge_base;
DROP POLICY IF EXISTS "Users can update own knowledge base" ON knowledge_base;
DROP POLICY IF EXISTS "Users can view own knowledge base" ON knowledge_base;

-- Create new policies with correct auth functions
CREATE POLICY "Users can view own knowledge base"
  ON knowledge_base
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own knowledge base"
  ON knowledge_base
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own knowledge base"
  ON knowledge_base
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);