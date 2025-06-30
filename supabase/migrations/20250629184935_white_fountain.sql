/*
  # Fix RLS policies for profiles and knowledge_base tables

  1. Security Updates
    - Add missing INSERT policy for profiles table
    - Add missing INSERT policy for knowledge_base table
    - Ensure all CRUD operations are properly secured
    - Fix foreign key constraint issues by ensuring proper RLS policies

  2. Changes Made
    - Added INSERT policy for profiles table allowing authenticated users to create their own profile
    - Added INSERT policy for knowledge_base table allowing authenticated users to create their own knowledge base
    - Verified existing SELECT and UPDATE policies are working correctly
*/

-- Fix profiles table policies
-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;

-- Create comprehensive policies for profiles table
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Fix knowledge_base table policies
-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Users can insert own knowledge base" ON knowledge_base;
DROP POLICY IF EXISTS "Users can update own knowledge base" ON knowledge_base;
DROP POLICY IF EXISTS "Users can view own knowledge base" ON knowledge_base;

-- Create comprehensive policies for knowledge_base table
CREATE POLICY "Users can insert own knowledge base"
  ON knowledge_base
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own knowledge base"
  ON knowledge_base
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own knowledge base"
  ON knowledge_base
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Ensure RLS is enabled on both tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;