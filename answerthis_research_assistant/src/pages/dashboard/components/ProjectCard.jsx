import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../components/ui/Button';

const ProjectCard = ({ project }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'draft':
        return 'text-warning bg-warning/10';
      case 'completed':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-primary';
    if (progress >= 25) return 'bg-warning';
    return 'bg-muted-foreground';
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })?.format(new Date(date));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-250 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <Link 
            to={`/project-workspace?id=${project?.id}`}
            className="block group-hover:text-primary transition-colors duration-250"
          >
            <h3 className="text-lg font-semibold text-card-foreground truncate mb-1">
              {project?.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project?.description}
          </p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
          {project?.status}
        </div>
      </div>
      <div className="space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-card-foreground">{project?.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(project?.progress)}`}
              style={{ width: `${project?.progress}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-card-foreground">{project?.paperCount}</div>
            <div className="text-xs text-muted-foreground">Papers</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-card-foreground">{project?.citationCount}</div>
            <div className="text-xs text-muted-foreground">Citations</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-card-foreground">{project?.collaborators}</div>
            <div className="text-xs text-muted-foreground">Members</div>
          </div>
        </div>

        {/* Last Modified */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last modified</span>
          <span className="text-card-foreground">{formatDate(project?.lastModified)}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
            onClick={() => window.location.href = `/project-workspace?id=${project?.id}`}
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreHorizontal"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;