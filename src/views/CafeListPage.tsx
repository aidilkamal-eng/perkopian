import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, List, Map as MapIcon, SlidersHorizontal, X } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import CafeCard from '../components/CafeCard';
import { useCafes } from '../hooks/useCafes';
import { cafeService } from '../services/cafeService';
import { supabaseCafeToLocal } from '../types';
import type { Cafe } from '../types';

const CafeListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { cafes: allCafes, loading: allCafesLoading, error: allCafesError } = useCafes();
  
  const [filteredCafes, setFilteredCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchLocation, setSearchLocation] = useState(searchParams.get('location') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState<string>('rating');

  // Initialize search from URL params
  useEffect(() => {
    const query = searchParams.get('q') || '';
    const location = searchParams.get('location') || '';
    setSearchQuery(query);
    setSearchLocation(location);
    
    if (query || location) {
      performSearch(query, location);
    }
  }, [searchParams]);

  // Use all cafes when no search/filters are active
  useEffect(() => {
    if (!searchQuery && !searchLocation && Object.keys(activeFilters).length === 0) {
      setFilteredCafes(sortCafes(allCafes, sortBy));
      setLoading(allCafesLoading);
      setError(allCafesError);
    }
  }, [allCafes, allCafesLoading, allCafesError, sortBy, searchQuery, searchLocation, activeFilters]);

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

  const applyFilters = (cafes: Cafe[], filters: any): Cafe[] => {
    let results = [...cafes];
    
    if (filters.wifiQuality > 0) {
      results = results.filter(cafe => cafe.wifiRating >= filters.wifiQuality);
    }
    
    if (filters.powerOutlets && filters.powerOutlets > 0) {
      results = results.filter(cafe => cafe.powerOutlets >= filters.powerOutlets);
    }
    
    if (filters.noiseLevel > 0) {
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
    
    if (filters.comfort > 0) {
      results = results.filter(cafe => cafe.comfort >= filters.comfort);
    }
    
    return results;
  };

  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
    
    // Update URL params
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location) params.set('location', location);
    setSearchParams(params);
    
    performSearch(query, location);
  };

  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
    console.log("Received filters:", filters);
    
    // Re-apply search with new filters
    performSearch(searchQuery, searchLocation, filters);
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

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    setFilteredCafes(sortCafes(filteredCafes, newSortBy));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const hasActiveFilters = () => {
    return Object.values(activeFilters).some(value => {
      if (typeof value === 'boolean') return value;
      if (typeof value === 'number') return value > 0;
      if (typeof value === 'string') return value !== '';
      return false;
    });
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSearchLocation('');
    setActiveFilters({});
    setSearchParams(new URLSearchParams());
    setFilteredCafes(sortCafes(allCafes, sortBy));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Cari Warkop</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <FilterPanel onFilterChange={handleFilterChange} />
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <button
                  className={`mr-2 p-2 rounded-md ${viewMode === 'list' ? 'bg-amber-100 text-amber-800' : 'text-gray-500 hover:bg-gray-100'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-5 w-5" />
                </button>
                <button
                  className={`mr-4 p-2 rounded-md ${viewMode === 'map' ? 'bg-amber-100 text-amber-800' : 'text-gray-500 hover:bg-gray-100'}`}
                  onClick={() => setViewMode('map')}
                >
                  <MapIcon className="h-5 w-5" />
                </button>
                
                <div className="md:hidden">
                  <button
                    className={`p-2 rounded-md flex items-center ${hasActiveFilters() ? 'bg-amber-100 text-amber-800' : 'text-gray-500 hover:bg-gray-100'}`}
                    onClick={toggleFilters}
                  >
                    <SlidersHorizontal className="h-5 w-5 mr-1" />
                    Filter
                    {hasActiveFilters() && (
                      <span className="ml-1 bg-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {Object.values(activeFilters).filter(v => v !== 0 && v !== '' && v !== false).length}
                      </span>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Urutkan dari:</span>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-800">Filter</h3>
                  <button onClick={toggleFilters}>
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                <FilterPanel onFilterChange={handleFilterChange} />
              </div>
            </div>
          )}
          
          {/* Results Count */}
          <div className="mb-4 flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            {searchLocation ? (
              <span>Hasil dari "{searchLocation}"</span>
            ) : (
              <span>Semua lokasi</span>
            )}
            <span className="mx-2">•</span>
            <span>{filteredCafes.length} warkop ditemukan</span>
          </div>
          
          {/* Loading State */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg mb-4">Error: {error}</p>
              <button
                onClick={() => performSearch(searchQuery, searchLocation)}
                className="text-amber-600 hover:text-amber-800"
              >
                Try Again
              </button>
            </div>
          )}
          
          {/* Café List */}
          {!loading && !error && (
            <>
              {viewMode === 'list' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCafes.length > 0 ? (
                    filteredCafes.map(cafe => (
                      <CafeCard key={cafe.id} cafe={cafe} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500 text-lg mb-4">
                        {allCafes.length === 0 
                          ? 'Tidak ada data warkop di database. Silakan tambahkan data warkop terlebih dahulu.'
                          : 'Tidak ada warkop yang sesuai dengan kriteria.'
                        }
                      </p>
                      {allCafes.length > 0 && (
                        <button
                          onClick={clearAllFilters}
                          className="text-amber-600 hover:text-amber-800"
                        >
                          Hapus semua filter
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                  <p className="text-gray-500">Map view coming soon!</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CafeListPage;