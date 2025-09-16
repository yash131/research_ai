import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProjectContextIndicator from '../../components/ui/ProjectContextIndicator';
import PaperMetadata from './components/PaperMetadata';
import PDFViewer from './components/PDFViewer';
import AISummaryPanel from './components/AISummaryPanel';
import CitationGenerator from './components/CitationGenerator';
import RelatedPapers from './components/RelatedPapers';
import AnnotationsList from './components/AnnotationsList';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PaperDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [annotations, setAnnotations] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const paperId = searchParams?.get('id') || 'default-paper';

  // Mock paper data
  const paperData = {
    id: paperId,
    title: "Machine Learning Applications in Climate Change Research: A Comprehensive Analysis of Predictive Models and Environmental Data Processing",
    authors: ["Dr. John Smith", "Dr. Sarah Johnson", "Dr. Michael Chen", "Dr. Emily Rodriguez"],
    abstract: `This comprehensive study examines the application of machine learning techniques in climate change research, focusing on predictive modeling and environmental data processing. We analyze various ML algorithms including neural networks, support vector machines, and ensemble methods for climate pattern recognition and prediction. Our research demonstrates significant improvements in prediction accuracy compared to traditional statistical methods, with neural networks achieving 23% higher accuracy in temperature forecasting and ensemble methods showing superior performance in precipitation prediction. The study encompasses a 50-year dataset from over 1,000 global weather stations, providing robust validation of our approaches. Key findings include the identification of non-linear climate relationships that were previously undetected by conventional methods, improved seasonal prediction accuracy, and enhanced capability for extreme weather event forecasting. We also present a novel ensemble approach that combines multiple ML algorithms to achieve optimal prediction performance across different geographical regions and climate conditions. The implications of this research extend to policy-making, agricultural planning, and disaster preparedness, offering valuable insights for climate adaptation strategies.`,
    journal: "Nature Climate Change",
    volume: "14",
    issue: "3",
    pages: "245-267",
    publishedDate: "2024-03-15",
    doi: "10.1038/s41558-024-01234-5",
    citationCount: 89,
    impactFactor: 4.8,
    keywords: ["machine learning", "climate change", "predictive modeling", "environmental data", "neural networks", "ensemble methods", "weather forecasting"],
    pdfUrl: "/assets/papers/climate-ml-research.pdf",
    isBookmarked: false,
    isOpenAccess: true
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Paper Search', path: '/paper-search' },
    { label: 'Paper Details', path: '/paper-details' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'pdf', label: 'PDF Viewer', icon: 'File' },
    { id: 'analysis', label: 'AI Analysis', icon: 'Brain' },
    { id: 'citations', label: 'Citations', icon: 'Quote' },
    { id: 'related', label: 'Related Papers', icon: 'Network' },
    { id: 'annotations', label: 'Annotations', icon: 'MessageSquare' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [paperId]);

  const handleBookmark = (id) => {
    // Toggle bookmark status
    console.log('Bookmarking paper:', id);
  };

  const handleAddToProject = (id) => {
    // Add paper to current project
    console.log('Adding paper to project:', id);
  };

  const handleShare = (paper) => {
    // Share paper functionality
    console.log('Sharing paper:', paper?.title);
  };

  const handleAddAnnotation = (annotation) => {
    setAnnotations(prev => [...prev, annotation]);
  };

  const handleEditAnnotation = (annotation) => {
    console.log('Editing annotation:', annotation);
  };

  const handleDeleteAnnotation = (annotationId) => {
    setAnnotations(prev => prev?.filter(ann => ann?.id !== annotationId));
  };

  const handleJumpToPage = (pageNumber) => {
    setActiveTab('pdf');
    // Additional logic to jump to specific page in PDF viewer
  };

  const handleProjectChange = (project) => {
    setCurrentProject(project);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading paper details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation and Context */}
          <div className="flex items-center justify-between mb-6">
            <Breadcrumb customItems={breadcrumbItems} />
            <ProjectContextIndicator 
              currentProject={currentProject}
              onProjectChange={handleProjectChange}
            />
          </div>

          {/* Paper Metadata */}
          <PaperMetadata
            paper={paperData}
            onBookmark={handleBookmark}
            onAddToProject={handleAddToProject}
            onShare={handleShare}
          />

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                    {tab?.id === 'annotations' && annotations?.length > 0 && (
                      <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs">
                        {annotations?.length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <AISummaryPanel paper={paperData} />
                  <CitationGenerator paper={paperData} />
                </div>
                <div className="space-y-6">
                  <RelatedPapers currentPaperId={paperData?.id} />
                </div>
              </div>
            )}

            {activeTab === 'pdf' && (
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                <div className="xl:col-span-3">
                  <PDFViewer
                    pdfUrl={paperData?.pdfUrl}
                    annotations={annotations}
                    onAddAnnotation={handleAddAnnotation}
                  />
                </div>
                <div className="xl:col-span-1">
                  <AnnotationsList
                    annotations={annotations}
                    onEditAnnotation={handleEditAnnotation}
                    onDeleteAnnotation={handleDeleteAnnotation}
                    onJumpToPage={handleJumpToPage}
                  />
                </div>
              </div>
            )}

            {activeTab === 'analysis' && (
              <AISummaryPanel paper={paperData} />
            )}

            {activeTab === 'citations' && (
              <CitationGenerator paper={paperData} />
            )}

            {activeTab === 'related' && (
              <RelatedPapers currentPaperId={paperData?.id} />
            )}

            {activeTab === 'annotations' && (
              <AnnotationsList
                annotations={annotations}
                onEditAnnotation={handleEditAnnotation}
                onDeleteAnnotation={handleDeleteAnnotation}
                onJumpToPage={handleJumpToPage}
              />
            )}
          </div>

          {/* Quick Actions Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="default"
                iconName="Download"
                iconPosition="left"
                onClick={() => window.open(paperData?.pdfUrl, '_blank')}
              >
                Download PDF
              </Button>
              <Button
                variant="outline"
                iconName="Bookmark"
                iconPosition="left"
                onClick={() => handleBookmark(paperData?.id)}
              >
                {paperData?.isBookmarked ? 'Remove Bookmark' : 'Bookmark Paper'}
              </Button>
              <Button
                variant="outline"
                iconName="FolderPlus"
                iconPosition="left"
                onClick={() => handleAddToProject(paperData?.id)}
              >
                Add to Project
              </Button>
              <Button
                variant="outline"
                iconName="Share2"
                iconPosition="left"
                onClick={() => handleShare(paperData)}
              >
                Share Paper
              </Button>
              <Button
                variant="outline"
                iconName="ArrowLeft"
                iconPosition="left"
                onClick={() => navigate('/paper-search')}
              >
                Back to Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperDetails;