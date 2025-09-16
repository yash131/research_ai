import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProjectContextIndicator from '../../components/ui/ProjectContextIndicator';

import Button from '../../components/ui/Button';
import CitationTable from './components/CitationTable';
import CitationFilters from './components/CitationFilters';
import CitationStylePreview from './components/CitationStylePreview';
import BulkActions from './components/BulkActions';
import AddCitationModal from './components/AddCitationModal';
import CitationStats from './components/CitationStats';

const CitationManager = () => {
  const [citations, setCitations] = useState([]);
  const [filteredCitations, setFilteredCitations] = useState([]);
  const [selectedCitations, setSelectedCitations] = useState([]);
  const [selectedCitation, setSelectedCitation] = useState(null);
  const [currentStyle, setCurrentStyle] = useState('apa');
  const [activeFilters, setActiveFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  // Mock data
  const mockCitations = [
    {
      id: '1',
      title: 'Machine Learning Applications in Climate Change Research: A Comprehensive Review',
      authors: 'Johnson, M., Smith, A., & Williams, R.',
      year: '2024',
      journal: 'Environmental Science & Technology',
      volume: '58',
      issue: '12',
      pages: '5234-5251',
      doi: '10.1021/acs.est.4c01234',
      type: 'journal',
      project: 'Climate Change Research',
      dateAdded: '2024-09-10T10:30:00Z',
      url: 'https://pubs.acs.org/doi/10.1021/acs.est.4c01234'
    },
    {
      id: '2',
      title: 'Artificial Intelligence Ethics: Principles and Practices',
      authors: 'Chen, L., Rodriguez, P., & Kumar, S.',
      year: '2023',
      journal: 'AI & Society',
      volume: '38',
      issue: '4',
      pages: '1123-1145',
      doi: '10.1007/s00146-023-01678-9',
      type: 'journal',
      project: 'AI Ethics Study',
      dateAdded: '2024-09-08T14:20:00Z',
      url: 'https://link.springer.com/article/10.1007/s00146-023-01678-9'
    },
    {
      id: '3',
      title: 'Quantum Computing: Theory and Applications',
      authors: 'Thompson, K., & Lee, J.',
      year: '2024',
      journal: 'Nature Physics',
      volume: '20',
      issue: '3',
      pages: '234-248',
      doi: '10.1038/s41567-024-02345-6',
      type: 'journal',
      project: 'Quantum Computing Review',
      dateAdded: '2024-09-05T09:15:00Z',
      url: 'https://www.nature.com/articles/s41567-024-02345-6'
    },
    {
      id: '4',
      title: 'Biomedical Data Analysis Using Deep Learning',
      authors: 'Patel, N., Garcia, M., Brown, D., & Wilson, T.',
      year: '2023',
      journal: 'Nature Biotechnology',
      volume: '41',
      issue: '8',
      pages: '1089-1102',
      doi: '10.1038/s41587-023-01789-2',
      type: 'journal',
      project: 'Biomedical Applications',
      dateAdded: '2024-09-03T16:45:00Z',
      url: 'https://www.nature.com/articles/s41587-023-01789-2'
    },
    {
      id: '5',
      title: 'Sustainable Energy Systems: A Global Perspective',
      authors: 'Anderson, R., Martinez, C., & Taylor, S.',
      year: '2024',
      type: 'book',
      project: 'Climate Change Research',
      dateAdded: '2024-09-01T11:30:00Z',
      journal: 'Academic Press',
      pages: '1-456',
      url: 'https://www.academicpress.com/sustainable-energy-systems'
    },
    {
      id: '6',
      title: 'Neural Networks in Medical Diagnosis: Recent Advances',
      authors: 'Kim, H., Nakamura, T., & Singh, A.',
      year: '2023',
      type: 'conference',
      project: 'Biomedical Applications',
      dateAdded: '2024-08-28T13:20:00Z',
      journal: 'Proceedings of ICML 2023',
      pages: '2345-2356',
      url: 'https://proceedings.mlr.press/v202/kim23a.html'
    }
  ];

  const mockProjects = [
    { id: '1', name: 'Climate Change Research', status: 'active', paperCount: 24 },
    { id: '2', name: 'AI Ethics Study', status: 'active', paperCount: 18 },
    { id: '3', name: 'Quantum Computing Review', status: 'draft', paperCount: 12 },
    { id: '4', name: 'Biomedical Applications', status: 'completed', paperCount: 31 }
  ];

  useEffect(() => {
    setCitations(mockCitations);
    setFilteredCitations(mockCitations);
    setCurrentProject(mockProjects?.[0]);
    if (mockCitations?.length > 0) {
      setSelectedCitation(mockCitations?.[0]);
    }
  }, []);

  useEffect(() => {
    let filtered = [...citations];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(citation =>
        citation?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        citation?.authors?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        citation?.journal?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply other filters
    if (activeFilters?.sourceType) {
      filtered = filtered?.filter(citation => citation?.type === activeFilters?.sourceType);
    }

    if (activeFilters?.project) {
      const projectName = mockProjects?.find(p => p?.id === activeFilters?.project)?.name;
      if (projectName) {
        filtered = filtered?.filter(citation => citation?.project === projectName);
      }
    }

    if (activeFilters?.yearRange) {
      filtered = filtered?.filter(citation => {
        const year = parseInt(citation?.year);
        switch (activeFilters?.yearRange) {
          case '2024':
            return year === 2024;
          case '2023':
            return year === 2023;
          case '2022-2024':
            return year >= 2022 && year <= 2024;
          case '2020-2024':
            return year >= 2020 && year <= 2024;
          case '2010-2024':
            return year >= 2010 && year <= 2024;
          case 'before-2010':
            return year < 2010;
          default:
            return true;
        }
      });
    }

    setFilteredCitations(filtered);
  }, [citations, searchQuery, activeFilters]);

  const handleAddCitation = (newCitation) => {
    setCitations(prev => [newCitation, ...prev]);
  };

  const handleEditCitation = (citation) => {
    setSelectedCitation(citation);
    // In a real app, this would open an edit modal
    console.log('Edit citation:', citation);
  };

  const handleDeleteCitation = (citationId) => {
    setCitations(prev => prev?.filter(c => c?.id !== citationId));
    setSelectedCitations(prev => prev?.filter(id => id !== citationId));
    if (selectedCitation?.id === citationId) {
      setSelectedCitation(null);
    }
  };

  const handlePreviewCitation = (citation) => {
    setSelectedCitation(citation);
  };

  const handleBulkDelete = () => {
    setCitations(prev => prev?.filter(c => !selectedCitations?.includes(c?.id)));
    setSelectedCitations([]);
  };

  const handleBulkExport = async (format) => {
    const selectedCitationData = citations?.filter(c => selectedCitations?.includes(c?.id));
    console.log(`Exporting ${selectedCitationData?.length} citations in ${format} format`);
    // Mock export delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleAssignProject = (projectId) => {
    const projectName = mockProjects?.find(p => p?.id === projectId)?.name;
    if (projectName) {
      setCitations(prev => prev?.map(citation => 
        selectedCitations?.includes(citation?.id) 
          ? { ...citation, project: projectName }
          : citation
      ));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <Breadcrumb customItems={[
                { label: 'Home', path: '/dashboard' },
                { label: 'Citation Manager', path: '/citation-manager' }
              ]} />
              <h1 className="text-3xl font-bold text-foreground">Citation Manager</h1>
              <p className="text-muted-foreground mt-2">
                Organize, format, and export your research citations
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <ProjectContextIndicator
                currentProject={currentProject}
                projects={mockProjects}
                onProjectChange={setCurrentProject}
              />
              <Button
                onClick={() => setIsAddModalOpen(true)}
                iconName="Plus"
                iconPosition="left"
              >
                Add Citation
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <CitationStats citations={citations} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Citations List */}
            <div className="xl:col-span-2 space-y-6">
              {/* Filters */}
              <CitationFilters
                onFilterChange={setActiveFilters}
                onSearch={setSearchQuery}
                activeFilters={activeFilters}
                projects={mockProjects}
              />

              {/* Bulk Actions */}
              <BulkActions
                selectedCount={selectedCitations?.length}
                onExport={handleBulkExport}
                onDelete={handleBulkDelete}
                onAssignProject={handleAssignProject}
                onClearSelection={() => setSelectedCitations([])}
                projects={mockProjects}
              />

              {/* Citations Table */}
              <CitationTable
                citations={filteredCitations}
                selectedCitations={selectedCitations}
                onSelectionChange={setSelectedCitations}
                onEdit={handleEditCitation}
                onDelete={handleDeleteCitation}
                onPreview={handlePreviewCitation}
                currentStyle={currentStyle}
              />
            </div>

            {/* Right Column - Citation Preview */}
            <div className="xl:col-span-1">
              <div className="sticky top-24">
                <CitationStylePreview
                  citation={selectedCitation}
                  onStyleChange={setCurrentStyle}
                  currentStyle={currentStyle}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Add Citation Modal */}
      <AddCitationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCitation}
        projects={mockProjects}
      />
    </div>
  );
};

export default CitationManager;