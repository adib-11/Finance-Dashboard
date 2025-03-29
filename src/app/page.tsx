"use client";

import { useState } from 'react';
import Header from './components/Header';
import PortfolioSummary from './components/PortfolioSummary';
import StockList from './components/StockList';
import StockPerformanceChart from './components/StockPerformanceChart';
import AssetAllocationChart from './components/AssetAllocationChart';
import { FiActivity, FiHome, FiPieChart, FiSettings, FiUser, FiClock, FiAlertTriangle } from 'react-icons/fi';
import { getMockPortfolio } from './lib/api';

export default function Home() {
  // Get mock portfolio data
  const portfolio = getMockPortfolio();
  
  // State for active section
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Sidebar */}
      <div className="w-16 md:w-64 sidebar fixed h-full z-30 flex flex-col">
        <div className="flex items-center justify-center h-16 md:justify-start md:px-6">
          <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-full w-8 h-8 flex items-center justify-center mr-0 md:mr-3">
            <span className="text-white font-bold">F</span>
          </div>
          <span className="hidden md:block text-white font-semibold">FinancePro</span>
        </div>
        
        <nav className="flex-1 mt-6 px-2">
          <div className="space-y-2">
            <button 
              onClick={() => setActiveSection('dashboard')}
              className={`w-full flex items-center p-2 rounded-lg transition-colors ${activeSection === 'dashboard' ? 'bg-purple-600 text-white' : 'text-white/60 hover:bg-gray-800 hover:text-white'}`}
            >
              <FiHome className="w-5 h-5 mx-auto md:mx-0 md:mr-3" />
              <span className="hidden md:block">Dashboard</span>
            </button>
            
            <button 
              onClick={() => setActiveSection('analytics')}
              className={`w-full flex items-center p-2 rounded-lg transition-colors ${activeSection === 'analytics' ? 'bg-purple-600 text-white' : 'text-white/60 hover:bg-gray-800 hover:text-white'}`}
            >
              <FiPieChart className="w-5 h-5 mx-auto md:mx-0 md:mr-3" />
              <span className="hidden md:block">Analytics</span>
            </button>
            
            <button 
              onClick={() => setActiveSection('activity')}
              className={`w-full flex items-center p-2 rounded-lg transition-colors ${activeSection === 'activity' ? 'bg-purple-600 text-white' : 'text-white/60 hover:bg-gray-800 hover:text-white'}`}
            >
              <FiActivity className="w-5 h-5 mx-auto md:mx-0 md:mr-3" />
              <span className="hidden md:block">Activity</span>
            </button>
            
            <button 
              onClick={() => setActiveSection('settings')}
              className={`w-full flex items-center p-2 rounded-lg transition-colors ${activeSection === 'settings' ? 'bg-purple-600 text-white' : 'text-white/60 hover:bg-gray-800 hover:text-white'}`}
            >
              <FiSettings className="w-5 h-5 mx-auto md:mx-0 md:mr-3" />
              <span className="hidden md:block">Settings</span>
            </button>
          </div>
        </nav>
        
        <div className="mb-6 px-2">
          <button className="w-full flex items-center p-2 rounded-lg text-white/60 hover:bg-gray-800 hover:text-white transition-colors">
            <FiUser className="w-5 h-5 mx-auto md:mx-0 md:mr-3" />
            <span className="hidden md:block">Profile</span>
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 ml-16 md:ml-64">
        <Header />
        
        <main className="px-5 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2 h-auto min-h-[550px]">
              <StockPerformanceChart />
            </div>
            
            <div className="md:col-span-1 h-auto min-h-[550px]">
              <AssetAllocationChart stocks={portfolio.stocks} />
            </div>
          </div>
          
          <div className="mb-8">
            <StockList stocks={portfolio.stocks} />
          </div>
          
          <div className="mb-8">
            <PortfolioSummary 
              totalValue={portfolio.totalValue} 
              change={portfolio.change} 
              changePercent={portfolio.changePercent} 
            />
          </div>
          
          {/* Last actions section */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-xl font-medium">Last actions</h2>
              <button className="flex items-center text-sm text-white/70 bg-gray-800/50 border border-gray-700/50 rounded-full px-3 py-1.5 hover:bg-gray-700/30 hover:text-white transition-all">
                <FiClock className="mr-2" size={14} />
                View all
              </button>
            </div>
            
            <div className="dashboard-card p-6 border border-gray-800/20 shadow-lg rounded-xl bg-card-bg">
              <div className="space-y-6">
                <div className="flex items-start group hover:bg-gray-800/20 p-3 rounded-lg transition-all -mx-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-md shadow-purple-600/20">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  </div>
                  <div className="flex-1 ml-4">
                    <div className="flex flex-col">
                      <div className="text-white text-sm font-medium">
                        Scan for <span className="text-purple-400 font-semibold">apple.com</span> has been completed
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="text-white/50 text-xs bg-gray-800/50 px-3 py-1 rounded-full">3h ago</div>
                        <div className="ml-auto text-white/30 group-hover:text-white/70 transition-colors flex items-center">
                          <span className="text-xs mr-1">Details</span>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start group hover:bg-gray-800/20 p-3 rounded-lg transition-all -mx-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-md shadow-purple-600/20">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  </div>
                  <div className="flex-1 ml-4">
                    <div className="flex flex-col">
                      <div className="text-white text-sm font-medium">
                        Scan for <span className="text-purple-400 font-semibold">dribbble.com/nikitinteam</span> has been completed
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="text-white/50 text-xs bg-gray-800/50 px-3 py-1 rounded-full">1 Day Ago</div>
                        <div className="ml-auto text-white/30 group-hover:text-white/70 transition-colors flex items-center">
                          <span className="text-xs mr-1">Details</span>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start group hover:bg-gray-800/20 p-3 rounded-lg transition-all -mx-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-md shadow-purple-600/20">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  </div>
                  <div className="flex-1 ml-4">
                    <div className="flex flex-col">
                      <div className="text-white text-sm font-medium">
                        Scan for <span className="text-purple-400 font-semibold">nikitinteam.com</span> has been completed
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="text-white/50 text-xs bg-gray-800/50 px-3 py-1 rounded-full">30 Oct 2020</div>
                        <div className="ml-auto text-white/30 group-hover:text-white/70 transition-colors flex items-center">
                          <span className="text-xs mr-1">Details</span>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <div className="absolute bottom-6 right-6">
          <div className="relative">
            <button className="gradient-button text-white p-3 rounded-full shadow-lg">
              <FiAlertTriangle size={24} />
            </button>
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-gray-900"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
