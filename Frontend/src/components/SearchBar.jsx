import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useProductStore } from '../Store/product';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const { searchProducts, clearSearch } = useProductStore();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchProducts(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    clearSearch();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div className={`relative flex items-center border ${isFocused ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-300'} rounded-full bg-white shadow-sm transition-all duration-200 hover:shadow-md`}>
        <div className="pl-4">
          <FaSearch className={`w-5 h-5 transition-colors ${isFocused ? 'text-indigo-500' : 'text-gray-400'}`} />
        </div>
        
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          placeholder="Search products by name or price..."
          className="w-full px-3 py-3 text-gray-700 bg-transparent outline-none placeholder-gray-400"
          aria-label="Search products"
        />
        
        {searchTerm && (
          <button
            onClick={handleClear}
            className="pr-4 hover:scale-110 transition-transform cursor-pointer"
            aria-label="Clear search"
          >
            <FaTimes className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

    </div>
  );
};

export default SearchBar;