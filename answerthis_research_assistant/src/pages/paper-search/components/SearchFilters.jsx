import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ filters, onFiltersChange, onClearFilters, isVisible, onToggle }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const yearOptions = [
    { value: 'all', label: 'All Years' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' },
    { value: '2018', label: '2018' },
    { value: '2017', label: '2017' },
    { value: '2016', label: '2016' },
    { value: '2015', label: '2015' }
  ];

  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'economics', label: 'Economics' },
    { value: 'environmental-science', label: 'Environmental Science' }
  ];

  const documentTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'journal-article', label: 'Journal Articles' },
    { value: 'conference-paper', label: 'Conference Papers' },
    { value: 'thesis', label: 'Theses' },
    { value: 'book-chapter', label: 'Book Chapters' },
    { value: 'review', label: 'Reviews' },
    { value: 'preprint', label: 'Preprints' }
  ];

  const citationRangeOptions = [
    { value: 'all', label: 'All Citations' },
    { value: '0-10', label: '0-10 citations' },
    { value: '11-50', label: '11-50 citations' },
    { value: '51-100', label: '51-100 citations' },
    { value: '101-500', label: '101-500 citations' },
    { value: '500+', label: '500+ citations' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      year: 'all',
      subject: 'all',
      documentType: 'all',
      citationRange: 'all',
      openAccess: false,
      peerReviewed: false,
      hasFullText: false
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClearFilters();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters?.year !== 'all') count++;
    if (localFilters?.subject !== 'all') count++;
    if (localFilters?.documentType !== 'all') count++;
    if (localFilters?.citationRange !== 'all') count++;
    if (localFilters?.openAccess) count++;
    if (localFilters?.peerReviewed) count++;
    if (localFilters?.hasFullText) count++;
    return count;
  };

  const activeCount = getActiveFilterCount();

  if (!isVisible) {
    return (
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          className="relative"
        >
          Filters
          {activeCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center">
          <Icon name="Filter" size={20} className="mr-2" />
          Advanced Filters
          {activeCount > 0 && (
            <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-1">
              {activeCount} active
            </span>
          )}
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            disabled={activeCount === 0}
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Publication Year"
          options={yearOptions}
          value={localFilters?.year}
          onChange={(value) => handleFilterChange('year', value)}
        />

        <Select
          label="Subject Area"
          options={subjectOptions}
          value={localFilters?.subject}
          onChange={(value) => handleFilterChange('subject', value)}
          searchable
        />

        <Select
          label="Document Type"
          options={documentTypeOptions}
          value={localFilters?.documentType}
          onChange={(value) => handleFilterChange('documentType', value)}
        />

        <Select
          label="Citation Count"
          options={citationRangeOptions}
          value={localFilters?.citationRange}
          onChange={(value) => handleFilterChange('citationRange', value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Checkbox
          label="Open Access Only"
          description="Free to read papers"
          checked={localFilters?.openAccess}
          onChange={(e) => handleFilterChange('openAccess', e?.target?.checked)}
        />

        <Checkbox
          label="Peer Reviewed"
          description="Reviewed by experts"
          checked={localFilters?.peerReviewed}
          onChange={(e) => handleFilterChange('peerReviewed', e?.target?.checked)}
        />

        <Checkbox
          label="Full Text Available"
          description="Complete document access"
          checked={localFilters?.hasFullText}
          onChange={(e) => handleFilterChange('hasFullText', e?.target?.checked)}
        />
      </div>
    </div>
  );
};

export default SearchFilters;