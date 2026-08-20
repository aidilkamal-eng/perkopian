/*
  # Initial Schema for Perkopian

  1. New Tables
    - `cafes`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `address` (text)
      - `neighborhood` (text)
      - `image_url` (text)
      - `photos` (text array)
      - `hours` (text)
      - `price_level` (text)
      - `tags` (text array)
      - `overall_rating` (numeric)
      - `wifi_rating` (numeric)
      - `wifi_notes` (text)
      - `power_outlets` (numeric)
      - `power_notes` (text)
      - `noise_level` (numeric)
      - `noise_notes` (text)
      - `comfort` (numeric)
      - `comfort_notes` (text)
      - `coffee_quality` (numeric)
      - `crowdedness` (numeric)
      - `review_count` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `reviews`
      - `id` (uuid, primary key)
      - `cafe_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `comment` (text)
      - `overall_rating` (integer)
      - `wifi_rating` (integer)
      - `power_outlets` (integer)
      - `noise_level` (integer)
      - `comfort` (integer)
      - `photos` (text array)
      - `helpful_count` (integer)
      - `created_at` (timestamp)

    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `name` (text)
      - `bio` (text)
      - `location` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `bookmarks`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `cafe_id` (uuid, foreign key)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Public read access for cafes and reviews
*/

-- Create cafes table
CREATE TABLE IF NOT EXISTS cafes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  address text,
  neighborhood text,
  image_url text,
  photos text[] DEFAULT '{}',
  hours text,
  price_level text,
  tags text[] DEFAULT '{}',
  overall_rating numeric DEFAULT 0,
  wifi_rating numeric DEFAULT 0,
  wifi_notes text,
  power_outlets numeric DEFAULT 0,
  power_notes text,
  noise_level numeric DEFAULT 0,
  noise_notes text,
  comfort numeric DEFAULT 0,
  comfort_notes text,
  coffee_quality numeric DEFAULT 0,
  crowdedness numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  bio text,
  location text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cafe_id uuid REFERENCES cafes(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  comment text,
  overall_rating integer CHECK (overall_rating >= 1 AND overall_rating <= 5),
  wifi_rating integer CHECK (wifi_rating >= 1 AND wifi_rating <= 5),
  power_outlets integer CHECK (power_outlets >= 1 AND power_outlets <= 5),
  noise_level integer CHECK (noise_level >= 1 AND noise_level <= 5),
  comfort integer CHECK (comfort >= 1 AND comfort <= 5),
  photos text[] DEFAULT '{}',
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  cafe_id uuid REFERENCES cafes(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, cafe_id)
);

-- Enable RLS
ALTER TABLE cafes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Policies for cafes (public read, admin write)
CREATE POLICY "Allow read access to all"
  ON cafes
  FOR SELECT
  TO public
  USING (true);

-- Policies for user_profiles
CREATE POLICY "Users can read all profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Policies for reviews
CREATE POLICY "Anyone can read reviews"
  ON reviews
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON reviews
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for bookmarks
CREATE POLICY "Users can read own bookmarks"
  ON bookmarks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookmarks"
  ON bookmarks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks"
  ON bookmarks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to update cafe ratings when reviews are added/updated/deleted
CREATE OR REPLACE FUNCTION update_cafe_ratings()
RETURNS TRIGGER AS $$
BEGIN
  -- Update cafe ratings based on all reviews
  UPDATE cafes 
  SET 
    overall_rating = COALESCE((
      SELECT AVG(overall_rating)::numeric(3,2) 
      FROM reviews 
      WHERE cafe_id = COALESCE(NEW.cafe_id, OLD.cafe_id)
    ), 0),
    wifi_rating = COALESCE((
      SELECT AVG(wifi_rating)::numeric(3,2) 
      FROM reviews 
      WHERE cafe_id = COALESCE(NEW.cafe_id, OLD.cafe_id)
    ), 0),
    power_outlets = COALESCE((
      SELECT AVG(power_outlets)::numeric(3,2) 
      FROM reviews 
      WHERE cafe_id = COALESCE(NEW.cafe_id, OLD.cafe_id)
    ), 0),
    noise_level = COALESCE((
      SELECT AVG(noise_level)::numeric(3,2) 
      FROM reviews 
      WHERE cafe_id = COALESCE(NEW.cafe_id, OLD.cafe_id)
    ), 0),
    comfort = COALESCE((
      SELECT AVG(comfort)::numeric(3,2) 
      FROM reviews 
      WHERE cafe_id = COALESCE(NEW.cafe_id, OLD.cafe_id)
    ), 0),
    review_count = (
      SELECT COUNT(*) 
      FROM reviews 
      WHERE cafe_id = COALESCE(NEW.cafe_id, OLD.cafe_id)
    ),
    updated_at = now()
  WHERE id = COALESCE(NEW.cafe_id, OLD.cafe_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Triggers to update cafe ratings
CREATE TRIGGER update_cafe_ratings_on_review_insert
  AFTER INSERT ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_cafe_ratings();

CREATE TRIGGER update_cafe_ratings_on_review_update
  AFTER UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_cafe_ratings();

CREATE TRIGGER update_cafe_ratings_on_review_delete
  AFTER DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_cafe_ratings();

-- Function to handle user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();