import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  actionButton?: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  children, 
  className = '', 
  actionButton, 
  badge,
  badgeColor = 'bg-purple-500'
}) => {
  return (
    <div className={`dashboard-card p-5 h-full flex flex-col overflow-visible ${className}`}>
      {(title || actionButton || badge) && (
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {title && <h3 className="text-base font-medium text-white">{title}</h3>}
            {badge && (
              <span className={`ml-3 text-xs px-2 py-1 rounded-full ${badgeColor} text-white font-medium`}>
                {badge}
              </span>
            )}
          </div>
          {actionButton}
        </div>
      )}
      <div className="flex-1 overflow-visible">{children}</div>
    </div>
  );
};

export default Card;
