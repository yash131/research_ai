import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectTabs = ({ activeTab, onTabChange, tabCounts }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard', count: null },
    { id: 'papers', label: 'Papers', icon: 'FileText', count: tabCounts?.papers },
    { id: 'citations', label: 'Citations', icon: 'Quote', count: tabCounts?.citations },
    { id: 'reviews', label: 'Reviews', icon: 'BookOpen', count: tabCounts?.reviews },
    { id: 'notes', label: 'Notes', icon: 'StickyNote', count: tabCounts?.notes },
    { id: 'collaboration', label: 'Team', icon: 'Users', count: tabCounts?.team },
    { id: 'timeline', label: 'Timeline', icon: 'Clock', count: null }
  ];

  return (
    <div className="border-b border-border mb-6">
      <nav className="flex space-x-1 overflow-x-auto">
        {tabs?.map((tab) => {
          const isActive = activeTab === tab?.id;
          
          return (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-250 whitespace-nowrap ${
                isActive
                  ? 'text-primary border-primary bg-primary/5' :'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              {tab?.count !== null && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {tab?.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default ProjectTabs;