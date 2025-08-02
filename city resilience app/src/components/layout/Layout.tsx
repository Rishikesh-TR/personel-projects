import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isEditor = location.pathname.includes('/editor');
  const isSimulation = location.pathname.includes('/simulation');
  
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className={`flex-1 overflow-auto ${isEditor || isSimulation ? 'p-0' : 'p-6'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;