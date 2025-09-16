import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import StatsCard from './components/StatsCard';
import QuickActionCard from './components/QuickActionCard';
import ActivityFeed from './components/ActivityFeed';
import SearchWidget from './components/SearchWidget';
import RecommendationCard from './components/RecommendationCard';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Mock data for recent projects
  const recentProjects = [
    {
      id: '1',
      name: 'Climate Change Research',
      description: 'Comprehensive analysis of climate change impacts on agricultural productivity in developing nations.',
      status: 'active',
      progress: 75,
      paperCount: 24,
      citationCount: 156,
      collaborators: 3,
      lastModified: '2025-01-12T10:30:00Z'
    },
    {
      id: '2',
      name: 'AI Ethics Study',
      description: 'Exploring ethical implications of artificial intelligence in healthcare decision-making systems.',
      status: 'active',
      progress: 45,
      paperCount: 18,
      citationCount: 89,
      collaborators: 2,
      lastModified: '2025-01-10T14:20:00Z'
    },
    {
      id: '3',
      name: 'Quantum Computing Review',
      description: 'Literature review on quantum computing applications in cryptography and data security.',
      status: 'draft',
      progress: 30,
      paperCount: 12,
      citationCount: 45,
      collaborators: 1,
      lastModified: '2025-01-08T09:15:00Z'
    },
    {
      id: '4',
      name: 'Biomedical Applications',
      description: 'Research on CRISPR gene editing applications in treating genetic disorders.',
      status: 'completed',
      progress: 100,
      paperCount: 31,
      citationCount: 203,
      collaborators: 4,
      lastModified: '2025-01-05T16:45:00Z'
    }
  ];

  // Mock data for statistics
  const stats = [
    {
      title: 'Papers Analyzed',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: 'FileText',
      color: 'primary'
    },
    {
      title: 'Citations Generated',
      value: '493',
      change: '+8%',
      changeType: 'positive',
      icon: 'Quote',
      color: 'success'
    },
    {
      title: 'Active Projects',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: 'FolderOpen',
      color: 'warning'
    },
    {
      title: 'Collaborations',
      value: '15',
      change: '+3',
      changeType: 'positive',
      icon: 'Users',
      color: 'secondary'
    }
  ];

  // Mock data for quick actions
  const quickActions = [
    {
      title: 'New Research Project',
      description: 'Start a new research project with AI-powered organization',
      icon: 'FolderPlus',
      href: '/project-workspace',
      color: 'primary'
    },
    {
      title: 'Upload Documents',
      description: 'Upload and analyze research papers with AI insights',
      icon: 'Upload',
      href: '#upload',
      color: 'success'
    },
    {
      title: 'Literature Review',
      description: 'Generate comprehensive literature reviews automatically',
      icon: 'BookOpen',
      href: '/literature-review',
      color: 'warning'
    },
    {
      title: 'Citation Manager',
      description: 'Organize and format citations in multiple academic styles',
      icon: 'Quote',
      href: '/citation-manager',
      color: 'secondary'
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      type: 'paper_added',
      user: 'You',
      action: 'added 3 new papers to',
      target: 'Climate Change Research',
      timestamp: '2025-01-15T16:30:00Z',
      hasLink: true
    },
    {
      type: 'citation_generated',
      user: 'Sarah Chen',
      action: 'generated APA citations for',
      target: 'AI Ethics Study',
      timestamp: '2025-01-15T14:20:00Z',
      hasLink: true
    },
    {
      type: 'collaboration',
      user: 'Dr. Michael Rodriguez',
      action: 'joined your project',
      target: 'Quantum Computing Review',
      timestamp: '2025-01-15T11:45:00Z',
      hasLink: false
    },
    {
      type: 'review_completed',
      user: 'You',
      action: 'completed literature review for',
      target: 'Biomedical Applications',
      timestamp: '2025-01-14T18:30:00Z',
      hasLink: true
    },
    {
      type: 'upload',
      user: 'Emma Thompson',
      action: 'uploaded 5 research papers to',
      target: 'Climate Change Research',
      timestamp: '2025-01-14T10:15:00Z',
      hasLink: true
    }
  ];

  // Mock data for recommendations
  const recommendations = [
    {
      type: 'paper',
      title: 'Trending Paper in Your Field',
      description: 'Machine Learning Applications in Climate Modeling - Nature 2024',
      relevance: 95,
      isNew: true,
      action: () => window.location.href = '/paper-details?id=trending-ml-climate'
    },
    {
      type: 'topic',
      title: 'Emerging Research Topic',
      description: 'Quantum Machine Learning algorithms are gaining traction',
      relevance: 87,
      isNew: false,
      action: () => window.location.href = '/paper-search?q=quantum+machine+learning'
    },
    {
      type: 'collaboration',
      title: 'Potential Collaborator',
      description: 'Dr. Lisa Wang shares similar research interests',
      relevance: 82,
      isNew: true,
      action: () => {}
    },
    {
      type: 'tool',
      title: 'New Feature Available',
      description: 'Try our enhanced citation verification tool',
      relevance: 78,
      isNew: true,
      action: () => window.location.href = '/citation-manager'
    }
  ];

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-card-foreground mb-2">
                {getGreeting()}, Researcher!
              </h1>
              <p className="text-muted-foreground">
                Welcome back to your research command center. Let's continue advancing knowledge.
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="outline"
                iconName="Bell"
                iconPosition="left"
              >
                Notifications
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => window.location.href = '/project-workspace'}
              >
                New Project
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Search Widget */}
            <SearchWidget />

            {/* Statistics Cards */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Research Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats?.map((stat, index) => (
                  <StatsCard
                    key={index}
                    title={stat?.title}
                    value={stat?.value}
                    change={stat?.change}
                    changeType={stat?.changeType}
                    icon={stat?.icon}
                    color={stat?.color}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions?.map((action, index) => (
                  <QuickActionCard
                    key={index}
                    title={action?.title}
                    description={action?.description}
                    icon={action?.icon}
                    href={action?.href}
                    color={action?.color}
                  />
                ))}
              </div>
            </div>

            {/* Recent Projects */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Recent Projects</h2>
                <Link 
                  to="/project-workspace" 
                  className="text-sm text-primary hover:text-primary/80 transition-colors duration-250"
                >
                  View All Projects
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentProjects?.slice(0, 4)?.map((project) => (
                  <ProjectCard key={project?.id} project={project} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Activity Feed */}
            <ActivityFeed activities={recentActivities} />

            {/* Recommendations */}
            <RecommendationCard recommendations={recommendations} />

            {/* Research Tips */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Lightbulb" size={20} className="text-warning" />
                <h3 className="text-lg font-semibold text-card-foreground">Research Tip</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Use our AI-powered gap analysis to identify unexplored areas in your research field. 
                This can help you discover novel research opportunities and strengthen your literature review.
              </p>
              <Button
                variant="outline"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
              >
                Learn More
              </Button>
            </div>

            {/* Recent Papers */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Recently Viewed Papers</h3>
              <div className="space-y-3">
                {[
                  {
                    title: "Deep Learning for Climate Prediction Models",
                    authors: "Smith, J. et al.",
                    journal: "Nature Climate Change",
                    year: "2024"
                  },
                  {
                    title: "Ethical AI in Healthcare Decision Making",
                    authors: "Chen, L. & Rodriguez, M.",
                    journal: "AI Ethics Journal",
                    year: "2024"
                  },
                  {
                    title: "Quantum Computing Security Applications",
                    authors: "Thompson, E. et al.",
                    journal: "Quantum Information",
                    year: "2024"
                  }
                ]?.map((paper, index) => (
                  <div key={index} className="p-3 rounded-lg hover:bg-muted/50 transition-colors duration-250 cursor-pointer">
                    <h4 className="text-sm font-medium text-card-foreground mb-1 line-clamp-2">
                      {paper?.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {paper?.authors} • {paper?.journal} ({paper?.year})
                    </p>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                iconName="FileText"
                iconPosition="left"
                onClick={() => window.location.href = '/paper-search'}
              >
                Browse More Papers
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;