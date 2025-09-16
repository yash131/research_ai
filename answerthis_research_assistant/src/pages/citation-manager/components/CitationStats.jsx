import React from 'react';
import Icon from '../../../components/AppIcon';

const CitationStats = ({ citations = [] }) => {
  const totalCitations = citations?.length;
  
  const citationsByType = citations?.reduce((acc, citation) => {
    acc[citation.type] = (acc?.[citation?.type] || 0) + 1;
    return acc;
  }, {});

  const citationsByYear = citations?.reduce((acc, citation) => {
    const year = citation?.year;
    acc[year] = (acc?.[year] || 0) + 1;
    return acc;
  }, {});

  const recentCitations = citations?.filter(citation => {
    const addedDate = new Date(citation.dateAdded);
    const weekAgo = new Date();
    weekAgo?.setDate(weekAgo?.getDate() - 7);
    return addedDate >= weekAgo;
  })?.length;

  const mostCommonType = Object.entries(citationsByType)?.reduce((a, b) => 
    citationsByType?.[a?.[0]] > citationsByType?.[b?.[0]] ? a : b, ['', 0]
  )?.[0];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'journal': return 'FileText';
      case 'book': return 'Book';
      case 'conference': return 'Users';
      case 'thesis': return 'GraduationCap';
      case 'website': return 'Globe';
      default: return 'File';
    }
  };

  const stats = [
    {
      label: 'Total Citations',
      value: totalCitations,
      icon: 'FileText',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      label: 'Added This Week',
      value: recentCitations,
      icon: 'Plus',
      color: 'text-green-600 bg-green-50'
    },
    {
      label: 'Most Common Type',
      value: mostCommonType ? mostCommonType?.charAt(0)?.toUpperCase() + mostCommonType?.slice(1) : 'N/A',
      icon: getTypeIcon(mostCommonType),
      color: 'text-purple-600 bg-purple-50'
    },
    {
      label: 'Publication Years',
      value: Object.keys(citationsByYear)?.length,
      icon: 'Calendar',
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat?.label}</p>
              <p className="text-2xl font-semibold text-foreground mt-1">
                {stat?.value}
              </p>
            </div>
            <div className={`p-3 rounded-full ${stat?.color}`}>
              <Icon name={stat?.icon} size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CitationStats;