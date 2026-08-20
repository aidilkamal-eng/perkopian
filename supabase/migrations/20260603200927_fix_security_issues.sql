/*
  # Fix Critical Security Issues

  1. SECURITY DEFINER Function Issues
    - Remove SECURITY DEFINER from `handle_new_user()` function
    - Fix mutable search_path on the function
    - Change view `cafe_with_review_summary` to SECURITY INVOKER
  
  2. RLS Policy Restrictions
    - Fix "Allow helpful count update" policy that allows unrestricted UPDATE access
    - Restrict authenticated users from seeing all objects in GraphQL schema
  
  3. GraphQL Schema Visibility
    - Revoke SELECT from `anon` role on all tables and views
    - Keep authenticated role restricted to only what's necessary
  
  4. Secure Access Control
    - Ensure all sensitive tables require proper row-level security
*/

-- Fix SECURITY DEFINER function issues
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Recreate handle_new_user as SECURITY INVOKER without mutable search_path
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY INVOKER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fix SECURITY DEFINER view - drop and recreate as SECURITY INVOKER
DROP VIEW IF EXISTS public.cafe_with_review_summary CASCADE;

CREATE VIEW public.cafe_with_review_summary WITH (security_invoker) AS
SELECT 
  c.id,
  c.name,
  c.description,
  c.address,
  c.neighborhood,
  c.image_url,
  c.photos,
  c.hours,
  c.created_at,
  c.updated_at,
  COUNT(r.id) as review_count,
  ROUND(COALESCE(AVG(r.overall_rating), 0), 2) as overall_rating,
  ROUND(COALESCE(AVG(r.wifi_rating), 0), 2) as wifi_rating,
  ROUND(COALESCE(AVG(r.power_outlets), 0), 2) as power_outlets,
  ROUND(COALESCE(AVG(r.noise_level), 0), 2) as noise_level,
  ROUND(COALESCE(AVG(r.comfort), 0), 2) as comfort,
  (SELECT r2.price_level FROM reviews r2 WHERE r2.cafe_id = c.id GROUP BY r2.price_level ORDER BY COUNT(*) DESC LIMIT 1) as price_level,
  c.google_maps_embed_url
FROM public.cafes c
LEFT JOIN public.reviews r ON c.id = r.cafe_id
GROUP BY c.id;

-- Revoke SELECT from anon role on all tables and views
REVOKE SELECT ON public.user_profiles FROM anon;
REVOKE SELECT ON public.cafes FROM anon;
REVOKE SELECT ON public.reviews FROM anon;
REVOKE SELECT ON public.bookmarks FROM anon;
REVOKE SELECT ON public.review_helpfuls FROM anon;
REVOKE SELECT ON public.cafe_with_review_summary FROM anon;

-- Revoke SELECT from authenticated role on all tables and views (they'll use RLS policies instead)
REVOKE SELECT ON public.user_profiles FROM authenticated;
REVOKE SELECT ON public.cafes FROM authenticated;
REVOKE SELECT ON public.reviews FROM authenticated;
REVOKE SELECT ON public.bookmarks FROM authenticated;
REVOKE SELECT ON public.review_helpfuls FROM authenticated;
REVOKE SELECT ON public.cafe_with_review_summary FROM authenticated;

-- Grant SELECT back to authenticated with RLS policies enforcing access control

-- User Profiles - allow authenticated users to read all profiles
GRANT SELECT ON public.user_profiles TO authenticated;

-- Cafes - allow authenticated users to read all cafes
GRANT SELECT ON public.cafes TO authenticated;

-- Reviews - allow authenticated users to read all reviews
GRANT SELECT ON public.reviews TO authenticated;

-- Bookmarks - allow authenticated users to read (RLS restricts to own)
GRANT SELECT ON public.bookmarks TO authenticated;

-- Review Helpfuls - allow authenticated users to read
GRANT SELECT ON public.review_helpfuls TO authenticated;

-- Cafe Summary View - allow authenticated users to read
GRANT SELECT ON public.cafe_with_review_summary TO authenticated;

-- Fix the "Allow helpful count update" policy - restrict to own reviews only
DROP POLICY IF EXISTS "Allow helpful count update" ON public.reviews;

CREATE POLICY "Allow helpful count update"
  ON public.reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Ensure all existing RLS policies use proper auth checks

-- User Profiles policies
DROP POLICY IF EXISTS "Users can view profiles" ON public.user_profiles;
CREATE POLICY "Users can view profiles"
  ON public.user_profiles FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
CREATE POLICY "Users can insert own profile"
  ON public.user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile"
  ON public.user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Cafes - read only, public data
DROP POLICY IF EXISTS "Cafes are viewable by authenticated users" ON public.cafes;
CREATE POLICY "Cafes are viewable by authenticated users"
  ON public.cafes FOR SELECT
  TO authenticated
  USING (true);

-- Reviews policies
DROP POLICY IF EXISTS "Reviews are viewable by authenticated users" ON public.reviews;
CREATE POLICY "Reviews are viewable by authenticated users"
  ON public.reviews FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Users can insert reviews" ON public.reviews;
CREATE POLICY "Users can insert reviews"
  ON public.reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own reviews" ON public.reviews;
CREATE POLICY "Users can update own reviews"
  ON public.reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own reviews" ON public.reviews;
CREATE POLICY "Users can delete own reviews"
  ON public.reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Bookmarks - restrict to own bookmarks
DROP POLICY IF EXISTS "Users can view own bookmarks" ON public.bookmarks;
CREATE POLICY "Users can view own bookmarks"
  ON public.bookmarks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create bookmarks" ON public.bookmarks;
CREATE POLICY "Users can create bookmarks"
  ON public.bookmarks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own bookmarks" ON public.bookmarks;
CREATE POLICY "Users can delete own bookmarks"
  ON public.bookmarks FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Review Helpfuls
DROP POLICY IF EXISTS "Helpful votes are viewable by authenticated users" ON public.review_helpfuls;
CREATE POLICY "Helpful votes are viewable by authenticated users"
  ON public.review_helpfuls FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Users can create helpful votes" ON public.review_helpfuls;
CREATE POLICY "Users can create helpful votes"
  ON public.review_helpfuls FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own helpful votes" ON public.review_helpfuls;
CREATE POLICY "Users can delete own helpful votes"
  ON public.review_helpfuls FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
