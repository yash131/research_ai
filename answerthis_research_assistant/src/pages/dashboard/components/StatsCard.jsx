import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, change, changeType, icon, color = "primary" }) => {
  const getColorClasses = (colorName) => {
    const colorMap = {
      primary: 'text-primary bg-primary/10',
      success: 'text-success bg-success/10',
      warning: 'text-warning bg-warning/10',
      error: 'text-error bg-error/10',
      secondary: 'text-secondary bg-secondary/10'
    };
    return colorMap?.[colorName] || colorMap?.primary;
  };

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-250">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-card-foreground">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <Icon 
                name={getChangeIcon(changeType)} 
                size={14} 
                className={`mr-1 ${getChangeColor(changeType)}`} 
              />
              <span className={`text-sm font-medium ${getChangeColor(changeType)}`}>
                {change}
              </span>
              <span className="text-sm text-muted-foreground ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;