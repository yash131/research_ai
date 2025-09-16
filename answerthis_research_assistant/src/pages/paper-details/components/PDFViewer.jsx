import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PDFViewer = ({ pdfUrl, annotations, onAddAnnotation }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isAnnotationMode, setIsAnnotationMode] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showAnnotationForm, setShowAnnotationForm] = useState(false);
  const [annotationText, setAnnotationText] = useState('');

  const totalPages = 24; // Mock total pages

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection?.toString()?.trim()) {
      setSelectedText(selection?.toString());
      setShowAnnotationForm(true);
    }
  };

  const handleAddAnnotation = () => {
    if (annotationText?.trim() && selectedText) {
      onAddAnnotation({
        id: Date.now(),
        page: currentPage,
        selectedText,
        note: annotationText,
        timestamp: new Date()?.toISOString()
      });
      setAnnotationText('');
      setSelectedText('');
      setShowAnnotationForm(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* PDF Viewer Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <span className="text-sm text-foreground px-3">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoomLevel === 50}
          >
            <Icon name="ZoomOut" size={16} />
          </Button>
          <span className="text-sm text-foreground px-2 min-w-[60px] text-center">
            {zoomLevel}%
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoomLevel === 200}
          >
            <Icon name="ZoomIn" size={16} />
          </Button>
          
          <div className="w-px h-6 bg-border mx-2" />
          
          <Button
            variant={isAnnotationMode ? "default" : "ghost"}
            size="sm"
            onClick={() => setIsAnnotationMode(!isAnnotationMode)}
          >
            <Icon name="PenTool" size={16} />
          </Button>
          
          <Button variant="ghost" size="sm">
            <Icon name="Download" size={16} />
          </Button>
        </div>
      </div>
      {/* PDF Content Area */}
      <div className="relative h-[600px] bg-muted/10 overflow-auto">
        <div 
          className="flex justify-center p-4"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          <div 
            className="bg-white shadow-lg border border-border rounded-lg p-8 max-w-4xl w-full cursor-text"
            onMouseUp={isAnnotationMode ? handleTextSelection : undefined}
          >
            {/* Mock PDF Content */}
            <div className="space-y-4 text-sm leading-relaxed text-gray-800">
              <h2 className="text-xl font-bold text-center mb-6">
                Machine Learning Applications in Climate Change Research
              </h2>
              
              <div className="text-center text-gray-600 mb-8">
                <p>John Smith¹, Sarah Johnson², Michael Chen³</p>
                <p className="text-xs mt-2">
                  ¹Stanford University, ²MIT, ³University of California Berkeley
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-base">Abstract</h3>
                <p>
                  This paper presents a comprehensive analysis of machine learning applications 
                  in climate change research. We examine various ML techniques including neural 
                  networks, support vector machines, and ensemble methods for predicting climate 
                  patterns and analyzing environmental data. Our findings demonstrate significant 
                  improvements in prediction accuracy compared to traditional statistical methods.
                </p>

                <h3 className="font-semibold text-base">1. Introduction</h3>
                <p>
                  Climate change represents one of the most pressing challenges of our time. 
                  Traditional approaches to climate modeling have relied heavily on physics-based 
                  models, which while accurate, are computationally intensive and may miss 
                  complex non-linear relationships in climate data.
                </p>
                
                <p>
                  Machine learning offers promising alternatives and complementary approaches 
                  to traditional climate modeling. By leveraging large datasets and identifying 
                  patterns that may not be apparent through conventional analysis, ML techniques 
                  can provide valuable insights into climate dynamics.
                </p>

                <h3 className="font-semibold text-base">2. Methodology</h3>
                <p>
                  We employed a multi-faceted approach combining supervised and unsupervised 
                  learning techniques. Our dataset comprised temperature, precipitation, and 
                  atmospheric pressure measurements from over 1,000 weather stations globally, 
                  spanning a 50-year period from 1970 to 2020.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Annotations Overlay */}
        {annotations?.filter(ann => ann?.page === currentPage)?.map((annotation) => (
          <div
            key={annotation?.id}
            className="absolute bg-warning/20 border-l-2 border-warning p-2 rounded-r-md max-w-xs"
            style={{ 
              top: `${Math.random() * 400 + 100}px`, 
              right: '20px',
              zIndex: 10 
            }}
          >
            <div className="text-xs text-foreground font-medium mb-1">
              "{annotation?.selectedText?.substring(0, 50)}..."
            </div>
            <div className="text-xs text-muted-foreground">
              {annotation?.note}
            </div>
          </div>
        ))}
      </div>
      {/* Annotation Form Modal */}
      {showAnnotationForm && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-foreground mb-4">Add Annotation</h3>
            
            <div className="mb-4">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Selected Text:
              </label>
              <div className="bg-muted p-3 rounded-md text-sm text-foreground">
                "{selectedText}"
              </div>
            </div>
            
            <div className="mb-4">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Your Note:
              </label>
              <textarea
                value={annotationText}
                onChange={(e) => setAnnotationText(e?.target?.value)}
                placeholder="Add your annotation..."
                className="w-full p-3 border border-border rounded-md text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowAnnotationForm(false);
                  setSelectedText('');
                  setAnnotationText('');
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddAnnotation}>
                Add Annotation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;