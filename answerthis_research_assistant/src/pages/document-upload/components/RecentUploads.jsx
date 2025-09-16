import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentUploads = ({ uploads }) => {
  const formatFileSize = (size) => {
    return `${size}MB`;
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const uploadTime = new Date(timestamp);
    const diffInHours = (now - uploadTime) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Icon name="CheckCircle" size={12} className="text-success" />;
      case 'processing':
        return <Icon name="Loader" size={12} className="text-warning animate-spin" />;
      case 'failed':
        return <Icon name="XCircle" size={12} className="text-destructive" />;
      default:
        return <Icon name="Clock" size={12} className="text-muted-foreground" />;
    }
  };

  const getStatusText = (status, analysis) => {
    if (status === 'completed') {
      return analysis === 'completed' ? 'Analyzed' : 'Processing';
    }
    return status?.charAt(0)?.toUpperCase() + status?.slice(1);
  };

  const getStatusColor = (status, analysis) => {
    if (status === 'completed' && analysis === 'completed') return 'text-success';
    if (status === 'completed') return 'text-warning';
    if (status === 'processing') return 'text-warning';
    if (status === 'failed') return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getFileIcon = (filename) => {
    const extension = filename?.split('.')?.pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'FileText';
      case 'doc': case'docx':
        return 'File';
      case 'txt':
        return 'FileText';
      default:
        return 'File';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Recent Uploads</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
          onClick={() => window.location.href = '/dashboard'}
        >
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {uploads?.length > 0 ? (
          uploads?.map((upload) => (
            <div
              key={upload?.id}
              className="bg-background border border-border rounded-lg p-3 hover:bg-muted/20 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  {/* File Icon */}
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon 
                      name={getFileIcon(upload?.name)} 
                      size={16} 
                      className="text-muted-foreground" 
                    />
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground line-clamp-1">
                      {upload?.name}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(upload?.size)}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {upload?.project}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusIcon(upload?.status)}
                      <span className={`text-xs font-medium ${getStatusColor(upload?.status, upload?.analysis)}`}>
                        {getStatusText(upload?.status, upload?.analysis)}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(upload?.uploadedAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center space-x-1 ml-2">
                  {upload?.status === 'completed' && upload?.analysis === 'completed' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={(e) => {
                        e?.stopPropagation();
                        // Navigate to document details
                      }}
                      className="h-6 w-6 p-0"
                    />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MoreVertical"
                    onClick={(e) => {
                      e?.stopPropagation();
                      // Show context menu
                    }}
                    className="h-6 w-6 p-0"
                  />
                </div>
              </div>

              {/* Progress Bar for Processing Files */}
              {upload?.status === 'processing' && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">
                      {upload?.analysis === 'processing' ? 'AI Analysis...' : 'Uploading...'}
                    </span>
                    <span className="text-muted-foreground">75%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-warning h-1.5 rounded-full transition-all duration-300 animate-pulse"
                      style={{ width: '75%' }}
                    />
                  </div>
                </div>
              )}

              {/* Analysis Results Preview */}
              {upload?.status === 'completed' && upload?.analysis === 'completed' && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1 text-primary">
                      <Icon name="Sparkles" size={10} />
                      <span>AI Analyzed</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Icon name="Target" size={10} />
                      <span>Relevance: High</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Icon name="Tag" size={10} />
                      <span>3 keywords</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Upload" size={32} className="mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground mb-2">No recent uploads</p>
            <p className="text-xs text-muted-foreground">
              Upload your first document to get started
            </p>
          </div>
        )}
      </div>
      {/* Upload Summary */}
      {uploads?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-foreground">
                {uploads?.filter(u => u?.status === 'completed')?.length}
              </div>
              <div className="text-xs text-success">Completed</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">
                {uploads?.filter(u => u?.status === 'processing')?.length}
              </div>
              <div className="text-xs text-warning">Processing</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">
                {uploads?.reduce((total, upload) => total + upload?.size, 0)?.toFixed(1)}MB
              </div>
              <div className="text-xs text-muted-foreground">Total Size</div>
            </div>
          </div>
        </div>
      )}
      {/* Quick Actions */}
      {uploads?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={() => window.location?.reload()}
              fullWidth
            >
              Refresh Status
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentUploads;