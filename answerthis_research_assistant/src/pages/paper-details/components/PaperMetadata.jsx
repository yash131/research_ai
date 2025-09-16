import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaperMetadata = ({ paper, onBookmark, onAddToProject, onShare }) => {
  const formatAuthors = (authors) => {
    if (authors?.length <= 3) {
      return authors?.join(', ');
    }
    return `${authors?.slice(0, 3)?.join(', ')} et al.`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-semibold text-foreground mb-2 leading-tight">
            {paper?.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
            <span className="flex items-center">
              <Icon name="Users" size={16} className="mr-1" />
              {formatAuthors(paper?.authors)}
            </span>
            <span className="flex items-center">
              <Icon name="Calendar" size={16} className="mr-1" />
              {formatDate(paper?.publishedDate)}
            </span>
            <span className="flex items-center">
              <Icon name="BookOpen" size={16} className="mr-1" />
              {paper?.journal}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onBookmark(paper?.id)}
            className={paper?.isBookmarked ? 'text-warning' : ''}
          >
            <Icon name={paper?.isBookmarked ? "Bookmark" : "BookmarkPlus"} size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onAddToProject(paper?.id)}
          >
            <Icon name="FolderPlus" size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onShare(paper)}
          >
            <Icon name="Share2" size={20} />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <h3 className="text-lg font-medium text-foreground mb-3">Abstract</h3>
          <p className="text-foreground leading-relaxed">
            {paper?.abstract}
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Citation Metrics</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted rounded-lg p-3 text-center">
                <div className="text-lg font-semibold text-foreground">{paper?.citationCount}</div>
                <div className="text-xs text-muted-foreground">Citations</div>
              </div>
              <div className="bg-muted rounded-lg p-3 text-center">
                <div className="text-lg font-semibold text-foreground">{paper?.impactFactor}</div>
                <div className="text-xs text-muted-foreground">Impact Factor</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Keywords</h4>
            <div className="flex flex-wrap gap-1">
              {paper?.keywords?.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">DOI</h4>
            <a
              href={`https://doi.org/${paper?.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm break-all"
            >
              {paper?.doi}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperMetadata;