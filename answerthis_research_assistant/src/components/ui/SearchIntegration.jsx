import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const SearchIntegration = ({ 
  isExpanded = false, 
  onToggle = () => {},
  className = "" 
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Mock recent searches and suggestions
  const mockRecentSearches = [
    'machine learning algorithms',
    'climate change impacts',
    'quantum computing applications',
    'biomedical research methods'
  ];

  const mockSuggestions = [
    'machine learning in healthcare',
    'machine learning algorithms comparison',
    'machine learning neural networks',
    'machine learning applications 2024'
  ];

  useEffect(() => {
    setRecentSearches(mockRecentSearches);
  }, []);

  useEffect(() => {
    if (isExpanded && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [isExpanded]);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setQuery(value);
    
    if (value?.length > 2) {
      // Filter suggestions based on query
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearch = (searchQuery = query) => {
    if (searchQuery?.trim()) {
      // Add to recent searches
      const updatedRecent = [searchQuery, ...recentSearches?.filter(s => s !== searchQuery)]?.slice(0, 5);
      setRecentSearches(updatedRecent);
      
      // Navigate to search page
      navigate(`/paper-search?q=${encodeURIComponent(searchQuery)}`);
      
      // Reset state
      setQuery('');
      setShowSuggestions(false);
      onToggle(false);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    handleSearch();
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion);
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Escape') {
      setShowSuggestions(false);
      onToggle(false);
    }
  };

  if (!isExpanded) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onToggle(true)}
        className={className}
      >
        <Icon name="Search" size={20} />
      </Button>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(query?.length > 2 || recentSearches?.length > 0)}
            placeholder="Search academic papers..."
            className="w-full pl-10 pr-12 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-250"
          />
          <Icon
            name="Search"
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onToggle(false)}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
          >
            <Icon name="X" size={14} />
          </Button>
        </div>
      </form>
      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-md shadow-modal z-50 max-h-80 overflow-y-auto">
          {/* Current Query Suggestions */}
          {suggestions?.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-1">
                Suggestions
              </div>
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted rounded-sm transition-colors duration-250"
                >
                  <Icon name="Search" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-popover-foreground">{suggestion}</span>
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches?.length > 0 && query?.length <= 2 && (
            <div className="p-2 border-t border-border">
              <div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-1">
                Recent Searches
              </div>
              {recentSearches?.map((recent, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(recent)}
                  className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-muted rounded-sm transition-colors duration-250 group"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-popover-foreground">{recent}</span>
                  </div>
                  <Icon 
                    name="ArrowUpRight" 
                    size={12} 
                    className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-250" 
                  />
                </button>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="p-2 border-t border-border">
            <button
              onClick={() => navigate('/paper-search')}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted rounded-sm transition-colors duration-250"
            >
              <Icon name="Filter" size={14} className="text-primary" />
              <span className="text-sm text-popover-foreground">Advanced Search</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchIntegration;