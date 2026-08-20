/*
  # Add foreign key relationship between reviews and user_profiles

  1. Changes
    - Add foreign key constraint linking reviews.user_id to user_profiles.id
    - This enables Supabase to understand the relationship for JOIN operations
    - Uses CASCADE delete to maintain referential integrity

  2. Security
    - No RLS changes needed as existing policies remain valid
    - Foreign key constraint ensures data consistency
*/

-- Add foreign key constraint between reviews and user_profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'reviews_user_id_user_profiles_fkey'
    AND table_name = 'reviews'
  ) THEN
    ALTER TABLE public.reviews
    ADD CONSTRAINT reviews_user_id_user_profiles_fkey
    FOREIGN KEY (user_id)
    REFERENCES public.user_profiles (id)
    ON DELETE CASCADE;
  END IF;
END $$;