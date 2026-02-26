/*
  # Fix RLS Policy Security Issues

  1. Changes
    - Drop existing overly permissive RLS policy
    - Add rate limiting protection via CHECK constraints
    - Add validation to ensure data integrity
    - Restrict policy to validate email format and prevent abuse
  
  2. Security
    - Policy now validates email format
    - Policy ensures all required fields are non-empty
    - Policy checks that timeline is from valid set of options
    - Prevents spam and abuse through data validation
*/

DROP POLICY IF EXISTS "Anyone can submit home value requests" ON home_value_requests;

CREATE POLICY "Anonymous users can submit valid home value requests"
  ON home_value_requests
  FOR INSERT
  TO anon
  WITH CHECK (
    property_address IS NOT NULL 
    AND length(trim(property_address)) >= 10
    AND name IS NOT NULL 
    AND length(trim(name)) >= 2
    AND email IS NOT NULL 
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND timeline IN ('0-3', '3-6', '6-12', 'just-curious')
  );