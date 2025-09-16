import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileValidation = ({ files, onRemoveFile, onClearAll, allowedTypes, maxFileSize }) => {
  const formatFileSize = (bytes) => {
    const mb = bytes / (1024 * 1024);
    return `${mb?.toFixed(1)}MB`;
  };

  const getFileTypeDisplay = (type) => {
    const typeMap = {
      'application/pdf': 'PDF',
      'application/msword': 'DOC',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
      'text/plain': 'TXT'
    };
    return typeMap?.[type] || type?.split('/')?.[1]?.toUpperCase() || 'Unknown';
  };

  const getFileIcon = (type) => {
    if (type?.includes('pdf')) return 'FileText';
    if (type?.includes('word') || type?.includes('document')) return 'File';
    if (type?.includes('text')) return 'FileText';
    return 'File';
  };

  const validateFile = (file) => {
    const issues = [];
    
    if (!allowedTypes?.includes(file?.type)) {
      issues?.push('Unsupported file type');
    }
    
    if (file?.size > maxFileSize) {
      issues?.push(`Exceeds ${formatFileSize(maxFileSize)} limit`);
    }
    
    return issues;
  };

  const allValidationIssues = files?.reduce((total, file) => {
    return total + validateFile(file)?.length;
  }, 0);

  const totalSize = files?.reduce((total, file) => total + file?.size, 0);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">File Validation</h2>
          <p className="text-sm text-muted-foreground">
            {files?.length} file{files?.length !== 1 ? 's' : ''} selected • {formatFileSize(totalSize)} total
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {allValidationIssues === 0 ? (
            <div className="flex items-center space-x-1 text-success">
              <Icon name="CheckCircle" size={16} />
              <span className="text-sm font-medium">All Valid</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-warning">
              <Icon name="AlertTriangle" size={16} />
              <span className="text-sm font-medium">{allValidationIssues} Issue{allValidationIssues !== 1 ? 's' : ''}</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconName="Trash2"
            iconPosition="left"
            onClick={onClearAll}
          >
            Clear All
          </Button>
        </div>
      </div>
      {/* File List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {files?.map((file) => {
          const validationIssues = validateFile(file);
          const isValid = validationIssues?.length === 0;
          
          return (
            <div 
              key={file?.id} 
              className={`
                bg-background border rounded-lg p-4 transition-colors
                ${isValid ? 'border-border' : 'border-warning/40 bg-warning/5'}
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  {/* File Icon */}
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                    ${isValid ? 'bg-muted' : 'bg-warning/10'}
                  `}>
                    <Icon 
                      name={getFileIcon(file?.type)} 
                      size={20} 
                      className={isValid ? 'text-muted-foreground' : 'text-warning'} 
                    />
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-foreground truncate">
                          {file?.name}
                        </h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {formatFileSize(file?.size)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {getFileTypeDisplay(file?.type)}
                          </span>
                          {file?.lastModified && (
                            <span className="text-xs text-muted-foreground">
                              {new Date(file.lastModified)?.toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Validation Status */}
                    <div className="mt-2">
                      {isValid ? (
                        <div className="flex items-center space-x-1">
                          <Icon name="CheckCircle" size={12} className="text-success" />
                          <span className="text-xs text-success">Valid</span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {validationIssues?.map((issue, index) => (
                            <div key={index} className="flex items-center space-x-1">
                              <Icon name="AlertTriangle" size={12} className="text-warning" />
                              <span className="text-xs text-warning">{issue}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* File Preview Info */}
                    {file?.type === 'application/pdf' && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Eye" size={12} />
                          <span>PDF preview available after upload</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => onRemoveFile(file?.id)}
                    className="h-8 w-8 p-0"
                  />
                </div>
              </div>
              {/* Additional File Details */}
              <div className="mt-3 pt-3 border-t border-border/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <span className="ml-1 text-foreground">{getFileTypeDisplay(file?.type)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Size:</span>
                    <span className="ml-1 text-foreground">{formatFileSize(file?.size)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`ml-1 ${isValid ? 'text-success' : 'text-warning'}`}>
                      {isValid ? 'Ready' : 'Issues'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Processing:</span>
                    <span className="ml-1 text-foreground">
                      {file?.type === 'application/pdf' ? 'Full' : 'Standard'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Validation Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>
                <strong>{files?.filter(f => validateFile(f)?.length === 0)?.length}</strong> valid files
              </span>
              {allValidationIssues > 0 && (
                <span className="text-warning">
                  <strong>{files?.filter(f => validateFile(f)?.length > 0)?.length}</strong> with issues
                </span>
              )}
              <span>
                <strong>{formatFileSize(totalSize)}</strong> total size
              </span>
            </div>
          </div>
          
          {/* Quick Filters */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="xs"
              iconName="Filter"
              iconPosition="left"
              onClick={() => {}}
            >
              Filter
            </Button>
            <Button
              variant="outline"
              size="xs"
              iconName="ArrowUpDown"
              iconPosition="left"
              onClick={() => {}}
            >
              Sort
            </Button>
          </div>
        </div>

        {/* Upload Readiness Indicator */}
        <div className="mt-3">
          {allValidationIssues === 0 ? (
            <div className="flex items-center space-x-2 text-success">
              <Icon name="CheckCircle" size={16} />
              <span className="text-sm font-medium">Ready to upload all files</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-warning">
              <Icon name="AlertTriangle" size={16} />
              <span className="text-sm font-medium">
                Resolve {allValidationIssues} issue{allValidationIssues !== 1 ? 's' : ''} before uploading
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileValidation;