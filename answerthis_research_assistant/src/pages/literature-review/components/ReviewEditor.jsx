import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewEditor = ({ content, onContentChange, wordTarget = 5000, citations = [] }) => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [wordCount, setWordCount] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const editorRef = useRef(null);

  const sections = [
    { id: 'introduction', name: 'Introduction', icon: 'FileText' },
    { id: 'methodology', name: 'Methodology', icon: 'Settings' },
    { id: 'findings', name: 'Key Findings', icon: 'TrendingUp' },
    { id: 'analysis', name: 'Thematic Analysis', icon: 'BarChart3' },
    { id: 'gaps', name: 'Research Gaps', icon: 'AlertCircle' },
    { id: 'conclusions', name: 'Conclusions', icon: 'CheckCircle' }
  ];

  const suggestions = [
    {
      type: 'citation',
      text: 'Consider adding a citation here',
      action: 'Add Citation',
      icon: 'Quote'
    },
    {
      type: 'grammar',
      text: 'Passive voice detected - consider active voice',
      action: 'Fix Grammar',
      icon: 'Edit'
    },
    {
      type: 'flow',
      text: 'This paragraph could benefit from a transition',
      action: 'Add Transition',
      icon: 'ArrowRight'
    }
  ];

  useEffect(() => {
    if (content) {
      const words = content?.split(/\s+/)?.filter(word => word?.length > 0)?.length;
      setWordCount(words);
    }
  }, [content]);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection?.toString()?.length > 0) {
      setSelectedText(selection?.toString());
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const insertCitation = (citation) => {
    const citationText = `(${citation?.authors?.[0]?.split(' ')?.pop()}, ${citation?.year})`;
    const newContent = content + citationText;
    onContentChange(newContent);
  };

  const formatText = (format) => {
    document.execCommand(format, false, null);
    if (editorRef?.current) {
      onContentChange(editorRef?.current?.innerHTML);
    }
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Literature Review</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
            <Button variant="default" size="sm" iconName="Save">
              Save Draft
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{wordCount} / {wordTarget} words</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((wordCount / wordTarget) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2">
          {sections?.map((section) => (
            <button
              key={section?.id}
              onClick={() => setActiveSection(section?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                activeSection === section?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={section?.icon} size={14} />
              <span>{section?.name}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Toolbar */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('bold')}
            iconName="Bold"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('italic')}
            iconName="Italic"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatText('underline')}
            iconName="Underline"
          />
          <div className="w-px h-6 bg-border mx-2" />
          <Button
            variant="ghost"
            size="sm"
            iconName="List"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="ListOrdered"
          />
          <div className="w-px h-6 bg-border mx-2" />
          <Button
            variant="ghost"
            size="sm"
            iconName="Quote"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Link"
          />
        </div>
      </div>
      {/* Editor */}
      <div className="flex-1 flex">
        <div className="flex-1 p-6 overflow-y-auto">
          <div
            ref={editorRef}
            contentEditable
            onInput={(e) => onContentChange(e?.target?.innerHTML)}
            onMouseUp={handleTextSelection}
            className="min-h-full prose prose-slate max-w-none focus:outline-none"
            style={{ minHeight: '500px' }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Suggestions Panel */}
        {showSuggestions && (
          <div className="w-80 border-l border-border p-4 bg-muted/50">
            <h3 className="text-sm font-medium text-foreground mb-3">Writing Suggestions</h3>
            <div className="space-y-3">
              {suggestions?.map((suggestion, index) => (
                <div key={index} className="p-3 bg-background border border-border rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Icon name={suggestion?.icon} size={16} className="text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground mb-2">{suggestion?.text}</p>
                      <Button variant="outline" size="sm">
                        {suggestion?.action}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick Citations */}
              <div className="p-3 bg-background border border-border rounded-lg">
                <h4 className="text-sm font-medium text-foreground mb-2">Quick Citations</h4>
                <div className="space-y-2">
                  {citations?.slice(0, 3)?.map((citation) => (
                    <button
                      key={citation?.id}
                      onClick={() => insertCitation(citation)}
                      className="w-full text-left p-2 hover:bg-muted rounded text-xs"
                    >
                      <div className="font-medium">{citation?.title?.substring(0, 40)}...</div>
                      <div className="text-muted-foreground">
                        {citation?.authors?.[0]} ({citation?.year})
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewEditor;