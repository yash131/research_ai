import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProjectContextIndicator from '../../components/ui/ProjectContextIndicator';
import SearchBar from './components/SearchBar';
import SearchFilters from './components/SearchFilters';
import SearchResults from './components/SearchResults';
import RecommendationsSidebar from './components/RecommendationsSidebar';
import ExportModal from './components/ExportModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PaperSearch = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Search state
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter state
  const [filters, setFilters] = useState({
    year: 'all',
    subject: 'all',
    documentType: 'all',
    citationRange: 'all',
    openAccess: false,
    peerReviewed: false,
    hasFullText: false
  });
  const [showFilters, setShowFilters] = useState(false);
  
  // UI state
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedPapers, setSelectedPapers] = useState(new Set());
  
  // Project state
  const [currentProject, setCurrentProject] = useState(null);

  // Initialize search from URL params
  useEffect(() => {
    const query = searchParams?.get('q');
    if (query && query !== searchQuery) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [searchParams]);

  // Mock search function
  const handleSearch = async (query = searchQuery) => {
    if (!query?.trim()) return;
    
    setIsSearching(true);
    setSearchParams({ q: query });
    
    // Simulate API call
    setTimeout(() => {
      // Mock results based on query
      const mockResults = generateMockResults(query);
      setSearchResults(mockResults);
      setTotalResults(mockResults?.length * 10); // Simulate more results available
      setCurrentPage(1);
      setIsSearching(false);
    }, 1500);
  };

  const generateMockResults = (query) => {
    const baseResults = [
      {
        id: "1",
        title: `Advanced ${query} Methodologies: A Comprehensive Analysis`,
        authors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez", "Dr. Emily Watson"],
        journal: "Nature Scientific Reports",
        year: 2024,
        citationCount: 127,
        abstract: `This comprehensive study examines advanced methodologies in ${query} research. Our analysis covers recent developments, challenges, and future directions in the field.\n\nWe conducted a systematic review of 200+ studies published between 2020-2024, identifying key trends and breakthrough approaches. The findings reveal significant improvements in accuracy and efficiency when applying these methodologies.`,
        tags: [query?.split(' ')?.[0], "Methodology", "Analysis", "Research"],
        openAccess: true,
        peerReviewed: true,
        hasFullText: true,
        relevanceScore: 0.95,
        doi: "10.1038/s41598-024-12345-6"
      },
      {
        id: "2",
        title: `${query} Applications in Modern Technology: Current State and Future Prospects`,
        authors: ["Prof. David Kim", "Dr. Lisa Zhang", "Dr. Robert Johnson"],
        journal: "IEEE Transactions on Technology",
        year: 2024,
        citationCount: 89,
        abstract: `This paper explores the practical applications of ${query} in modern technological systems. We examine implementation challenges, performance metrics, and scalability considerations.\n\nOur research includes case studies from industry leaders and academic institutions, providing insights into real-world deployment scenarios and optimization strategies.`,
        tags: [query?.split(' ')?.[0], "Technology", "Applications", "Innovation"],
        openAccess: false,
        peerReviewed: true,
        hasFullText: true,
        relevanceScore: 0.88,
        doi: "10.1109/TT.2024.5678901"
      },
      {
        id: "3",
        title: `Systematic Review of ${query}: Meta-Analysis and Research Gaps`,
        authors: ["Dr. Maria Gonzalez", "Prof. James Wilson", "Dr. Aisha Patel"],
        journal: "Journal of Advanced Research",
        year: 2023,
        citationCount: 234,
        abstract: `We present a comprehensive meta-analysis of ${query} research spanning the last decade. This systematic review identifies key research gaps and proposes future research directions.\n\nOur analysis includes 150 peer-reviewed studies, revealing significant patterns in methodology, outcomes, and research focus areas. We highlight emerging trends and underexplored aspects of the field.`,
        tags: [query?.split(' ')?.[0], "Meta-Analysis", "Review", "Research Gaps"],
        openAccess: true,
        peerReviewed: true,
        hasFullText: true,
        relevanceScore: 0.82,
        doi: "10.1016/j.jar.2023.11.012"
      }
    ];

    return baseResults;
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Re-run search with new filters
    if (searchQuery) {
      handleSearch();
    }
  };

  const handleClearFilters = () => {
    setFilters({
      year: 'all',
      subject: 'all',
      documentType: 'all',
      citationRange: 'all',
      openAccess: false,
      peerReviewed: false,
      hasFullText: false
    });
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
    // Simulate loading more results
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const handlePaperSelect = (paperId) => {
    navigate(`/paper-details?id=${paperId}`);
  };

  const handleAddToProject = (paperId) => {
    // Mock add to project functionality
    console.log(`Adding paper ${paperId} to project`);
    // Show success notification
  };

  const handleGenerateCitation = (paperId) => {
    navigate(`/citation-manager?paper=${paperId}`);
  };

  const handleBulkExport = () => {
    setShowExportModal(true);
  };

  const handleExport = (exportData) => {
    console.log('Exporting data:', exportData);
    // Mock export functionality
  };

  const handleProjectChange = (project) => {
    setCurrentProject(project);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 lg:pt-20">
        <div className="flex h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)]">
          {/* Main Content */}
          <div className={`flex-1 flex flex-col ${showRecommendations ? 'lg:mr-80' : ''}`}>
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Header Section */}
                <div className="mb-6">
                  <Breadcrumb />
                  
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">
                        Academic Paper Search
                      </h1>
                      <p className="text-muted-foreground">
                        Discover and analyze millions of research papers with AI-powered insights
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <ProjectContextIndicator
                        currentProject={currentProject}
                        onProjectChange={handleProjectChange}
                      />
                      
                      <Button
                        variant="outline"
                        onClick={() => setShowRecommendations(!showRecommendations)}
                        iconName="Lightbulb"
                        iconPosition="left"
                        className="hidden lg:flex"
                      >
                        AI Insights
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Search Interface */}
                <SearchBar
                  query={searchQuery}
                  onQueryChange={setSearchQuery}
                  onSearch={handleSearch}
                />

                {/* Filters */}
                <SearchFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                  isVisible={showFilters}
                  onToggle={() => setShowFilters(!showFilters)}
                />

                {/* Results Actions */}
                {searchResults?.length > 0 && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        onClick={handleBulkExport}
                        iconName="Download"
                        iconPosition="left"
                        disabled={selectedPapers?.size === 0}
                      >
                        Export Selected
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => navigate('/literature-review')}
                        iconName="FileText"
                        iconPosition="left"
                      >
                        Generate Review
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Clock" size={16} />
                      <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
                    </div>
                  </div>
                )}

                {/* Search Results */}
                <SearchResults
                  results={searchResults}
                  loading={isSearching}
                  totalResults={totalResults}
                  currentPage={currentPage}
                  onLoadMore={handleLoadMore}
                  onPaperSelect={handlePaperSelect}
                  onAddToProject={handleAddToProject}
                  onGenerateCitation={handleGenerateCitation}
                />

                {/* Empty State */}
                {!isSearching && searchResults?.length === 0 && searchQuery && (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No results found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search terms or filters to find more papers
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        variant="outline"
                        onClick={() => setShowFilters(false)}
                        iconName="Filter"
                        iconPosition="left"
                      >
                        Clear Filters
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSearchQuery('')}
                        iconName="RotateCcw"
                        iconPosition="left"
                      >
                        New Search
                      </Button>
                    </div>
                  </div>
                )}

                {/* Initial State */}
                {!searchQuery && searchResults?.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="BookOpen" size={48} className="mx-auto text-primary mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Start Your Research Journey
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Search millions of academic papers and discover insights with AI assistance
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-2xl mx-auto">
                      <Button
                        variant="outline"
                        onClick={() => setSearchQuery('machine learning')}
                        className="justify-start"
                      >
                        Machine Learning
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSearchQuery('climate change')}
                        className="justify-start"
                      >
                        Climate Change
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSearchQuery('artificial intelligence')}
                        className="justify-start"
                      >
                        Artificial Intelligence
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recommendations Sidebar */}
          <RecommendationsSidebar
            isVisible={showRecommendations}
            onToggle={() => setShowRecommendations(!showRecommendations)}
            onPaperSelect={handlePaperSelect}
          />
        </div>
      </div>
      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        selectedPapers={Array.from(selectedPapers)}
        onExport={handleExport}
      />
    </div>
  );
};

export default PaperSearch;