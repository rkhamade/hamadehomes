/*
  # Create leads table

  ## Summary
  Creates a unified `leads` table to capture all form submissions from the website.

  ## New Tables
  - `leads`
    - `id` (uuid, primary key) - Unique identifier
    - `name` (text) - Full name of the lead
    - `email` (text) - Email address
    - `phone` (text, nullable) - Phone number (optional for some forms)
    - `address` (text, nullable) - Property address
    - `timeline` (text, nullable) - Selling/buying timeline
    - `source` (text) - Which form submitted the lead (e.g. 'Home Value Modal', 'Consultation Modal')
    - `created_at` (timestamptz) - Timestamp of submission

  ## Security
  - RLS enabled on `leads` table
  - Anon users can INSERT only (to submit the form)
  - No SELECT/UPDATE/DELETE for anon users (data stays private)
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text DEFAULT '',
  address text DEFAULT '',
  timeline text DEFAULT '',
  source text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert a lead"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);
