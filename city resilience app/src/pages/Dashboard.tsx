import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  PlusCircle, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  MapPin,
  Users,
  Calendar,
  BarChart3
} from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import ProjectCard from '../components/projects/ProjectCard';
import { mockProjects } from '../data/mockData';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">
            Welcome back, {user?.firstName}
          </h1>
          <p className="text-neutral-500 mt-1">Here's an overview of your resilience projects</p>
        </div>
        <button 
          onClick={() => navigate('/editor/new')}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
        >
          <PlusCircle size={18} />
          <span>New Project</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Active Projects"
          value="8"
          icon={<MapPin className="text-primary-500" />}
          trend="+2 this month"
          trendUp={true}
        />
        <StatCard
          title="Disaster Simulations"
          value="24"
          icon={<AlertTriangle className="text-warning-500" />}
          trend="+5 this week"
          trendUp={true}
        />
        <StatCard
          title="Team Members"
          value="12"
          icon={<Users className="text-secondary-500" />}
          trend="Same as last month"
          trendUp={false}
        />
        <StatCard
          title="Compliance Score"
          value="87%"
          icon={<TrendingUp className="text-success-500" />}
          trend="+4% improvement"
          trendUp={true}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-neutral-800">Project Activity</h2>
            <select className="px-3 py-1.5 border border-neutral-300 rounded-md text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center border-b border-neutral-200 pb-4">
            <BarChart3 size={120} className="text-neutral-300" />
            <p className="text-neutral-500 mt-4">Activity chart will be displayed here</p>
          </div>
          <div className="pt-4 space-y-4">
            <ActivityItem 
              title="Flood simulation completed" 
              project="Mumbai Central District"
              time="2 hours ago"
              icon={<AlertTriangle size={16} className="text-warning-500" />}
            />
            <ActivityItem 
              title="Metro line added" 
              project="Delhi Urban Corridor"
              time="Yesterday at 4:30 PM"
              icon={<MapPin size={16} className="text-primary-500" />}
            />
            <ActivityItem 
              title="Team meeting" 
              project="All projects"
              time="Yesterday at 10:00 AM"
              icon={<Users size={16} className="text-secondary-500" />}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-neutral-800">Upcoming Events</h2>
            <button className="text-primary-500 text-sm hover:text-primary-600">View All</button>
          </div>
          <div className="space-y-4">
            <EventItem 
              title="Stakeholder Presentation"
              date="Today, 2:00 PM"
              location="Virtual Meeting"
            />
            <EventItem 
              title="Flood Simulation Review"
              date="Tomorrow, 10:00 AM"
              location="Planning Room 2"
            />
            <EventItem 
              title="Team Sync"
              date="Mar 15, 9:30 AM"
              location="Conference Room A"
            />
            <EventItem 
              title="Compliance Deadline"
              date="Mar 20"
              location="All Projects"
            />
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-neutral-800">Recent Projects</h2>
          <button className="text-primary-500 text-sm hover:text-primary-600">View All Projects</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ActivityItemProps {
  title: string;
  project: string;
  time: string;
  icon: React.ReactNode;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, project, time, icon }) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0 p-2 bg-neutral-100 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-medium text-neutral-800">{title}</p>
        <p className="text-xs text-neutral-500">{project}</p>
      </div>
      <div className="flex-1 text-right">
        <div className="flex items-center justify-end space-x-1 text-xs text-neutral-400">
          <Clock size={12} />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

interface EventItemProps {
  title: string;
  date: string;
  location: string;
}

const EventItem: React.FC<EventItemProps> = ({ title, date, location }) => {
  return (
    <div className="border-l-2 border-primary-500 pl-3 py-1">
      <p className="text-sm font-medium text-neutral-800">{title}</p>
      <div className="flex items-center space-x-3 mt-1">
        <div className="flex items-center space-x-1 text-xs text-neutral-500">
          <Calendar size={12} />
          <span>{date}</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-neutral-500">
          <MapPin size={12} />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;