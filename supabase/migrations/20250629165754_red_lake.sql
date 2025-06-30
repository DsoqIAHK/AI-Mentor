/*
  # Enable Email Confirmation Settings

  This migration documents the required Supabase authentication settings.
  These settings must be configured in the Supabase Dashboard:

  ## Required Settings in Supabase Dashboard:

  1. **Authentication > Settings**
     - ✅ Enable email confirmations: ON
     - ✅ Enable email change confirmations: ON
     - ✅ Enable secure email change: ON

  2. **Site URL Configuration**
     - Site URL: https://yourdomain.com (or your actual domain)
     - Additional redirect URLs: Add your development URLs if needed

  3. **Email Templates (Authentication > Templates)**
     - Customize the "Confirm signup" email template if desired
     - Ensure the confirmation link redirects to: {{ .SiteURL }}/dashboard

  ## How Email Confirmation Works:

  1. User signs up with email/password
  2. Supabase automatically sends confirmation email
  3. User clicks link in email to verify account
  4. User can then sign in successfully
  5. Unverified users cannot sign in

  ## Testing Email Confirmation:

  - In development, check Supabase logs for email content
  - Use a real email service or email testing tool
  - Ensure your email provider allows emails from Supabase
*/

-- This is a documentation file - no actual SQL changes needed
-- Email confirmation is controlled by Supabase dashboard settings
SELECT 'Email confirmation must be enabled in Supabase Dashboard' as note;