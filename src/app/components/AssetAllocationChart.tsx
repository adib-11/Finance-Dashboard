import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector, BarChart, Bar, XAxis, YAxis } from 'recharts';
import Card from './Card';
import { FiInfo, FiUsers, FiPlus, FiLink, FiPieChart, FiBarChart2, FiArrowUp, FiArrowDown, FiActivity, FiStar } from 'react-icons/fi';

interface Stock {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  value: number;
  change: number;
  color: string;
}

interface AssetAllocationChartProps {
  stocks: Stock[];
}

const AssetAllocationChart: React.FC<AssetAllocationChartProps> = ({ stocks }) => {
  // States for animations and interactions
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');
  
  // Enable animations after component mounts
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Prepare data with additional properties for animations
  const data = stocks.map((stock, index) => ({
    name: stock.symbol,
    fullName: stock.name,
    value: stock.value,
    color: stock.color,
    // Delay entrance animation based on index
    animationDelay: 150 * index,
  }));
  
  // Handle mouse enter/leave for pie sections
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(null);
  };
  
  // Custom tooltip with glass morphism effect
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-effect p-4 rounded-xl shadow-lg border border-white/10 transition-all-normal"
             style={{transform: 'scale(1)', animationDelay: '0.1s'}}>
          <div className="flex items-center mb-2 pb-2 border-b border-white/10">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: payload[0].payload.color }}></div>
            <p className="text-white font-medium">{payload[0].name}</p>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">Value:</span>
              <span className="text-white font-bold">
                ${Number(payload[0].value).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">Allocation:</span>
              <span className="text-primary-light font-medium">
                {(payload[0].payload.percent * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  
  // Enhanced active shape with glow and animation
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        {/* Glowing outer section */}
        <filter id="glow-pie">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 4}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.3}
          filter="url(#glow-pie)"
        />
        
        {/* Main section */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          className="transition-all-normal"
        />
        
        {/* Inner border */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius - 2}
          outerRadius={innerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.6}
        />
      </g>
    );
  };
  
  // User avatars with staggered entrance animation
  const userAvatars = [
    { color: 'from-chart-purple to-chart-blue', delay: '0.2s' },
    { color: 'from-chart-pink to-chart-purple', delay: '0.3s' },
    { color: 'from-chart-yellow to-chart-green', delay: '0.4s' },
    { color: 'from-chart-blue to-chart-green', delay: '0.5s' },
    { color: 'from-chart-pink to-chart-yellow', delay: '0.6s' },
  ];

  return (
    <Card className="h-full">
      <div className="h-full flex flex-col">
        {/* Header with chart title and type selector */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-white text-lg font-medium flex items-center">
              <div className="bg-gradient-to-br from-chart-purple/30 to-chart-blue/10 p-2 rounded-lg mr-2">
                <FiUsers className="text-chart-purple" size={18} />
              </div>
              <span>Asset Allocation</span>
            </h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-card-bg-active p-1 rounded-lg flex transition-all-normal">
              <button 
                onClick={() => setChartType('pie')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors-fast flex items-center
                          ${chartType === 'pie' ? 'bg-chart-purple text-white' : 'text-white/60 hover:text-white'}`}
              >
                <FiPieChart className="mr-1" size={14} /> Pie
              </button>
              <button 
                onClick={() => setChartType('bar')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors-fast flex items-center
                          ${chartType === 'bar' ? 'bg-chart-purple text-white' : 'text-white/60 hover:text-white'}`}
              >
                <FiBarChart2 className="mr-1" size={14} /> Bar
              </button>
            </div>
          </div>
        </div>
        
        {/* Chart content */}
        <div className="flex-1 flex flex-col">
          {/* Header with info */}
          <div className="flex justify-between items-start mb-4">
            <div className="opacity-0 transform translate-y-2" 
                 style={{
                   opacity: isLoaded ? 1 : 0,
                   transform: isLoaded ? 'translateY(0)' : 'translateY(8px)',
                   transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
                   transitionDelay: '0.1s'
                 }}>
              <div className="text-sm text-white/80 mb-1 font-medium">Onboarding Success</div>
              <div className="text-xs text-white/60">Transforming new signups into successful users</div>
            </div>
            <div className="flex space-x-2">
              <button className="text-white/60 hover:text-white transition-colors-fast p-1.5 hover:bg-white/5 rounded-md">
                <FiLink size={16} />
              </button>
              <button className="text-white/60 hover:text-white transition-colors-fast p-1.5 hover:bg-white/5 rounded-md">
                <FiInfo size={16} />
              </button>
            </div>
          </div>
          
          {/* User avatars with staggered animation */}
          <div className="flex items-center mb-3">
            <div className="flex -space-x-3">
              {userAvatars.map((user, i) => (
                <div key={i} 
                     className={`w-10 h-10 rounded-full border-2 border-card-bg flex items-center justify-center overflow-hidden bg-gradient-to-br ${user.color} transition-transform-bounce hover:scale-110 hover:z-10 cursor-pointer opacity-0`}
                     style={{
                       opacity: isLoaded ? 1 : 0,
                       transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
                       transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                       transitionDelay: user.delay
                     }}>
                  <span className="text-white text-xs font-bold">{data[i % data.length].name.charAt(0)}</span>
                </div>
              ))}
            </div>
            <div className="ml-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full w-8 h-8 flex items-center justify-center text-white cursor-pointer opacity-0 hover:scale-110 transition-transform-bounce"
                 style={{
                   opacity: isLoaded ? 1 : 0,
                   transition: 'opacity 0.5s ease-out, transform 0.5s',
                   transitionDelay: '0.7s'
                 }}>
              <FiPlus size={14} />
            </div>
            <div className="text-white/70 text-sm ml-2 opacity-0"
                 style={{
                   opacity: isLoaded ? 1 : 0,
                   transition: 'opacity 0.5s ease-out',
                   transitionDelay: '0.8s'
                 }}>+25</div>
          </div>
          
          {/* Performance Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3 opacity-0"
               style={{
                 opacity: isLoaded ? 1 : 0,
                 transform: isLoaded ? 'translateY(0)' : 'translateY(8px)',
                 transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
                 transitionDelay: '0.1s'
               }}>
            <div className="bg-card-bg-hover rounded-lg p-3 flex items-center">
              <div className="bg-gradient-to-br from-chart-green/30 to-chart-blue/10 p-2 rounded-lg mr-3">
                <FiActivity className="text-chart-green" size={16} />
              </div>
              <div>
                <div className="text-white/60 text-xs">Portfolio Growth</div>
                <div className="text-white font-medium flex items-center">
                  <span>+24.8%</span>
                  <FiArrowUp className="text-chart-green ml-1" size={14} />
                </div>
              </div>
            </div>
            
            <div className="bg-card-bg-hover rounded-lg p-3 flex items-center">
              <div className="bg-gradient-to-br from-primary/30 to-chart-purple/10 p-2 rounded-lg mr-3">
                <FiStar className="text-primary-light" size={16} />
              </div>
              <div>
                <div className="text-white/60 text-xs">Top Performer</div>
                <div className="text-white font-medium flex items-center">
                  <span>{data[0]?.name || 'AAPL'}</span>
                  <span className="text-chart-green ml-1 text-xs">+32.4%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-card-bg-hover rounded-lg p-3 flex items-center">
              <div className="bg-gradient-to-br from-chart-blue/30 to-chart-purple/10 p-2 rounded-lg mr-3">
                <FiBarChart2 className="text-chart-blue" size={16} />
              </div>
              <div>
                <div className="text-white/60 text-xs">Diversification</div>
                <div className="text-white font-medium">Excellent</div>
              </div>
            </div>
          </div>

          {/* Toggle between Pie and Bar Chart */}
          <div className="opacity-0 transition-opacity-transform" 
               style={{
                 opacity: isLoaded ? 1 : 0,
                 transform: isLoaded ? 'scale(1)' : 'scale(0.95)',
                 transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                 transitionDelay: '0.2s'
               }}>
            <ResponsiveContainer width="100%" height={270}>
              {chartType === 'pie' ? (
                <PieChart>
                  <defs>
                    {data.map((entry, index) => (
                      <filter key={`filter-${index}`} id={`glow-${index}`} height="200%" width="200%" x="-50%" y="-50%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    ))}
                  </defs>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    strokeWidth={0}
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    activeIndex={activeIndex !== null ? activeIndex : undefined}
                    activeShape={renderActiveShape}
                    isAnimationActive={true}
                    animationBegin={0}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        className="transition-all-normal hover:opacity-90"
                        style={{ 
                          filter: activeIndex === index ? `url(#glow-${index})` : 'none',
                          transformOrigin: 'center', 
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              ) : (
                <BarChart 
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barSize={36}
                  onMouseMove={(state) => {
                    if (state.isTooltipActive) {
                      setActiveIndex(state.activeTooltipIndex || null);
                    } else {
                      setActiveIndex(null);
                    }
                  }}
                >
                  <defs>
                    {data.map((entry, index) => (
                      <linearGradient key={`gradient-${index}`} id={`barGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                        <stop offset="95%" stopColor={entry.color} stopOpacity={0.7} />
                      </linearGradient>
                    ))}
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={true}
                    tickLine={true}
                    tick={{ fill: '#ffffff', fontSize: 12, fontWeight: 'bold' }}
                    stroke="rgba(255, 255, 255, 0.2)"
                  />
                  <YAxis 
                    axisLine={true}
                    tickLine={true}
                    tick={{ fill: '#ffffff80', fontSize: 10 }}
                    stroke="rgba(255, 255, 255, 0.2)"
                    width={30}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value"
                    animationDuration={1500}
                    animationBegin={300}
                    animationEasing="ease-out"
                    radius={[6, 6, 0, 0]}
                  >
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={`url(#barGradient-${index})`}
                        stroke="#ffffff"
                        strokeWidth={0.5}
                        className={`${activeIndex === index ? 'filter drop-shadow-glow' : ''} transition-all-normal`}
                        style={{
                          cursor: 'pointer',
                          opacity: activeIndex !== null && activeIndex !== index ? 0.6 : 1
                        }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
          
          {/* Animated legend with hover effects */}
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-x-2 gap-y-2 mt-2">
            {data.map((entry, index) => (
              <div key={index} 
                   className="flex items-center p-1.5 rounded-lg hover:bg-card-bg-hover transition-colors-fast cursor-pointer opacity-0"
                   onMouseEnter={() => setActiveIndex(index)}
                   onMouseLeave={() => setActiveIndex(null)}
                   style={{
                     opacity: isLoaded ? 1 : 0,
                     transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
                     transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                     transitionDelay: `${0.3 + index * 0.1}s`
                   }}>
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                <div>
                  <div className="text-sm text-white/90 font-medium">{entry.name}</div>
                  <div className="text-xs text-white/50">${entry.value.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AssetAllocationChart;
