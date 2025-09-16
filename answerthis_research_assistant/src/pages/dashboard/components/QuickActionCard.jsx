import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionCard = ({ title, description, icon, href, color = "primary" }) => {
  const getColorClasses = (colorName) => {
    const colorMap = {
      primary: 'text-primary bg-primary/5 border-primary/20 hover:bg-primary/10',
      success: 'text-success bg-success/5 border-success/20 hover:bg-success/10',
      warning: 'text-warning bg-warning/5 border-warning/20 hover:bg-warning/10',
      error: 'text-error bg-error/5 border-error/20 hover:bg-error/10',
      secondary: 'text-secondary bg-secondary/5 border-secondary/20 hover:bg-secondary/10'
    };
    return colorMap?.[colorName] || colorMap?.primary;
  };

  const CardContent = () => (
    <div className={`p-6 rounded-lg border-2 border-dashed transition-all duration-250 ${getColorClasses(color)}`}>
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full bg-background`}>
          <Icon name={icon} size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Icon name="ArrowRight" size={20} className="text-muted-foreground" />
      </div>
    </div>
  );

  if (href?.startsWith('/')) {
    return (
      <Link to={href} className="block">
        <CardContent />
      </Link>
    );
  }

  return (
    <button onClick={() => window.location.href = href} className="w-full text-left">
      <CardContent />
    </button>
  );
};

export default QuickActionCard;