import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { searchStocks } from '../lib/api';
import Card from './Card';

interface StockSearchProps {
  onSelectStock?: (symbol: string) => void;
}

const StockSearch: React.FC<StockSearchProps> = ({ onSelectStock }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    
    setLoading(true);
    try {
      const data = await searchStocks(query);
      setResults(data);
    } catch (error) {
      console.error('Error searching stocks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className="mb-6">
      <div className="flex flex-col">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search stocks (e.g., AAPL, Microsoft)"
            className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-2 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>

        {loading && <p className="mt-2 text-gray-500 dark:text-gray-400">Loading...</p>}

        {results.length > 0 && (
          <div className="mt-2">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Results:</h4>
            <ul className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-md divide-y divide-gray-200 dark:divide-gray-700 max-h-60 overflow-y-auto">
              {results.map((result) => (
                <li
                  key={result['1. symbol']}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-900 dark:text-white"
                  onClick={() => onSelectStock && onSelectStock(result['1. symbol'])}
                >
                  <span className="font-medium">{result['1. symbol']}</span> - {result['2. name']}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StockSearch;
