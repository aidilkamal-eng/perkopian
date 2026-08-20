import React, { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location);
  };

  const clearSearch = () => {
    setQuery('');
    setLocation('');
    onSearch('', '');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden">
        <div className="flex-1 flex items-center bg-white px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Cari warkop, fitur, atau tags..."
            className="w-full focus:outline-none text-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button 
              type="button" 
              onClick={() => {
                setQuery('');
                onSearch('', location);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="flex-1 flex items-center bg-white px-4 py-3">
          <MapPin className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Daerah atau 'Lokasi Saat Ini'"
            className="w-full focus:outline-none text-black"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {location && (
            <button 
              type="button" 
              onClick={() => {
                setLocation('');
                onSearch(query, '');
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <button
          type="submit"
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 font-medium transition-colors"
        >
          Search
        </button>
        
        {(query || location) && (
          <button
            type="button"
            onClick={clearSearch}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-3 font-medium transition-colors md:hidden"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;