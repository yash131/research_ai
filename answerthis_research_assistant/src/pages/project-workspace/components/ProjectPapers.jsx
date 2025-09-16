import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProjectPapers = ({ papers, onPaperAction }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSort, setSelectedSort] = useState('recent');
  const [selectedPapers, setSelectedPapers] = useState([]);

  const filterOptions = [
    { value: 'all', label: 'All Papers' },
    { value: 'unread', label: 'Unread' },
    { value: 'annotated', label: 'Annotated' },
    { value: 'cited', label: 'Cited' },
    { value: 'high-priority', label: 'High Priority' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Recently Added' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'author', label: 'Author A-Z' },
    { value: 'year', label: 'Publication Year' },
    { value: 'relevance', label: 'Relevance Score' }
  ];

  const filteredPapers = papers?.filter(paper => {
    const matchesSearch = paper?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         paper?.authors?.some(author => author?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'unread') return matchesSearch && !paper?.isRead;
    if (selectedFilter === 'annotated') return matchesSearch && paper?.hasAnnotations;
    if (selectedFilter === 'cited') return matchesSearch && paper?.isCited;
    if (selectedFilter === 'high-priority') return matchesSearch && paper?.priority === 'high';
    
    return matchesSearch;
  });

  const handleSelectPaper = (paperId) => {
    setSelectedPapers(prev => 
      prev?.includes(paperId) 
        ? prev?.filter(id => id !== paperId)
        : [...prev, paperId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPapers?.length === filteredPapers?.length) {
      setSelectedPapers([]);
    } else {
      setSelectedPapers(filteredPapers?.map(paper => paper?.id));
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'low':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search papers by title, author, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select
            options={filterOptions}
            value={selectedFilter}
            onChange={setSelectedFilter}
            placeholder="Filter"
            className="w-40"
          />
          <Select
            options={sortOptions}
            value={selectedSort}
            onChange={setSelectedSort}
            placeholder="Sort"
            className="w-40"
          />
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedPapers?.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <span className="text-sm font-medium text-foreground">
            {selectedPapers?.length} paper{selectedPapers?.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Quote">
              Generate Citations
            </Button>
            <Button variant="outline" size="sm" iconName="Tag">
              Add Tags
            </Button>
            <Button variant="outline" size="sm" iconName="Trash2">
              Remove
            </Button>
          </div>
        </div>
      )}
      {/* Papers List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Papers ({filteredPapers?.length})
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSelectAll}
            >
              {selectedPapers?.length === filteredPapers?.length ? 'Deselect All' : 'Select All'}
            </Button>
            <Button variant="outline" size="sm" iconName="Plus">
              Add Papers
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredPapers?.map((paper) => (
            <div
              key={paper?.id}
              className={`bg-card border rounded-lg p-4 transition-all duration-250 ${
                selectedPapers?.includes(paper?.id)
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={selectedPapers?.includes(paper?.id)}
                  onChange={() => handleSelectPaper(paper?.id)}
                  className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-base font-medium text-foreground hover:text-primary cursor-pointer">
                      {paper?.title}
                    </h4>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(paper?.priority)}`}>
                        {paper?.priority}
                      </span>
                      {!paper?.isRead && (
                        <span className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {paper?.authors?.join(', ')} • {paper?.year} • {paper?.journal}
                  </p>
                  
                  <p className="text-sm text-foreground mb-3 line-clamp-2">
                    {paper?.abstract}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={12} />
                        <span>{paper?.isRead ? 'Read' : 'Unread'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MessageSquare" size={12} />
                        <span>{paper?.annotationCount} notes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Quote" size={12} />
                        <span>{paper?.citationCount} citations</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icon name="FileText" size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icon name="MessageSquare" size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icon name="Quote" size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icon name="MoreHorizontal" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectPapers;