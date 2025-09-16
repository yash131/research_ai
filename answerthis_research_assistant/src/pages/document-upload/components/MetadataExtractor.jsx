import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MetadataExtractor = ({ files, onFileUpdate }) => {
  const [editingFile, setEditingFile] = useState(null);
  const [expandedFile, setExpandedFile] = useState(null);

  const handleEditMetadata = (fileId, field, value) => {
    onFileUpdate(fileId, {
      metadata: {
        ...files?.find(f => f?.id === fileId)?.metadata,
        [field]: value
      }
    });
  };

  const handleSaveEdit = (fileId) => {
    setEditingFile(null);
    // Optionally trigger a save action here
  };

  const formatFileSize = (bytes) => {
    const mb = bytes / (1024 * 1024);
    return `${mb?.toFixed(1)}MB`;
  };

  const getConfidenceColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getConfidenceText = (score) => {
    if (score >= 90) return 'High';
    if (score >= 70) return 'Medium';
    return 'Low';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">AI Metadata Extraction</h2>
          <p className="text-sm text-muted-foreground">
            Review and edit extracted document information
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-primary">
            <Icon name="Sparkles" size={16} />
            <span className="text-sm font-medium">AI Powered</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {files?.map((file) => (
          <div key={file?.id} className="bg-background border border-border rounded-lg p-5">
            {/* File Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="FileText" size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground truncate">
                    {file?.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file?.size)} • Processed {new Date()?.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={expandedFile === file?.id ? "ChevronUp" : "ChevronDown"}
                  onClick={() => setExpandedFile(expandedFile === file?.id ? null : file?.id)}
                  className="h-8 w-8 p-0"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Edit"
                  onClick={() => setEditingFile(editingFile === file?.id ? null : file?.id)}
                  className="h-8 w-8 p-0"
                />
              </div>
            </div>

            {/* Quick Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Title</div>
                {editingFile === file?.id ? (
                  <Input
                    value={file?.metadata?.title || ''}
                    onChange={(e) => handleEditMetadata(file?.id, 'title', e?.target?.value)}
                    className="h-8 text-sm"
                    placeholder="Document title"
                  />
                ) : (
                  <div className="text-sm font-medium text-foreground line-clamp-2">
                    {file?.metadata?.title || 'No title extracted'}
                  </div>
                )}
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Authors</div>
                {editingFile === file?.id ? (
                  <Input
                    value={file?.metadata?.authors?.join(', ') || ''}
                    onChange={(e) => handleEditMetadata(file?.id, 'authors', e?.target?.value?.split(', ')?.filter(a => a?.trim()))}
                    className="h-8 text-sm"
                    placeholder="Author names"
                  />
                ) : (
                  <div className="text-sm text-foreground">
                    {file?.metadata?.authors?.join(', ') || 'No authors found'}
                  </div>
                )}
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Year</div>
                {editingFile === file?.id ? (
                  <Input
                    value={file?.metadata?.publicationYear || ''}
                    onChange={(e) => handleEditMetadata(file?.id, 'publicationYear', e?.target?.value)}
                    className="h-8 text-sm"
                    placeholder="Publication year"
                  />
                ) : (
                  <div className="text-sm text-foreground">
                    {file?.metadata?.publicationYear || 'Unknown'}
                  </div>
                )}
              </div>
            </div>

            {/* Confidence Scores */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-xs text-muted-foreground">Extraction Confidence:</div>
              <div className="flex items-center space-x-1">
                <Icon name="Target" size={12} className={getConfidenceColor(file?.analysisResults?.relevanceScore || 85)} />
                <span className={`text-xs font-medium ${getConfidenceColor(file?.analysisResults?.relevanceScore || 85)}`}>
                  {getConfidenceText(file?.analysisResults?.relevanceScore || 85)} ({file?.analysisResults?.relevanceScore || 85}%)
                </span>
              </div>
              {file?.analysisResults?.citationCount && (
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Quote" size={12} />
                  <span>{file?.analysisResults?.citationCount} citations found</span>
                </div>
              )}
            </div>

            {/* Expanded Details */}
            {expandedFile === file?.id && (
              <div className="space-y-4 pt-4 border-t border-border">
                {/* Keywords */}
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">Keywords</label>
                  {editingFile === file?.id ? (
                    <Input
                      value={file?.metadata?.keywords?.join(', ') || ''}
                      onChange={(e) => handleEditMetadata(file?.id, 'keywords', e?.target?.value?.split(', ')?.filter(k => k?.trim()))}
                      placeholder="Keywords separated by commas"
                      className="text-sm"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {file?.metadata?.keywords?.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {keyword}
                        </span>
                      )) || <span className="text-sm text-muted-foreground">No keywords extracted</span>}
                    </div>
                  )}
                </div>

                {/* Abstract */}
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">Abstract</label>
                  {editingFile === file?.id ? (
                    <textarea
                      value={file?.metadata?.abstract || ''}
                      onChange={(e) => handleEditMetadata(file?.id, 'abstract', e?.target?.value)}
                      placeholder="Document abstract or summary"
                      rows={4}
                      className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  ) : (
                    <div className="text-sm text-foreground bg-muted/30 rounded-lg p-3">
                      {file?.metadata?.abstract || 'No abstract available'}
                    </div>
                  )}
                </div>

                {/* Analysis Results */}
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">AI Analysis Summary</label>
                  <div className="text-sm text-foreground bg-primary/5 rounded-lg p-3">
                    {file?.analysisResults?.summary || 'Analysis in progress...'}
                  </div>
                </div>

                {/* Additional Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-2">Journal/Publication</label>
                    {editingFile === file?.id ? (
                      <Input
                        value={file?.metadata?.journal || ''}
                        onChange={(e) => handleEditMetadata(file?.id, 'journal', e?.target?.value)}
                        placeholder="Journal or publication name"
                        className="text-sm"
                      />
                    ) : (
                      <div className="text-sm text-foreground">
                        {file?.metadata?.journal || 'Not specified'}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-2">DOI</label>
                    {editingFile === file?.id ? (
                      <Input
                        value={file?.metadata?.doi || ''}
                        onChange={(e) => handleEditMetadata(file?.id, 'doi', e?.target?.value)}
                        placeholder="Digital Object Identifier"
                        className="text-sm"
                      />
                    ) : (
                      <div className="text-sm text-foreground">
                        {file?.metadata?.doi || 'Not found'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons for Editing */}
                {editingFile === file?.id && (
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingFile(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      iconName="Save"
                      iconPosition="left"
                      onClick={() => handleSaveEdit(file?.id)}
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Zap"
                  iconPosition="left"
                  onClick={() => {}}
                >
                  Re-analyze
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Copy"
                  iconPosition="left"
                  onClick={() => {}}
                >
                  Copy Citation
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">
                Processed by AI • {new Date()?.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Batch Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {files?.length} document{files?.length !== 1 ? 's' : ''} processed
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={() => {}}
            >
              Export Metadata
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={() => {}}
            >
              Reprocess All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetadataExtractor;