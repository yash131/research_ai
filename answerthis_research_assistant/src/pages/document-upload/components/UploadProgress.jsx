import React from 'react';
import Icon from '../../../components/AppIcon';

const UploadProgress = ({ files, uploadProgress, uploadStats }) => {
  const formatFileSize = (bytes) => {
    const mb = bytes / (1024 * 1024);
    return `${mb?.toFixed(1)}MB`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading':
        return <Icon name="Loader" size={16} className="text-warning animate-spin" />;
      case 'processing':
        return <Icon name="Cpu" size={16} className="text-primary animate-pulse" />;
      case 'completed':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'error':
        return <Icon name="XCircle" size={16} className="text-destructive" />;
      default:
        return <Icon name="Clock" size={16} className="text-muted-foreground" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'processing':
        return 'Processing...';
      case 'completed':
        return 'Completed';
      case 'error':
        return 'Failed';
      default:
        return 'Waiting';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploading':
        return 'text-warning';
      case 'processing':
        return 'text-primary';
      case 'completed':
        return 'text-success';
      case 'error':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const overallProgress = files?.length > 0 ? (uploadStats?.completed / uploadStats?.total) * 100 : 0;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-card-foreground">Upload Progress</h2>
        <div className="text-sm text-muted-foreground">
          {uploadStats?.completed} of {uploadStats?.total} completed
        </div>
      </div>
      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-foreground font-medium">Overall Progress</span>
          <span className="text-muted-foreground">{Math.round(overallProgress)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>
      {/* Upload Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-background rounded-lg">
          <div className="text-lg font-semibold text-foreground">{uploadStats?.total}</div>
          <div className="text-xs text-muted-foreground">Total Files</div>
        </div>
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <div className="text-lg font-semibold text-success">{uploadStats?.completed}</div>
          <div className="text-xs text-success/80">Completed</div>
        </div>
        <div className="text-center p-3 bg-primary/10 rounded-lg">
          <div className="text-lg font-semibold text-primary">{uploadStats?.processing}</div>
          <div className="text-xs text-primary/80">Processing</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-semibold text-foreground">{formatFileSize(uploadStats?.totalSize)}</div>
          <div className="text-xs text-muted-foreground">Total Size</div>
        </div>
      </div>
      {/* Individual File Progress */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">File Progress</h3>
        <div className="max-h-64 overflow-y-auto space-y-3">
          {files?.map((file) => (
            <div key={file?.id} className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0 mr-3">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {file?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file?.size)} • {file?.type?.split('/')?.[1]?.toUpperCase()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(file?.status)}
                  <span className={`text-xs font-medium ${getStatusColor(file?.status)}`}>
                    {getStatusText(file?.status)}
                  </span>
                </div>
              </div>

              {/* Individual Progress Bar */}
              {file?.status === 'uploading' && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Uploading...</span>
                    <span className="text-muted-foreground">{uploadProgress?.[file?.id] || 0}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-warning h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress?.[file?.id] || 0}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Processing Animation */}
              {file?.status === 'processing' && (
                <div className="mt-3">
                  <div className="flex items-center space-x-2 text-xs text-primary">
                    <Icon name="Zap" size={12} className="animate-pulse" />
                    <span>AI analysis in progress...</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-1">
                    <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '75%' }} />
                  </div>
                </div>
              )}

              {/* Success State */}
              {file?.status === 'completed' && (
                <div className="mt-3">
                  <div className="flex items-center space-x-2 text-xs text-success">
                    <Icon name="Sparkles" size={12} />
                    <span>Analysis completed • Metadata extracted</span>
                  </div>
                </div>
              )}

              {/* Error State */}
              {file?.status === 'error' && (
                <div className="mt-3">
                  <div className="flex items-center space-x-2 text-xs text-destructive">
                    <Icon name="AlertTriangle" size={12} />
                    <span>Upload failed • Click to retry</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Upload Speed Info */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Wifi" size={12} />
              <span>Connection: Stable</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Zap" size={12} />
              <span>Speed: ~2.5 MB/s</span>
            </div>
          </div>
          <div className="text-right">
            <span>ETA: ~{Math.max(1, Math.round((uploadStats?.total - uploadStats?.completed) * 0.5))}min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProgress;