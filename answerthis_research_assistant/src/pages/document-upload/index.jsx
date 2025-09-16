import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
import Header from '../../components/ui/Header';
import DragDropZone from './components/DragDropZone';
import UploadProgress from './components/UploadProgress';
import FileValidation from './components/FileValidation';
import MetadataExtractor from './components/MetadataExtractor';
import ProjectSelector from './components/ProjectSelector';
import RecentUploads from './components/RecentUploads';

const DocumentUpload = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // Upload state
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, completed, error
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState([]);
  
  // Form state
  const [selectedProject, setSelectedProject] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [createNewProject, setCreateNewProject] = useState(false);
  const [uploadMode, setUploadMode] = useState('individual'); // individual, bulk
  
  // File validation settings
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
  const maxFileSize = 50 * 1024 * 1024; // 50MB
  const maxFiles = 20;

  // Mock data for projects
  const availableProjects = [
    { id: '1', name: 'Climate Change Research', description: '24 papers • Active' },
    { id: '2', name: 'AI Ethics Study', description: '18 papers • Active' },
    { id: '3', name: 'Quantum Computing Review', description: '12 papers • Draft' },
    { id: '4', name: 'Biomedical Applications', description: '31 papers • Completed' }
  ];

  // Recent uploads mock data
  const recentUploads = [
    {
      id: '1',
      name: 'Machine Learning in Climate Science.pdf',
      size: 2.4,
      status: 'completed',
      project: 'Climate Change Research',
      uploadedAt: '2025-01-15T16:30:00Z',
      analysis: 'completed'
    },
    {
      id: '2',
      name: 'Ethical AI Framework.docx',
      size: 1.8,
      status: 'processing',
      project: 'AI Ethics Study',
      uploadedAt: '2025-01-15T15:20:00Z',
      analysis: 'processing'
    },
    {
      id: '3',
      name: 'Quantum Algorithms Review.pdf',
      size: 3.2,
      status: 'completed',
      project: 'Quantum Computing Review',
      uploadedAt: '2025-01-15T14:15:00Z',
      analysis: 'completed'
    }
  ];

  // Handle file drop/selection
  const handleFilesSelect = useCallback((newFiles) => {
    const validFiles = [];
    const newErrors = [];

    Array.from(newFiles)?.forEach((file) => {
      // Validate file type
      if (!allowedTypes?.includes(file?.type)) {
        newErrors?.push(`${file?.name}: Unsupported file type. Please use PDF, DOC, DOCX, or TXT files.`);
        return;
      }

      // Validate file size
      if (file?.size > maxFileSize) {
        newErrors?.push(`${file?.name}: File size exceeds 50MB limit.`);
        return;
      }

      // Check for duplicates
      const isDuplicate = files?.some(existingFile => 
        existingFile?.name === file?.name && existingFile?.size === file?.size
      );
      
      if (isDuplicate) {
        newErrors?.push(`${file?.name}: Duplicate file detected.`);
        return;
      }

      validFiles?.push({
        file,
        id: Math.random()?.toString(36)?.substr(2, 9),
        name: file?.name,
        size: file?.size,
        type: file?.type,
        status: 'ready',
        metadata: null,
        analysisResults: null
      });
    });

    // Check total file limit
    if (files?.length + validFiles?.length > maxFiles) {
      newErrors?.push(`Cannot upload more than ${maxFiles} files at once.`);
      return;
    }

    setFiles(prev => [...prev, ...validFiles]);
    setErrors(newErrors);
  }, [files, allowedTypes, maxFileSize, maxFiles]);

  // Handle drag and drop
  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    const droppedFiles = e?.dataTransfer?.files;
    handleFilesSelect(droppedFiles);
  }, [handleFilesSelect]);

  // Handle file input change
  const handleFileInputChange = (e) => {
    if (e?.target?.files?.length > 0) {
      handleFilesSelect(e?.target?.files);
    }
  };

  // Remove file from upload list
  const removeFile = (fileId) => {
    setFiles(prev => prev?.filter(file => file?.id !== fileId));
    setUploadProgress(prev => {
      const updated = { ...prev };
      delete updated?.[fileId];
      return updated;
    });
  };

  // Clear all files
  const clearAllFiles = () => {
    setFiles([]);
    setUploadProgress({});
    setErrors([]);
    setUploadStatus('idle');
  };

  // Start upload process
  const handleStartUpload = async () => {
    if (files?.length === 0) {
      setErrors(['Please select files to upload.']);
      return;
    }

    if (!selectedProject && !createNewProject) {
      setErrors(['Please select a project or create a new one.']);
      return;
    }

    if (createNewProject && !newProjectName?.trim()) {
      setErrors(['Please enter a name for the new project.']);
      return;
    }

    setUploadStatus('uploading');
    setErrors([]);

    try {
      // Simulate file uploads with progress
      for (let i = 0; i < files?.length; i++) {
        const file = files?.[i];
        
        // Update file status to uploading
        setFiles(prev => prev?.map(f => 
          f?.id === file?.id ? { ...f, status: 'uploading' } : f
        ));

        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          setUploadProgress(prev => ({
            ...prev,
            [file?.id]: progress
          }));
        }

        // Update file status to processing
        setFiles(prev => prev?.map(f => 
          f?.id === file?.id ? { ...f, status: 'processing' } : f
        ));

        // Simulate metadata extraction and analysis
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update file with completed status and mock metadata
        setFiles(prev => prev?.map(f => 
          f?.id === file?.id ? { 
            ...f, 
            status: 'completed',
            metadata: {
              title: file?.name?.replace(/\.[^/.]+$/, ""),
              authors: ['Smith, J.', 'Doe, A.'],
              publicationYear: '2024',
              keywords: ['machine learning', 'artificial intelligence'],
              abstract: 'This document discusses advanced techniques in the field...'
            },
            analysisResults: {
              summary: 'Key findings include novel approaches to...',
              citationCount: Math.floor(Math.random() * 100),
              relevanceScore: Math.floor(Math.random() * 30) + 70
            }
          } : f
        ));
      }

      setUploadStatus('completed');
    } catch (error) {
      setUploadStatus('error');
      setErrors(['Upload failed. Please try again.']);
    }
  };

  // Calculate upload statistics
  const uploadStats = {
    total: files?.length,
    completed: files?.filter(f => f?.status === 'completed')?.length,
    processing: files?.filter(f => f?.status === 'processing')?.length,
    failed: files?.filter(f => f?.status === 'error')?.length,
    totalSize: files?.reduce((total, file) => total + file?.size, 0)
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Document Upload"
        subtitle="Upload research papers and documents for AI-powered analysis"
        showBack={true}
        onBack={() => navigate('/dashboard')}
      />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Upload Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Upload Mode Selection */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-card-foreground mb-4">Upload Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Upload Mode */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Upload Mode
                  </label>
                  <Select
                    value={uploadMode}
                    onValueChange={setUploadMode}
                    placeholder="Select upload mode"
                  >
                    <option value="individual">Individual Files</option>
                    <option value="bulk">Bulk Upload</option>
                  </Select>
                </div>

                {/* Project Selection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Assign to Project
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="existing-project"
                        name="project-option"
                        checked={!createNewProject}
                        onChange={() => setCreateNewProject(false)}
                        className="text-primary focus:ring-primary"
                      />
                      <label htmlFor="existing-project" className="text-sm text-foreground">
                        Existing Project
                      </label>
                    </div>
                    
                    {!createNewProject && (
                      <ProjectSelector
                        projects={availableProjects}
                        selectedProject={selectedProject}
                        onProjectSelect={setSelectedProject}
                      />
                    )}

                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="new-project"
                        name="project-option"
                        checked={createNewProject}
                        onChange={() => setCreateNewProject(true)}
                        className="text-primary focus:ring-primary"
                      />
                      <label htmlFor="new-project" className="text-sm text-foreground">
                        Create New Project
                      </label>
                    </div>

                    {createNewProject && (
                      <Input
                        placeholder="Enter project name"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e?.target?.value)}
                        className="mt-2"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Drag and Drop Zone */}
            <DragDropZone
              onDrop={handleDrop}
              onFileSelect={handleFilesSelect}
              fileInputRef={fileInputRef}
              onFileInputChange={handleFileInputChange}
              allowedTypes={allowedTypes}
              maxFileSize={maxFileSize}
              uploadStatus={uploadStatus}
              files={files}
              errors={errors}
            />

            {/* File Validation Component */}
            {files?.length > 0 && (
              <FileValidation
                files={files}
                onRemoveFile={removeFile}
                onClearAll={clearAllFiles}
                allowedTypes={allowedTypes}
                maxFileSize={maxFileSize}
              />
            )}

            {/* Upload Progress */}
            {uploadStatus === 'uploading' && (
              <UploadProgress
                files={files}
                uploadProgress={uploadProgress}
                uploadStats={uploadStats}
              />
            )}

            {/* Metadata Extraction Results */}
            {uploadStatus === 'completed' && files?.some(f => f?.metadata) && (
              <MetadataExtractor
                files={files?.filter(f => f?.metadata)}
                onFileUpdate={(fileId, updates) => {
                  setFiles(prev => prev?.map(f => 
                    f?.id === fileId ? { ...f, ...updates } : f
                  ));
                }}
              />
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="Upload"
                iconPosition="left"
                onClick={handleStartUpload}
                disabled={files?.length === 0 || uploadStatus === 'uploading'}
                loading={uploadStatus === 'uploading'}
                className="flex-1"
              >
                {uploadStatus === 'uploading' ? 'Uploading...' : `Upload ${files?.length} Document${files?.length !== 1 ? 's' : ''}`}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="FolderOpen"
                iconPosition="left"
                onClick={() => fileInputRef?.current?.click()}
                disabled={uploadStatus === 'uploading'}
              >
                Browse Files
              </Button>
              
              {files?.length > 0 && (
                <Button
                  variant="ghost"
                  size="lg"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={clearAllFiles}
                  disabled={uploadStatus === 'uploading'}
                >
                  Clear All
                </Button>
              )}
            </div>

            {/* Success Message */}
            {uploadStatus === 'completed' && (
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <div>
                    <h3 className="text-sm font-medium text-success">Upload Completed!</h3>
                    <p className="text-xs text-success/80 mt-1">
                      {uploadStats?.completed} documents uploaded successfully. AI analysis is now in progress.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    onClick={() => navigate('/project-workspace')}
                  >
                    View in Project
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Plus"
                    iconPosition="left"
                    onClick={() => window.location?.reload()}
                  >
                    Upload More
                  </Button>
                </div>
              </div>
            )}

            {/* Error Messages */}
            {errors?.length > 0 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={20} className="text-destructive mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-destructive mb-2">Upload Issues</h3>
                    <ul className="text-xs text-destructive/80 space-y-1">
                      {errors?.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Upload Guidelines */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Info" size={20} className="text-primary" />
                <h3 className="text-lg font-semibold text-card-foreground">Upload Guidelines</h3>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-1">Supported Formats</h4>
                  <p>PDF, DOC, DOCX, TXT files</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">File Size Limit</h4>
                  <p>Maximum 50MB per file</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Batch Upload</h4>
                  <p>Up to 20 files at once</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">AI Processing</h4>
                  <p>Automatic metadata extraction, summary generation, and keyword identification</p>
                </div>
              </div>
            </div>

            {/* Recent Uploads */}
            <RecentUploads uploads={recentUploads} />

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Camera"
                  iconPosition="left"
                  onClick={() => {}}
                >
                  Scan Document
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Link"
                  iconPosition="left"
                  onClick={() => {}}
                >
                  Import from URL
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="FileText"
                  iconPosition="left"
                  onClick={() => navigate('/paper-search')}
                >
                  Search Papers
                </Button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Lightbulb" size={20} className="text-warning" />
                <h3 className="text-lg font-semibold text-card-foreground">Pro Tips</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={12} className="text-muted-foreground mt-1" />
                  <span>Upload high-quality scans for better text extraction</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={12} className="text-muted-foreground mt-1" />
                  <span>Use descriptive filenames to improve organization</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={12} className="text-muted-foreground mt-1" />
                  <span>Group related documents in the same project</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={12} className="text-muted-foreground mt-1" />
                  <span>Review AI-generated metadata for accuracy</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
};

export default DocumentUpload;