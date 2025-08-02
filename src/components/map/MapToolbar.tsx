import React from 'react';
import { MousePointer, Move, Square, Circle, Trash, Loader as Road, Train, Droplets, Landmark as Parkland, Building2, Zap } from 'lucide-react';

interface MapToolbarProps {
  activeTool: string | null;
  onToolSelect: (tool: string) => void;
}

const MapToolbar: React.FC<MapToolbarProps> = ({ activeTool, onToolSelect }) => {
  const tools = [
    { id: 'select', icon: <MousePointer size={18} />, label: 'Select' },
    { id: 'move', icon: <Move size={18} />, label: 'Move' },
    { id: 'road', icon: <Road size={18} />, label: 'Roads' },
    { id: 'metro', icon: <Train size={18} />, label: 'Metro Lines' },
    { id: 'building', icon: <Building2 size={18} />, label: 'Buildings' },
    { id: 'water', icon: <Droplets size={18} />, label: 'Water' },
    { id: 'park', icon: <Parkland size={18} />, label: 'Parks' },
    { id: 'solar', icon: <Zap size={18} />, label: 'Solar' },
    { id: 'delete', icon: <Trash size={18} />, label: 'Delete' }
  ];
  
  return (
    <div className="flex flex-col">
      {tools.map((tool) => (
        <button
          key={tool.id}
          className={`p-2.5 hover:bg-neutral-100 text-neutral-700
            ${activeTool === tool.id ? 'bg-primary-50 text-primary-500' : ''}
            ${tool.id === 'delete' ? 'border-t border-neutral-200' : ''}`}
          onClick={() => onToolSelect(tool.id)}
          title={tool.label}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
};

export default MapToolbar;