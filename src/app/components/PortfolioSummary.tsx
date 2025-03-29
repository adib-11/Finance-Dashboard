import React from 'react';
import Card from './Card';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

interface PortfolioSummaryProps {
  totalValue: number;
  change: number;
  changePercent: number;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  totalValue,
  change,
  changePercent,
}) => {
  const isPositive = change >= 0;

  return (
    <div className="mb-6">
      <h2 className="text-white text-xl font-medium mb-4">Trend</h2>
      <div className="grid grid-cols-2 gap-6">
        <Card className="relative min-h-[120px] overflow-hidden p-5 border border-gray-800/20 transition-all hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10">
          <div className="relative z-10">
            <div className="flex flex-col space-y-4">
              <div className="text-sm text-gray-400">Total Assets</div>
              <div className="text-3xl font-bold text-white flex items-baseline">
                <span>${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex items-center bg-green-600/20 text-green-400 text-xs font-medium py-1.5 px-3 rounded-full w-fit">
                <FiArrowUp className="mr-1.5" size={12} />
                0.14%
              </div>
            </div>
          </div>
          
          {/* Enhance the chart with better styling */}
          <div className="absolute bottom-0 right-0 opacity-70">
            <svg width="160" height="80" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path d="M0 80L5.33 75.8L10.67 77.9L16 72.3L21.33 68.4L26.67 72.3L32 61.7L37.33 57.8L42.67 63.3L48 54.1L53.33 50.2L58.67 43.1L64 47L69.33 39.9L74.67 27.8L80 31.7L85.33 24.6L90.67 20.7L96 27.8L101.33 17L106.67 11.5L112 5.7L117.33 15.3L122.67 24.6L128 28.5L133.33 35.6L138.67 41.1L144 35.6L149.33 38L154.67 33.7L160 30.4" 
                    stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
              <path d="M0 80L5.33 75.8L10.67 77.9L16 72.3L21.33 68.4L26.67 72.3L32 61.7L37.33 57.8L42.67 63.3L48 54.1L53.33 50.2L58.67 43.1L64 47L69.33 39.9L74.67 27.8L80 31.7L85.33 24.6L90.67 20.7L96 27.8L101.33 17L106.67 11.5L112 5.7L117.33 15.3L122.67 24.6L128 28.5L133.33 35.6L138.67 41.1L144 35.6L149.33 38L154.67 33.7L160 30.4" 
                    stroke="url(#trendGradient)" strokeWidth="0" strokeLinecap="round"
                    fill="url(#trendGradient)"/>
            </svg>
          </div>
        </Card>
        
        <Card className="relative min-h-[120px] p-5 border border-gray-800/20 transition-all hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-4">
              <div className="text-sm text-gray-400">Vulnerable Assets</div>
              <div className="text-3xl font-bold text-white flex items-baseline">
                28,374<span className="text-lg text-gray-500 ml-0.5">.12</span>
              </div>
              <div className="flex items-center bg-purple-600/20 text-purple-400 text-xs font-medium py-1.5 px-3 rounded-full w-fit">
                <FiArrowUp className="mr-1.5" size={12} />
                0.91%
              </div>
            </div>
            
            {/* Enhanced 5X Bonus badge */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-600/20 rounded-lg blur-md"></div>
                <div className="relative bg-gradient-to-br from-purple-700 to-purple-900 px-4 py-3 rounded-lg border border-purple-500/30 shadow-lg">
                  <div className="text-lg font-bold text-white">5X</div>
                  <div className="text-xs text-purple-300">Bonus</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioSummary;
