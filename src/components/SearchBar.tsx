'use client';

import React, { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
  variant?: 'default' | 'hero' | 'list';
  initialQuery?: string;
  initialLocation?: string;
}

const variants = {
  default: {
    form: 'max-w-4xl mx-auto',
    box: 'rounded-lg shadow-lg',
    field: 'bg-white',
    divider: 'border-gray-200',
    button: 'bg-amber-600 hover:bg-amber-700',
    buttonLabel: 'Search',
    placeholder: 'Cari warkop, fitur, atau tags...',
  },
  hero: {
    form: 'max-w-3xl mx-auto',
    box: 'rounded-lg ring-2 ring-amber-400 shadow-[0_0_24px_rgba(251,191,36,0.35)]',
    field: 'bg-white',
    divider: 'border-gray-200',
    button: 'bg-caramel hover:bg-caramel/90',
    buttonLabel: 'Cari',
    placeholder: 'Cari warkop, kota, atau nama tempat...',
  },
  list: {
    form: '',
    box: 'rounded-lg border border-caramel/30 shadow-sm',
    field: 'bg-cream-light',
    divider: 'border-caramel/20',
    button: 'bg-caramel hover:bg-caramel/90',
    buttonLabel: 'Search',
    placeholder: 'Cari warkop, fitur, atau tags...',
  },
};

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  variant = 'default',
  initialQuery = '',
  initialLocation = '',
}) => {
  const v = variants[variant];
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);

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
    <form onSubmit={handleSubmit} className={`w-full ${v.form}`}>
      <div className={`flex flex-col md:flex-row overflow-hidden ${v.box}`}>
        <div className={`flex-1 flex items-center ${v.field} px-4 py-3 border-b md:border-b-0 md:border-r ${v.divider}`}>
          <Search className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder={v.placeholder}
            className="w-full bg-transparent focus:outline-none text-espresso text-sm"
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

        <div className={`flex-1 flex items-center ${v.field} px-4 py-3`}>
          <MapPin className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Daerah atau 'Lokasi Saat Ini'"
            className="w-full bg-transparent focus:outline-none text-espresso text-sm"
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
          className={`text-white px-6 py-3 font-medium transition-colors ${v.button}`}
        >
          {v.buttonLabel}
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