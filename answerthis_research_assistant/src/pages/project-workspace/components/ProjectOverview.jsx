import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectOverview = ({ project, stats, recentActivity }) => {
  const quickStats = [
    { label: 'Total Papers', value: stats?.totalPapers, icon: 'FileText', color: 'text-blue-600' },
    { label: 'Citations Generated', value: stats?.citations, icon: 'Quote', color: 'text-green-600' },
    { label: 'Literature Reviews', value: stats?.reviews, icon: 'BookOpen', color: 'text-purple-600' },
    { label: 'Research Notes', value: stats?.notes, icon: 'StickyNote', color: 'text-orange-600' }
  ];

  const milestones = [
    { title: 'Project Initiated', date: '2025-01-15', completed: true },
    { title: 'Initial Literature Search', date: '2025-01-20', completed: true },
    { title: 'Paper Collection Phase', date: '2025-02-01', completed: true },
    { title: 'Literature Review Draft', date: '2025-02-15', completed: false },
    { title: 'Final Analysis', date: '2025-03-01', completed: false }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats?.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat?.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
              </div>
              <div className={`p-2 rounded-lg bg-muted ${stat?.color}`}>
                <Icon name={stat?.icon} size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Milestones */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Project Milestones
            </h3>
            <Button variant="ghost" size="sm" iconName="Plus">
              Add Milestone
            </Button>
          </div>
          
          <div className="space-y-4">
            {milestones?.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  milestone?.completed
                    ? 'bg-success border-success' :'border-muted-foreground'
                }`}>
                  {milestone?.completed && (
                    <Icon name="Check" size={10} color="white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    milestone?.completed ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {milestone?.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{milestone?.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Recent Activity
          </h3>
          
          <div className="space-y-4">
            {recentActivity?.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`p-1.5 rounded-full ${activity?.color}`}>
                  <Icon name={activity?.icon} size={14} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity?.description}</p>
                  <p className="text-xs text-muted-foreground">{activity?.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="ghost" size="sm" className="w-full mt-4">
            View All Activity
          </Button>
        </div>
      </div>
      {/* AI Insights */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Sparkles" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            AI Research Insights
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Research Gaps Identified</h4>
            <p className="text-sm text-muted-foreground">
              Based on your current literature collection, there appears to be limited coverage of recent developments in quantum error correction methods published after 2023.
            </p>
          </div>
          
          <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Suggested Papers</h4>
            <p className="text-sm text-muted-foreground">
              3 highly relevant papers have been identified that could strengthen your literature review in the quantum computing applications section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;