'use client';

import React from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  priceRange: string;
  onPriceRangeChange: (range: string) => void;
  rating: string;
  onRatingChange: (rating: string) => void;
  subtype: string;
  onSubtypeChange: (subtype: string) => void;
  availableSubtypes: string[];
}

export default function SearchAndFilters({
  searchQuery,
  onSearchChange,
  priceRange,
  onPriceRangeChange,
  rating,
  onRatingChange,
  subtype,
  onSubtypeChange,
  availableSubtypes = [],
}: SearchAndFiltersProps) {
  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search attractions..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>
        
        {/* Price Range Filter */}
        <select
          value={priceRange}
          onChange={(e) => onPriceRangeChange(e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Prices</option>
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
        </select>

        {/* Rating Filter */}
        <select
          value={rating}
          onChange={(e) => onRatingChange(e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Ratings</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="2">2+ Stars</option>
        </select>

        {/* Subtype Filter */}
        <select
          value={subtype}
          onChange={(e) => onSubtypeChange(e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[290px]"
        >
          <option value="">All Types</option>
          {availableSubtypes.map((subtype) => (
            <option key={subtype} value={subtype}>
              {subtype}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
} 