import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProjectContextIndicator from '../../components/ui/ProjectContextIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SourcePanel from './components/SourcePanel';
import ReviewEditor from './components/ReviewEditor';
import AIAnalysisPanel from './components/AIAnalysisPanel';
import ExportModal from './components/ExportModal';
import CollaborationPanel from './components/CollaborationPanel';

const LiteratureReview = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeView, setActiveView] = useState('editor');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [reviewContent, setReviewContent] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  // Mock data for sources
  const mockSources = [
    {
      id: 1,
      title: 'Machine Learning Applications in Healthcare: A Comprehensive Review',
      authors: ['Dr. Sarah Johnson', 'Prof. Michael Chen', 'Dr. Emily Rodriguez'],
      year: 2024,
      journal: 'Journal of Medical Informatics',
      citations: 156,
      relevanceScore: 9.2,
      themes: ['methodology', 'findings'],
      abstract: `This comprehensive review examines the current state of machine learning applications in healthcare, analyzing over 200 recent studies to identify key trends, methodological approaches, and clinical outcomes.`
    },
    {
      id: 2,
      title: 'Ethical Considerations in AI-Driven Medical Diagnosis Systems',
      authors: ['Prof. David Wilson', 'Dr. Lisa Park'],
      year: 2023,
      journal: 'AI Ethics Quarterly',
      citations: 89,
      relevanceScore: 8.7,
      themes: ['limitations', 'future-work'],
      abstract: `An in-depth analysis of ethical frameworks and considerations necessary for implementing AI-driven diagnostic systems in clinical practice.`
    },
    {
      id: 3,
      title: 'Deep Learning Models for Medical Image Analysis: Performance and Validation',
      authors: ['Dr. Robert Kim', 'Prof. Anna Martinez', 'Dr. James Thompson'],
      year: 2024,
      journal: 'Medical Image Computing',
      citations: 203,
      relevanceScore: 9.5,
      themes: ['methodology', 'findings'],
      abstract: `Comparative analysis of deep learning architectures for medical image analysis, including performance metrics and validation methodologies across different medical imaging modalities.`
    },
    {
      id: 4,
      title: 'Patient Privacy and Data Security in Digital Health Platforms',
      authors: ['Dr. Maria Gonzalez', 'Prof. John Anderson'],
      year: 2023,
      journal: 'Digital Health Security',
      citations: 124,
      relevanceScore: 8.3,
      themes: ['limitations', 'methodology'],
      abstract: `Examination of privacy challenges and security frameworks in digital health platforms, with recommendations for protecting patient data in AI-driven healthcare systems.`
    },
    {
      id: 5,
      title: 'Future Directions in Personalized Medicine Through AI Integration',
      authors: ['Prof. Kevin Lee', 'Dr. Rachel Brown', 'Dr. Thomas White'],
      year: 2024,
      journal: 'Personalized Medicine Today',
      citations: 78,
      relevanceScore: 8.9,
      themes: ['future-work', 'findings'],
      abstract: `Explores emerging trends and future possibilities for integrating artificial intelligence into personalized medicine approaches, including precision diagnostics and treatment optimization.`
    }
  ];

  // Initial review content
  const initialContent = `<h2>Introduction</h2>
<p>The integration of artificial intelligence and machine learning technologies in healthcare has emerged as one of the most transformative developments in modern medicine. This literature review synthesizes current research findings, methodological approaches, and emerging trends in AI-driven healthcare applications.</p>

<h2>Methodology</h2>
<p>This systematic review analyzed 45 peer-reviewed articles published between 2022-2024, focusing on machine learning applications in clinical settings. Search strategies included multiple academic databases with specific inclusion and exclusion criteria.</p>

<h2>Key Findings</h2>
<p>Recent studies demonstrate significant improvements in diagnostic accuracy when AI systems are integrated with traditional clinical workflows. Machine learning models show particular promise in medical imaging, with accuracy rates exceeding 95% in specific applications.</p>

<h2>Thematic Analysis</h2>
<p>Three major themes emerged from the literature: technological advancement, ethical considerations, and implementation challenges. Each theme reveals distinct patterns in current research priorities and methodological approaches.</p>

<h2>Research Gaps</h2>
<p>Despite significant progress, several gaps remain in the literature, particularly regarding long-term validation studies and diverse population representation in training datasets.</p>

<h2>Conclusions</h2>
<p>The current body of research indicates substantial potential for AI integration in healthcare, while highlighting the need for continued research in ethical frameworks and clinical validation methodologies.</p>`;

  useEffect(() => {
    if (!reviewContent) {
      setReviewContent(initialContent);
    }
  }, []);

  const handleSourceSelect = (source) => {
    // Navigate to paper details or handle source selection
    navigate(`/paper-details?id=${source?.id}`);
  };

  const handleGenerateReview = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedContent = `<h2>AI-Generated Literature Review</h2>
<p>Based on analysis of ${mockSources?.length} selected sources, this comprehensive review examines the current landscape of machine learning applications in healthcare...</p>

<h2>Systematic Analysis</h2>
<p>The reviewed literature demonstrates a clear evolution in AI methodologies, with deep learning approaches showing superior performance in diagnostic applications. Key findings indicate...</p>

<h2>Emerging Trends</h2>
<p>Recent publications highlight three significant trends: increased focus on explainable AI, integration of multimodal data sources, and emphasis on clinical validation protocols...</p>

<h2>Critical Assessment</h2>
<p>While the field shows remarkable progress, several methodological limitations persist across studies, including limited diversity in training datasets and insufficient long-term validation...</p>`;
      
      setReviewContent(generatedContent);
      setIsGenerating(false);
    }, 3000);
  };

  const handleExport = async (exportData) => {
    // Simulate export process
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Exporting with options:', exportData);
        resolve();
      }, 2000);
    });
  };

  const handleRegenerateSection = (section) => {
    console.log('Regenerating section:', section);
    // Implement section regeneration logic
  };

  const handleApplySuggestion = (suggestion) => {
    console.log('Applying suggestion:', suggestion);
    // Implement suggestion application logic
  };

  const handleAddComment = (comment) => {
    console.log('Adding comment:', comment);
    // Implement comment addition logic
  };

  const handleInviteCollaborator = (email) => {
    console.log('Inviting collaborator:', email);
    // Implement collaborator invitation logic
  };

  const views = [
    { id: 'editor', name: 'Editor', icon: 'Edit' },
    { id: 'analysis', name: 'AI Analysis', icon: 'Brain' },
    { id: 'collaboration', name: 'Collaboration', icon: 'Users' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 lg:pt-20">
        <div className="max-w-full mx-auto px-6 py-6">
          {/* Breadcrumb and Project Context */}
          <div className="flex items-center justify-between mb-6">
            <Breadcrumb />
            <ProjectContextIndicator
              currentProject={currentProject}
              onProjectChange={setCurrentProject}
            />
          </div>

          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Literature Review</h1>
              <p className="text-muted-foreground">
                Generate and refine comprehensive academic literature reviews with AI assistance
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                onClick={() => setShowExportModal(true)}
              >
                Export
              </Button>
              <Button
                variant="default"
                iconName="Wand2"
                iconPosition="left"
                onClick={handleGenerateReview}
                loading={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Review'}
              </Button>
            </div>
          </div>

          {/* Mobile View Selector */}
          <div className="lg:hidden mb-6">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              {views?.map((view) => (
                <button
                  key={view?.id}
                  onClick={() => setActiveView(view?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm transition-colors flex-1 ${
                    activeView === view?.id
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={view?.icon} size={16} />
                  <span>{view?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-280px)]">
            {/* Source Panel - Desktop */}
            <div className="hidden lg:block lg:col-span-3">
              <SourcePanel
                sources={mockSources}
                onSourceSelect={handleSourceSelect}
                onThemeChange={setSelectedTheme}
                selectedTheme={selectedTheme}
              />
            </div>

            {/* Main Editor Area */}
            <div className={`${
              activeView === 'editor' || window.innerWidth >= 1024 
                ? 'lg:col-span-6' :'hidden lg:block lg:col-span-6'
            }`}>
              <ReviewEditor
                content={reviewContent}
                onContentChange={setReviewContent}
                wordTarget={5000}
                citations={mockSources}
              />
            </div>

            {/* Right Panel - Desktop */}
            <div className="hidden lg:block lg:col-span-3">
              {activeView === 'analysis' || window.innerWidth >= 1024 ? (
                <AIAnalysisPanel
                  analysisData={{
                    suggestions: [],
                    insights: [],
                    quality: { score: 85, feedback: 'Good structure and flow' }
                  }}
                  onRegenerateSection={handleRegenerateSection}
                  onApplySuggestion={handleApplySuggestion}
                />
              ) : (
                <CollaborationPanel
                  onAddComment={handleAddComment}
                  onInviteCollaborator={handleInviteCollaborator}
                />
              )}
            </div>

            {/* Mobile Views */}
            <div className="lg:hidden">
              {activeView === 'editor' && (
                <ReviewEditor
                  content={reviewContent}
                  onContentChange={setReviewContent}
                  wordTarget={5000}
                  citations={mockSources}
                />
              )}
              
              {activeView === 'analysis' && (
                <AIAnalysisPanel
                  analysisData={{
                    suggestions: [],
                    insights: [],
                    quality: { score: 85, feedback: 'Good structure and flow' }
                  }}
                  onRegenerateSection={handleRegenerateSection}
                  onApplySuggestion={handleApplySuggestion}
                />
              )}
              
              {activeView === 'collaboration' && (
                <CollaborationPanel
                  onAddComment={handleAddComment}
                  onInviteCollaborator={handleInviteCollaborator}
                />
              )}
            </div>
          </div>

          {/* Mobile Source Panel Access */}
          <div className="lg:hidden fixed bottom-6 right-6">
            <Button
              variant="default"
              size="icon"
              className="rounded-full shadow-lg"
              iconName="BookOpen"
              onClick={() => {
                // Show sources in modal or navigate to sources page
                navigate('/paper-search');
              }}
            />
          </div>
        </div>
      </div>
      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
      />
    </div>
  );
};

export default LiteratureReview;