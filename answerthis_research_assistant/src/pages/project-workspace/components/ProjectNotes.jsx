import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProjectNotes = ({ notes, onNoteAction }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', tags: [] });

  const allTags = ['research', 'methodology', 'findings', 'questions', 'ideas', 'todo'];

  const filteredNotes = notes?.filter(note => {
    const matchesSearch = note?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         note?.content?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesTag = selectedTag === 'all' || note?.tags?.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleCreateNote = () => {
    if (newNote?.title?.trim() && newNote?.content?.trim()) {
      onNoteAction('create', {
        ...newNote,
        id: Date.now()?.toString(),
        createdDate: new Date()?.toLocaleDateString(),
        lastModified: new Date()?.toLocaleDateString()
      });
      setNewNote({ title: '', content: '', tags: [] });
      setIsCreating(false);
    }
  };

  const getTagColor = (tag) => {
    const colors = {
      research: 'bg-blue-100 text-blue-800',
      methodology: 'bg-green-100 text-green-800',
      findings: 'bg-purple-100 text-purple-800',
      questions: 'bg-orange-100 text-orange-800',
      ideas: 'bg-pink-100 text-pink-800',
      todo: 'bg-red-100 text-red-800'
    };
    return colors?.[tag] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search notes by title or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e?.target?.value)}
            className="px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Tags</option>
            {allTags?.map(tag => (
              <option key={tag} value={tag}>
                {tag?.charAt(0)?.toUpperCase() + tag?.slice(1)}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            onClick={() => setIsCreating(true)}
          >
            New Note
          </Button>
        </div>
      </div>
      {/* Create Note Form */}
      {isCreating && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Create New Note
          </h3>
          
          <div className="space-y-4">
            <Input
              label="Note Title"
              value={newNote?.title}
              onChange={(e) => setNewNote({ ...newNote, title: e?.target?.value })}
              placeholder="Enter note title..."
            />
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Content
              </label>
              <textarea
                value={newNote?.content}
                onChange={(e) => setNewNote({ ...newNote, content: e?.target?.value })}
                placeholder="Write your note content here..."
                className="w-full h-32 px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {allTags?.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      const updatedTags = newNote?.tags?.includes(tag)
                        ? newNote?.tags?.filter(t => t !== tag)
                        : [...newNote?.tags, tag];
                      setNewNote({ ...newNote, tags: updatedTags });
                    }}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                      newNote?.tags?.includes(tag)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-muted-foreground border-border hover:border-primary'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="default" onClick={handleCreateNote}>
                Create Note
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreating(false);
                  setNewNote({ title: '', content: '', tags: [] });
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Notes List */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Research Notes ({filteredNotes?.length})
        </h3>
        
        <div className="grid gap-4">
          {filteredNotes?.map((note) => (
            <div
              key={note?.id}
              className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-250"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-base font-medium text-foreground">
                  {note?.title}
                </h4>
                <div className="flex items-center space-x-1 ml-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Icon name="Edit" size={14} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Icon name="Copy" size={14} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Icon name="MoreHorizontal" size={14} />
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-foreground mb-3 line-clamp-3">
                {note?.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {note?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs rounded-full ${getTagColor(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Created {note?.createdDate}</span>
                  {note?.lastModified !== note?.createdDate && (
                    <span>Modified {note?.lastModified}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Notes Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-xl font-bold text-foreground">{notes?.length}</p>
          <p className="text-sm text-muted-foreground">Total Notes</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-foreground">
            {notes?.filter(n => n?.tags?.includes('research'))?.length}
          </p>
          <p className="text-sm text-muted-foreground">Research</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-foreground">
            {notes?.filter(n => n?.tags?.includes('findings'))?.length}
          </p>
          <p className="text-sm text-muted-foreground">Findings</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-foreground">
            {notes?.filter(n => n?.tags?.includes('todo'))?.length}
          </p>
          <p className="text-sm text-muted-foreground">To-Do</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectNotes;