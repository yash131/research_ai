import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const primaryNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Search', path: '/paper-search', icon: 'Search' },
    { label: 'Projects', path: '/project-workspace', icon: 'FolderOpen' },
    { label: 'Literature Review', path: '/literature-review', icon: 'BookOpen' },
    { label: 'Citations', path: '/citation-manager', icon: 'Quote' },
  ];

  const secondaryNavItems = [
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' },
    { label: 'Profile', path: '/profile', icon: 'User' },
  ];

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      // Navigate to search with query
      window.location.href = `/paper-search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleSearchExpand = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchCollapse = () => {
    setIsSearchExpanded(false);
    setSearchQuery('');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-subtle">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-250">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-semibold text-foreground">
                AnswerThis
              </h1>
              <p className="text-xs font-caption text-muted-foreground -mt-1">
                Research Assistant
              </p>
            </div>
          </Link>
        </div>

        {/* Primary Navigation - Desktop */}
        <nav className="hidden lg:flex items-center space-x-1">
          {primaryNavItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-body transition-all duration-250 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-subtle'
                    : 'text-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Search and Actions */}
        <div className="flex items-center space-x-3">
          {/* Expandable Search */}
          <div className="relative">
            {!isSearchExpanded ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSearchExpand}
                className="lg:hidden"
              >
                <Icon name="Search" size={20} />
              </Button>
            ) : (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    placeholder="Search papers..."
                    className="w-64 pl-10 pr-4 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    autoFocus
                    onBlur={handleSearchCollapse}
                  />
                  <Icon
                    name="Search"
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  />
                </div>
              </form>
            )}
            
            {/* Desktop Search */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:block">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  placeholder="Search papers..."
                  className="w-80 pl-10 pr-4 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-250"
                />
                <Icon
                  name="Search"
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
              </div>
            </form>
          </div>

          {/* More Menu - Desktop */}
          <div className="hidden lg:block relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
            >
              <Icon name="MoreHorizontal" size={20} />
            </Button>
            
            {isMoreMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-modal z-50">
                <div className="py-1">
                  {secondaryNavItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className="flex items-center space-x-3 px-4 py-2 text-sm font-body text-popover-foreground hover:bg-muted transition-colors duration-250"
                      onClick={() => setIsMoreMenuOpen(false)}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
          >
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="lg:hidden border-t border-border bg-background">
        <nav className="flex overflow-x-auto">
          {primaryNavItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-3 text-xs font-caption transition-colors duration-250 ${
                  isActive
                    ? 'text-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={item?.icon} size={20} className="mb-1" />
                <span className="truncate">{item?.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;