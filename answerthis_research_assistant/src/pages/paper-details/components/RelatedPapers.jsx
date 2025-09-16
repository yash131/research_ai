import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedPapers = ({ currentPaperId }) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('similar'); // similar, cited, citing

  const relatedPapers = {
    similar: [
      {
        id: 'rp1',
        title: 'Deep Learning Approaches for Climate Pattern Recognition',
        authors: ['Emily Rodriguez', 'David Kim', 'Lisa Wang'],
        journal: 'Nature Climate Change',
        year: 2023,
        citationCount: 156,
        relevanceScore: 0.92,
        abstract: `This study explores the application of deep learning techniques for identifying and predicting climate patterns. Using convolutional neural networks and recurrent neural networks, we achieved significant improvements in pattern recognition accuracy.`,
        keywords: ['deep learning', 'climate patterns', 'neural networks', 'prediction'],
        isOpenAccess: true
      },
      {
        id: 'rp2',
        title: 'Ensemble Methods for Environmental Data Analysis',
        authors: ['Robert Chen', 'Maria Santos', 'Ahmed Hassan'],
        journal: 'Environmental Science & Technology',
        year: 2023,
        citationCount: 89,
        relevanceScore: 0.87,
        abstract: `We present a comprehensive evaluation of ensemble methods for analyzing complex environmental datasets. Our approach combines multiple machine learning algorithms to improve prediction reliability and accuracy.`,
        keywords: ['ensemble methods', 'environmental data', 'machine learning', 'prediction'],
        isOpenAccess: false
      },
      {
        id: 'rp3',
        title: 'AI-Driven Climate Modeling: A Comparative Study',
        authors: ['Jennifer Liu', 'Michael Brown', 'Sarah Johnson'],
        journal: 'Journal of Climate',
        year: 2022,
        citationCount: 234,
        relevanceScore: 0.85,
        abstract: `This paper compares various AI-driven approaches to climate modeling, evaluating their performance against traditional physics-based models. Results show promising improvements in computational efficiency and accuracy.`,
        keywords: ['AI modeling', 'climate science', 'comparative analysis', 'physics-based models'],
        isOpenAccess: true
      }
    ],
    cited: [
      {
        id: 'rp4',
        title: 'Foundations of Machine Learning in Climate Science',
        authors: ['Thomas Anderson', 'Rachel Green'],
        journal: 'Science',
        year: 2020,
        citationCount: 1247,
        relevanceScore: 0.95,
        abstract: `A foundational paper establishing the theoretical framework for applying machine learning techniques to climate science problems. This work has become a cornerstone reference in the field.`,
        keywords: ['machine learning', 'climate science', 'theoretical framework'],
        isOpenAccess: false
      },
      {
        id: 'rp5',
        title: 'Statistical Methods for Climate Data Analysis',
        authors: ['Patricia Wilson', 'James Taylor'],
        journal: 'Journal of Applied Statistics',
        year: 2019,
        citationCount: 567,
        relevanceScore: 0.78,
        abstract: `This comprehensive review covers traditional statistical methods used in climate data analysis, providing the methodological foundation for modern ML approaches.`,
        keywords: ['statistical methods', 'climate data', 'data analysis'],
        isOpenAccess: true
      }
    ],
    citing: [
      {
        id: 'rp6',
        title: 'Advanced Neural Networks for Weather Prediction',
        authors: ['Kevin Zhang', 'Anna Petrov', 'Carlos Rodriguez'],
        journal: 'Nature Machine Intelligence',
        year: 2024,
        citationCount: 23,
        relevanceScore: 0.89,
        abstract: `Building upon recent advances in climate ML, this paper introduces novel neural network architectures specifically designed for short-term weather prediction with unprecedented accuracy.`,
        keywords: ['neural networks', 'weather prediction', 'machine intelligence'],
        isOpenAccess: true
      }
    ]
  };

  const viewModes = [
    { id: 'similar', label: 'Similar Papers', icon: 'Target', count: relatedPapers?.similar?.length },
    { id: 'cited', label: 'References', icon: 'ArrowLeft', count: relatedPapers?.cited?.length },
    { id: 'citing', label: 'Citations', icon: 'ArrowRight', count: relatedPapers?.citing?.length }
  ];

  const handlePaperClick = (paperId) => {
    navigate(`/paper-details?id=${paperId}`);
  };

  const formatAuthors = (authors) => {
    if (authors?.length <= 2) return authors?.join(' & ');
    return `${authors?.[0]} et al.`;
  };

  const getRelevanceColor = (score) => {
    if (score >= 0.9) return 'text-success';
    if (score >= 0.8) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Network" size={24} className="text-primary" />
        <div>
          <h2 className="text-xl font-semibold text-foreground">Related Papers</h2>
          <p className="text-sm text-muted-foreground">
            Discover connected research and expand your literature review
          </p>
        </div>
      </div>
      {/* View Mode Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
        {viewModes?.map((mode) => (
          <button
            key={mode?.id}
            onClick={() => setViewMode(mode?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
              viewMode === mode?.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={mode?.icon} size={16} />
            <span>{mode?.label}</span>
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
              {mode?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Papers List */}
      <div className="space-y-4">
        {relatedPapers?.[viewMode]?.map((paper) => (
          <div
            key={paper?.id}
            className="border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-200 cursor-pointer group"
            onClick={() => handlePaperClick(paper?.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                  {paper?.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                  <span>{formatAuthors(paper?.authors)}</span>
                  <span>•</span>
                  <span>{paper?.journal}</span>
                  <span>•</span>
                  <span>{paper?.year}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 ml-4">
                {paper?.isOpenAccess && (
                  <div className="flex items-center space-x-1 text-success">
                    <Icon name="Unlock" size={14} />
                    <span className="text-xs">Open Access</span>
                  </div>
                )}
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {paper?.citationCount} citations
                  </div>
                  {paper?.relevanceScore && (
                    <div className={`text-xs ${getRelevanceColor(paper?.relevanceScore)}`}>
                      {Math.round(paper?.relevanceScore * 100)}% relevant
                    </div>
                  )}
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
              {paper?.abstract}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {paper?.keywords?.slice(0, 4)?.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-md"
                  >
                    {keyword}
                  </span>
                ))}
                {paper?.keywords?.length > 4 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                    +{paper?.keywords?.length - 4} more
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Icon name="Bookmark" size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="ExternalLink" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More Button */}
      <div className="mt-6 text-center">
        <Button variant="outline" iconName="Plus" iconPosition="left">
          Load More Papers
        </Button>
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" iconName="Search" iconPosition="left">
            Find Similar Papers
          </Button>
          <Button variant="outline" size="sm" iconName="TrendingUp" iconPosition="left">
            Citation Analysis
          </Button>
          <Button variant="outline" size="sm" iconName="Share2" iconPosition="left">
            Export References
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RelatedPapers;