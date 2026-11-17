'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { MapPin, List, Map as MapIcon, SlidersHorizontal } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import CafeCard from '../components/CafeCard';
import { useCafes } from '../hooks/useCafes';
import { cafeService } from '../services/cafeService';
import { supabaseCafeToLocal } from '../types';
import type { Cafe, CafeFilters } from '../types';

const CafeListPage: React.FC = () => {
  const router = useRouter();

  const { cafes: allCafes, loading: allCafesLoading, error: allCafesError } = useCafes();
  
  const [filteredCafes, setFilteredCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const searchQuery = useSearchParams().get('q') || '';
  const searchLocation = useSearchParams().get('location') || '';
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Partial<CafeFilters>>({});
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState<string>('rating');

  const applyFilters = (cafes: Cafe[], filters: Partial<CafeFilters>): Cafe[] => {
    let results = [...cafes];
    
    if ((filters.wifiQuality ?? 0) > 0) {
      results = results.filter(cafe => cafe.wifiRating >= filters.wifiQuality!);
    }
    
    if (filters.powerOutlets && filters.powerOutlets > 0) {
      results = results.filter(cafe => cafe.powerOutlets >= filters.powerOutlets!);
    }
    
    if ((filters.noiseLevel ?? 0) > 0) {
      results = results.filter(cafe => {
        if (filters.noiseLevel === 1) return cafe.noiseLevel <= 2;
        if (filters.noiseLevel === 2) return cafe.noiseLevel > 2 && cafe.noiseLevel <= 3.5;
        if (filters.noiseLevel === 3) return cafe.noiseLevel > 3.5;
        return true;
      });
    }
    
    if (filters.priceLevel) {
      results = results.filter(cafe => cafe.priceLevel === filters.priceLevel);
    }
    
    if ((filters.comfort ?? 0) > 0) {
      results = results.filter(cafe => cafe.comfort >= filters.comfort!);
    }
    
    return results;
  };

  const sortCafes = (cafesToSort: Cafe[], sortOption: string) => {
    switch (sortOption) {
      case 'rating':
        return [...cafesToSort].sort((a, b) => b.overallRating - a.overallRating);
      case 'wifi':
        return [...cafesToSort].sort((a, b) => b.wifiRating - a.wifiRating);
      case 'newest':
        return [...cafesToSort].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'popular':
        return [...cafesToSort].sort((a, b) => b.reviewCount - a.reviewCount);
      default:
        return cafesToSort;
    }
  };

  const hasSearchOrFilters = Boolean(searchQuery || searchLocation || Object.keys(activeFilters).length > 0);

  const displayedCafes = hasSearchOrFilters ? filteredCafes : sortCafes(allCafes, sortBy);
  const isLoading = hasSearchOrFilters ? loading : allCafesLoading;
  const displayError = hasSearchOrFilters ? error : allCafesError;

  const performSearch = async (query: string, location: string, filters = activeFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      let results: Cafe[] = [];
      
      if (query || location) {
        const data = await cafeService.searchCafes(query, location);
        results = data.map(supabaseCafeToLocal);
      } else {
        results = allCafes;
      }
      
      // Apply filters
      results = applyFilters(results, filters);
      
      // Apply sorting
      results = sortCafes(results, sortBy);
      
      setFilteredCafes(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search cafes');
      console.error('Error searching cafes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initialize search from URL params
  useEffect(() => {
    if (searchQuery || searchLocation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- fetches data on mount
      performSearch(searchQuery, searchLocation);
    }
  }, [searchQuery, searchLocation]);

  const handleSearch = (query: string, location: string) => {
    // Update URL params
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location) params.set('location', location);
    router.replace(`/cafes?${params.toString()}`);
  };

  const handleFilterChange = (filters: CafeFilters) => {
    setActiveFilters(filters);
    console.log("Received filters:", filters);
    
    // Re-apply search with new filters
    performSearch(searchQuery, searchLocation, filters);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    setFilteredCafes(sortCafes(displayedCafes, newSortBy));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const isFilterSet = (v: string | number | undefined) =>
    v !== undefined && v !== 0 && v !== '';

  const clearAllFilters = () => {
    setActiveFilters({});
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetches data on mount
    setFilteredCafes(sortCafes(allCafes, sortBy));
    router.push(`/cafes`);
  };

  const activeCount = Object.values(activeFilters).filter(isFilterSet).length;

  return (
    <div className="bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header: title + search + sketch */}
        <div className="mb-10 flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-10">
          <div className="flex-shrink-0">
            <h1 className="font-heading text-[53px] text-espresso">Cari Warkop</h1>
            <img src="/title-line.webp" alt="" className="mt-3 w-[258px] h-auto" />
          </div>

          <div className="relative flex-1 lg:max-w-4xl lg:pr-44 lg:pb-1">
            <SearchBar
              onSearch={handleSearch}
              variant="list"
              initialQuery={searchQuery}
              initialLocation={searchLocation}
            />
            <img
              src="/cafe-sketch.webp"
              alt=""
              className="hidden lg:block absolute right-0 top-1/2 -translate-y-[65%] w-44 h-auto pointer-events-none"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <FilterPanel onFilterChange={handleFilterChange} />
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full">
            {/* Sort bar: double border made with CSS */}
            <div className="rounded-xl border-2 border-caramel/40 p-1 mb-5 bg-amber-100/40">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border-2 border-caramel/25 px-3 py-2">
                <div className="flex items-center gap-2">
                  <button
                    className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-caramel text-white' : 'bg-cream-dark text-espresso/70 hover:bg-caramel/20'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-5 w-5" />
                  </button>
                  <button
                    className={`p-2 rounded-md transition-colors ${viewMode === 'map' ? 'bg-caramel text-white' : 'bg-cream-dark text-espresso/70 hover:bg-caramel/20'}`}
                    onClick={() => setViewMode('map')}
                  >
                    <MapIcon className="h-5 w-5" />
                  </button>

                  <button
                    className={`md:hidden p-2 rounded-md flex items-center font-body text-sm transition-colors ${activeCount > 0 ? 'bg-caramel text-white' : 'bg-cream-dark text-espresso/70'}`}
                    onClick={toggleFilters}
                  >
                    <SlidersHorizontal className="h-5 w-5 mr-1" />
                    Filter
                    {activeCount > 0 && (
                      <span className="ml-1 bg-white text-caramel rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {activeCount}
                      </span>
                    )}
                  </button>
                </div>

                <div className="flex items-center">
                  <span className="font-body text-sm text-espresso mr-2">Urutkan dari:</span>
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="bg-cream-light border border-caramel/30 rounded-md font-body text-sm text-espresso p-2 focus:outline-none focus:ring-1 focus:ring-caramel"
                  >
                    <option value="rating">Rating Tertinggi</option>
                    <option value="wifi">WiFi Terbaik</option>
                    <option value="newest">Terbaru</option>
                    <option value="popular">Paling Populer</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="md:hidden mb-6">
                <FilterPanel onFilterChange={handleFilterChange} />
              </div>
            )}

            {/* Results Count */}
            <div className="mb-5 flex items-center font-body text-sm text-espresso">
              <MapPin className="h-4 w-4 mr-1 text-caramel" />
              {searchLocation ? (
                <span>{`Hasil dari "${searchLocation}"`}</span>
              ) : (
                <span>Semua lokasi</span>
              )}
              <span className="mx-2">•</span>
              <span>{displayedCafes.length} warkop ditemukan</span>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-cream-light rounded-xl shadow-sm overflow-hidden animate-pulse">
                    <div className="h-40 bg-cream-dark"></div>
                    <div className="p-4">
                      <div className="h-4 bg-cream-dark rounded mb-2"></div>
                      <div className="h-3 bg-cream-dark rounded mb-2"></div>
                      <div className="h-3 bg-cream-dark rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {displayError && (
              <div className="text-center py-12">
                <p className="text-red-600 text-lg mb-4">Error: {displayError}</p>
                <button
                  onClick={() => performSearch(searchQuery, searchLocation)}
                  className="text-caramel hover:text-espresso"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Café List */}
            {!isLoading && !displayError && (
              <>
                {viewMode === 'list' ? (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {displayedCafes.length > 0 ? (
                      displayedCafes.map((cafe) => <CafeCard key={cafe.id} cafe={cafe} />)
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <p className="font-body text-espresso/70 text-lg mb-4">
                          {allCafes.length === 0
                            ? 'Tidak ada data warkop di database. Silakan tambahkan data warkop terlebih dahulu.'
                            : 'Tidak ada warkop yang sesuai dengan kriteria.'}
                        </p>
                        {allCafes.length > 0 && (
                          <button onClick={clearAllFilters} className="text-caramel hover:text-espresso">
                            Hapus semua filter
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-cream-dark rounded-lg h-96 flex items-center justify-center">
                    <p className="font-body text-espresso/60">Map view coming soon!</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeListPage;