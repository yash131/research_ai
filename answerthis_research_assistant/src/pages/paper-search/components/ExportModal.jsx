import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportModal = ({ isOpen, onClose, selectedPapers = [], onExport }) => {
  const [exportFormat, setExportFormat] = useState('bibtex');
  const [citationStyle, setCitationStyle] = useState('apa');
  const [includeAbstracts, setIncludeAbstracts] = useState(false);
  const [includeKeywords, setIncludeKeywords] = useState(true);
  const [includeUrls, setIncludeUrls] = useState(true);

  const formatOptions = [
    { value: 'bibtex', label: 'BibTeX (.bib)' },
    { value: 'ris', label: 'RIS (.ris)' },
    { value: 'endnote', label: 'EndNote (.enw)' },
    { value: 'csv', label: 'CSV (.csv)' },
    { value: 'json', label: 'JSON (.json)' },
    { value: 'pdf', label: 'PDF Report' },
    { value: 'word', label: 'Word Document (.docx)' }
  ];

  const citationStyleOptions = [
    { value: 'apa', label: 'APA 7th Edition' },
    { value: 'mla', label: 'MLA 9th Edition' },
    { value: 'chicago', label: 'Chicago 17th Edition' },
    { value: 'harvard', label: 'Harvard Style' },
    { value: 'ieee', label: 'IEEE Style' },
    { value: 'vancouver', label: 'Vancouver Style' },
    { value: 'nature', label: 'Nature Style' },
    { value: 'science', label: 'Science Style' }
  ];

  const mockSelectedPapers = selectedPapers?.length > 0 ? selectedPapers : [
    {
      id: "1",
      title: "Deep Learning Approaches for Climate Change Prediction",
      authors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez"],
      journal: "Nature Climate Change",
      year: 2024
    },
    {
      id: "2",
      title: "Quantum Computing Applications in Cryptography",
      authors: ["Prof. David Kim", "Dr. Lisa Zhang"],
      journal: "IEEE Transactions on Quantum Engineering",
      year: 2024
    }
  ];

  const handleExport = () => {
    const exportData = {
      format: exportFormat,
      citationStyle: citationStyle,
      papers: mockSelectedPapers,
      options: {
        includeAbstracts,
        includeKeywords,
        includeUrls
      }
    };
    
    onExport(exportData);
    onClose();
  };

  const getFormatDescription = (format) => {
    switch (format) {
      case 'bibtex':
        return 'Standard format for LaTeX documents and reference managers';
      case 'ris':
        return 'Compatible with most reference management software';
      case 'endnote':
        return 'Native format for EndNote reference manager';
      case 'csv':
        return 'Spreadsheet format for data analysis and manipulation';
      case 'json':
        return 'Structured data format for programmatic use';
      case 'pdf':
        return 'Formatted bibliography report with full citations';
      case 'word':
        return 'Microsoft Word document with formatted references';
      default:
        return '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">
              Export Citations
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Export {mockSelectedPapers?.length} selected papers in your preferred format
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Selected Papers Preview */}
          <div>
            <h3 className="text-sm font-medium text-card-foreground mb-3">
              Selected Papers ({mockSelectedPapers?.length})
            </h3>
            <div className="bg-muted/50 rounded-lg p-4 max-h-32 overflow-y-auto">
              {mockSelectedPapers?.map((paper, index) => (
                <div key={paper?.id} className="text-sm text-muted-foreground mb-1">
                  {index + 1}. {paper?.title} - {paper?.authors?.[0]} et al. ({paper?.year})
                </div>
              ))}
            </div>
          </div>

          {/* Export Format */}
          <div>
            <Select
              label="Export Format"
              description={getFormatDescription(exportFormat)}
              options={formatOptions}
              value={exportFormat}
              onChange={setExportFormat}
            />
          </div>

          {/* Citation Style (only for certain formats) */}
          {['pdf', 'word']?.includes(exportFormat) && (
            <div>
              <Select
                label="Citation Style"
                description="Choose the academic citation format"
                options={citationStyleOptions}
                value={citationStyle}
                onChange={setCitationStyle}
              />
            </div>
          )}

          {/* Export Options */}
          <div>
            <h3 className="text-sm font-medium text-card-foreground mb-3">
              Export Options
            </h3>
            <div className="space-y-3">
              <Checkbox
                label="Include Abstracts"
                description="Add paper abstracts to the export"
                checked={includeAbstracts}
                onChange={(e) => setIncludeAbstracts(e?.target?.checked)}
              />
              
              <Checkbox
                label="Include Keywords/Tags"
                description="Add subject keywords and tags"
                checked={includeKeywords}
                onChange={(e) => setIncludeKeywords(e?.target?.checked)}
              />
              
              <Checkbox
                label="Include URLs/DOIs"
                description="Add links to original papers"
                checked={includeUrls}
                onChange={(e) => setIncludeUrls(e?.target?.checked)}
              />
            </div>
          </div>

          {/* Preview */}
          <div>
            <h3 className="text-sm font-medium text-card-foreground mb-3">
              Preview
            </h3>
            <div className="bg-muted/50 rounded-lg p-4 font-mono text-xs text-muted-foreground">
              {exportFormat === 'bibtex' && (
                <div>
                  @article{`{chen2024deep,`}<br />
                  &nbsp;&nbsp;title={`{Deep Learning Approaches for Climate Change Prediction}`},<br />
                  &nbsp;&nbsp;author={`{Chen, Sarah and Rodriguez, Michael}`},<br />
                  &nbsp;&nbsp;journal={`{Nature Climate Change}`},<br />
                  &nbsp;&nbsp;year={`{2024}`}<br />
                  {`}`}
                </div>
              )}
              
              {exportFormat === 'apa' && citationStyle === 'apa' && (
                <div>
                  Chen, S., & Rodriguez, M. (2024). Deep Learning Approaches for Climate Change Prediction. <em>Nature Climate Change</em>.
                </div>
              )}
              
              {exportFormat === 'csv' && (
                <div>
                  Title,Authors,Journal,Year<br />
                  "Deep Learning Approaches for Climate Change Prediction","Chen, S.; Rodriguez, M.","Nature Climate Change",2024
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            File will be downloaded to your device
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              iconName="Download"
              iconPosition="left"
            >
              Export Citations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;