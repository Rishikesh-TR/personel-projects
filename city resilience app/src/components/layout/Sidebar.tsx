import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  AlertTriangle, 
  FileCheck, 
  Users, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Building2,
  Leaf,
  Bolt
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={`bg-white border-r border-neutral-200 flex flex-col transition-all duration-300 shadow-sm z-20 
        ${collapsed ? 'w-16' : 'w-64'}`}
    >
      <div className={`h-16 flex items-center ${collapsed ? 'justify-center' : 'px-6'} border-b border-neutral-200`}>
        {!collapsed && (
          <div className="flex items-center">
            <Bolt className="text-primary-500" size={24} />
            <span className="ml-2 font-bold text-lg text-neutral-800">CityResilience</span>
          </div>
        )}
        {collapsed && <Bolt className="text-primary-500" size={24} />}
      </div>
      
      <div className="flex-1 py-6 flex flex-col justify-between">
        <nav className="px-2 space-y-1">
          <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" collapsed={collapsed} />
          <NavItem to="/editor/new" icon={<Map size={20} />} label="City Editor" collapsed={collapsed} />
          <NavItem to="/simulation/new" icon={<AlertTriangle size={20} />} label="Simulation" collapsed={collapsed} />
          <NavItem to="/compliance/new" icon={<FileCheck size={20} />} label="Compliance" collapsed={collapsed} />
          
          <div className="pt-4 border-t border-neutral-200 mt-4">
            <h3 className={`${collapsed ? 'sr-only' : 'px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2'}`}>
              Tools
            </h3>
            <NavItem to="/infrastructure" icon={<Building2 size={20} />} label="Infrastructure" collapsed={collapsed} />
            <NavItem to="/eco-upgrade" icon={<Leaf size={20} />} label="Eco Upgrades" collapsed={collapsed} />
            <NavItem to="/team" icon={<Users size={20} />} label="Team" collapsed={collapsed} />
          </div>
        </nav>
        
        <div className="px-2">
          <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" collapsed={collapsed} />
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mt-6 w-full flex items-center justify-center p-2 rounded-md text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>
    </aside>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, collapsed }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex items-center ${collapsed ? 'justify-center' : 'px-3'} py-2 rounded-md transition-colors ${
          isActive 
            ? 'bg-primary-50 text-primary-600' 
            : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
        }`
      }
    >
      <span className="flex-shrink-0">{icon}</span>
      {!collapsed && <span className="ml-3 text-sm font-medium">{label}</span>}
    </NavLink>
  );
};

export default Sidebar;