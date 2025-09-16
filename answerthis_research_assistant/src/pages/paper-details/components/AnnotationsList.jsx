import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnnotationsList = ({ annotations, onEditAnnotation, onDeleteAnnotation, onJumpToPage }) => {
  const [sortBy, setSortBy] = useState('timestamp'); // timestamp, page, type
  const [filterBy, setFilterBy] = useState('all'); // all, highlights, notes, bookmarks
  const [searchQuery, setSearchQuery] = useState('');

  const annotationTypes = {
    highlight: { icon: 'Highlighter', color: 'text-warning', bg: 'bg-warning/10' },
    note: { icon: 'StickyNote', color: 'text-primary', bg: 'bg-primary/10' },
    bookmark: { icon: 'Bookmark', color: 'text-success', bg: 'bg-success/10' },
    question: { icon: 'HelpCircle', color: 'text-error', bg: 'bg-error/10' }
  };

  const mockAnnotations = [
    {
      id: 1,
      type: 'highlight',
      page: 3,
      selectedText: 'Machine learning models achieved 23% higher accuracy than traditional statistical methods',
      note: 'Key finding - significant improvement over baseline methods',
      timestamp: new Date('2024-01-15T10:30:00'),
      position: { x: 150, y: 200 }
    },
    {
      id: 2,
      type: 'note',
      page: 5,
      selectedText: 'Neural networks showed superior performance in identifying non-linear climate patterns',
      note: 'This aligns with our hypothesis about non-linear relationships in climate data. Consider exploring this further in our methodology section.',
      timestamp: new Date('2024-01-15T11:15:00'),
      position: { x: 200, y: 350 }
    },
    {
      id: 3,
      type: 'question',
      page: 7,
      selectedText: 'Ensemble methods provided the most robust predictions',
      note: 'What specific ensemble methods were used? Random Forest? Gradient Boosting? Need to check methodology section.',
      timestamp: new Date('2024-01-15T11:45:00'),
      position: { x: 180, y: 150 }
    },
    {
      id: 4,
      type: 'bookmark',
      page: 12,
      selectedText: 'Future work should focus on real-time implementation',
      note: 'Important for our project timeline - bookmark for discussion with team',
      timestamp: new Date('2024-01-15T12:20:00'),
      position: { x: 220, y: 400 }
    }
  ];

  const allAnnotations = [...annotations, ...mockAnnotations];

  const filteredAnnotations = allAnnotations?.filter(annotation => {
      if (filterBy !== 'all' && annotation?.type !== filterBy?.slice(0, -1)) return false;
      if (searchQuery && !annotation?.note?.toLowerCase()?.includes(searchQuery?.toLowerCase()) && 
          !annotation?.selectedText?.toLowerCase()?.includes(searchQuery?.toLowerCase())) return false;
      return true;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'page':
          return a?.page - b?.page;
        case 'type':
          return a?.type?.localeCompare(b?.type);
        case 'timestamp':
        default:
          return new Date(b.timestamp) - new Date(a.timestamp);
      }
    });

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleJumpToAnnotation = (annotation) => {
    onJumpToPage(annotation?.page);
    // Scroll to annotation position if needed
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="MessageSquare" size={24} className="text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">Annotations</h2>
            <p className="text-sm text-muted-foreground">
              {allAnnotations?.length} annotations across {Math.max(...allAnnotations?.map(a => a?.page))} pages
            </p>
          </div>
        </div>
        
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Add Note
        </Button>
      </div>
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search annotations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        
        <div className="flex space-x-2">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e?.target?.value)}
            className="px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Types</option>
            <option value="highlights">Highlights</option>
            <option value="notes">Notes</option>
            <option value="bookmarks">Bookmarks</option>
            <option value="questions">Questions</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="timestamp">Recent First</option>
            <option value="page">By Page</option>
            <option value="type">By Type</option>
          </select>
        </div>
      </div>
      {/* Annotations List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredAnnotations?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No annotations found</p>
            <p className="text-sm text-muted-foreground mt-1">
              {searchQuery ? 'Try adjusting your search terms' : 'Start highlighting text to create annotations'}
            </p>
          </div>
        ) : (
          filteredAnnotations?.map((annotation) => {
            const typeConfig = annotationTypes?.[annotation?.type] || annotationTypes?.note;
            
            return (
              <div
                key={annotation?.id}
                className="border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${typeConfig?.bg}`}>
                      <Icon name={typeConfig?.icon} size={16} className={typeConfig?.color} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-foreground capitalize">
                          {annotation?.type}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Page {annotation?.page}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(annotation?.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleJumpToAnnotation(annotation)}
                    >
                      <Icon name="ExternalLink" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditAnnotation(annotation)}
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteAnnotation(annotation?.id)}
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
                {/* Selected Text */}
                <div className="mb-3">
                  <div className="bg-muted/50 border-l-4 border-primary pl-3 py-2 rounded-r-md">
                    <p className="text-sm text-foreground italic">
                      "{annotation?.selectedText}"
                    </p>
                  </div>
                </div>
                {/* Annotation Note */}
                {annotation?.note && (
                  <div className="mb-3">
                    <p className="text-sm text-foreground leading-relaxed">
                      {annotation?.note}
                    </p>
                  </div>
                )}
                {/* Quick Actions */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleJumpToAnnotation(annotation)}
                    className="text-xs"
                  >
                    <Icon name="ArrowRight" size={12} className="mr-1" />
                    Go to Page {annotation?.page}
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Icon name="Reply" size={14} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Share2" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Summary Stats */}
      {filteredAnnotations?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(annotationTypes)?.map(([type, config]) => {
              const count = allAnnotations?.filter(a => a?.type === type)?.length;
              return (
                <div key={type} className="text-center">
                  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${config?.bg} mb-1`}>
                    <Icon name={config?.icon} size={16} className={config?.color} />
                  </div>
                  <div className="text-sm font-medium text-foreground">{count}</div>
                  <div className="text-xs text-muted-foreground capitalize">{type}s</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnotationsList;