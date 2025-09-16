import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'paper_added':
        return 'FileText';
      case 'citation_generated':
        return 'Quote';
      case 'project_created':
        return 'FolderPlus';
      case 'collaboration':
        return 'Users';
      case 'review_completed':
        return 'CheckCircle';
      case 'upload':
        return 'Upload';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'paper_added':
        return 'text-primary bg-primary/10';
      case 'citation_generated':
        return 'text-success bg-success/10';
      case 'project_created':
        return 'text-warning bg-warning/10';
      case 'collaboration':
        return 'text-secondary bg-secondary/10';
      case 'review_completed':
        return 'text-success bg-success/10';
      case 'upload':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffInMinutes = Math.floor((now - activityDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return activityDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-card-foreground">Recent Activity</h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-250">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`p-2 rounded-full ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-card-foreground">
                <span className="font-medium">{activity?.user}</span> {activity?.action}
                {activity?.target && (
                  <span className="font-medium text-primary"> {activity?.target}</span>
                )}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatTimeAgo(activity?.timestamp)}
              </p>
            </div>
            {activity?.hasLink && (
              <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;