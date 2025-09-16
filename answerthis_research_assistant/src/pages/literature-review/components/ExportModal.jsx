import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportModal = ({ isOpen, onClose, onExport }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeOptions, setIncludeOptions] = useState({
    citations: true,
    references: true,
    appendices: false,
    coverPage: true,
    tableOfContents: true
  });
  const [template, setTemplate] = useState('apa');
  const [isExporting, setIsExporting] = useState(false);

  const formats = [
    { id: 'pdf', name: 'PDF Document', icon: 'FileText', description: 'Formatted PDF ready for submission' },
    { id: 'word', name: 'Microsoft Word', icon: 'FileText', description: 'Editable DOCX format' },
    { id: 'latex', name: 'LaTeX', icon: 'Code', description: 'LaTeX source code for academic publishing' }
  ];

  const templates = [
    { id: 'apa', name: 'APA Style', description: 'American Psychological Association format' },
    { id: 'mla', name: 'MLA Style', description: 'Modern Language Association format' },
    { id: 'chicago', name: 'Chicago Style', description: 'Chicago Manual of Style format' },
    { id: 'ieee', name: 'IEEE Style', description: 'Institute of Electrical and Electronics Engineers format' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    const exportData = {
      format: exportFormat,
      template,
      options: includeOptions
    };

    try {
      await onExport(exportData);
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleOptionChange = (option, checked) => {
    setIncludeOptions(prev => ({
      ...prev,
      [option]: checked
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Export Literature Review</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Choose your export format and customize the output options
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Export Format</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formats?.map((format) => (
                <button
                  key={format?.id}
                  onClick={() => setExportFormat(format?.id)}
                  className={`p-4 border rounded-lg text-left transition-all ${
                    exportFormat === format?.id
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name={format?.icon} size={20} className="text-primary" />
                    <span className="font-medium text-foreground">{format?.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{format?.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Template Selection */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Citation Style</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {templates?.map((temp) => (
                <button
                  key={temp?.id}
                  onClick={() => setTemplate(temp?.id)}
                  className={`p-3 border rounded-lg text-left transition-all ${
                    template === temp?.id
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium text-foreground mb-1">{temp?.name}</div>
                  <p className="text-sm text-muted-foreground">{temp?.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Include Options */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Include Options</h3>
            <div className="space-y-3">
              <Checkbox
                label="Citations and References"
                description="Include all in-text citations and reference list"
                checked={includeOptions?.citations}
                onChange={(e) => handleOptionChange('citations', e?.target?.checked)}
              />
              <Checkbox
                label="Bibliography"
                description="Complete bibliography with all sources"
                checked={includeOptions?.references}
                onChange={(e) => handleOptionChange('references', e?.target?.checked)}
              />
              <Checkbox
                label="Cover Page"
                description="Title page with author and institutional information"
                checked={includeOptions?.coverPage}
                onChange={(e) => handleOptionChange('coverPage', e?.target?.checked)}
              />
              <Checkbox
                label="Table of Contents"
                description="Automatically generated table of contents"
                checked={includeOptions?.tableOfContents}
                onChange={(e) => handleOptionChange('tableOfContents', e?.target?.checked)}
              />
              <Checkbox
                label="Appendices"
                description="Additional supporting materials and data"
                checked={includeOptions?.appendices}
                onChange={(e) => handleOptionChange('appendices', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Preview Info */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Export Preview</h4>
                <p className="text-sm text-muted-foreground">
                  Your literature review will be exported as a {formats?.find(f => f?.id === exportFormat)?.name} 
                  using {templates?.find(t => t?.id === template)?.name} formatting. 
                  The document will include {Object.values(includeOptions)?.filter(Boolean)?.length} additional sections.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleExport}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
            >
              {isExporting ? 'Exporting...' : 'Export Review'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;