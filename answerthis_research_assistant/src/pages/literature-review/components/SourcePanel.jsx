import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SourcePanel = ({ sources = [], onSourceSelect, onThemeChange, selectedTheme = 'all' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  const themes = [
    { id: 'all', name: 'All Sources', count: sources?.length, color: 'bg-slate-100' },
    { id: 'methodology', name: 'Methodology', count: 8, color: 'bg-blue-100' },
    { id: 'findings', name: 'Key Findings', count: 12, color: 'bg-green-100' },
    { id: 'limitations', name: 'Limitations', count: 6, color: 'bg-yellow-100' },
    { id: 'future-work', name: 'Future Work', count: 4, color: 'bg-purple-100' }
  ];

  const filteredSources = sources?.filter(source => 
    source?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    source?.authors?.some(author => author?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
  );

  const sortedSources = [...filteredSources]?.sort((a, b) => {
    switch (sortBy) {
      case 'year':
        return b?.year - a?.year;
      case 'citations':
        return b?.citations - a?.citations;
      case 'relevance':
      default:
        return b?.relevanceScore - a?.relevanceScore;
    }
  });

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Source Papers</h2>
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Add Sources
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search sources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* Sort Options */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e?.target?.value)}
          className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="relevance">Sort by Relevance</option>
          <option value="year">Sort by Year</option>
          <option value="citations">Sort by Citations</option>
        </select>
      </div>
      {/* Theme Filters */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Themes</h3>
        <div className="space-y-2">
          {themes?.map((theme) => (
            <button
              key={theme?.id}
              onClick={() => onThemeChange(theme?.id)}
              className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors ${
                selectedTheme === theme?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-foreground'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${theme?.color}`} />
                <span>{theme?.name}</span>
              </div>
              <span className="text-xs opacity-75">{theme?.count}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Source List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {sortedSources?.map((source) => (
            <div
              key={source?.id}
              onClick={() => onSourceSelect(source)}
              className="p-3 bg-background border border-border rounded-lg cursor-pointer hover:shadow-sm transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary">
                  {source?.title}
                </h4>
                <Icon name="ExternalLink" size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <p className="text-xs text-muted-foreground mb-2">
                {source?.authors?.slice(0, 2)?.join(', ')}
                {source?.authors?.length > 2 && ` +${source?.authors?.length - 2} more`}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{source?.year} • {source?.journal}</span>
                <div className="flex items-center space-x-3">
                  <span>{source?.citations} citations</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-yellow-500" />
                    <span>{source?.relevanceScore?.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              {/* Theme Tags */}
              <div className="flex flex-wrap gap-1 mt-2">
                {source?.themes?.map((theme) => (
                  <span
                    key={theme}
                    className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SourcePanel;