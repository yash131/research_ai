import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CitationGenerator = ({ paper }) => {
  const [selectedFormat, setSelectedFormat] = useState('apa');
  const [copySuccess, setCopySuccess] = useState('');

  const formatAuthors = (authors, format) => {
    switch (format) {
      case 'apa':
        return authors?.map((author, index) => {
          const authorParts = author?.split(' ');
          const [first, ...rest] = authorParts || [];
          const lastName = rest?.join(' ');
          const initials = first?.charAt(0) + (first?.includes('.') ? '' : '.');
          return index === authors?.length - 1 && authors?.length > 1 
            ? `& ${lastName}, ${initials}` 
            : `${lastName}, ${initials}`;
        })?.join(', ');
      
      case 'mla':
        if (authors?.length === 1) return authors?.[0];
        if (authors?.length === 2) return `${authors?.[0]} and ${authors?.[1]}`;
        return `${authors?.[0]} et al.`;
      
      case 'chicago':
        return authors?.join(', ');
      
      case 'harvard':
        return authors?.map((author, index) => {
          const authorParts = author?.split(' ');
          const [first, ...rest] = authorParts || [];
          const lastName = rest?.join(' ');
          const initials = first?.charAt(0)?.toUpperCase();
          return `${lastName}, ${initials}.`;
        })?.join(', ');
      
      default:
        return authors?.join(', ');
    }
  };

  const generateCitation = (format) => {
    const year = new Date(paper.publishedDate)?.getFullYear();
    const formattedAuthors = formatAuthors(paper?.authors, format);
    
    switch (format) {
      case 'apa':
        return `${formattedAuthors} (${year}). ${paper?.title}. ${paper?.journal}, ${paper?.volume}(${paper?.issue}), ${paper?.pages}. https://doi.org/${paper?.doi}`;
      
      case 'mla':
        return `${formattedAuthors}. "${paper?.title}." ${paper?.journal}, vol. ${paper?.volume}, no. ${paper?.issue}, ${year}, pp. ${paper?.pages}. DOI: ${paper?.doi}.`;
      
      case 'chicago':
        return `${formattedAuthors}. "${paper?.title}." ${paper?.journal} ${paper?.volume}, no. ${paper?.issue} (${year}): ${paper?.pages}. https://doi.org/${paper?.doi}.`;
      
      case 'harvard':
        return `${formattedAuthors} ${year}, '${paper?.title}', ${paper?.journal}, vol. ${paper?.volume}, no. ${paper?.issue}, pp. ${paper?.pages}, DOI: ${paper?.doi}.`;
      
      case 'ieee':
        return `${formattedAuthors}, "${paper?.title}," ${paper?.journal}, vol. ${paper?.volume}, no. ${paper?.issue}, pp. ${paper?.pages}, ${year}, doi: ${paper?.doi}.`;
      
      case 'vancouver':
        return `${formattedAuthors}. ${paper?.title}. ${paper?.journal}. ${year};${paper?.volume}(${paper?.issue}):${paper?.pages}. doi:${paper?.doi}`;
      
      default:
        return `${formattedAuthors} (${year}). ${paper?.title}. ${paper?.journal}.`;
    }
  };

  const citationFormats = [
    { id: 'apa', name: 'APA 7th Edition', description: 'American Psychological Association' },
    { id: 'mla', name: 'MLA 9th Edition', description: 'Modern Language Association' },
    { id: 'chicago', name: 'Chicago 17th Edition', description: 'Chicago Manual of Style' },
    { id: 'harvard', name: 'Harvard', description: 'Harvard Referencing Style' },
    { id: 'ieee', name: 'IEEE', description: 'Institute of Electrical and Electronics Engineers' },
    { id: 'vancouver', name: 'Vancouver', description: 'International Committee of Medical Journal Editors' }
  ];

  const handleCopyToClipboard = async (citation) => {
    try {
      await navigator.clipboard?.writeText(citation);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('Failed to copy');
      setTimeout(() => setCopySuccess(''), 2000);
    }
  };

  const currentCitation = generateCitation(selectedFormat);

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Quote" size={24} className="text-primary" />
        <div>
          <h2 className="text-xl font-semibold text-foreground">Citation Generator</h2>
          <p className="text-sm text-muted-foreground">
            Generate properly formatted citations in multiple academic styles
          </p>
        </div>
      </div>
      {/* Format Selection */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Citation Format</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {citationFormats?.map((format) => (
            <button
              key={format?.id}
              onClick={() => setSelectedFormat(format?.id)}
              className={`p-3 text-left border rounded-lg transition-all duration-200 ${
                selectedFormat === format?.id
                  ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-foreground'
              }`}
            >
              <div className="font-medium text-sm">{format?.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {format?.description}
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Generated Citation */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground">Generated Citation</h3>
          <div className="flex items-center space-x-2">
            {copySuccess && (
              <span className="text-xs text-success">{copySuccess}</span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyToClipboard(currentCitation)}
              iconName="Copy"
              iconPosition="left"
            >
              Copy
            </Button>
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-lg border border-border">
          <p className="text-sm text-foreground leading-relaxed font-mono">
            {currentCitation}
          </p>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
        >
          Export as BibTeX
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="FileText"
          iconPosition="left"
        >
          Export as RIS
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="BookOpen"
          iconPosition="left"
        >
          Add to Bibliography
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Share2"
          iconPosition="left"
        >
          Share Citation
        </Button>
      </div>
      {/* Citation Tips */}
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Citation Tips</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Always verify citation details before using in your work</li>
              <li>• Check your institution's preferred citation style</li>
              <li>• Include page numbers for direct quotes when available</li>
              <li>• Consider using reference management software for large bibliographies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitationGenerator;