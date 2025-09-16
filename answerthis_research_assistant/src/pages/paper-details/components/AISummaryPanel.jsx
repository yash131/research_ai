import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AISummaryPanel = ({ paper }) => {
  const [expandedSections, setExpandedSections] = useState({
    keyFindings: true,
    methodology: false,
    contributions: false,
    limitations: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const summaryData = {
    keyFindings: [
      "Machine learning models achieved 23% higher accuracy than traditional statistical methods in climate prediction",
      "Neural networks showed superior performance in identifying non-linear climate patterns",
      "Ensemble methods provided the most robust predictions across different geographical regions",
      "Deep learning approaches successfully captured long-term climate trends with 89% accuracy"
    ],
    methodology: {
      overview: `The study employed a comprehensive machine learning approach using multiple algorithms including Random Forest, Support Vector Machines, and Deep Neural Networks. Data preprocessing involved normalization and feature engineering of climate variables.`,
      dataCollection: "50-year dataset from 1,000+ global weather stations",
      algorithms: ["Random Forest", "Support Vector Machines", "Deep Neural Networks", "Ensemble Methods"],
      validation: "10-fold cross-validation with temporal splitting"
    },
    contributions: [
      "First comprehensive comparison of ML techniques for climate modeling",
      "Novel ensemble approach combining multiple ML algorithms",
      "Open-source framework for climate prediction research",
      "Benchmark dataset for future climate ML studies"
    ],
    limitations: [
      "Limited to temperature and precipitation data",
      "Geographical bias toward Northern Hemisphere stations",
      "Computational requirements may limit real-time applications",
      "Model interpretability challenges with deep learning approaches"
    ]
  };

  const SectionHeader = ({ title, section, icon }) => (
    <button
      onClick={() => toggleSection(section)}
      className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 transition-colors duration-200"
    >
      <div className="flex items-center space-x-3">
        <Icon name={icon} size={20} className="text-primary" />
        <h3 className="text-lg font-medium text-foreground">{title}</h3>
      </div>
      <Icon 
        name={expandedSections?.[section] ? "ChevronUp" : "ChevronDown"} 
        size={20} 
        className="text-muted-foreground" 
      />
    </button>
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden mb-6">
      <div className="bg-primary/5 p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Brain" size={24} className="text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">AI-Generated Summary</h2>
            <p className="text-sm text-muted-foreground">
              Intelligent analysis of key research insights
            </p>
          </div>
        </div>
      </div>
      {/* Key Findings Section */}
      <div className="border-b border-border">
        <SectionHeader 
          title="Key Findings" 
          section="keyFindings" 
          icon="Target" 
        />
        {expandedSections?.keyFindings && (
          <div className="px-4 pb-4">
            <ul className="space-y-3">
              {summaryData?.keyFindings?.map((finding, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm leading-relaxed">{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Methodology Section */}
      <div className="border-b border-border">
        <SectionHeader 
          title="Methodology Overview" 
          section="methodology" 
          icon="Settings" 
        />
        {expandedSections?.methodology && (
          <div className="px-4 pb-4 space-y-4">
            <p className="text-foreground text-sm leading-relaxed">
              {summaryData?.methodology?.overview}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Data Collection</h4>
                <p className="text-sm text-muted-foreground">
                  {summaryData?.methodology?.dataCollection}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Validation Method</h4>
                <p className="text-sm text-muted-foreground">
                  {summaryData?.methodology?.validation}
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Algorithms Used</h4>
              <div className="flex flex-wrap gap-2">
                {summaryData?.methodology?.algorithms?.map((algorithm, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
                  >
                    {algorithm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Research Contributions Section */}
      <div className="border-b border-border">
        <SectionHeader 
          title="Research Contributions" 
          section="contributions" 
          icon="Lightbulb" 
        />
        {expandedSections?.contributions && (
          <div className="px-4 pb-4">
            <ul className="space-y-3">
              {summaryData?.contributions?.map((contribution, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Icon name="Plus" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm leading-relaxed">{contribution}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Limitations Section */}
      <div>
        <SectionHeader 
          title="Limitations & Future Work" 
          section="limitations" 
          icon="AlertTriangle" 
        />
        {expandedSections?.limitations && (
          <div className="px-4 pb-4">
            <ul className="space-y-3">
              {summaryData?.limitations?.map((limitation, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Icon name="Minus" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm leading-relaxed">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="bg-muted/30 p-4 border-t border-border">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Export Summary
          </Button>
          <Button variant="outline" size="sm" iconName="MessageSquare" iconPosition="left">
            Ask AI Questions
          </Button>
          <Button variant="outline" size="sm" iconName="Share2" iconPosition="left">
            Share Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AISummaryPanel;