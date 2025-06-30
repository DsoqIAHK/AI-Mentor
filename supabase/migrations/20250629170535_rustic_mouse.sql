/*
  # Fix RLS policies and database constraints

  1. Database Structure
    - Create missing users table to satisfy foreign key constraints
    - Add helper function for email confirmation checks

  2. Security Updates
    - Update RLS policies to work with Supabase Auth
    - Remove email confirmation requirement for basic operations
    - Ensure authenticated users can manage their own data

  3. Policy Changes
    - Simplify policies to use auth.uid() directly
    - Allow profile and knowledge base creation without email confirmation
    - Maintain data isolation between users
*/

-- Create users table to satisfy foreign key constraints
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy for users table
CREATE POLICY "Users can view own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create helper function for email confirmation (if it doesn't exist)
CREATE OR REPLACE FUNCTION is_email_confirmed(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COALESCE(
    (SELECT (raw_user_meta_data->>'email_confirmed')::boolean 
     FROM auth.users 
     WHERE id = user_id), 
    true
  );
$$;

-- Drop existing policies for profiles table
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;

-- Create new simplified policies for profiles table
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Drop existing policies for knowledge_base table
DROP POLICY IF EXISTS "Users can insert own knowledge base" ON knowledge_base;
DROP POLICY IF EXISTS "Users can update own knowledge base" ON knowledge_base;
DROP POLICY IF EXISTS "Users can view own knowledge base" ON knowledge_base;

-- Create new simplified policies for knowledge_base table
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

-- Drop existing policies for chat_messages table
DROP POLICY IF EXISTS "Users can insert own chat messages" ON chat_messages;
DROP POLICY IF EXISTS "Users can view own chat messages" ON chat_messages;

-- Create new simplified policies for chat_messages table
CREATE POLICY "Users can view own chat messages"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat messages"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create trigger to automatically create user record when auth user is created
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO users (id, email, created_at, updated_at)
  VALUES (NEW.id, NEW.email, NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Create trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();