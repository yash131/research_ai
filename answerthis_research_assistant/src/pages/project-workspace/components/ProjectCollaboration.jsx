import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProjectCollaboration = ({ teamMembers, comments, onCollaborationAction }) => {
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newComment, setNewComment] = useState('');
  const [selectedRole, setSelectedRole] = useState('viewer');

  const roleOptions = [
    { value: 'owner', label: 'Owner', description: 'Full access to all project features' },
    { value: 'editor', label: 'Editor', description: 'Can edit papers, notes, and citations' },
    { value: 'viewer', label: 'Viewer', description: 'Can view project content only' }
  ];

  const handleInviteMember = () => {
    if (newMemberEmail?.trim()) {
      onCollaborationAction('invite', {
        email: newMemberEmail,
        role: selectedRole,
        invitedDate: new Date()?.toLocaleDateString()
      });
      setNewMemberEmail('');
    }
  };

  const handleAddComment = () => {
    if (newComment?.trim()) {
      onCollaborationAction('comment', {
        id: Date.now()?.toString(),
        content: newComment,
        author: 'You',
        timestamp: new Date()?.toLocaleString(),
        isOwn: true
      });
      setNewComment('');
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'owner':
        return 'text-primary bg-primary/10';
      case 'editor':
        return 'text-success bg-success/10';
      case 'viewer':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'inactive':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Team Members Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Team Members ({teamMembers?.length})
          </h3>
          <Button variant="outline" size="sm" iconName="UserPlus">
            Manage Access
          </Button>
        </div>

        {/* Invite New Member */}
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Invite Team Member
          </h4>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter email address..."
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e?.target?.value)}
              />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e?.target?.value)}
              className="px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {roleOptions?.map(role => (
                <option key={role?.value} value={role?.value}>
                  {role?.label}
                </option>
              ))}
            </select>
            <Button variant="default" onClick={handleInviteMember}>
              Invite
            </Button>
          </div>
        </div>

        {/* Team Members List */}
        <div className="space-y-3">
          {teamMembers?.map((member) => (
            <div
              key={member?.id}
              className="flex items-center justify-between p-3 bg-background border border-border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {member?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {member?.email}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member?.role)}`}>
                  {member?.role}
                </span>
                <div className={`flex items-center space-x-1 ${getStatusColor(member?.status)}`}>
                  <div className="w-2 h-2 rounded-full bg-current" />
                  <span className="text-xs">{member?.status}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="MoreHorizontal" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Comments and Discussions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Project Discussions
        </h3>

        {/* Add Comment */}
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e?.target?.value)}
            placeholder="Add a comment or question about this project..."
            className="w-full h-20 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Info" size={12} />
              <span>Comments are visible to all team members</span>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={handleAddComment}
              disabled={!newComment?.trim()}
            >
              Post Comment
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments?.map((comment) => (
            <div
              key={comment?.id}
              className={`p-4 rounded-lg border ${
                comment?.isOwn
                  ? 'bg-primary/5 border-primary/20' :'bg-background border-border'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {comment?.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {comment?.timestamp}
                    </p>
                  </div>
                </div>
                
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="MoreHorizontal" size={14} />
                </Button>
              </div>
              
              <p className="text-sm text-foreground">
                {comment?.content}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Collaboration Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{teamMembers?.length}</p>
          <p className="text-sm text-muted-foreground">Team Members</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{comments?.length}</p>
          <p className="text-sm text-muted-foreground">Comments</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-success">
            {teamMembers?.filter(m => m?.status === 'active')?.length}
          </p>
          <p className="text-sm text-muted-foreground">Active Members</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCollaboration;