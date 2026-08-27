// src/hooks/useBookmarks.ts
import { useEffect, useState } from 'react';
import { bookmarkService } from '../services/bookmarkService';
import { Cafe, supabaseCafeToLocal } from '../types';

export const useBookmarks = (userId: string | undefined) => {
  const [bookmarkedCafes, setBookmarkedCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!userId) return;
      try {
        const cafes = await bookmarkService.getUserBookmarks(userId);
        setBookmarkedCafes(cafes.map(supabaseCafeToLocal));
      } catch (err) {
        console.error('Failed to fetch bookmarks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [userId]);

  return { bookmarkedCafes, loading };
};
