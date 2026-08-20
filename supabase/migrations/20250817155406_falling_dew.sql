/*
  # Add unique constraint for user-cafe reviews

  1. Changes
    - Add unique constraint to ensure one review per user per cafe
    - This prevents duplicate reviews from the same user for the same cafe

  2. Security
    - Maintains existing RLS policies
    - Ensures data integrity
*/

-- Add unique constraint to prevent duplicate reviews from same user for same cafe
ALTER TABLE reviews ADD CONSTRAINT reviews_user_cafe_unique UNIQUE (user_id, cafe_id);