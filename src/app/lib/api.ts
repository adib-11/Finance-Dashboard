// API utility functions for fetching financial data

import axios from 'axios';

// Using Alpha Vantage API for stock data
// You'll need to get your own API key from https://www.alphavantage.co/
const ALPHA_VANTAGE_API_KEY = 'demo'; // Replace with your API key

// Function to fetch stock data
export async function fetchStockData(symbol: string, interval = 'daily') {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_${interval.toUpperCase()}&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
}

// Function to search for stocks
export async function searchStocks(query: string) {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    return response.data.bestMatches || [];
  } catch (error) {
    console.error('Error searching stocks:', error);
    return [];
  }
}

// Function to fetch mock portfolio data
// In a real app, this would come from a database
export function getMockPortfolio() {
  return {
    totalValue: 125750.32,
    change: 1250.32,
    changePercent: 1.02,
    stocks: [
      { 
        symbol: 'AAPL', 
        name: 'Apple Inc.', 
        shares: 10, 
        price: 182.52, 
        value: 1825.20, 
        change: 1.5,
        color: '#FF6384' 
      },
      { 
        symbol: 'MSFT', 
        name: 'Microsoft Corp.', 
        shares: 5, 
        price: 420.21, 
        value: 2101.05, 
        change: 0.8,
        color: '#36A2EB' 
      },
      { 
        symbol: 'GOOGL', 
        name: 'Alphabet Inc.', 
        shares: 3, 
        price: 163.42, 
        value: 490.26, 
        change: -0.3,
        color: '#FFCE56' 
      },
      { 
        symbol: 'AMZN', 
        name: 'Amazon.com Inc.', 
        shares: 4, 
        price: 185.19, 
        value: 740.76, 
        change: 1.2,
        color: '#4BC0C0' 
      },
      { 
        symbol: 'TSLA', 
        name: 'Tesla Inc.', 
        shares: 8, 
        price: 177.58, 
        value: 1420.64, 
        change: -2.1,
        color: '#9966FF' 
      }
    ],
  };
}
