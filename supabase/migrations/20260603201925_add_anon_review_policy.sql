/*
  # Add RLS Policy for Anonymous Review Access

  ## Problem
  The `cafe_with_review_summary` view aggregates data from the `reviews` table
  (ratings, price levels, etc.), but `anon` users can't read the reviews table
  due to missing RLS policies, so the aggregation returns NULL values.

  ## Changes
  - Add RLS policy to allow `anon` to read all reviews (public data)
  - This enables the view to properly aggregate review data for anonymous users
*/

DROP POLICY IF EXISTS "Reviews are publicly viewable" ON public.reviews;
CREATE POLICY "Reviews are publicly viewable"
  ON public.reviews FOR SELECT
  TO anon, authenticated
  USING (true);
