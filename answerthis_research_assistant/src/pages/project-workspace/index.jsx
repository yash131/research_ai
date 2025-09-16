import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProjectHeader from './components/ProjectHeader';
import ProjectTabs from './components/ProjectTabs';
import ProjectOverview from './components/ProjectOverview';
import ProjectPapers from './components/ProjectPapers';
import ProjectCitations from './components/ProjectCitations';
import ProjectNotes from './components/ProjectNotes';
import ProjectCollaboration from './components/ProjectCollaboration';
import ProjectTimeline from './components/ProjectTimeline';

const ProjectWorkspace = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock project data
  const project = {
    id: '1',
    title: 'Quantum Computing Applications in Cryptography',
    description: `A comprehensive research project exploring the implications of quantum computing on modern cryptographic systems, including post-quantum cryptography solutions and their implementation challenges.`,
    status: 'active',
    progress: 68,
    createdDate: 'Jan 15, 2025',
    lastUpdated: '2 hours ago',
    paperCount: 24
  };

  const stats = {
    totalPapers: 24,
    citations: 18,
    reviews: 3,
    notes: 12
  };

  const tabCounts = {
    papers: 24,
    citations: 18,
    reviews: 3,
    notes: 12,
    team: 4
  };

  const recentActivity = [
    {
      id: '1',
      description: 'Added 3 new papers on post-quantum cryptography',
      timestamp: '2 hours ago',
      icon: 'FileText',
      color: 'bg-blue-600'
    },
    {
      id: '2',
      description: 'Generated APA citations for quantum algorithms section',
      timestamp: '5 hours ago',
      icon: 'Quote',
      color: 'bg-green-600'
    },
    {
      id: '3',
      description: 'Sarah Chen added research notes on lattice-based cryptography',
      timestamp: '1 day ago',
      icon: 'StickyNote',
      color: 'bg-orange-600'
    },
    {
      id: '4',
      description: 'Completed literature review for Chapter 2',
      timestamp: '2 days ago',
      icon: 'BookOpen',
      color: 'bg-purple-600'
    }
  ];

  const papers = [
    {
      id: '1',
      title: 'Post-Quantum Cryptography: Current State and Future Directions',
      authors: ['Alice Johnson', 'Bob Smith', 'Carol Davis'],
      year: 2024,
      journal: 'Journal of Cryptographic Research',
      abstract: `This paper provides a comprehensive overview of post-quantum cryptographic algorithms and their potential to secure communications in the quantum era. We analyze lattice-based, code-based, and multivariate cryptographic schemes.`,
      isRead: true,
      hasAnnotations: true,
      isCited: true,
      priority: 'high',
      annotationCount: 5,
      citationCount: 2
    },
    {
      id: '2',
      title: 'Quantum Key Distribution: Security Analysis and Implementation',
      authors: ['David Wilson', 'Emma Thompson'],
      year: 2024,
      journal: 'Quantum Information Processing',
      abstract: `We present a detailed security analysis of quantum key distribution protocols and discuss practical implementation challenges in real-world scenarios.`,
      isRead: false,
      hasAnnotations: false,
      isCited: false,
      priority: 'medium',
      annotationCount: 0,
      citationCount: 0
    },
    {
      id: '3',
      title: 'Lattice-Based Cryptography: Mathematical Foundations and Applications',
      authors: ['Frank Miller', 'Grace Lee', 'Henry Brown'],
      year: 2023,
      journal: 'Mathematical Cryptography Review',
      abstract: `This work explores the mathematical foundations of lattice-based cryptographic systems and their applications in post-quantum security protocols.`,
      isRead: true,
      hasAnnotations: true,
      isCited: true,
      priority: 'high',
      annotationCount: 8,
      citationCount: 3
    }
  ];

  const citations = [
    {
      id: '1',
      title: 'Post-Quantum Cryptography: Current State and Future Directions',
      authors: ['Johnson, A.', 'Smith, B.', 'Davis, C.'],
      year: 2024,
      journal: 'Journal of Cryptographic Research',
      volume: '15',
      issue: '3',
      pages: '245-267',
      generatedDate: 'Jan 20, 2025',
      isVerified: true,
      hasIssues: false
    },
    {
      id: '2',
      title: 'Lattice-Based Cryptography: Mathematical Foundations and Applications',
      authors: ['Miller, F.', 'Lee, G.', 'Brown, H.'],
      year: 2023,
      journal: 'Mathematical Cryptography Review',
      volume: '8',
      issue: '2',
      pages: '112-134',
      generatedDate: 'Jan 18, 2025',
      isVerified: true,
      hasIssues: false
    },
    {
      id: '3',
      title: 'Quantum Algorithms for Cryptanalysis: A Survey',
      authors: ['Taylor, J.', 'Anderson, K.'],
      year: 2024,
      journal: 'Quantum Computing Today',
      volume: '12',
      issue: '1',
      pages: '78-95',
      generatedDate: 'Jan 15, 2025',
      isVerified: false,
      hasIssues: true
    }
  ];

  const notes = [
    {
      id: '1',
      title: 'Key Findings on Lattice-Based Schemes',
      content: `Lattice-based cryptographic schemes show promising resistance to quantum attacks. The main advantages include:\n\n1. Strong mathematical foundations based on worst-case hardness assumptions\n2. Efficient implementations possible with proper optimization\n3. Versatility in supporting various cryptographic primitives\n\nHowever, key sizes remain a significant challenge for practical deployment.`,
      tags: ['research', 'findings', 'lattice-cryptography'],
      createdDate: 'Jan 20, 2025',
      lastModified: 'Jan 20, 2025'
    },
    {
      id: '2',
      title: 'Research Questions for Chapter 3',
      content: `Important questions to address in the implementation chapter:\n\n- How do different lattice parameters affect security vs. performance trade-offs?\n- What are the practical bandwidth requirements for post-quantum protocols?\n- How can we optimize key generation for resource-constrained devices?`,
      tags: ['questions', 'methodology'],
      createdDate: 'Jan 18, 2025',
      lastModified: 'Jan 19, 2025'
    },
    {
      id: '3',
      title: 'Meeting Notes - Advisor Discussion',
      content: `Discussion points from today's meeting:\n\n- Focus more on practical implementation challenges\n- Include performance benchmarks in Chapter 4\n- Consider adding a section on hybrid classical-quantum approaches\n- Deadline for first draft: March 15, 2025`,
      tags: ['todo', 'methodology'],
      createdDate: 'Jan 15, 2025',
      lastModified: 'Jan 15, 2025'
    }
  ];

  const teamMembers = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      email: 'sarah.chen@university.edu',
      role: 'owner',
      status: 'active'
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      email: 'michael.r@university.edu',
      role: 'editor',
      status: 'active'
    },
    {
      id: '3',
      name: 'Lisa Wang',
      email: 'lisa.wang@university.edu',
      role: 'viewer',
      status: 'active'
    },
    {
      id: '4',
      name: 'James Thompson',
      email: 'james.t@university.edu',
      role: 'viewer',
      status: 'pending'
    }
  ];

  const comments = [
    {
      id: '1',
      content: 'Great progress on the literature review! The section on lattice-based cryptography is particularly well-researched.',
      author: 'Dr. Sarah Chen',
      timestamp: 'Jan 20, 2025 at 2:30 PM',
      isOwn: false
    },
    {
      id: '2',
      content: 'I\'ve added some additional papers on quantum key distribution that might be relevant for Chapter 5.',
      author: 'Michael Rodriguez',
      timestamp: 'Jan 19, 2025 at 4:15 PM',
      isOwn: false
    },
    {
      id: '3',
      content: 'Thanks for the feedback! I\'ll incorporate the suggested changes and focus more on implementation challenges.',
      author: 'You',
      timestamp: 'Jan 18, 2025 at 10:45 AM',
      isOwn: true
    }
  ];

  const timelineEvents = [
    {
      id: '1',
      type: 'paper_added',
      title: 'Papers Added',
      description: 'Added 3 new papers on post-quantum cryptography',
      date: '2025-01-20',
      time: '2:30 PM',
      metadata: { paperCount: 3 }
    },
    {
      id: '2',
      type: 'citation_generated',
      title: 'Citations Generated',
      description: 'Generated APA citations for quantum algorithms section',
      date: '2025-01-20',
      time: '10:15 AM',
      metadata: { count: 5 }
    },
    {
      id: '3',
      type: 'note_created',
      title: 'Research Note Added',
      description: 'Added research notes on lattice-based cryptography',
      date: '2025-01-19',
      time: '3:45 PM',
      metadata: { author: 'Sarah Chen' }
    },
    {
      id: '4',
      type: 'review_completed',
      title: 'Literature Review Completed',
      description: 'Completed literature review for Chapter 2',
      date: '2025-01-18',
      time: '5:20 PM'
    },
    {
      id: '5',
      type: 'milestone_reached',
      title: 'Milestone Reached',
      description: 'Completed initial paper collection phase',
      date: '2025-01-15',
      time: '11:30 AM'
    }
  ];

  const milestones = [
    {
      id: '1',
      title: 'Project Initiated',
      dueDate: '2025-01-15',
      completed: true
    },
    {
      id: '2',
      title: 'Initial Literature Search',
      dueDate: '2025-01-20',
      completed: true
    },
    {
      id: '3',
      title: 'Paper Collection Phase',
      dueDate: '2025-02-01',
      completed: true
    },
    {
      id: '4',
      title: 'Literature Review Draft',
      dueDate: '2025-02-15',
      completed: false,
      isOverdue: false
    },
    {
      id: '5',
      title: 'Final Analysis',
      dueDate: '2025-03-01',
      completed: false,
      isOverdue: false
    }
  ];

  const handleProjectUpdate = (updatedProject) => {
    console.log('Project updated:', updatedProject);
  };

  const handleExport = () => {
    console.log('Exporting project...');
  };

  const handlePaperAction = (action, data) => {
    console.log('Paper action:', action, data);
  };

  const handleCitationAction = (action, data) => {
    console.log('Citation action:', action, data);
  };

  const handleNoteAction = (action, data) => {
    console.log('Note action:', action, data);
  };

  const handleCollaborationAction = (action, data) => {
    console.log('Collaboration action:', action, data);
  };

  const handleTimelineAction = (action, data) => {
    console.log('Timeline action:', action, data);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <ProjectOverview
            project={project}
            stats={stats}
            recentActivity={recentActivity}
          />
        );
      case 'papers':
        return (
          <ProjectPapers
            papers={papers}
            onPaperAction={handlePaperAction}
          />
        );
      case 'citations':
        return (
          <ProjectCitations
            citations={citations}
            onCitationAction={handleCitationAction}
          />
        );
      case 'reviews':
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Literature reviews feature coming soon...</p>
          </div>
        );
      case 'notes':
        return (
          <ProjectNotes
            notes={notes}
            onNoteAction={handleNoteAction}
          />
        );
      case 'collaboration':
        return (
          <ProjectCollaboration
            teamMembers={teamMembers}
            comments={comments}
            onCollaborationAction={handleCollaborationAction}
          />
        );
      case 'timeline':
        return (
          <ProjectTimeline
            timelineEvents={timelineEvents}
            milestones={milestones}
            onTimelineAction={handleTimelineAction}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb customItems={[
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Projects', path: '/project-workspace' },
            { label: project?.title, path: '/project-workspace' }
          ]} />
          
          <ProjectHeader
            project={project}
            onProjectUpdate={handleProjectUpdate}
            onExport={handleExport}
          />
          
          <ProjectTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabCounts={tabCounts}
          />
          
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default ProjectWorkspace;