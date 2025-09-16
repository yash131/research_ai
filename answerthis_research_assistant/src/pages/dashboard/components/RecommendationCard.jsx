import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationCard = ({ recommendations }) => {
  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'paper':
        return 'FileText';
      case 'topic':
        return 'Lightbulb';
      case 'collaboration':
        return 'Users';
      case 'tool':
        return 'Wrench';
      default:
        return 'Star';
    }
  };

  const getRecommendationColor = (type) => {
    switch (type) {
      case 'paper':
        return 'text-primary bg-primary/10';
      case 'topic':
        return 'text-warning bg-warning/10';
      case 'collaboration':
        return 'text-success bg-success/10';
      case 'tool':
        return 'text-secondary bg-secondary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-card-foreground">Recommendations</h2>
        <Icon name="Sparkles" size={20} className="text-primary" />
      </div>
      <div className="space-y-4">
        {recommendations?.map((rec, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-250">
            <div className={`p-2 rounded-full ${getRecommendationColor(rec?.type)}`}>
              <Icon name={getRecommendationIcon(rec?.type)} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-card-foreground mb-1">
                {rec?.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-2">
                {rec?.description}
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-primary font-medium">
                  {rec?.relevance}% match
                </span>
                {rec?.isNew && (
                  <span className="px-2 py-0.5 bg-success/10 text-success text-xs rounded-full">
                    New
                  </span>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowRight"
              onClick={() => {
                if (rec?.action) rec?.action();
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          iconName="RefreshCw"
          iconPosition="left"
        >
          Refresh Recommendations
        </Button>
      </div>
    </div>
  );
};

export default RecommendationCard;