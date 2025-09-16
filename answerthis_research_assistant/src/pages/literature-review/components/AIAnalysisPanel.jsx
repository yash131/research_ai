import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIAnalysisPanel = ({ analysisData, onRegenerateSection, onApplySuggestion }) => {
  const [activeTab, setActiveTab] = useState('gaps');

  const tabs = [
    { id: 'gaps', name: 'Research Gaps', icon: 'AlertTriangle', count: 5 },
    { id: 'trends', name: 'Trends', icon: 'TrendingUp', count: 8 },
    { id: 'contradictions', name: 'Contradictions', icon: 'AlertCircle', count: 3 },
    { id: 'themes', name: 'Key Themes', icon: 'Tag', count: 12 }
  ];

  const researchGaps = [
    {
      id: 1,
      title: 'Limited longitudinal studies',
      description: 'Most research focuses on short-term effects, lacking comprehensive long-term analysis spanning multiple years.',
      severity: 'high',
      sources: 8,
      suggestion: 'Recommend conducting longitudinal studies to address this gap'
    },
    {
      id: 2,
      title: 'Geographical bias in samples',
      description: 'Research predominantly conducted in Western countries with limited representation from developing nations.',
      severity: 'medium',
      sources: 12,
      suggestion: 'Include more diverse geographical samples in future research'
    },
    {
      id: 3,
      title: 'Methodological inconsistencies',
      description: 'Varying methodological approaches make it difficult to compare results across studies.',
      severity: 'high',
      sources: 15,
      suggestion: 'Standardize methodological approaches for better comparability'
    }
  ];

  const trends = [
    {
      id: 1,
      title: 'Increasing focus on AI applications',
      description: 'Growing trend toward artificial intelligence integration in research methodologies.',
      growth: '+45%',
      timeframe: '2020-2024',
      papers: 23
    },
    {
      id: 2,
      title: 'Interdisciplinary collaboration',
      description: 'Rising collaboration between different academic disciplines.',
      growth: '+32%',
      timeframe: '2021-2024',
      papers: 18
    },
    {
      id: 3,
      title: 'Open data initiatives',
      description: 'Increased emphasis on data sharing and reproducibility.',
      growth: '+28%',
      timeframe: '2022-2024',
      papers: 14
    }
  ];

  const contradictions = [
    {
      id: 1,
      title: 'Conflicting efficacy results',
      description: 'Studies show contradictory findings regarding treatment effectiveness.',
      conflictingSources: [
        { title: 'Study A shows 85% effectiveness', authors: 'Smith et al.', year: 2023 },
        { title: 'Study B shows 45% effectiveness', authors: 'Johnson et al.', year: 2024 }
      ],
      resolution: 'Differences may be due to varying sample sizes and methodologies'
    },
    {
      id: 2,
      title: 'Inconsistent measurement scales',
      description: 'Different studies use incompatible measurement approaches.',
      conflictingSources: [
        { title: 'Quantitative approach preferred', authors: 'Brown et al.', year: 2023 },
        { title: 'Qualitative methods more effective', authors: 'Davis et al.', year: 2024 }
      ],
      resolution: 'Mixed-methods approach may provide more comprehensive insights'
    }
  ];

  const themes = [
    { id: 1, name: 'Machine Learning Applications', frequency: 45, papers: 23, trend: 'increasing' },
    { id: 2, name: 'Data Privacy Concerns', frequency: 38, papers: 19, trend: 'stable' },
    { id: 3, name: 'Ethical Considerations', frequency: 32, papers: 16, trend: 'increasing' },
    { id: 4, name: 'Performance Optimization', frequency: 28, papers: 14, trend: 'decreasing' },
    { id: 5, name: 'User Experience Design', frequency: 25, papers: 12, trend: 'increasing' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return 'TrendingUp';
      case 'decreasing': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'increasing': return 'text-green-600';
      case 'decreasing': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'gaps':
        return (
          <div className="space-y-4">
            {researchGaps?.map((gap) => (
              <div key={gap?.id} className="p-4 bg-background border border-border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-sm font-medium text-foreground">{gap?.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(gap?.severity)}`}>
                    {gap?.severity}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{gap?.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{gap?.sources} sources</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onApplySuggestion(gap?.suggestion)}
                  >
                    Apply Suggestion
                  </Button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'trends':
        return (
          <div className="space-y-4">
            {trends?.map((trend) => (
              <div key={trend?.id} className="p-4 bg-background border border-border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-sm font-medium text-foreground">{trend?.title}</h4>
                  <div className="flex items-center space-x-1 text-green-600">
                    <Icon name="TrendingUp" size={14} />
                    <span className="text-sm font-medium">{trend?.growth}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{trend?.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{trend?.timeframe}</span>
                  <span>{trend?.papers} papers</span>
                </div>
              </div>
            ))}
          </div>
        );

      case 'contradictions':
        return (
          <div className="space-y-4">
            {contradictions?.map((contradiction) => (
              <div key={contradiction?.id} className="p-4 bg-background border border-border rounded-lg">
                <h4 className="text-sm font-medium text-foreground mb-3">{contradiction?.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{contradiction?.description}</p>
                
                <div className="space-y-2 mb-3">
                  {contradiction?.conflictingSources?.map((source, index) => (
                    <div key={index} className="p-2 bg-muted rounded text-xs">
                      <div className="font-medium">{source?.title}</div>
                      <div className="text-muted-foreground">{source?.authors} ({source?.year})</div>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <div className="flex items-start space-x-2">
                    <Icon name="Lightbulb" size={14} className="text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-800">{contradiction?.resolution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'themes':
        return (
          <div className="space-y-3">
            {themes?.map((theme) => (
              <div key={theme?.id} className="p-3 bg-background border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground">{theme?.name}</h4>
                  <div className={`flex items-center space-x-1 ${getTrendColor(theme?.trend)}`}>
                    <Icon name={getTrendIcon(theme?.trend)} size={12} />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{theme?.papers} papers</span>
                  <span>Frequency: {theme?.frequency}</span>
                </div>
                <div className="mt-2 w-full bg-muted rounded-full h-1">
                  <div
                    className="bg-primary h-1 rounded-full"
                    style={{ width: `${(theme?.frequency / 50) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">AI Analysis</h2>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors flex-1 ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={14} />
              <span className="hidden sm:inline">{tab?.name}</span>
              <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                {tab?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {renderTabContent()}
      </div>
      {/* Actions */}
      <div className="p-4 border-t border-border">
        <Button
          variant="default"
          className="w-full"
          iconName="Wand2"
          iconPosition="left"
          onClick={() => onRegenerateSection(activeTab)}
        >
          Generate {tabs?.find(t => t?.id === activeTab)?.name} Section
        </Button>
      </div>
    </div>
  );
};

export default AIAnalysisPanel;