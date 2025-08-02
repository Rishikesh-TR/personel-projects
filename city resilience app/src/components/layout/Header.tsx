import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Menu, 
  Bell, 
  User, 
  ChevronDown, 
  Search,
  HelpCircle
} from 'lucide-react';

const Header: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path.includes('/editor')) return 'City Editor';
    if (path.includes('/simulation')) return 'Simulation Viewer';
    if (path.includes('/compliance')) return 'Compliance Checker';
    return 'CityResilience Masterplan';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-neutral-200 h-16 flex items-center justify-between px-6 shadow-sm z-10">
      <div className="flex items-center lg:hidden">
        <button className="p-2 rounded-md text-neutral-600 hover:bg-neutral-100 transition-colors" aria-label="Menu">
          <Menu size={20} />
        </button>
      </div>

      <div className="hidden lg:flex items-center space-x-2">
        <h1 className="text-xl font-semibold text-neutral-800">{getPageTitle()}</h1>
      </div>

      <div className="flex-1 mx-8 hidden lg:block">
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects, templates, or cities..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-neutral-400" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full text-neutral-600 hover:bg-neutral-100 transition-colors" aria-label="Help">
          <HelpCircle size={20} />
        </button>
        <button className="p-2 rounded-full text-neutral-600 hover:bg-neutral-100 transition-colors relative" aria-label="Notifications">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full"></span>
        </button>
        <div className="relative">
          <button 
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-neutral-100 transition-colors"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="text-sm font-medium text-neutral-700 hidden md:inline-block">
              {user?.firstName} {user?.lastName}
            </span>
            <ChevronDown size={16} className="text-neutral-500" />
          </button>
          
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-popup border border-neutral-200 py-2 z-10 animate-fade-in">
              <a href="#" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">Settings</a>
              <a href="#" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">Support</a>
              <div className="border-t border-neutral-200 my-1"></div>
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;