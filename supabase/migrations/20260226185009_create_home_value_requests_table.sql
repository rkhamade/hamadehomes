/*
  # Create home_value_requests table

  1. New Tables
    - `home_value_requests`
      - `id` (uuid, primary key) - Unique identifier for each request
      - `property_address` (text) - Full property address provided by seller
      - `name` (text) - Name of the person requesting home value
      - `email` (text) - Email address for follow-up communication
      - `timeline` (text) - Selling timeline preference
      - `created_at` (timestamptz) - Timestamp when request was created
      - `status` (text) - Status of the request (default: 'pending')
  
  2. Security
    - Enable RLS on `home_value_requests` table
    - Add policy for anonymous users to insert their own requests
    - No read policies needed as this is lead capture only
*/

CREATE TABLE IF NOT EXISTS home_value_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_address text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  timeline text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

ALTER TABLE home_value_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit home value requests"
  ON home_value_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);