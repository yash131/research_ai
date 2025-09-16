import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectHeader = ({ project, onProjectUpdate, onExport }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(project);

  const handleSave = () => {
    onProjectUpdate(editedProject);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProject(project);
    setIsEditing(false);
  };

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

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editedProject?.title}
                onChange={(e) => setEditedProject({ ...editedProject, title: e?.target?.value })}
                className="text-2xl font-heading font-bold bg-transparent border-b border-border focus:outline-none focus:border-primary w-full"
              />
              <textarea
                value={editedProject?.description}
                onChange={(e) => setEditedProject({ ...editedProject, description: e?.target?.value })}
                className="text-muted-foreground bg-transparent border border-border rounded-md p-2 focus:outline-none focus:border-primary w-full resize-none"
                rows={3}
              />
              <div className="flex items-center space-x-2">
                <Button variant="default" size="sm" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  {project?.title}
                </h1>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
                  {project?.status}
                </span>
              </div>
              <p className="text-muted-foreground mb-3">
                {project?.description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} />
                  <span>Created {project?.createdDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={16} />
                  <span>Last updated {project?.lastUpdated}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="FileText" size={16} />
                  <span>{project?.paperCount} papers</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {!isEditing && (
          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <Icon name="Edit" size={18} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={onExport}
            >
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Share"
              iconPosition="left"
            >
              Share
            </Button>
          </div>
        )}
      </div>
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Project Progress</span>
          <span className="font-medium text-foreground">{project?.progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary rounded-full h-2 transition-all duration-300"
            style={{ width: `${project?.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;