import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CitationStylePreview = ({ citation, onStyleChange, currentStyle = 'apa' }) => {
  const [copiedStyle, setCopiedStyle] = useState(null);

  const styleOptions = [
    { value: 'apa', label: 'APA 7th Edition' },
    { value: 'mla', label: 'MLA 9th Edition' },
    { value: 'chicago', label: 'Chicago 17th Edition' },
    { value: 'harvard', label: 'Harvard Style' },
    { value: 'ieee', label: 'IEEE Style' },
    { value: 'vancouver', label: 'Vancouver Style' }
  ];

  const formatCitation = (citation, style) => {
    if (!citation) return '';

    const { authors, title, journal, year, volume, issue, pages, doi, url } = citation;
    
    switch (style) {
      case 'apa':
        return `${authors} (${year}). ${title}. ${journal}${volume ? `, ${volume}` : ''}${issue ? `(${issue})` : ''}${pages ? `, ${pages}` : ''}. ${doi ? `https://doi.org/${doi}` : url || ''}`;
      
      case 'mla':
        return `${authors?.split(',')?.[0]}. "${title}" ${journal}${volume ? `, vol. ${volume}` : ''}${issue ? `, no. ${issue}` : ''}, ${year}${pages ? `, pp. ${pages}` : ''}${doi ? `, doi:${doi}` : url ? `, ${url}` : ''}.`;
      
      case 'chicago':
        return `${authors}. "${title}" ${journal}${volume ? ` ${volume}` : ''}${issue ? `, no. ${issue}` : ''} (${year})${pages ? `: ${pages}` : ''}${doi ? `. https://doi.org/${doi}` : url ? `. ${url}` : ''}.`;
      
      case 'harvard':
        return `${authors} ${year}, '${title}', ${journal}${volume ? `, vol. ${volume}` : ''}${issue ? `, no. ${issue}` : ''}${pages ? `, pp. ${pages}` : ''}${doi ? `, doi: ${doi}` : url ? `, viewed <date>, ${url}` : ''}.`;
      
      case 'ieee':
        return `${authors}, "${title}," ${journal}${volume ? `, vol. ${volume}` : ''}${issue ? `, no. ${issue}` : ''}${pages ? `, pp. ${pages}` : ''}, ${year}${doi ? `, doi: ${doi}` : url ? `, [Online]. Available: ${url}` : ''}.`;
      
      case 'vancouver':
        return `${authors}. ${title}. ${journal}. ${year}${volume ? `;${volume}` : ''}${issue ? `(${issue})` : ''}${pages ? `:${pages}` : ''}${doi ? `. doi:${doi}` : url ? `. Available from: ${url}` : ''}.`;
      
      default:
        return formatCitation(citation, 'apa');
    }
  };

  const handleCopy = async (style) => {
    const formattedCitation = formatCitation(citation, style);
    try {
      await navigator.clipboard?.writeText(formattedCitation);
      setCopiedStyle(style);
      setTimeout(() => setCopiedStyle(null), 2000);
    } catch (err) {
      console.error('Failed to copy citation:', err);
    }
  };

  const handleStyleChange = (newStyle) => {
    onStyleChange(newStyle);
  };

  if (!citation) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Citation Selected</h3>
          <p className="text-muted-foreground">
            Select a citation from the table to preview different formatting styles.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground">Citation Preview</h3>
          <Select
            options={styleOptions}
            value={currentStyle}
            onChange={handleStyleChange}
            className="w-48"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Preview and copy formatted citations in different academic styles
        </p>
      </div>
      {/* Citation Details */}
      <div className="p-4 border-b border-border bg-muted/30">
        <h4 className="font-medium text-foreground mb-2 line-clamp-2">
          {citation?.title}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <span className="font-medium">Authors:</span> {citation?.authors}
          </div>
          <div>
            <span className="font-medium">Year:</span> {citation?.year}
          </div>
          {citation?.journal && (
            <div>
              <span className="font-medium">Journal:</span> {citation?.journal}
            </div>
          )}
          {citation?.volume && (
            <div>
              <span className="font-medium">Volume:</span> {citation?.volume}
            </div>
          )}
        </div>
      </div>
      {/* Formatted Citation */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-foreground">
            {styleOptions?.find(opt => opt?.value === currentStyle)?.label}
          </h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCopy(currentStyle)}
            iconName={copiedStyle === currentStyle ? "Check" : "Copy"}
            iconPosition="left"
            className={copiedStyle === currentStyle ? "text-success border-success" : ""}
          >
            {copiedStyle === currentStyle ? 'Copied!' : 'Copy'}
          </Button>
        </div>
        
        <div className="bg-muted/50 rounded-md p-4 border border-border">
          <p className="text-sm text-foreground leading-relaxed font-mono">
            {formatCitation(citation, currentStyle)}
          </p>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex flex-wrap gap-2">
          {styleOptions?.slice(0, 4)?.map((style) => (
            <Button
              key={style?.value}
              variant={currentStyle === style?.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleStyleChange(style?.value)}
              className="text-xs"
            >
              {style?.label?.split(' ')?.[0]}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitationStylePreview;