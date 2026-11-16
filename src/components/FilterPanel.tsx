'use client';

import React, { useState } from 'react';
import { Wifi, Battery, VolumeX, DollarSign, Thermometer } from 'lucide-react';
import { CafeFilters } from '../types';

interface FilterPanelProps {
  onFilterChange: (filters: CafeFilters) => void;
}

const emptyFilters: CafeFilters = {
  wifiQuality: 0,
  powerOutlets: 0,
  noiseLevel: 0,
  priceLevel: '',
  comfort: 0,
};

const numberBtn = (active: boolean) =>
  `w-9 h-9 rounded-full font-body text-sm flex items-center justify-center transition-colors ${
    active ? 'bg-caramel text-white' : 'bg-cream-dark text-espresso hover:bg-caramel/20'
  }`;

const pillBtn = (active: boolean) =>
  `px-4 py-2 rounded-full font-body text-sm transition-colors ${
    active ? 'bg-caramel text-white' : 'bg-cream-dark text-espresso hover:bg-caramel/20'
  }`;

const FilterTitle = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="flex items-center mb-3">
    <Icon className="h-4 w-4 text-espresso mr-2" />
    <span className="font-heading text-base text-espresso">{label}</span>
  </div>
);

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<CafeFilters>(emptyFilters);

  const update = (name: keyof CafeFilters, value: number | string) => {
    const updated = { ...filters, [name]: value } as CafeFilters;
    setFilters(updated);
    onFilterChange(updated);
  };

  const clearFilters = () => {
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const ratingRow = (name: 'wifiQuality' | 'powerOutlets' | 'comfort') => (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          className={numberBtn(filters[name] >= value)}
          onClick={() => update(name, filters[name] === value ? 0 : value)}
        >
          {value}
        </button>
      ))}
    </div>
  );

  const noiseOptions = [
    { value: 1, label: 'Sunyi' },
    { value: 2, label: 'Sedang' },
    { value: 3, label: 'Ribut' },
  ];

  return (
    <div className="bg-cream-light bg-[url('/filter-bg.png')] bg-[length:100%_100%] bg-no-repeat px-7 py-8">
      <div className="flex justify-between items-center border-b border-caramel/30 pb-3 mb-6">
        <h3 className="font-heading text-2xl text-espresso">Filter</h3>
        <button onClick={clearFilters} className="font-body text-sm text-caramel hover:text-espresso transition-colors">
          Reset
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <FilterTitle icon={Wifi} label="Kualitas WiFi" />
          {ratingRow('wifiQuality')}
        </div>

        <div>
          <FilterTitle icon={Battery} label="Soket Listrik" />
          {ratingRow('powerOutlets')}
        </div>

        <div>
          <FilterTitle icon={VolumeX} label="Kebisingan" />
          <div className="flex flex-wrap gap-2">
            {noiseOptions.map(({ value, label }) => (
              <button
                key={value}
                className={pillBtn(filters.noiseLevel === value)}
                onClick={() => update('noiseLevel', filters.noiseLevel === value ? 0 : value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <FilterTitle icon={DollarSign} label="Harga" />
          <div className="flex gap-2">
            {['$', '$$', '$$$'].map((level) => (
              <button
                key={level}
                className={pillBtn(filters.priceLevel === level)}
                onClick={() => update('priceLevel', filters.priceLevel === level ? '' : level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div>
          <FilterTitle icon={Thermometer} label="Kenyamanan" />
          {ratingRow('comfort')}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;