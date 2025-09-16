import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProjectCitations = ({ citations, onCitationAction }) => {
  const [selectedFormat, setSelectedFormat] = useState('apa');
  const [selectedCitations, setSelectedCitations] = useState([]);

  const formatOptions = [
    { value: 'apa', label: 'APA Style' },
    { value: 'mla', label: 'MLA Style' },
    { value: 'chicago', label: 'Chicago Style' },
    { value: 'harvard', label: 'Harvard Style' },
    { value: 'ieee', label: 'IEEE Style' }
  ];

  const handleSelectCitation = (citationId) => {
    setSelectedCitations(prev => 
      prev?.includes(citationId) 
        ? prev?.filter(id => id !== citationId)
        : [...prev, citationId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCitations?.length === citations?.length) {
      setSelectedCitations([]);
    } else {
      setSelectedCitations(citations?.map(citation => citation?.id));
    }
  };

  const formatCitation = (citation, format) => {
    switch (format) {
      case 'apa':
        return `${citation?.authors?.join(', ')} (${citation?.year}). ${citation?.title}. ${citation?.journal}, ${citation?.volume}(${citation?.issue}), ${citation?.pages}.`;
      case 'mla':
        return `${citation?.authors?.join(', ')}. "${citation?.title}." ${citation?.journal}, vol. ${citation?.volume}, no. ${citation?.issue}, ${citation?.year}, pp. ${citation?.pages}.`;
      case 'chicago':
        return `${citation?.authors?.join(', ')}. "${citation?.title}." ${citation?.journal} ${citation?.volume}, no. ${citation?.issue} (${citation?.year}): ${citation?.pages}.`;
      default:
        return `${citation?.authors?.join(', ')} (${citation?.year}). ${citation?.title}. ${citation?.journal}, ${citation?.volume}(${citation?.issue}), ${citation?.pages}.`;
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    // You could add a toast notification here
  };

  const exportCitations = () => {
    const formattedCitations = selectedCitations?.length > 0
      ? citations?.filter(c => selectedCitations?.includes(c?.id))
      : citations;
    
    const citationText = formattedCitations?.map(citation => formatCitation(citation, selectedFormat))?.join('\n\n');
    
    const blob = new Blob([citationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `citations-${selectedFormat}.txt`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Citation Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Citations ({citations?.length})
          </h3>
          <Select
            options={formatOptions}
            value={selectedFormat}
            onChange={setSelectedFormat}
            className="w-40"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSelectAll}
          >
            {selectedCitations?.length === citations?.length ? 'Deselect All' : 'Select All'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={exportCitations}
          >
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
          >
            Generate New
          </Button>
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedCitations?.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <span className="text-sm font-medium text-foreground">
            {selectedCitations?.length} citation{selectedCitations?.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Copy">
              Copy All
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Export Selected
            </Button>
          </div>
        </div>
      )}
      {/* Citations List */}
      <div className="space-y-4">
        {citations?.map((citation) => (
          <div
            key={citation?.id}
            className={`bg-card border rounded-lg p-4 transition-all duration-250 ${
              selectedCitations?.includes(citation?.id)
                ? 'border-primary bg-primary/5' :'border-border'
            }`}
          >
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedCitations?.includes(citation?.id)}
                onChange={() => handleSelectCitation(citation?.id)}
                className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-base font-medium text-foreground mb-1">
                      {citation?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {citation?.authors?.join(', ')} • {citation?.year}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyToClipboard(formatCitation(citation, selectedFormat))}
                    >
                      <Icon name="Copy" size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="MoreHorizontal" size={14} />
                    </Button>
                  </div>
                </div>
                
                <div className="bg-muted rounded-md p-3 mb-3">
                  <p className="text-sm text-foreground font-mono leading-relaxed">
                    {formatCitation(citation, selectedFormat)}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span>Generated on {citation?.generatedDate}</span>
                    <span>Format: {selectedFormat?.toUpperCase()}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {citation?.isVerified && (
                      <div className="flex items-center space-x-1 text-success">
                        <Icon name="CheckCircle" size={12} />
                        <span>Verified</span>
                      </div>
                    )}
                    {citation?.hasIssues && (
                      <div className="flex items-center space-x-1 text-warning">
                        <Icon name="AlertTriangle" size={12} />
                        <span>Needs Review</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Citation Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{citations?.length}</p>
          <p className="text-sm text-muted-foreground">Total Citations</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">
            {citations?.filter(c => c?.isVerified)?.length}
          </p>
          <p className="text-sm text-muted-foreground">Verified</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-warning">
            {citations?.filter(c => c?.hasIssues)?.length}
          </p>
          <p className="text-sm text-muted-foreground">Need Review</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCitations;