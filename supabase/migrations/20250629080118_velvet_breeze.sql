/*
  # Remove tags column from cafes table

  1. Changes
    - Remove tags column from cafes table
    - This will permanently delete all tag data

  2. Security
    - No RLS changes needed as we're only removing a column
*/

-- Remove tags column from cafes table
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'cafes' AND column_name = 'tags'
  ) THEN
    ALTER TABLE cafes DROP COLUMN tags;
  END IF;
END $$;