import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceArea, ReferenceLine } from 'recharts';
import Card from './Card';
import { FiArrowUp, FiArrowDown, FiBarChart2, FiMaximize, FiDownload, FiCalendar, FiZoomIn, FiRefreshCw, FiActivity } from 'react-icons/fi';

// Enhanced sample data for the stock performance chart
const sampleData = [
  { date: '29 Oct', line1: 5000, line2: 10000, value: 5674 },
  { date: '30 Oct', line1: 8000, line2: 12000, value: 5800 },
  { date: '31 Oct', line1: 10000, line2: 15000, value: 6200 },
  { date: '1 Nov', line1: 14000, line2: 18000, value: 6000 },
  { date: '2 Nov', line1: 12000, line2: 14000, value: 5400 },
  { date: '3 Nov', line1: 15000, line2: 20000, value: 5800 },
  { date: '4 Nov', line1: 16000, line2: 19000, value: 6100 },
  { date: '5 Nov', line1: 18000, line2: 22000, value: 5900 },
  { date: '6 Nov', line1: 16500, line2: 20500, value: 6300 },
];

interface StockPerformanceChartProps {
  title?: string;
}

const StockPerformanceChart: React.FC<StockPerformanceChartProps> = () => {
  // State for animations and interactions
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [activeTimeframe, setActiveTimeframe] = useState('1W');
  const [chartType, setChartType] = useState<'area' | 'candle'>('area');
  const [zoomMode, setZoomMode] = useState(false);
  const [zoomArea, setZoomArea] = useState<{start: number | null, end: number | null}>({start: null, end: null});
  const [zoomedData, setZoomedData] = useState(sampleData);
  
  // Reference to chart container for interaction effects
  const chartRef = useRef<HTMLDivElement>(null);
  
  // Special highlighted data point
  const highlightedIndex = 2; // 31 Oct (index 2 in our data array)
  
  // Enable animations after component mounts
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Custom tooltip with enhanced styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      // Find the value data point (using the 'value' key)
      const valueData = payload.find((item: { dataKey: string; value: number }) => item.dataKey === 'value');
      const value = valueData?.value || 0;
      
      return (
        <div className="glass-effect p-4 rounded-xl shadow-lg border border-white/10 transition-all-normal" 
             style={{transform: 'scale(1)', animationDelay: '0.1s'}}>
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 rounded-full bg-chart-purple mr-2"></div>
            <p className="text-white font-medium">{payload[0]?.payload?.date || 'N/A'}</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Value:</span>
              <span className="text-white font-bold">
                {Number(value).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Trend:</span>
              <span className="text-chart-green font-medium flex items-center">
                <FiArrowUp className="mr-1" size={14} />
                {((value / 5000 - 1) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Timeframe options
  const timeframes = [
    { label: '1D', value: '1D' },
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '1Y', value: '1Y' },
    { label: 'All', value: 'ALL' },
  ];

  const resetZoom = () => {
    setZoomedData(sampleData);
    setZoomArea({start: null, end: null});
    setZoomMode(false);
  };

  return (
    <Card className="h-full">
      <div className="h-full flex flex-col">
        {/* Header with title and bonus badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-white text-lg font-medium flex items-center">
              <div className="bg-gradient-to-br from-chart-purple/30 to-chart-blue/10 p-2 rounded-lg mr-2">
                <FiActivity className="text-chart-purple" size={18} />
              </div>
              <span>Financial Trend</span>
            </h2>
          </div>
            
          <div className="flex items-center space-x-2">
            {/* Bonus badge moved to header section */}
            <div className="glass-effect py-1 px-2 rounded-xl flex items-center space-x-1.5 mr-2">
              <div className="w-4 h-4 rounded-full bg-primary-light flex items-center justify-center relative">
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
              <div>
                <div className="text-xs text-white font-medium">Bonus 5X</div>
              </div>
            </div>
            <button className="text-white/70 hover:text-white transition-colors-fast p-1.5 hover:bg-white/5 rounded-md">
              <FiDownload size={18} />
            </button>
            <button className="text-white/70 hover:text-white transition-colors-fast p-1.5 hover:bg-white/5 rounded-md">
              <FiMaximize size={18} />
            </button>
          </div>
        </div>
          
        {/* Timeframe selector */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
          <div className="flex bg-card-bg-active rounded-lg p-1">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors-fast ${tf.value === activeTimeframe ? 'bg-primary text-white' : 'text-white/60 hover:text-white/90'}`}
                onClick={() => setActiveTimeframe(tf.value)}
              >
                {tf.label}
              </button>
            ))}
          </div>
            
          <div className="flex bg-card-bg-active rounded-lg p-1">
            <button
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors-fast flex items-center ${chartType === 'area' ? 'bg-chart-purple text-white' : 'text-white/60 hover:text-white/90'}`}
              onClick={() => setChartType('area')}
            >
              <FiActivity size={12} className="mr-1" /> Area
            </button>
            <button
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors-fast flex items-center ${chartType === 'candle' ? 'bg-chart-purple text-white' : 'text-white/60 hover:text-white/90'}`}
              onClick={() => setChartType('candle')}
            >
              <FiBarChart2 size={12} className="mr-1" /> Candle
            </button>
          </div>
        </div>
            
        <div className="flex items-center text-white/70 text-sm bg-card-bg-active rounded-lg px-3 py-1.5">
          <FiCalendar size={14} className="mr-2" />
          <span>29 Oct - 6 Nov</span>
        </div>
        </div>
          
        {/* Chart container */}
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col">
            {/* Main chart area - removed all absolutely positioned elements */}
            <div className="relative">
              <div 
                className="opacity-0 transform translate-y-4"
                ref={chartRef}
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
                }}
                onMouseDown={(e) => {
                  if (!zoomMode) return;
                  const container = chartRef.current;
                  if (!container) return;
                  
                  const rect = container.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width;
                  setZoomArea({...zoomArea, start: x});
                }}
                onMouseMove={(e) => {
                  if (!zoomMode || zoomArea.start === null) return;
                  const container = chartRef.current;
                  if (!container) return;
                  
                  const rect = container.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width;
                  setZoomArea({...zoomArea, end: x});
                }}
                onMouseUp={() => {
                  if (!zoomMode || zoomArea.start === null || zoomArea.end === null) return;
                  
                  // Calculate which data points to zoom to
                  const minX = Math.min(zoomArea.start, zoomArea.end);
                  const maxX = Math.max(zoomArea.start, zoomArea.end);
                  
                  const startIndex = Math.floor(minX * sampleData.length);
                  const endIndex = Math.ceil(maxX * sampleData.length);
                  
                  if (endIndex - startIndex > 1) { // Only zoom if selecting more than 1 point
                    setZoomedData(sampleData.slice(startIndex, endIndex + 1));
                  }
                  
                  setZoomArea({start: null, end: null});
                }}
                onMouseLeave={() => {
                  if (zoomArea.start !== null) {
                    setZoomArea({start: null, end: null});
                  }
                }}
              >
                {/* Chart controls bar */}
                <div className="flex justify-between items-center mb-3 px-2">
                  <div className="flex items-center">
                    <div className="glass-effect py-0.5 px-2 rounded-md flex items-center justify-center border border-chart-yellow/30">
                      <span className="text-chart-yellow font-bold text-xs">Oct 31: 5,674</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button 
                      className={`p-1 rounded-md ${zoomMode ? 'bg-primary text-white' : 'bg-card-bg-active text-white/70'} hover:text-white transition-colors-fast`}
                      onClick={() => setZoomMode(!zoomMode)}
                      title={zoomMode ? 'Exit Zoom Mode' : 'Enter Zoom Mode'}
                    >
                      <FiZoomIn size={14} />
                    </button>
                    <button 
                      className="p-1 rounded-md bg-card-bg-active text-white/70 hover:text-white transition-colors-fast"
                      onClick={resetZoom}
                      title="Reset View"
                    >
                      <FiRefreshCw size={14} />
                    </button>
                  </div>
                </div>
                
                {/* Chart with no absolutely positioned elements */}
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart 
                    data={zoomedData} 
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    onMouseMove={(e) => {
                      if (e && e.activeTooltipIndex !== undefined) {
                        setHoveredIndex(e.activeTooltipIndex);
                        setHoveredDate(e.activeLabel ?? null); // Ensure null is passed if activeLabel is undefined
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null);
                      setHoveredDate(null);
                    }}
                  >
                    <defs>
                      <linearGradient id="colorLine1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--chart-blue)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="var(--chart-blue)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorLine2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--chart-purple)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--chart-purple)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--chart-yellow)" stopOpacity={1} />
                        <stop offset="100%" stopColor="var(--chart-pink)" stopOpacity={1} />
                      </linearGradient>
                      
                      {/* Fancy glow filter */}
                      <filter id="glow" height="300%" width="300%" x="-100%" y="-100%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Styled grid lines */}
                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.03)" strokeDasharray="3 3" />
                    
                    {/* Styled axes */}
                    <XAxis 
                      dataKey="date" 
                      tickLine={false} 
                      axisLine={false} 
                      tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `${value/1000}k`}
                      domain={['dataMin - 1000', 'dataMax + 2000']}
                      tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      orientation="right"
                    />
                    
                    {/* Enhanced tooltip */}
                    <Tooltip 
                      content={<CustomTooltip />} 
                      cursor={false}
                      wrapperStyle={{ zIndex: 100 }} 
                    />
                    
                    {/* Vertical reference line showing current hover position */}
                    {hoveredDate && (
                      <>
                        <ReferenceLine
                          x={hoveredDate}
                          stroke="rgba(255, 255, 255, 0.3)" // Make line fainter and solid
                          strokeWidth={1} // Thinner line
                          // strokeDasharray="4 4" // Remove dash array for solid line
                          ifOverflow="extendDomain"
                        />
                        {/* Removed the separate Line component for the dot */}
                        {/* The activeDot prop on Area components below will handle dots */}
                        <text
                          x="50%"
                          y={15}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#ffffff"
                          fontSize={12}
                          fontWeight="bold"
                          className="bg-gray-800 px-2 py-0.5 rounded-full fill-white"
                        >
                          <tspan className="bg-gray-800/90 px-3 py-1 rounded-full">
                            {hoveredDate}
                          </tspan>
                        </text>
                      </>
                    )}
                    
                    {/* Reference area for zoom */}
                    {zoomArea.start !== null && zoomArea.end !== null && (
                      <ReferenceArea
                        x1={zoomedData[Math.floor(Math.min(zoomArea.start, zoomArea.end) * zoomedData.length)]?.date}
                        x2={zoomedData[Math.floor(Math.max(zoomArea.start, zoomArea.end) * zoomedData.length)]?.date}
                        strokeOpacity={0.3}
                        fill="var(--primary)"
                        fillOpacity={0.2}
                      />
                    )}
                    
                    {/* Chart areas */}
                    <Area 
                      type="monotone" 
                      dataKey="line1"
                      stroke="var(--chart-blue)"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 5, strokeWidth: 2, stroke: '#1a1a2e', fill: 'var(--chart-blue)' }} // Added activeDot style
                      fillOpacity={1}
                      fill="url(#colorLine1)"
                      animationDuration={1500}
                      animationEasing="ease-out"
                    />
                    
                    <Area 
                      type="monotone" 
                      dataKey="line2"
                      stroke="var(--chart-purple)"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 5, strokeWidth: 2, stroke: '#1a1a2e', fill: 'var(--chart-purple)' }} // Added activeDot style
                      fillOpacity={1}
                      fill="url(#colorLine2)"
                      animationDuration={1500}
                      animationEasing="ease-out"
                    />
                    
                    {/* Fancy line with custom dots */}
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="url(#colorValue)" 
                      filter="url(#glow)"
                      dot={false} // Disable default dots
                      isAnimationActive={true}
                      activeDot={{ r: 8, strokeWidth: 2, stroke: '#fff', fill: 'var(--chart-yellow)' }}
                      strokeWidth={4}
                      animationDuration={1500}
                      animationEasing="ease-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              {/* Zoom mode indicator - fixed position at bottom to never block chart */}
              {zoomMode && (
                <div className="text-center mt-2 mb-2">
                  <span className="glass-effect px-3 py-1 rounded-lg text-white/90 text-xs inline-block">
                    Click and drag to zoom in
                  </span>
                </div>
              )}
              
              {/* Statistics row with solid background instead of gradient */}
              <div className="mt-4 grid grid-cols-3 gap-4 opacity-0 transform translate-y-4"
                   style={{
                     opacity: isLoaded ? 1 : 0,
                     transform: isLoaded ? 'translateY(0) rotateX(0)' : 'translateY(10px) rotateX(10deg)',
                     transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                     transitionDelay: '0.3s',
                     perspective: '1000px'
                   }}>
                <div className="bg-card-bg-active rounded-xl p-3 shadow-lg hover:bg-card-bg-hover transition-all-normal hover:-translate-y-1 cursor-pointer">
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 rounded-full bg-chart-purple mr-2"></div>
                    <div className="text-white/60 text-xs">Average</div>
                  </div>
                  <div className="text-white font-semibold">5,941.56</div>
                </div>
                <div className="bg-card-bg-active rounded-xl p-3 shadow-lg hover:bg-card-bg-hover transition-all-normal hover:-translate-y-1 cursor-pointer">
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 rounded-full bg-chart-yellow mr-2"></div>
                    <div className="text-white/60 text-xs">Maximum</div>
                  </div>
                  <div className="text-white font-semibold">6,300.00</div>
                </div>
                <div className="bg-card-bg-active rounded-xl p-3 shadow-lg hover:bg-card-bg-hover transition-all-normal hover:-translate-y-1 cursor-pointer">
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 rounded-full bg-chart-green mr-2"></div>
                    <div className="text-white/60 text-xs">Growth</div>
                  </div>
                  <div className="text-chart-green font-semibold flex items-center">
                    <FiArrowUp className="mr-1" size={14} /> 10.8%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StockPerformanceChart;
