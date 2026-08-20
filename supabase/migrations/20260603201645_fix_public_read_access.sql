/*
  # Fix Public Read Access for Cafes and Reviews

  ## Problem
  The previous security migration revoked SELECT from the `anon` role on all tables,
  which broke public browsing. Unauthenticated users received 401 errors when trying
  to load cafes, because the app expects anyone (logged in or not) to browse the cafe list.

  ## Changes
  1. Grant SELECT back to `anon` on public-facing tables:
     - `cafes` - cafe listings should be publicly readable
     - `reviews` - reviews should be publicly readable
     - `cafe_with_review_summary` - the view used to display cafe cards
  
  2. Add RLS policies for `anon` on these tables so the grants work with RLS enabled.

  ## Tables kept restricted to authenticated only
  - `user_profiles` - personal user data
  - `bookmarks` - personal bookmarks
  - `review_helpfuls` - voting data
*/

-- Grant public read access to cafe and review data
GRANT SELECT ON public.cafes TO anon;
GRANT SELECT ON public.reviews TO anon;
GRANT SELECT ON public.cafe_with_review_summary TO anon;

-- Add RLS policies to allow anon to read cafes
DROP POLICY IF EXISTS "Cafes are publicly viewable" ON public.cafes;
CREATE POLICY "Cafes are publicly viewable"
  ON public.cafes FOR SELECT
  TO anon
  USING (true);

-- Add RLS policies to allow anon to read reviews
DROP POLICY IF EXISTS "Reviews are publicly viewable" ON public.reviews;
CREATE POLICY "Reviews are publicly viewable"
  ON public.reviews FOR SELECT
  TO anon
  USING (true);
