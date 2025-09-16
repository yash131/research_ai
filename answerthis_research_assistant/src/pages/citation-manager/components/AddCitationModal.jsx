import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddCitationModal = ({ isOpen, onClose, onAdd, projects = [] }) => {
  const [activeTab, setActiveTab] = useState('manual');
  const [isLoading, setIsLoading] = useState(false);
  const [doiInput, setDoiInput] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    year: '',
    journal: '',
    volume: '',
    issue: '',
    pages: '',
    doi: '',
    url: '',
    type: 'journal',
    project: ''
  });

  const sourceTypeOptions = [
    { value: 'journal', label: 'Journal Article' },
    { value: 'book', label: 'Book' },
    { value: 'conference', label: 'Conference Paper' },
    { value: 'thesis', label: 'Thesis/Dissertation' },
    { value: 'website', label: 'Website' },
    { value: 'report', label: 'Report' }
  ];

  const projectOptions = [
    { value: '', label: 'No Project' },
    ...projects?.map(project => ({
      value: project?.id,
      label: project?.name
    }))
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDoiLookup = async () => {
    if (!doiInput?.trim()) return;
    
    setIsLoading(true);
    try {
      // Mock DOI lookup - in real app, this would call a DOI API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data for demonstration
      const mockData = {
        title: "Artificial Intelligence in Academic Research: A Comprehensive Review",
        authors: "Smith, J., Johnson, M., & Williams, R.",
        year: "2024",
        journal: "Journal of AI Research",
        volume: "15",
        issue: "3",
        pages: "245-267",
        doi: doiInput,
        type: "journal"
      };
      
      setFormData(prev => ({ ...prev, ...mockData }));
      setActiveTab('manual');
    } catch (error) {
      console.error('DOI lookup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    const newCitation = {
      id: Date.now()?.toString(),
      ...formData,
      dateAdded: new Date()?.toISOString(),
      project: projects?.find(p => p?.id === formData?.project)?.name || 'Unassigned'
    };
    
    onAdd(newCitation);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      authors: '',
      year: '',
      journal: '',
      volume: '',
      issue: '',
      pages: '',
      doi: '',
      url: '',
      type: 'journal',
      project: ''
    });
    setDoiInput('');
    setActiveTab('manual');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Add New Citation</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('doi')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'doi'
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Link" size={16} className="inline mr-2" />
            DOI Lookup
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'manual' ?'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Edit" size={16} className="inline mr-2" />
            Manual Entry
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === 'doi' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Import from DOI
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Enter a DOI to automatically fetch citation information
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Input
                  label="DOI"
                  placeholder="10.1000/182"
                  value={doiInput}
                  onChange={(e) => setDoiInput(e?.target?.value)}
                  className="flex-1"
                />
                <div className="flex items-end">
                  <Button
                    onClick={handleDoiLookup}
                    loading={isLoading}
                    disabled={!doiInput?.trim() || isLoading}
                    iconName="Search"
                    iconPosition="left"
                  >
                    Lookup
                  </Button>
                </div>
              </div>

              {isLoading && (
                <div className="text-center py-8">
                  <Icon name="Loader2" size={32} className="text-primary animate-spin mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Fetching citation information...
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'manual' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Source Type"
                  options={sourceTypeOptions}
                  value={formData?.type}
                  onChange={(value) => handleInputChange('type', value)}
                  required
                />
                
                <Select
                  label="Project"
                  options={projectOptions}
                  value={formData?.project}
                  onChange={(value) => handleInputChange('project', value)}
                />
              </div>

              <Input
                label="Title"
                type="text"
                value={formData?.title}
                onChange={(e) => handleInputChange('title', e?.target?.value)}
                required
                placeholder="Enter the title of the work"
              />

              <Input
                label="Authors"
                type="text"
                value={formData?.authors}
                onChange={(e) => handleInputChange('authors', e?.target?.value)}
                required
                placeholder="Last, F., Last, F., & Last, F."
                description="Enter authors in the format: Last, F., Last, F., & Last, F."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Publication Year"
                  type="number"
                  value={formData?.year}
                  onChange={(e) => handleInputChange('year', e?.target?.value)}
                  required
                  min="1900"
                  max={new Date()?.getFullYear()}
                />

                <Input
                  label="Journal/Publisher"
                  type="text"
                  value={formData?.journal}
                  onChange={(e) => handleInputChange('journal', e?.target?.value)}
                  placeholder="Journal name or publisher"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Volume"
                  type="text"
                  value={formData?.volume}
                  onChange={(e) => handleInputChange('volume', e?.target?.value)}
                  placeholder="Vol. number"
                />

                <Input
                  label="Issue"
                  type="text"
                  value={formData?.issue}
                  onChange={(e) => handleInputChange('issue', e?.target?.value)}
                  placeholder="Issue number"
                />

                <Input
                  label="Pages"
                  type="text"
                  value={formData?.pages}
                  onChange={(e) => handleInputChange('pages', e?.target?.value)}
                  placeholder="123-145"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="DOI"
                  type="text"
                  value={formData?.doi}
                  onChange={(e) => handleInputChange('doi', e?.target?.value)}
                  placeholder="10.1000/182"
                />

                <Input
                  label="URL"
                  type="url"
                  value={formData?.url}
                  onChange={(e) => handleInputChange('url', e?.target?.value)}
                  placeholder="https://example.com"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add Citation
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCitationModal;