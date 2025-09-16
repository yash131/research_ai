import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CitationFilters = ({ 
  onFilterChange, 
  onSearch, 
  activeFilters = {},
  projects = [] 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const sourceTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'journal', label: 'Journal Article' },
    { value: 'book', label: 'Book' },
    { value: 'conference', label: 'Conference Paper' },
    { value: 'thesis', label: 'Thesis/Dissertation' },
    { value: 'website', label: 'Website' },
    { value: 'report', label: 'Report' }
  ];

  const yearRangeOptions = [
    { value: '', label: 'All Years' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022-2024', label: '2022-2024' },
    { value: '2020-2024', label: '2020-2024' },
    { value: '2010-2024', label: '2010-2024' },
    { value: 'before-2010', label: 'Before 2010' }
  ];

  const projectOptions = [
    { value: '', label: 'All Projects' },
    ...projects?.map(project => ({
      value: project?.id,
      label: project?.name
    }))
  ];

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...activeFilters, [key]: value });
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    onFilterChange({});
    onSearch('');
  };

  const activeFilterCount = Object.values(activeFilters)?.filter(Boolean)?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search citations by title, author, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="pl-10 pr-12"
          />
          <Icon
            name="Search"
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
          >
            <Icon name="ArrowRight" size={14} />
          </Button>
        </div>
      </form>
      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          className="text-sm"
        >
          Advanced Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button>

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            onClick={clearAllFilters}
            iconName="X"
            iconPosition="left"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        )}
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
          <Select
            label="Source Type"
            options={sourceTypeOptions}
            value={activeFilters?.sourceType || ''}
            onChange={(value) => handleFilterChange('sourceType', value)}
            className="w-full"
          />

          <Select
            label="Publication Year"
            options={yearRangeOptions}
            value={activeFilters?.yearRange || ''}
            onChange={(value) => handleFilterChange('yearRange', value)}
            className="w-full"
          />

          <Select
            label="Project"
            options={projectOptions}
            value={activeFilters?.project || ''}
            onChange={(value) => handleFilterChange('project', value)}
            className="w-full"
          />

          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(false)}
              iconName="Filter"
              iconPosition="left"
              className="w-full"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
      {/* Active Filter Tags */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          {activeFilters?.sourceType && (
            <div className="flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              <span>Type: {sourceTypeOptions?.find(opt => opt?.value === activeFilters?.sourceType)?.label}</span>
              <button
                onClick={() => handleFilterChange('sourceType', '')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {activeFilters?.yearRange && (
            <div className="flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              <span>Year: {yearRangeOptions?.find(opt => opt?.value === activeFilters?.yearRange)?.label}</span>
              <button
                onClick={() => handleFilterChange('yearRange', '')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {activeFilters?.project && (
            <div className="flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              <span>Project: {projectOptions?.find(opt => opt?.value === activeFilters?.project)?.label}</span>
              <button
                onClick={() => handleFilterChange('project', '')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CitationFilters;