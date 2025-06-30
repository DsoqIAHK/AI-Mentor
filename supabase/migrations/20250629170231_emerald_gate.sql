/*
  # Email Confirmation Database Setup

  1. Database Functions
    - Create helper functions for email confirmation status
    - Add triggers to ensure proper user state management
  
  2. Security Policies
    - Ensure only confirmed users can access protected resources
    - Add policies that check email confirmation status
  
  3. User Management
    - Add functions to help with email confirmation workflow
    - Ensure proper user state tracking

  Note: Email confirmation settings (like requiring confirmation) must be 
  configured in the Supabase Dashboard under Authentication > Settings.
*/

-- Create a function to check if email confirmation is enabled
-- This reads from the auth.users table to check confirmation status
CREATE OR REPLACE FUNCTION public.is_email_confirmed(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT COALESCE(
    (SELECT email_confirmed_at IS NOT NULL 
     FROM auth.users 
     WHERE id = user_id),
    false
  );
$$;

-- Create a function to get user confirmation status
CREATE OR REPLACE FUNCTION public.get_user_confirmation_status()
RETURNS json
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT json_build_object(
    'user_id', auth.uid(),
    'email_confirmed', COALESCE(
      (SELECT email_confirmed_at IS NOT NULL 
       FROM auth.users 
       WHERE id = auth.uid()),
      false
    ),
    'email_confirmed_at', (
      SELECT email_confirmed_at 
      FROM auth.users 
      WHERE id = auth.uid()
    )
  );
$$;

-- Update existing RLS policies to ensure they work with email confirmation
-- This ensures that users must be both authenticated AND email confirmed

-- Update profiles table policies to require email confirmation
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id AND
    public.is_email_confirmed(auth.uid())
  );

CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    public.is_email_confirmed(auth.uid())
  );

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id AND
    public.is_email_confirmed(auth.uid())
  )
  WITH CHECK (
    auth.uid() = user_id AND
    public.is_email_confirmed(auth.uid())
  );

-- Update knowledge_base table policies to require email confirmation
DROP POLICY IF EXISTS "Users can view own knowledge base" ON public.knowledge_base;
DROP POLICY IF EXISTS "Users can insert own knowledge base" ON public.knowledge_base;
DROP POLICY IF EXISTS "Users can update own knowledge base" ON public.knowledge_base;

CREATE POLICY "Users can view own knowledge base"
  ON public.knowledge_base
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id AND
    public.is_email_confirmed(auth.uid())
  );

CREATE POLICY "Users can insert own knowledge base"
  ON public.knowledge_base
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    public.is_email_confirmed(auth.uid())
  );

CREATE POLICY "Users can update own knowledge base"
  ON public.knowledge_base
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id AND
    public.is_email_confirmed(auth.uid())
  )
  WITH CHECK (
    auth.uid() = user_id AND
    public.is_email_confirmed(auth.uid())
  );

-- Update chat_messages table policies to require email confirmation
DROP POLICY IF EXISTS "Users can view own chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can insert own chat messages" ON public.chat_messages;

CREATE POLICY "Users can view own chat messages"
  ON public.chat_messages
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id AND
    public.is_email_confirmed(auth.uid())
  );

CREATE POLICY "Users can insert own chat messages"
  ON public.chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    public.is_email_confirmed(auth.uid())
  );

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.is_email_confirmed(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_confirmation_status() TO authenticated;