/*
  # Update Authentication Settings

  This migration configures Supabase authentication settings for email confirmation.
  
  1. Email confirmation is enabled by default in Supabase
  2. Users must confirm their email before they can sign in
  3. Email templates can be customized in the Supabase dashboard
*/

-- This file serves as documentation for the required Supabase auth settings
-- The actual configuration needs to be done in the Supabase dashboard:

-- 1. Go to Authentication > Settings in your Supabase dashboard
-- 2. Ensure "Enable email confirmations" is turned ON
-- 3. Set "Site URL" to your domain (e.g., https://yourdomain.com)
-- 4. Add redirect URLs if needed
-- 5. Customize email templates in Authentication > Templates

-- Note: Email confirmation is enabled by default in new Supabase projects
-- Users will receive a confirmation email and must click the link before they can sign in