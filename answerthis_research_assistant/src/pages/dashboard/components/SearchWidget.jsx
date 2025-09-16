import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchWidget = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const recentSearches = [
    "machine learning algorithms",
    "climate change impacts",
    "quantum computing applications",
    "biomedical research methods"
  ];

  const trendingTopics = [
    "AI in healthcare 2024",
    "sustainable energy solutions",
    "neural network architectures",
    "gene therapy advances",
    "blockchain applications"
  ];

  const handleSearch = (query = searchQuery) => {
    if (query?.trim()) {
      navigate(`/paper-search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    handleSearch();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-card-foreground mb-2">
          Discover Research Papers
        </h2>
        <p className="text-sm text-muted-foreground">
          Search millions of academic papers and research documents
        </p>
      </div>
      <form onSubmit={handleSubmit} className="relative mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search for papers, authors, topics..."
            className="w-full pl-12 pr-4 py-3 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-250"
          />
          <Icon
            name="Search"
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
        </div>
        
        <Button
          type="submit"
          variant="default"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          iconName="ArrowRight"
          iconPosition="right"
        >
          Search
        </Button>

        {/* Search Suggestions */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-md shadow-modal z-50 max-h-64 overflow-y-auto">
            {searchQuery?.length === 0 && (
              <>
                {recentSearches?.length > 0 && (
                  <div className="p-3 border-b border-border">
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">Recent Searches</h4>
                    {recentSearches?.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="w-full flex items-center space-x-2 px-2 py-1 text-left hover:bg-muted rounded-sm transition-colors duration-250"
                      >
                        <Icon name="Clock" size={14} className="text-muted-foreground" />
                        <span className="text-sm text-popover-foreground">{search}</span>
                      </button>
                    ))}
                  </div>
                )}
                
                <div className="p-3">
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">Trending Topics</h4>
                  {trendingTopics?.map((topic, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(topic)}
                      className="w-full flex items-center space-x-2 px-2 py-1 text-left hover:bg-muted rounded-sm transition-colors duration-250"
                    >
                      <Icon name="TrendingUp" size={14} className="text-primary" />
                      <span className="text-sm text-popover-foreground">{topic}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </form>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Filter"
          iconPosition="left"
          onClick={() => navigate('/paper-search')}
        >
          Advanced Search
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Upload"
          iconPosition="left"
        >
          Upload Papers
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="BookOpen"
          iconPosition="left"
          onClick={() => navigate('/literature-review')}
        >
          Start Review
        </Button>
      </div>
    </div>
  );
};

export default SearchWidget;