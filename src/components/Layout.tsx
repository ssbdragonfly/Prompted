import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Metadata from './Metadata';
import ThemeToggle from './ThemeToggle';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-background animated-gradient">
      <Metadata />
      
      <nav className="py-3 px-4 sm:py-4 sm:px-6 md:px-8 border-b border-border">
        <div className="container-custom flex justify-between items-center">
          <Link to="/" className="text-xl sm:text-2xl font-bold hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
            prompted
          </Link>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            <button 
              className="md:hidden flex items-center ml-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                Home
              </Link>
              <Link to="/play" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                Play
              </Link>
              <Link to="/daily" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                Daily
              </Link>
              <Link to="/news" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                News
              </Link>
              <Link to="/learn" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                Learn
              </Link>
              <Link to="/about" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden container-custom mt-3 pb-3 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/play" 
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Play
            </Link>
            <Link 
              to="/daily" 
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Daily
            </Link>
            <Link 
              to="/news" 
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              News
            </Link>
            <Link 
              to="/learn" 
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Learn
            </Link>
            <Link 
              to="/about" 
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        )}
      </nav>
      
      <main className="py-4 px-4 sm:py-6 sm:px-6 md:py-8 md:px-8">
        <div className="container-custom">
          {children}
        </div>
      </main>
      
      <footer className="py-4 px-4 sm:py-6 sm:px-6 md:px-8 border-t border-border">
        <div className="container-custom text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} prompted — Understanding AI one prompt at a time</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
