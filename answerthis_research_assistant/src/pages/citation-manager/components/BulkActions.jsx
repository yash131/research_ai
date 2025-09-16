import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ 
  selectedCount, 
  onExport, 
  onDelete, 
  onAssignProject, 
  onClearSelection,
  projects = [] 
}) => {
  const [exportFormat, setExportFormat] = useState('bibtex');
  const [isExporting, setIsExporting] = useState(false);

  const exportFormatOptions = [
    { value: 'bibtex', label: 'BibTeX (.bib)' },
    { value: 'ris', label: 'RIS (.ris)' },
    { value: 'endnote', label: 'EndNote (.enw)' },
    { value: 'word', label: 'Word Document (.docx)' },
    { value: 'pdf', label: 'PDF Document (.pdf)' },
    { value: 'csv', label: 'CSV Spreadsheet (.csv)' }
  ];

  const projectOptions = [
    { value: '', label: 'Select Project...' },
    ...projects?.map(project => ({
      value: project?.id,
      label: project?.name
    }))
  ];

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport(exportFormat);
    } finally {
      setIsExporting(false);
    }
  };

  const handleProjectAssign = (projectId) => {
    if (projectId) {
      onAssignProject(projectId);
    }
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Selection Info */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium text-foreground">
              {selectedCount} citation{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
            className="text-muted-foreground hover:text-foreground"
          >
            Clear Selection
          </Button>
        </div>

        {/* Bulk Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Export Section */}
          <div className="flex items-center space-x-2">
            <Select
              options={exportFormatOptions}
              value={exportFormat}
              onChange={setExportFormat}
              className="w-40"
            />
            <Button
              variant="outline"
              onClick={handleExport}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
              disabled={isExporting}
            >
              Export
            </Button>
          </div>

          {/* Project Assignment */}
          <Select
            options={projectOptions}
            value=""
            onChange={handleProjectAssign}
            placeholder="Assign to Project"
            className="w-48"
          />

          {/* Delete Action */}
          <Button
            variant="destructive"
            onClick={onDelete}
            iconName="Trash2"
            iconPosition="left"
            className="sm:w-auto"
          >
            Delete Selected
          </Button>
        </div>
      </div>
      {/* Quick Export Options */}
      <div className="mt-4 pt-4 border-t border-primary/20">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Zap" size={14} />
          <span>Quick export:</span>
          <div className="flex space-x-2">
            {['bibtex', 'ris', 'word']?.map((format) => (
              <button
                key={format}
                onClick={() => {
                  setExportFormat(format);
                  handleExport();
                }}
                className="px-2 py-1 bg-background border border-border rounded text-xs hover:bg-muted transition-colors"
              >
                {exportFormatOptions?.find(opt => opt?.value === format)?.label?.split(' ')?.[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;