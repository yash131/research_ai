import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CollaborationPanel = ({ collaborators = [], comments = [], onAddComment, onInviteCollaborator }) => {
  const [newComment, setNewComment] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedText, setSelectedText] = useState('');

  const mockCollaborators = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      role: 'Editor',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      status: 'online',
      lastActive: new Date()
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      email: 'michael.chen@research.org',
      role: 'Reviewer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      status: 'offline',
      lastActive: new Date(Date.now() - 3600000)
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@institute.edu',
      role: 'Contributor',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      status: 'online',
      lastActive: new Date()
    }
  ];

  const mockComments = [
    {
      id: 1,
      author: 'Dr. Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      content: 'This section needs more recent citations. Consider adding the 2024 studies by Williams et al.',
      timestamp: new Date(Date.now() - 1800000),
      section: 'Introduction',
      resolved: false,
      replies: [
        {
          id: 11,
          author: 'You',
          content: 'Good point! I\'ll add those citations in the next revision.',
          timestamp: new Date(Date.now() - 1200000)
        }
      ]
    },
    {
      id: 2,
      author: 'Prof. Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      content: 'The methodology section could benefit from a clearer explanation of the selection criteria.',
      timestamp: new Date(Date.now() - 7200000),
      section: 'Methodology',
      resolved: true,
      replies: []
    },
    {
      id: 3,
      author: 'Dr. Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      content: 'Excellent analysis of the research gaps. This adds significant value to the review.',
      timestamp: new Date(Date.now() - 10800000),
      section: 'Analysis',
      resolved: false,
      replies: []
    }
  ];

  const activeCollaborators = collaborators?.length > 0 ? collaborators : mockCollaborators;
  const activeComments = comments?.length > 0 ? comments : mockComments;

  const handleAddComment = () => {
    if (newComment?.trim()) {
      const comment = {
        id: Date.now(),
        author: 'You',
        content: newComment,
        timestamp: new Date(),
        section: 'Current Section',
        resolved: false,
        replies: []
      };
      onAddComment(comment);
      setNewComment('');
    }
  };

  const handleInviteCollaborator = () => {
    if (inviteEmail?.trim()) {
      onInviteCollaborator(inviteEmail);
      setInviteEmail('');
      setShowInviteModal(false);
    }
  };

  const getStatusColor = (status) => {
    return status === 'online' ? 'bg-green-500' : 'bg-gray-400';
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Editor': return 'bg-blue-100 text-blue-800';
      case 'Reviewer': return 'bg-green-100 text-green-800';
      case 'Contributor': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Collaboration</h2>
          <Button
            variant="outline"
            size="sm"
            iconName="UserPlus"
            iconPosition="left"
            onClick={() => setShowInviteModal(true)}
          >
            Invite
          </Button>
        </div>

        {/* Active Collaborators */}
        <div className="space-y-3">
          {activeCollaborators?.map((collaborator) => (
            <div key={collaborator?.id} className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src={collaborator?.avatar}
                  alt={collaborator?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(collaborator?.status)}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-foreground truncate">{collaborator?.name}</p>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${getRoleColor(collaborator?.role)}`}>
                    {collaborator?.role}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {collaborator?.status === 'online' ? 'Active now' : formatTimeAgo(collaborator?.lastActive)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Comments Section */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-medium text-foreground mb-3">Comments & Feedback</h3>
          
          {/* Add Comment */}
          <div className="space-y-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e?.target?.value)}
              placeholder="Add a comment..."
              className="w-full p-3 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              rows={3}
            />
            <Button
              variant="default"
              size="sm"
              onClick={handleAddComment}
              disabled={!newComment?.trim()}
              iconName="MessageCircle"
              iconPosition="left"
            >
              Add Comment
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {activeComments?.map((comment) => (
              <div key={comment?.id} className="space-y-3">
                <div className={`p-3 rounded-lg ${comment?.resolved ? 'bg-green-50 border border-green-200' : 'bg-background border border-border'}`}>
                  <div className="flex items-start space-x-3">
                    <Image
                      src={comment?.avatar}
                      alt={comment?.author}
                      className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-foreground">{comment?.author}</span>
                        <span className="text-xs text-muted-foreground">{formatTimeAgo(comment?.timestamp)}</span>
                        {comment?.resolved && (
                          <Icon name="CheckCircle" size={14} className="text-green-600" />
                        )}
                      </div>
                      <p className="text-sm text-foreground mb-2">{comment?.content}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{comment?.section}</span>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          Reply
                        </Button>
                        {!comment?.resolved && (
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Replies */}
                {comment?.replies?.length > 0 && (
                  <div className="ml-6 space-y-2">
                    {comment?.replies?.map((reply) => (
                      <div key={reply?.id} className="p-2 bg-muted rounded-lg">
                        <div className="flex items-start space-x-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-xs font-medium text-foreground">{reply?.author}</span>
                              <span className="text-xs text-muted-foreground">{formatTimeAgo(reply?.timestamp)}</span>
                            </div>
                            <p className="text-xs text-foreground">{reply?.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Invite Collaborator</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowInviteModal(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e?.target?.value)}
                    placeholder="colleague@university.edu"
                    className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                
                <div className="flex items-center justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowInviteModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleInviteCollaborator}
                    disabled={!inviteEmail?.trim()}
                  >
                    Send Invite
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationPanel;