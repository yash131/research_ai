import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectTimeline = ({ timelineEvents, milestones, onTimelineAction }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCompleted, setShowCompleted] = useState(true);

  const eventTypes = {
    paper_added: { icon: 'FileText', color: 'text-blue-600 bg-blue-100' },
    citation_generated: { icon: 'Quote', color: 'text-green-600 bg-green-100' },
    note_created: { icon: 'StickyNote', color: 'text-orange-600 bg-orange-100' },
    review_completed: { icon: 'BookOpen', color: 'text-purple-600 bg-purple-100' },
    milestone_reached: { icon: 'Flag', color: 'text-red-600 bg-red-100' },
    collaboration: { icon: 'Users', color: 'text-indigo-600 bg-indigo-100' }
  };

  const filteredEvents = timelineEvents?.filter(event => {
    if (selectedFilter === 'all') return true;
    return event?.type === selectedFilter;
  });

  const filteredMilestones = showCompleted 
    ? milestones 
    : milestones?.filter(m => !m?.completed);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getEventTypeConfig = (type) => {
    return eventTypes?.[type] || { icon: 'Circle', color: 'text-gray-600 bg-gray-100' };
  };

  return (
    <div className="space-y-6">
      {/* Timeline Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Project Timeline
        </h3>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e?.target?.value)}
            className="px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Events</option>
            <option value="paper_added">Papers Added</option>
            <option value="citation_generated">Citations</option>
            <option value="note_created">Notes</option>
            <option value="review_completed">Reviews</option>
            <option value="milestone_reached">Milestones</option>
            <option value="collaboration">Collaboration</option>
          </select>
          
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e?.target?.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <span className="text-muted-foreground">Show completed</span>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Events */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg p-6">
            <h4 className="text-base font-medium text-foreground mb-4">
              Recent Activity
            </h4>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
              
              <div className="space-y-6">
                {filteredEvents?.map((event, index) => {
                  const config = getEventTypeConfig(event?.type);
                  
                  return (
                    <div key={event?.id} className="relative flex items-start space-x-4">
                      {/* Timeline Dot */}
                      <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${config?.color}`}>
                        <Icon name={config?.icon} size={20} />
                      </div>
                      {/* Event Content */}
                      <div className="flex-1 min-w-0 pb-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                              {event?.title}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {event?.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {formatDate(event?.date)} • {event?.time}
                            </p>
                          </div>
                          
                          {event?.metadata && (
                            <div className="ml-4 text-xs text-muted-foreground">
                              {event?.metadata?.paperCount && (
                                <span>{event?.metadata?.paperCount} papers</span>
                              )}
                              {event?.metadata?.author && (
                                <span>by {event?.metadata?.author}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-medium text-foreground">
                Milestones
              </h4>
              <Button variant="ghost" size="sm" iconName="Plus">
                Add
              </Button>
            </div>
            
            <div className="space-y-4">
              {filteredMilestones?.map((milestone) => (
                <div
                  key={milestone?.id}
                  className={`p-3 rounded-lg border transition-all duration-250 ${
                    milestone?.completed
                      ? 'bg-success/5 border-success/20'
                      : milestone?.isOverdue
                      ? 'bg-error/5 border-error/20' :'bg-background border-border'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      milestone?.completed
                        ? 'bg-success border-success' :'border-muted-foreground'
                    }`}>
                      {milestone?.completed && (
                        <Icon name="Check" size={12} color="white" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        milestone?.completed ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {milestone?.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Due: {formatDate(milestone?.dueDate)}
                      </p>
                      {milestone?.isOverdue && !milestone?.completed && (
                        <p className="text-xs text-error mt-1">
                          Overdue by {milestone?.overdueDays} days
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Summary */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h4 className="text-base font-medium text-foreground mb-4">
              Progress Summary
            </h4>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Milestones Completed</span>
                  <span className="font-medium text-foreground">
                    {milestones?.filter(m => m?.completed)?.length}/{milestones?.length}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-success rounded-full h-2 transition-all duration-300"
                    style={{
                      width: `${(milestones?.filter(m => m?.completed)?.length / milestones?.length) * 100}%`
                    }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">
                    {timelineEvents?.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Events</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">
                    {timelineEvents?.filter(e => e?.date === new Date()?.toISOString()?.split('T')?.[0])?.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;