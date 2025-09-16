import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import { Checkbox } from '../../../components/ui/Checkbox';

const CitationTable = ({ 
  citations, 
  selectedCitations, 
  onSelectionChange, 
  onEdit, 
  onDelete,
  onPreview,
  currentStyle 
}) => {
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(citations?.map(c => c?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectCitation = (citationId, checked) => {
    if (checked) {
      onSelectionChange([...selectedCitations, citationId]);
    } else {
      onSelectionChange(selectedCitations?.filter(id => id !== citationId));
    }
  };

  const getSourceTypeIcon = (type) => {
    switch (type) {
      case 'journal': return 'FileText';
      case 'book': return 'Book';
      case 'conference': return 'Users';
      case 'thesis': return 'GraduationCap';
      case 'website': return 'Globe';
      default: return 'File';
    }
  };

  const getSourceTypeColor = (type) => {
    switch (type) {
      case 'journal': return 'text-blue-600 bg-blue-50';
      case 'book': return 'text-green-600 bg-green-50';
      case 'conference': return 'text-purple-600 bg-purple-50';
      case 'thesis': return 'text-orange-600 bg-orange-50';
      case 'website': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const sortedCitations = [...citations]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (sortField === 'year') {
      aValue = parseInt(aValue) || 0;
      bValue = parseInt(bValue) || 0;
    } else {
      aValue = aValue?.toString()?.toLowerCase() || '';
      bValue = bValue?.toString()?.toLowerCase() || '';
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const allSelected = selectedCitations?.length === citations?.length && citations?.length > 0;
  const someSelected = selectedCitations?.length > 0 && selectedCitations?.length < citations?.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Title</span>
                  <Icon 
                    name={sortField === 'title' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={14} 
                    className={sortField === 'title' ? 'text-primary' : 'text-muted-foreground'} 
                  />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('authors')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Authors</span>
                  <Icon 
                    name={sortField === 'authors' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={14} 
                    className={sortField === 'authors' ? 'text-primary' : 'text-muted-foreground'} 
                  />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('year')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Year</span>
                  <Icon 
                    name={sortField === 'year' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={14} 
                    className={sortField === 'year' ? 'text-primary' : 'text-muted-foreground'} 
                  />
                </button>
              </th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Project</th>
              <th className="w-32 px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedCitations?.map((citation) => (
              <tr key={citation?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedCitations?.includes(citation?.id)}
                    onChange={(e) => handleSelectCitation(citation?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="max-w-xs">
                    <h4 className="text-sm font-medium text-foreground line-clamp-2">
                      {citation?.title}
                    </h4>
                    {citation?.journal && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {citation?.journal}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-foreground max-w-xs truncate">
                    {citation?.authors}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">
                    {citation?.year}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getSourceTypeColor(citation?.type)}`}>
                    <Icon name={getSourceTypeIcon(citation?.type)} size={12} />
                    <span className="capitalize">{citation?.type}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {citation?.project}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onPreview(citation)}
                      className="h-8 w-8"
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(citation)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(citation?.id)}
                      className="h-8 w-8 text-error hover:text-error"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden">
        {sortedCitations?.map((citation) => (
          <div key={citation?.id} className="p-4 border-b border-border last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <Checkbox
                checked={selectedCitations?.includes(citation?.id)}
                onChange={(e) => handleSelectCitation(citation?.id, e?.target?.checked)}
              />
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onPreview(citation)}
                  className="h-8 w-8"
                >
                  <Icon name="Eye" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(citation)}
                  className="h-8 w-8"
                >
                  <Icon name="Edit" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(citation?.id)}
                  className="h-8 w-8 text-error hover:text-error"
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground line-clamp-2">
                {citation?.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {citation?.authors} ({citation?.year})
              </p>
              {citation?.journal && (
                <p className="text-xs text-muted-foreground">
                  {citation?.journal}
                </p>
              )}
              <div className="flex items-center justify-between">
                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getSourceTypeColor(citation?.type)}`}>
                  <Icon name={getSourceTypeIcon(citation?.type)} size={12} />
                  <span className="capitalize">{citation?.type}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {citation?.project}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {citations?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No citations found</h3>
          <p className="text-muted-foreground">
            Start by adding citations to your library or adjust your search filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default CitationTable;