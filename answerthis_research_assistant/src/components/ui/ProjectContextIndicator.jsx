import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ProjectContextIndicator = ({ 
  currentProject = null, 
  projects = [], 
  onProjectChange = () => {} 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const defaultProjects = [
    { id: '1', name: 'Climate Change Research', status: 'active', paperCount: 24 },
    { id: '2', name: 'AI Ethics Study', status: 'active', paperCount: 18 },
    { id: '3', name: 'Quantum Computing Review', status: 'draft', paperCount: 12 },
    { id: '4', name: 'Biomedical Applications', status: 'completed', paperCount: 31 },
  ];

  const projectList = projects?.length > 0 ? projects : defaultProjects;
  const activeProject = currentProject || projectList?.[0];

  const handleProjectSelect = (project) => {
    onProjectChange(project);
    setIsDropdownOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'draft':
        return 'text-warning';
      case 'completed':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return 'Play';
      case 'draft':
        return 'Edit';
      case 'completed':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 px-3 py-2 max-w-xs"
      >
        <div className="flex items-center space-x-2 min-w-0">
          <Icon 
            name="FolderOpen" 
            size={16} 
            className="text-primary flex-shrink-0" 
          />
          <div className="min-w-0 text-left">
            <div className="text-sm font-medium text-foreground truncate">
              {activeProject?.name || 'No Project'}
            </div>
            <div className="text-xs text-muted-foreground">
              {activeProject?.paperCount || 0} papers
            </div>
          </div>
        </div>
        <Icon 
          name={isDropdownOpen ? "ChevronUp" : "ChevronDown"} 
          size={14} 
          className="text-muted-foreground flex-shrink-0" 
        />
      </Button>
      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-md shadow-modal z-50">
          <div className="p-3 border-b border-border">
            <h3 className="text-sm font-medium text-popover-foreground">
              Switch Project
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Select a research project to work on
            </p>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {projectList?.map((project) => {
              const isSelected = activeProject?.id === project?.id;
              
              return (
                <button
                  key={project?.id}
                  onClick={() => handleProjectSelect(project)}
                  className={`w-full flex items-center justify-between p-3 text-left hover:bg-muted transition-colors duration-250 ${
                    isSelected ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <Icon 
                      name={getStatusIcon(project?.status)} 
                      size={16} 
                      className={`flex-shrink-0 ${getStatusColor(project?.status)}`} 
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-popover-foreground truncate">
                        {project?.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {project?.paperCount} papers • {project?.status}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <Icon 
                      name="Check" 
                      size={16} 
                      className="text-primary flex-shrink-0" 
                    />
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="p-3 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              iconName="Plus"
              iconPosition="left"
              onClick={() => {
                setIsDropdownOpen(false);
                // Handle new project creation
              }}
            >
              Create New Project
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectContextIndicator;