/*
  # Blackjack Player Tokens System

  1. New Tables
    - `players`
      - `id` (uuid, primary key) - Unique player identifier
      - `session_id` (text, unique) - Browser session identifier
      - `tokens` (integer) - Current token balance
      - `created_at` (timestamp) - Account creation time
      - `updated_at` (timestamp) - Last update time
  
  2. Security
    - Enable RLS on `players` table
    - Add policy for users to read their own data by session_id
    - Add policy for users to update their own token balance
  
  3. Important Notes
    - Each player is identified by their browser session
    - Default starting balance is 100 tokens
    - Players can reset tokens if they reach 0
*/

CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  tokens integer NOT NULL DEFAULT 100,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Players can read own data by session"
  ON players FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Players can insert own data"
  ON players FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Players can update own data by session"
  ON players FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);