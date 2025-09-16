import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PaperDetails from './pages/paper-details';
import CitationManager from './pages/citation-manager';
import PaperSearch from './pages/paper-search';
import LiteratureReview from './pages/literature-review';
import Dashboard from './pages/dashboard';
import ProjectWorkspace from './pages/project-workspace';
import DocumentUpload from './pages/document-upload';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CitationManager />} />
        <Route path="/paper-details" element={<PaperDetails />} />
        <Route path="/citation-manager" element={<CitationManager />} />
        <Route path="/paper-search" element={<PaperSearch />} />
        <Route path="/literature-review" element={<LiteratureReview />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project-workspace" element={<ProjectWorkspace />} />
        <Route path="/document-upload" element={<DocumentUpload />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;