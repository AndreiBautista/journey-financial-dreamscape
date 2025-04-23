
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Calculator, PiggyBank, Home, TrendingUp, Wallet, Menu, ArrowRight, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile }) => {
  const [isOpen, setIsOpen] = useState(!isMobile);
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarLinks = [
    { path: "/", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { path: "/phase1", label: "Phase 1: Stabilization", icon: <Wallet className="w-5 h-5" /> },
    { path: "/phase2", label: "Phase 2: Family & Growth", icon: <PiggyBank className="w-5 h-5" /> },
    { path: "/phase3", label: "Phase 3: Lake & Wealth", icon: <TrendingUp className="w-5 h-5" /> },
    { path: "/calculator", label: "Compound Calculator", icon: <Calculator className="w-5 h-5" /> },
    { path: "/assumptions", label: "Assumptions", icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && !isOpen && (
        <button 
          onClick={toggleSidebar}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-blue-600 text-white p-2 rounded-r-md shadow-lg hover:bg-blue-700 transition-all duration-300"
          aria-label="Open sidebar"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30" 
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed top-0 left-0 h-full bg-white shadow-xl z-30 transition-all duration-300 flex flex-col",
          isOpen ? "w-64" : "w-16",
          isMobile ? (isOpen ? "w-64" : "w-0 overflow-hidden") : ""
        )}
      >
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          {isOpen ? (
            <h1 className="text-xl font-bold text-blue-600">Chad & Katie's Financial Journey</h1>
          ) : (
            <h1 className="text-xl font-bold text-blue-600">C&K</h1>
          )}
          {!isMobile && (
            <button 
              onClick={toggleSidebar} 
              className="p-1 rounded-full hover:bg-blue-100 text-blue-600"
            >
              <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          )}
          {isMobile && isOpen && (
            <button 
              onClick={toggleSidebar} 
              className="p-1 rounded-full hover:bg-blue-100 text-blue-600"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={cn(
                    "flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 group transition-all duration-200 hover:scale-105 hover:shadow-md",
                    location.pathname === link.path && "bg-blue-100 text-blue-700 font-medium"
                  )}
                >
                  <div className="text-gray-500 group-hover:text-blue-600">
                    {link.icon}
                  </div>
                  {isOpen && (
                    <>
                      <span className="flex-1 ml-3">{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
