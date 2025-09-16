import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DragDropZone = ({ 
  onDrop, 
  onFileSelect, 
  fileInputRef, 
  onFileInputChange, 
  allowedTypes, 
  maxFileSize, 
  uploadStatus, 
  files, 
  errors 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    onDrop(e);
  };

  const formatFileSize = (bytes) => {
    const mb = bytes / (1024 * 1024);
    return `${mb?.toFixed(1)}MB`;
  };

  const getFileTypeDisplay = () => {
    const types = {
      'application/pdf': 'PDF',
      'application/msword': 'DOC',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
      'text/plain': 'TXT'
    };
    
    return allowedTypes?.map(type => types?.[type] || type)?.join(', ');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-8">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200
          ${isDragOver 
            ? 'border-primary bg-primary/5 scale-105' 
            : uploadStatus === 'uploading' ?'border-warning bg-warning/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Upload Icon */}
        <div className="mb-6">
          {uploadStatus === 'uploading' ? (
            <div className="w-16 h-16 mx-auto bg-warning/10 rounded-full flex items-center justify-center">
              <Icon name="Loader" size={32} className="text-warning animate-spin" />
            </div>
          ) : isDragOver ? (
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
              <Icon name="Upload" size={32} className="text-primary" />
            </div>
          ) : (
            <div className="w-16 h-16 mx-auto bg-muted/20 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Icon name="CloudUpload" size={32} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          )}
        </div>

        {/* Main Message */}
        <div className="mb-4">
          {uploadStatus === 'uploading' ? (
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Uploading Documents...
            </h3>
          ) : isDragOver ? (
            <h3 className="text-xl font-semibold text-primary mb-2">
              Drop files here to upload
            </h3>
          ) : (
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Drag and drop your documents
            </h3>
          )}
          
          <p className="text-muted-foreground">
            {uploadStatus === 'uploading' ?'Please wait while your files are being processed...'
              : isDragOver 
                ? 'Release to start uploading' :'or click to browse and select files'
            }
          </p>
        </div>

        {/* File Types and Limits */}
        {uploadStatus !== 'uploading' && (
          <div className="mb-6 text-sm text-muted-foreground space-y-1">
            <p>
              <strong>Supported formats:</strong> {getFileTypeDisplay()}
            </p>
            <p>
              <strong>Max file size:</strong> {formatFileSize(maxFileSize)} • 
              <strong> Max files:</strong> 20 per upload
            </p>
          </div>
        )}

        {/* Browse Button */}
        {uploadStatus !== 'uploading' && (
          <Button
            variant="default"
            size="lg"
            iconName="FolderOpen"
            iconPosition="left"
            onClick={() => fileInputRef?.current?.click()}
            disabled={uploadStatus === 'uploading'}
          >
            Browse Files
          </Button>
        )}

        {/* Upload Progress Summary */}
        {uploadStatus === 'uploading' && files?.length > 0 && (
          <div className="mt-6 bg-background/50 rounded-lg p-4">
            <div className="text-sm text-foreground">
              <div className="flex justify-between items-center mb-2">
                <span>Uploading {files?.length} file{files?.length !== 1 ? 's' : ''}...</span>
                <span className="font-medium">
                  {files?.filter(f => f?.status === 'completed')?.length} / {files?.length}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(files?.filter(f => f?.status === 'completed')?.length / files?.length) * 100}%` 
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Quick Upload Options */}
      {uploadStatus !== 'uploading' && files?.length === 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Quick Upload Options</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => fileInputRef?.current?.click()}
              className="flex items-center justify-center space-x-2 p-3 bg-muted/30 hover:bg-muted/50 rounded-lg text-sm text-foreground transition-colors"
            >
              <Icon name="FileText" size={16} />
              <span>Select Files</span>
            </button>
            <button
              onClick={() => {}}
              className="flex items-center justify-center space-x-2 p-3 bg-muted/30 hover:bg-muted/50 rounded-lg text-sm text-foreground transition-colors"
            >
              <Icon name="Camera" size={16} />
              <span>Scan Document</span>
            </button>
            <button
              onClick={() => {}}
              className="flex items-center justify-center space-x-2 p-3 bg-muted/30 hover:bg-muted/50 rounded-lg text-sm text-foreground transition-colors"
            >
              <Icon name="Link" size={16} />
              <span>From URL</span>
            </button>
          </div>
        </div>
      )}
      {/* File Summary */}
      {files?.length > 0 && uploadStatus !== 'uploading' && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {files?.length} file{files?.length !== 1 ? 's' : ''} ready • {' '}
              {formatFileSize(files?.reduce((total, file) => total + file?.size, 0))} total
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex items-center space-x-1 text-success">
                <Icon name="CheckCircle" size={12} />
                <span>Validated</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DragDropZone;