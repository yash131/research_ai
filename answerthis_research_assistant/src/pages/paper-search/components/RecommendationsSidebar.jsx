import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationsSidebar = ({ isVisible, onToggle, onPaperSelect }) => {
  const [activeTab, setActiveTab] = useState('related');

  const relatedPapers = [
    {
      id: "rec-1",
      title: "Machine Learning in Environmental Science: A Systematic Review",
      authors: ["Dr. Jennifer Adams", "Prof. Mark Thompson"],
      year: 2024,
      citationCount: 67,
      relevanceScore: 0.87,
      reason: "Similar methodology and domain"
    },
    {
      id: "rec-2",
      title: "Neural Networks for Weather Pattern Recognition",
      authors: ["Dr. Carlos Rodriguez", "Dr. Yuki Tanaka"],
      year: 2023,
      citationCount: 143,
      relevanceScore: 0.82,
      reason: "Related to deep learning approaches"
    },
    {
      id: "rec-3",
      title: "Climate Data Analysis Using Advanced Statistical Methods",
      authors: ["Prof. Elena Petrov", "Dr. Ahmed Al-Rashid"],
      year: 2024,
      citationCount: 89,
      relevanceScore: 0.79,
      reason: "Complementary analytical approach"
    }
  ];

  const researchGaps = [
    {
      id: "gap-1",
      title: "Limited Long-term Validation Studies",
      description: "Most deep learning climate models lack validation over extended time periods (>10 years).",
      opportunity: "Conduct longitudinal studies using historical climate data",
      papers: 12,
      trend: "increasing"
    },
    {
      id: "gap-2",
      title: "Regional Climate Model Integration",
      description: "Few studies integrate global and regional climate models effectively.",
      opportunity: "Develop hybrid modeling approaches",
      papers: 8,
      trend: "stable"
    },
    {
      id: "gap-3",
      title: "Uncertainty Quantification Methods",
      description: "Limited research on quantifying prediction uncertainties in ML climate models.",
      opportunity: "Apply Bayesian approaches to uncertainty estimation",
      papers: 15,
      trend: "increasing"
    }
  ];

  const trendingTopics = [
    {
      id: "trend-1",
      topic: "Explainable AI in Climate Science",
      growth: "+45%",
      papers: 234,
      description: "Increasing focus on interpretable climate prediction models"
    },
    {
      id: "trend-2",
      topic: "Edge Computing for Environmental Monitoring",
      growth: "+38%",
      papers: 156,
      description: "Deployment of ML models on IoT devices for real-time monitoring"
    },
    {
      id: "trend-3",
      topic: "Federated Learning for Climate Data",
      growth: "+52%",
      papers: 89,
      description: "Collaborative learning across distributed climate datasets"
    }
  ];

  const tabs = [
    { id: 'related', label: 'Related Papers', icon: 'FileText', count: relatedPapers?.length },
    { id: 'gaps', label: 'Research Gaps', icon: 'Target', count: researchGaps?.length },
    { id: 'trends', label: 'Trending', icon: 'TrendingUp', count: trendingTopics?.length }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing':
        return 'TrendingUp';
      case 'decreasing':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'increasing':
        return 'text-success';
      case 'decreasing':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        onClick={onToggle}
        iconName="Lightbulb"
        iconPosition="left"
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 lg:hidden"
      >
        AI Insights
      </Button>
    );
  }

  return (
    <div className="w-80 bg-card border-l border-border h-full overflow-y-auto">
      <div className="sticky top-0 bg-card border-b border-border p-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-card-foreground flex items-center">
            <Icon name="Lightbulb" size={20} className="mr-2 text-primary" />
            AI Research Insights
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="lg:hidden"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md text-xs font-medium transition-all duration-250 ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={14} />
              <span className="hidden sm:inline">{tab?.label}</span>
              <span className="bg-primary/10 text-primary text-xs rounded-full px-1.5 py-0.5 min-w-[20px]">
                {tab?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        {/* Related Papers Tab */}
        {activeTab === 'related' && (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Papers similar to your search results, powered by AI analysis
            </div>
            {relatedPapers?.map((paper) => (
              <div
                key={paper?.id}
                className="p-4 bg-muted/50 rounded-lg border border-border hover:border-primary/50 transition-colors duration-250"
              >
                <button
                  onClick={() => onPaperSelect(paper?.id)}
                  className="text-left w-full"
                >
                  <h4 className="font-medium text-card-foreground mb-2 line-clamp-2 hover:text-primary transition-colors duration-250">
                    {paper?.title}
                  </h4>
                </button>
                
                <div className="text-xs text-muted-foreground mb-2">
                  {paper?.authors?.join(', ')} • {paper?.year}
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Icon name="Quote" size={12} className="mr-1" />
                    {paper?.citationCount} citations
                  </span>
                  <span className="text-xs font-medium text-primary">
                    {Math.round(paper?.relevanceScore * 100)}% match
                  </span>
                </div>
                
                <div className="text-xs text-muted-foreground bg-background/50 rounded px-2 py-1">
                  <Icon name="Zap" size={10} className="inline mr-1" />
                  {paper?.reason}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Research Gaps Tab */}
        {activeTab === 'gaps' && (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Identified research opportunities in your field of interest
            </div>
            {researchGaps?.map((gap) => (
              <div
                key={gap?.id}
                className="p-4 bg-muted/50 rounded-lg border border-border"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-card-foreground text-sm">
                    {gap?.title}
                  </h4>
                  <Icon 
                    name={getTrendIcon(gap?.trend)} 
                    size={14} 
                    className={getTrendColor(gap?.trend)} 
                  />
                </div>
                
                <p className="text-xs text-muted-foreground mb-3">
                  {gap?.description}
                </p>
                
                <div className="bg-primary/5 border border-primary/20 rounded p-2 mb-3">
                  <div className="text-xs font-medium text-primary mb-1">
                    Research Opportunity:
                  </div>
                  <div className="text-xs text-card-foreground">
                    {gap?.opportunity}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{gap?.papers} related papers</span>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    Explore Gap
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trending Topics Tab */}
        {activeTab === 'trends' && (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Emerging research trends and hot topics in your domain
            </div>
            {trendingTopics?.map((trend) => (
              <div
                key={trend?.id}
                className="p-4 bg-muted/50 rounded-lg border border-border"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-card-foreground text-sm">
                    {trend?.topic}
                  </h4>
                  <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded">
                    {trend?.growth}
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground mb-3">
                  {trend?.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Icon name="FileText" size={12} className="mr-1" />
                    {trend?.papers} papers
                  </span>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    View Trend
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationsSidebar;