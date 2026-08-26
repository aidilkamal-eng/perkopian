import React, { useState } from 'react';
import { Wifi, Battery, VolumeX, DollarSign, Thermometer } from 'lucide-react';

interface FilterPanelProps {
  onFilterChange: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    wifiQuality: 0,
    powerOutlets: 0,
    noiseLevel: 0,
    priceLevel: '',
    comfort: 0,
  });

  const handleFilterChange = (name: string, value: any) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...filters, [name]: value };
      onFilterChange(updatedFilters);
      console.log("Received filters:", updatedFilters);
      return updatedFilters;
    });
  };

  const clearFilters = () => {
    const resetFilters = {
      wifiQuality: 0,
      powerOutlets: 0,
      noiseLevel: 0,
      priceLevel: '',
      comfort: 0,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">Filter</h3>
        <button 
          onClick={clearFilters}
          className="text-sm text-amber-600 hover:text-amber-800"
        >
          Reset
        </button>
      </div>
      
      <div className="space-y-4">
        {/* WiFi Quality */}
        <div>
          <div className="flex items-center mb-2">
            <Wifi className="h-4 w-4 text-gray-600 mr-2" />
            <label className="text-sm font-medium text-gray-700">Kualitas WiFi</label>
          </div>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  filters.wifiQuality >= value 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => handleFilterChange('wifiQuality', filters.wifiQuality === value ? 0 : value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        
        {/* Power Outlets */}
        <div>
          <div className="flex items-center mb-2">
            <Battery className="h-4 w-4 text-gray-600 mr-2" />
            <label className="text-sm font-medium text-gray-700">Soket Listrik</label>
          </div>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  filters.powerOutlets >= value
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => handleFilterChange('powerOutlets', filters.powerOutlets === value ? 0 : value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        
        {/* Noise Level */}
        <div>
          <div className="flex items-center mb-2">
            <VolumeX className="h-4 w-4 text-gray-600 mr-2" />
            <label className="text-sm font-medium text-gray-700">Kebisingan</label>
          </div>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-full text-sm ${
                filters.noiseLevel === 1 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => handleFilterChange('noiseLevel', filters.noiseLevel === 1 ? 0 : 1)}
            >
              Sunyi
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm ${
                filters.noiseLevel === 2 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => handleFilterChange('noiseLevel', filters.noiseLevel === 2 ? 0 : 2)}
            >
              Sedang
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm ${
                filters.noiseLevel === 3 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => handleFilterChange('noiseLevel', filters.noiseLevel === 3 ? 0 : 3)}
            >
              Ribut
            </button>
          </div>
        </div>
        
        {/* Price Level */}
        <div>
          <div className="flex items-center mb-2">
            <DollarSign className="h-4 w-4 text-gray-600 mr-2" />
            <label className="text-sm font-medium text-gray-700">Harga</label>
          </div>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-full text-sm ${
                filters.priceLevel === '$' 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => handleFilterChange('priceLevel', filters.priceLevel === '$' ? '' : '$')}
            >
              $
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm ${
                filters.priceLevel === '$$' 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => handleFilterChange('priceLevel', filters.priceLevel === '$$' ? '' : '$$')}
            >
              $$
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm ${
                filters.priceLevel === '$$$' 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => handleFilterChange('priceLevel', filters.priceLevel === '$$$' ? '' : '$$$')}
            >
              $$$
            </button>
          </div>
        </div>
        
        {/* Comfort */}
        <div>
          <div className="flex items-center mb-2">
            <Thermometer className="h-4 w-4 text-gray-600 mr-2" />
            <label className="text-sm font-medium text-gray-700">Kenyamanan</label>
          </div>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  filters.comfort >= value 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => handleFilterChange('comfort', filters.comfort === value ? 0 : value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;