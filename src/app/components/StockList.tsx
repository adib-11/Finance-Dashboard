import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import { FiArrowUp, FiArrowDown, FiLock, FiShield, FiAlertTriangle, FiBarChart2, FiFilter, FiMoreHorizontal, FiCalendar, FiActivity } from 'react-icons/fi';

interface Stock {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  value: number;
  change: number;
  color?: string;
}

interface StockListProps {
  stocks: Stock[];
}

// Custom progressive counter animation hook
const useCountAnimation = (targetValue: number, duration: number = 2000, delay: number = 0) => {
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Wait for the delay before starting animation
    const delayTimer = setTimeout(() => {
      setIsLoaded(true);
      
      // Calculate animation steps
      const startTime = Date.now();
      const counterTimer = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = (t: number) => (--t) * t * t + 1;
        const easedProgress = easeOutCubic(progress);
        
        setCount(Math.floor(targetValue * easedProgress));
        
        if (progress === 1) {
          clearInterval(counterTimer);
        }
      }, 16); // ~60fps
      
      return () => clearInterval(counterTimer);
    }, delay);
    
    return () => clearTimeout(delayTimer);
  }, [targetValue, duration, delay]);
  
  return { count, isLoaded };
};

const StockList: React.FC<StockListProps> = ({ stocks }) => {
  // Animation states
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTab, setSelectedTab] = useState('results');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  
  // Animated counter values
  const totalAssets = useCountAnimation(57985, 2500, 300);
  const vulnerableAssets = useCountAnimation(28374, 2500, 600);
  
  // Enable animations after component mounts
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);
  
  // Risk severity levels with color codes
  const riskLevels = [
    { label: 'High', color: 'bg-primary' },
    { label: 'Low', color: 'bg-chart-green' },
  ];
  
  // Tabs for the risk panel
  const tabs = [
    { id: 'results', label: 'Results' },
    { id: 'assets', label: 'Assets Scanned' },
    { id: 'checks', label: 'Checks Reformed' },
  ];
  
  // Risk items data
  const riskItems = [
    { 
      level: 'Low', 
      levelColor: 'bg-chart-green', 
      name: 'Git Directory Exposure', 
      category: 'Source code & Credentials', 
      count: 158,
      target: 'Vulnerable Assets',
      isActive: false,
    },
    { 
      level: 'High', 
      levelColor: 'bg-primary', 
      name: 'SSL Certificate Exposure', 
      category: 'Source code & Credentials', 
      count: 214,
      target: 'Vulnerable Assets',
      isActive: true,
    },
    { 
      level: 'Medium', 
      levelColor: 'bg-chart-yellow', 
      name: 'API Key Exposure', 
      category: 'Security Keys', 
      count: 87,
      target: 'Vulnerable Assets',
      isActive: false,
    },
  ];
  
  // Bar chart data
  const barData = [
    { height: 40, isHighlighted: false },
    { height: 60, isHighlighted: false },
    { height: 30, isHighlighted: false },
    { height: 50, isHighlighted: false },
    { height: 25, isHighlighted: false },
    { height: 70, isHighlighted: false },
    { height: 55, isHighlighted: false },
    { height: 65, isHighlighted: false },
    { height: 40, isHighlighted: false },
    { height: 35, isHighlighted: false },
    { height: 50, isHighlighted: true },
  ];
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h2 className="text-white text-xl font-medium">Risk founds and top risk type</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-gray-800/60 py-1.5 px-3 rounded-full flex space-x-3">
            {tabs.map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className="flex items-center space-x-2"
              >
                <div className={`w-3 h-3 rounded-full ${tab.id === 'high' ? 'bg-purple-500' : 'bg-lime-400'}`}></div>
                <span className="text-white text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center text-white/80 text-sm bg-transparent py-1.5 px-3">
            <span className="mr-2">29 Oct - 11 Nov</span>
            <FiCalendar size={16} />
          </div>
        </div>
      </div>
      
      <Card className="card-glow overflow-hidden border border-gray-800/20 shadow-xl p-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left side with circular chart and stats */}
          <div className="lg:col-span-4 flex flex-col">
            {/* Circular chart with security shield icon */}
            <div className="flex justify-center mb-8">
              <div className="relative w-64 h-64">
                {/* Base circle */}
                <div className="absolute inset-0 rounded-full bg-purple-900"></div>
                
                {/* Green segment */}
                <div className="absolute inset-0">
                  <svg width="100%" height="100%" viewBox="0 0 100 100">
                    <path 
                      d="M50,50 L85,15 A50,50 0 0,0 50,0 Z" 
                      fill="#a3e635" 
                    />
                  </svg>
                </div>
                
                {/* Security shield icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" 
                      fill="url(#shield-gradient)"
                      stroke="#ffffff"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M12 8V13" 
                      stroke="#ffffff" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                    />
                    <circle 
                      cx="12" 
                      cy="16" 
                      r="1" 
                      fill="#ffffff" 
                    />
                    <defs>
                      <linearGradient id="shield-gradient" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#d946ef" />
                        <stop offset="1" stopColor="#7e22ce" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Total assets */}
            <div className="mb-8">
              <div className="text-gray-400 text-sm mb-1">Total Assets</div>
              <div className="flex items-baseline">
                <span className="text-white text-4xl font-bold tracking-tight">57,985</span>
                <span className="text-gray-500 text-xl ml-1">.07</span>
              </div>
              <div className="mt-2 inline-flex items-center bg-lime-400/20 text-lime-400 text-xs px-3 py-1 rounded-full">
                <FiArrowUp className="mr-1" size={10} /> 0.14%
              </div>
            </div>
            
            {/* Vulnerable assets */}
            <div>
              <div className="text-gray-400 text-sm mb-1">Vulnerable Assets</div>
              <div className="flex items-baseline">
                <span className="text-white text-4xl font-bold tracking-tight">28,374</span>
                <span className="text-gray-500 text-xl ml-1">.12</span>
              </div>
              <div className="mt-2 inline-flex items-center bg-purple-500/20 text-purple-400 text-xs px-3 py-1 rounded-full">
                <FiArrowUp className="mr-1" size={10} /> 0.91%
              </div>
            </div>
          </div>
          
          {/* Right side with bar chart */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="flex-1 h-[320px] relative">
              {/* Simple grid background */}
              <div className="absolute inset-0 border-l border-b border-gray-800/30"></div>
              
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between py-2">
                <div className="text-xs text-gray-500 -translate-x-2">25K</div>
                <div className="text-xs text-gray-500 -translate-x-2">20K</div>
                <div className="text-xs text-gray-500 -translate-x-2">15K</div>
                <div className="text-xs text-gray-500 -translate-x-2">10K</div>
                <div className="text-xs text-gray-500 -translate-x-2">5K</div>
                <div className="text-xs text-gray-500 -translate-x-2">0</div>
              </div>
              
              {/* Simple bar chart */}
              <div className="absolute left-8 right-4 top-0 bottom-8 flex items-end">
                <div className="w-full flex justify-between">
                  {[
                    { value: 22435, height: 224, color: 'purple', date: '29 Oct' },
                    { value: 12887, height: 129, color: 'purple', date: '31 Oct' },
                    { value: 9425, height: 94, color: 'lime', date: '2 Nov' },
                    { value: 17632, height: 176, color: 'purple', date: '4 Nov' },
                    { value: 15145, height: 151, color: 'purple', date: '6 Nov' },
                    { value: 10982, height: 110, color: 'lime', date: '8 Nov' }
                  ].map((bar, index) => (
                    <div 
                      key={index} 
                      className="flex flex-col items-center mx-2"
                      onMouseEnter={() => setHoveredBar(index)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div className="relative w-full h-[250px] flex items-end">
                        <div 
                          className={`w-12 rounded-t-lg relative cursor-pointer transition-all duration-200 ${
                            bar.color === 'purple' 
                              ? 'bg-gradient-to-t from-purple-800 to-purple-500' 
                              : 'bg-gradient-to-t from-lime-700 to-lime-500'
                          }`}
                          style={{ 
                            height: `${bar.height}px`,
                            boxShadow: hoveredBar === index 
                              ? (bar.color === 'purple'
                                ? '0 0 20px rgba(168, 85, 247, 0.6)'
                                : '0 0 20px rgba(132, 204, 22, 0.6)')
                              : (bar.color === 'purple'
                                ? '0 0 10px rgba(168, 85, 247, 0.3)'
                                : '0 0 10px rgba(132, 204, 22, 0.3)'),
                            transform: hoveredBar === index ? 'scaleY(1.05)' : 'scaleY(1)',
                            transformOrigin: 'bottom'
                          }}
                        >
                          {/* Simple tooltip */}
                          {hoveredBar === index && (
                            <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-3 py-2 rounded-md text-xs whitespace-nowrap z-10 shadow-lg border border-gray-700">
                              <div className="font-medium mb-1">{bar.date}</div>
                              <div className="flex items-center gap-2">
                                <span>Value:</span>
                                <span className="font-bold">{bar.value.toLocaleString()}</span>
                              </div>
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">{bar.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Risk items section */}
        <div className="mt-8 border-t border-gray-800/30 pt-6">
          {/* Risk items with clean styling */}
          <div className="grid grid-cols-1 gap-4 mt-5">
            {riskItems.map((item, index) => (
              <div 
                key={index}
                className="grid grid-cols-12 items-center py-4 border-b border-gray-800/30 hover:bg-gray-800/20 transition-colors"
              >
                <div className="col-span-1">
                  <div className={`
                    ${item.level === 'High' ? 'bg-purple-800 text-purple-200' : 
                      item.level === 'Medium' ? 'bg-blue-800 text-blue-200' : 
                      'bg-lime-800 text-lime-200'} 
                    text-xs rounded-full px-3 py-1.5 text-center font-medium w-20`}
                  >
                    {item.level}
                  </div>
                </div>
                <div className="col-span-3 text-white/90 text-sm font-medium">{item.name}</div>
                <div className="col-span-3 text-white/60 text-sm">{item.category}</div>
                <div className="col-span-2 text-center">
                  <span className="bg-gray-800 px-3 py-1 rounded-full text-white font-medium text-sm">
                    {item.count}
                  </span>
                </div>
                <div className="col-span-3 flex justify-between items-center">
                  <span className="text-white/70 text-sm">{item.target}</span>
                  <button className="text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors">
                    <FiMoreHorizontal />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StockList;
