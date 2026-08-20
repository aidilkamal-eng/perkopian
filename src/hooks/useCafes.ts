import { useState, useEffect } from 'react';
import { cafeService } from '../services/cafeService';
import { supabaseCafeToLocal } from '../types';
import type { Cafe } from '../types';

export function useCafes() {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadCafes = async () => {
      try {
        setLoading(true);
        setError(null);
        let data = await cafeService.getCafes();
        if (!data || data.length === 0) {
          data = await cafeService.getCafes();
        }
        if (isMounted) setCafes(data.map(supabaseCafeToLocal));
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadCafes();
    return () => { isMounted = false };
  }, []);

  const refreshCafes = () => {
    setLoading(true);
    setError(null);
    cafeService.getCafes()
      .then(data => setCafes(data.map(supabaseCafeToLocal)))
      .catch(err => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false));
  };

  return { cafes, loading, error, refreshCafes };
}

export function useCafe(id: string) {
  const [cafe, setCafe] = useState<Cafe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadCafe = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await cafeService.getCafeById(id);
        if (isMounted) setCafe(data ? supabaseCafeToLocal(data) : null);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadCafe();
    return () => { isMounted = false };
  }, [id]);

  const refreshCafe = () => {
    setLoading(true);
    setError(null);
    cafeService.getCafeById(id)
      .then(data => setCafe(data ? supabaseCafeToLocal(data) : null))
      .catch(err => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false));
  };

  return { cafe, loading, error, refreshCafe };
}
