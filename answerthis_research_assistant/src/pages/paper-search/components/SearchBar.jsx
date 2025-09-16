import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ query, onQueryChange, onSearch, suggestions = [], showSuggestions = false }) => {
  const [localQuery, setLocalQuery] = useState(query);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const inputRef = useRef(null);

  const mockSuggestions = [
    "machine learning algorithms",
    "climate change impacts",
    "quantum computing applications",
    "artificial intelligence ethics",
    "renewable energy systems",
    "biomedical engineering innovations",
    "neural network architectures",
    "sustainable development goals",
    "gene therapy techniques",
    "blockchain technology applications"
  ];

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setLocalQuery(value);
    onQueryChange(value);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSearch(localQuery);
  };

  const handleSuggestionClick = (suggestion) => {
    setLocalQuery(suggestion);
    onQueryChange(suggestion);
    onSearch(suggestion);
  };

  const handleAdvancedToggle = () => {
    setIsAdvancedMode(!isAdvancedMode);
  };

  const filteredSuggestions = localQuery?.length > 2 
    ? mockSuggestions?.filter(s => s?.toLowerCase()?.includes(localQuery?.toLowerCase()))?.slice(0, 8)
    : [];

  return (
    <div className="relative mb-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Icon
            name="Search"
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            ref={inputRef}
            type="text"
            value={localQuery}
            onChange={handleInputChange}
            placeholder="Search millions of academic papers..."
            className="w-full pl-12 pr-32 py-4 text-base bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-250"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleAdvancedToggle}
              iconName="Settings"
              iconPosition="left"
            >
              Advanced
            </Button>
            <Button
              type="submit"
              size="sm"
              iconName="Search"
              iconPosition="left"
            >
              Search
            </Button>
          </div>
        </div>
      </form>
      {/* Advanced Search Options */}
      {isAdvancedMode && (
        <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Advanced Search Options</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-2">Search operators:</p>
              <ul className="space-y-1 text-xs">
                <li><code className="bg-background px-1 rounded">AND</code> - Both terms must appear</li>
                <li><code className="bg-background px-1 rounded">OR</code> - Either term can appear</li>
                <li><code className="bg-background px-1 rounded">"phrase"</code> - Exact phrase search</li>
                <li><code className="bg-background px-1 rounded">-term</code> - Exclude term</li>
              </ul>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">Field-specific search:</p>
              <ul className="space-y-1 text-xs">
                <li><code className="bg-background px-1 rounded">title:</code> - Search in titles only</li>
                <li><code className="bg-background px-1 rounded">author:</code> - Search by author name</li>
                <li><code className="bg-background px-1 rounded">abstract:</code> - Search in abstracts</li>
                <li><code className="bg-background px-1 rounded">year:</code> - Search by publication year</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {/* Search Suggestions */}
      {filteredSuggestions?.length > 0 && localQuery?.length > 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-modal z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-medium text-muted-foreground px-3 py-2 mb-1">
              Search Suggestions
            </div>
            {filteredSuggestions?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors duration-250"
              >
                <Icon name="Search" size={14} className="text-muted-foreground" />
                <span className="text-sm text-popover-foreground">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;