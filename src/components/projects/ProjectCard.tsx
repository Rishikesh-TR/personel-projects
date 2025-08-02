import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  AlertTriangle, 
  Users, 
  Calendar,
  MoreVertical
} from 'lucide-react';
import { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-white rounded-lg shadow-card overflow-hidden hover:shadow-popup transition-shadow duration-300 cursor-pointer"
      onClick={() => navigate(`/editor/${project.id}`)}
    >
      <div className="relative">
        <img 
          src={project.imageUrl} 
          alt={project.name} 
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full 
            ${project.status === 'active' ? 'bg-success-500 text-white' : 
              project.status === 'draft' ? 'bg-neutral-500 text-white' : 
              'bg-warning-500 text-white'}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
        <button className="absolute top-2 right-2 p-1 bg-white/80 rounded-full text-neutral-600 hover:bg-white">
          <MoreVertical size={16} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-neutral-800 line-clamp-1">{project.name}</h3>
        <div className="flex items-center space-x-1 mt-1">
          <MapPin size={14} className="text-neutral-500" />
          <span className="text-sm text-neutral-500">{project.location}</span>
        </div>
        <p className="text-sm text-neutral-600 mt-2 line-clamp-2">{project.description}</p>
        
        <div className="mt-4 pt-4 border-t border-neutral-200 grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-xs text-neutral-500">Risk</p>
            <div className="flex items-center justify-center mt-1">
              <AlertTriangle size={14} className="text-warning-500 mr-1" />
              <span className="text-sm font-medium">{project.riskLevel}</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-neutral-500">Team</p>
            <div className="flex items-center justify-center mt-1">
              <Users size={14} className="text-secondary-500 mr-1" />
              <span className="text-sm font-medium">{project.teamSize}</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-neutral-500">Updated</p>
            <div className="flex items-center justify-center mt-1">
              <Calendar size={14} className="text-primary-500 mr-1" />
              <span className="text-sm font-medium">{project.lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;