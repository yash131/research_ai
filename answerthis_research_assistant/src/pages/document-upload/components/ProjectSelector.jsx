import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const ProjectSelector = ({ projects, selectedProject, onProjectSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredProjects = projects?.filter(project =>
    project?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    project?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  ) || [];

  const selectedProjectData = projects?.find(p => p?.id === selectedProject);

  const handleProjectSelect = (projectId) => {
    onProjectSelect(projectId);
    setShowDropdown(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      {/* Selected Project Display / Search Input */}
      <div
        className="w-full px-3 py-2 bg-background border border-input rounded-md cursor-pointer transition-colors hover:bg-muted/30 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {selectedProjectData ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                <Icon name="FolderOpen" size={12} className="text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {selectedProjectData?.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {selectedProjectData?.description}
                </div>
              </div>
            </div>
            <Icon 
              name={showDropdown ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-muted-foreground" 
            />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Select a project...</span>
            <Icon 
              name={showDropdown ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-muted-foreground" 
            />
          </div>
        )}
      </div>
      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-72 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="w-full pl-9 pr-3 py-2 bg-background border border-input rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                autoFocus
              />
            </div>
          </div>

          {/* Project List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredProjects?.length > 0 ? (
              <div className="py-1">
                {filteredProjects?.map((project) => (
                  <button
                    key={project?.id}
                    onClick={() => handleProjectSelect(project?.id)}
                    className={`
                      w-full px-3 py-3 text-left hover:bg-muted/50 transition-colors
                      ${selectedProject === project?.id ? 'bg-primary/10' : ''}
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                        ${selectedProject === project?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}
                      `}>
                        <Icon 
                          name="FolderOpen" 
                          size={16} 
                          className={selectedProject === project?.id ? 'text-primary-foreground' : 'text-muted-foreground'} 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">
                          {project?.name}
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {project?.description}
                        </div>
                      </div>
                      {selectedProject === project?.id && (
                        <Icon name="Check" size={16} className="text-primary" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-sm text-muted-foreground">
                {searchTerm ? (
                  <div>
                    <Icon name="Search" size={32} className="mx-auto mb-2 text-muted-foreground/50" />
                    <p>No projects found for "{searchTerm}"</p>
                  </div>
                ) : (
                  <div>
                    <Icon name="FolderOpen" size={32} className="mx-auto mb-2 text-muted-foreground/50" />
                    <p>No projects available</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="border-t border-border p-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>{filteredProjects?.length} project{filteredProjects?.length !== 1 ? 's' : ''}</span>
                {selectedProject && (
                  <button
                    onClick={() => handleProjectSelect('')}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Clear Selection
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowDropdown(false)}
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Close</span>
                <Icon name="X" size={12} />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Selected Project Preview */}
      {selectedProjectData && !showDropdown && (
        <div className="mt-3 p-3 bg-muted/20 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Documents will be added to this project
              </span>
            </div>
            <button
              onClick={() => setShowDropdown(true)}
              className="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSelector;