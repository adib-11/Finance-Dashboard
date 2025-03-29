import { useTheme } from 'next-themes';
import { FiSearch, FiHome, FiPieChart, FiActivity, FiSettings, FiCalendar, FiBell } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-20 w-full">
      <div className="flex items-center justify-between py-4 px-5">
        <div className="flex items-center">
          <div className="flex items-center mr-8">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-full w-8 h-8 flex items-center justify-center mr-2">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="text-white font-semibold">FinancePro</span>
          </div>
          
          <div className="hidden md:flex px-3 py-1 rounded-full bg-opacity-30 border border-gray-700">
            <span className="text-white text-xs font-medium px-4 py-1 bg-purple-600 rounded-full">Vulnerable Assets 141</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-5">
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex items-center text-xs text-white/70 px-2 py-1 border border-gray-700 rounded-md">
              <FiCalendar className="mr-1" size={14} />
              <span>29 Oct - 11 Nov</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full text-white/70 hover:bg-gray-800 transition-colors">
              <FiSearch size={18} />
            </button>
            <button className="p-2 rounded-full text-white/70 hover:bg-gray-800 transition-colors">
              <FiBell size={18} />
            </button>
            <div className="flex items-center">
              <span className="text-white/70 mr-2 text-sm hidden md:block">Tony Aliby</span>
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <Image 
                    src="/vercel.svg"
                    alt="Profile"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center py-3 px-5">
        <h1 className="text-xl font-bold text-white">
          Portfolio Dashboard
        </h1>
        {/* Removed high/medium/low toggle buttons as requested */}
      </div>
    </header>
  );
};

export default Header;
