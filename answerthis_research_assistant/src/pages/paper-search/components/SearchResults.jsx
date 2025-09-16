import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SearchResults = ({ 
  results = [], 
  loading = false, 
  totalResults = 0, 
  currentPage = 1, 
  onLoadMore,
  onPaperSelect,
  onAddToProject,
  onGenerateCitation 
}) => {
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedPapers, setSelectedPapers] = useState(new Set());

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'citations-desc', label: 'Most Cited' },
    { value: 'citations-asc', label: 'Least Cited' },
    { value: 'author', label: 'Author A-Z' }
  ];

  const mockResults = results?.length > 0 ? results : [
    {
      id: "1",
      title: "Deep Learning Approaches for Climate Change Prediction: A Comprehensive Review",
      authors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez", "Dr. Emily Watson"],
      journal: "Nature Climate Change",
      year: 2024,
      citationCount: 127,
      abstract: `This comprehensive review examines the application of deep learning methodologies in climate change prediction models. We analyze over 200 recent studies that utilize neural networks, convolutional neural networks, and recurrent neural networks for weather pattern recognition and long-term climate forecasting.\n\nOur analysis reveals that transformer-based architectures show particular promise in handling temporal climate data, achieving up to 15% improvement in prediction accuracy compared to traditional statistical methods. The review also identifies key challenges including data quality, model interpretability, and computational requirements.`,
      tags: ["Deep Learning", "Climate Science", "Machine Learning", "Environmental Modeling"],
      openAccess: true,
      peerReviewed: true,
      hasFullText: true,
      relevanceScore: 0.95,
      doi: "10.1038/s41558-024-01234-5"
    },
    {
      id: "2",
      title: "Quantum Computing Applications in Cryptography: Current State and Future Prospects",
      authors: ["Prof. David Kim", "Dr. Lisa Zhang", "Dr. Robert Johnson"],
      journal: "IEEE Transactions on Quantum Engineering",
      year: 2024,
      citationCount: 89,
      abstract: `Quantum computing represents a paradigm shift in computational capabilities, particularly in the field of cryptography. This paper provides a comprehensive analysis of current quantum algorithms and their implications for modern cryptographic systems.\n\nWe examine Shor's algorithm, Grover's algorithm, and emerging quantum key distribution protocols. Our findings suggest that while practical quantum computers capable of breaking RSA encryption are still years away, organizations should begin preparing post-quantum cryptographic strategies now.`,
      tags: ["Quantum Computing", "Cryptography", "Security", "Algorithms"],
      openAccess: false,
      peerReviewed: true,
      hasFullText: true,
      relevanceScore: 0.88,
      doi: "10.1109/TQE.2024.5678901"
    },
    {
      id: "3",
      title: "CRISPR-Cas9 Gene Editing: Therapeutic Applications and Ethical Considerations",
      authors: ["Dr. Maria Gonzalez", "Prof. James Wilson", "Dr. Aisha Patel"],
      journal: "Cell",
      year: 2023,
      citationCount: 234,
      abstract: `CRISPR-Cas9 technology has revolutionized gene editing capabilities, offering unprecedented precision in modifying genetic sequences. This review examines recent therapeutic applications and addresses the complex ethical landscape surrounding human gene editing.\n\nWe analyze clinical trials for treating sickle cell disease, beta-thalassemia, and inherited blindness. While the therapeutic potential is enormous, we discuss the need for robust ethical frameworks, particularly regarding germline editing and equitable access to treatments.`,
      tags: ["CRISPR", "Gene Editing", "Biotechnology", "Medical Ethics"],
      openAccess: true,
      peerReviewed: true,
      hasFullText: true,
      relevanceScore: 0.82,
      doi: "10.1016/j.cell.2023.11.012"
    },
    {
      id: "4",
      title: "Sustainable Energy Systems: Integration of Renewable Sources in Smart Grids",
      authors: ["Prof. Anna Kowalski", "Dr. Thomas Mueller", "Dr. Priya Sharma"],
      journal: "Energy Policy",
      year: 2023,
      citationCount: 156,
      abstract: `The transition to sustainable energy systems requires sophisticated integration of renewable sources within existing power infrastructure. This study examines smart grid technologies and their role in managing intermittent renewable energy sources.\n\nOur analysis of 15 smart grid implementations across Europe and North America reveals key success factors including advanced forecasting algorithms, energy storage solutions, and demand response mechanisms. We propose a framework for optimizing renewable energy integration while maintaining grid stability.`,
      tags: ["Renewable Energy", "Smart Grids", "Sustainability", "Energy Policy"],
      openAccess: false,
      peerReviewed: true,
      hasFullText: false,
      relevanceScore: 0.79,
      doi: "10.1016/j.enpol.2023.08.045"
    },
    {
      id: "5",
      title: "Artificial Intelligence in Medical Diagnosis: A Meta-Analysis of Diagnostic Accuracy",
      authors: ["Dr. Kevin Lee", "Prof. Rachel Brown", "Dr. Ahmed Hassan"],
      journal: "The Lancet Digital Health",
      year: 2024,
      citationCount: 98,
      abstract: `Artificial intelligence systems are increasingly being deployed in medical diagnosis across various specialties. This meta-analysis evaluates the diagnostic accuracy of AI systems compared to human physicians across 50 studies encompassing radiology, pathology, and dermatology.\n\nOur findings indicate that AI systems achieve comparable or superior diagnostic accuracy in specific domains, with particularly strong performance in medical imaging. However, we identify important limitations including dataset bias, generalizability concerns, and the need for human-AI collaboration frameworks.`,
      tags: ["Artificial Intelligence", "Medical Diagnosis", "Healthcare", "Machine Learning"],
      openAccess: true,
      peerReviewed: true,
      hasFullText: true,
      relevanceScore: 0.91,
      doi: "10.1016/S2589-7500(24)00123-4"
    }
  ];

  const handlePaperToggle = (paperId) => {
    const newSelected = new Set(selectedPapers);
    if (newSelected?.has(paperId)) {
      newSelected?.delete(paperId);
    } else {
      newSelected?.add(paperId);
    }
    setSelectedPapers(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedPapers?.size === mockResults?.length) {
      setSelectedPapers(new Set());
    } else {
      setSelectedPapers(new Set(mockResults.map(paper => paper.id)));
    }
  };

  const handleBulkAction = (action) => {
    const selectedIds = Array.from(selectedPapers);
    switch (action) {
      case 'add-to-project':
        selectedIds?.forEach(id => onAddToProject(id));
        break;
      case 'generate-citations':
        selectedIds?.forEach(id => onGenerateCitation(id));
        break;
      case 'export':
        // Handle export functionality
        break;
    }
    setSelectedPapers(new Set());
  };

  const formatAuthors = (authors) => {
    if (authors?.length <= 3) {
      return authors?.join(', ');
    }
    return `${authors?.slice(0, 3)?.join(', ')} et al.`;
  };

  const getRelevanceColor = (score) => {
    if (score >= 0.9) return 'text-success';
    if (score >= 0.8) return 'text-warning';
    return 'text-muted-foreground';
  };

  if (loading && mockResults?.length === 0) {
    return (
      <div className="space-y-6">
        {[...Array(5)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">
            {totalResults?.toLocaleString()} results found
          </p>
          {selectedPapers?.size > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">
                {selectedPapers?.size} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('add-to-project')}
                iconName="Plus"
                iconPosition="left"
              >
                Add to Project
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('generate-citations')}
                iconName="Quote"
                iconPosition="left"
              >
                Cite
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            className="w-48"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleSelectAll}
            iconName={selectedPapers?.size === mockResults?.length ? "Square" : "CheckSquare"}
            iconPosition="left"
          >
            {selectedPapers?.size === mockResults?.length ? "Deselect All" : "Select All"}
          </Button>
        </div>
      </div>
      {/* Results List */}
      <div className="space-y-4">
        {mockResults?.map((paper) => (
          <div
            key={paper?.id}
            className={`bg-card border rounded-lg p-6 hover:shadow-subtle transition-all duration-250 ${
              selectedPapers?.has(paper?.id) ? 'border-primary bg-primary/5' : 'border-border'
            }`}
          >
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={selectedPapers?.has(paper?.id)}
                onChange={() => handlePaperToggle(paper?.id)}
                className="mt-1 h-4 w-4 text-primary focus:ring-primary border-border rounded"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <button
                    onClick={() => onPaperSelect(paper?.id)}
                    className="text-left hover:text-primary transition-colors duration-250"
                  >
                    <h3 className="text-lg font-semibold text-card-foreground line-clamp-2 hover:underline">
                      {paper?.title}
                    </h3>
                  </button>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`text-xs font-medium ${getRelevanceColor(paper?.relevanceScore)}`}>
                      {Math.round(paper?.relevanceScore * 100)}% match
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-3 text-sm text-muted-foreground">
                  <span>{formatAuthors(paper?.authors)}</span>
                  <span>•</span>
                  <span className="font-medium">{paper?.journal}</span>
                  <span>•</span>
                  <span>{paper?.year}</span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Icon name="Quote" size={14} className="mr-1" />
                    {paper?.citationCount} citations
                  </span>
                </div>

                <p className="text-sm text-card-foreground mb-4 line-clamp-3">
                  {paper?.abstract}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {paper?.tags?.slice(0, 4)?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                    
                    <div className="flex items-center space-x-2 ml-2">
                      {paper?.openAccess && (
                        <span className="flex items-center text-xs text-success">
                          <Icon name="Unlock" size={12} className="mr-1" />
                          Open Access
                        </span>
                      )}
                      {paper?.peerReviewed && (
                        <span className="flex items-center text-xs text-primary">
                          <Icon name="Shield" size={12} className="mr-1" />
                          Peer Reviewed
                        </span>
                      )}
                      {paper?.hasFullText && (
                        <span className="flex items-center text-xs text-accent">
                          <Icon name="FileText" size={12} className="mr-1" />
                          Full Text
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAddToProject(paper?.id)}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Add to Project
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onGenerateCitation(paper?.id)}
                      iconName="Quote"
                      iconPosition="left"
                    >
                      Cite
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onPaperSelect(paper?.id)}
                      iconName="ExternalLink"
                      iconPosition="left"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      {mockResults?.length > 0 && (
        <div className="flex justify-center pt-6">
          <Button
            variant="outline"
            onClick={onLoadMore}
            loading={loading}
            iconName="ChevronDown"
            iconPosition="left"
          >
            Load More Results
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;