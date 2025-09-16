import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  
  const routeMap = {
    '/dashboard': 'Dashboard',
    '/paper-search': 'Paper Search',
    '/paper-details': 'Paper Details',
    '/literature-review': 'Literature Review',
    '/citation-manager': 'Citation Manager',
    '/project-workspace': 'Project Workspace',
    '/settings': 'Settings',
    '/help': 'Help',
    '/profile': 'Profile',
  };

  const generateBreadcrumbs = () => {
    if (customItems) return customItems;
    
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/dashboard' }];
    
    let currentPath = '';
    pathSegments?.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = routeMap?.[currentPath] || segment?.charAt(0)?.toUpperCase() + segment?.slice(1);
      breadcrumbs?.push({ label, path: currentPath });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  
  if (breadcrumbs?.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm font-caption text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => {
          const isLast = index === breadcrumbs?.length - 1;
          
          return (
            <li key={crumb?.path} className="flex items-center">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="mx-2 text-muted-foreground/60" 
                />
              )}
              {isLast ? (
                <span className="text-foreground font-medium" aria-current="page">
                  {crumb?.label}
                </span>
              ) : (
                <Link
                  to={crumb?.path}
                  className="hover:text-foreground transition-colors duration-250"
                >
                  {crumb?.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;