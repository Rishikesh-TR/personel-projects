import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Eye, EyeOff, Plus } from 'lucide-react';

interface LayerPanelProps {
  layers: any[];
  selectedFeature: any;
  onSelectFeature: (feature: any) => void;
}

const LayerPanel: React.FC<LayerPanelProps> = ({ 
  layers, 
  selectedFeature,
  onSelectFeature
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'infrastructure': true,
    'disaster': true,
    'eco': true
  });
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-neutral-200">
        <h2 className="text-lg font-semibold text-neutral-800">Layers</h2>
        <p className="text-xs text-neutral-500 mt-1">Manage map features</p>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2">
        {/* Infrastructure Layers */}
        <SectionHeader 
          title="Infrastructure" 
          expanded={expandedSections['infrastructure']}
          onToggle={() => toggleSection('infrastructure')}
        />
        
        {expandedSections['infrastructure'] && (
          <div className="space-y-1 px-2 mb-4">
            {layers.filter(layer => layer.category === 'infrastructure').map(layer => (
              <LayerItem 
                key={layer.id}
                layer={layer}
                isSelected={selectedFeature?.id === layer.id}
                onSelect={() => onSelectFeature(layer)}
              />
            ))}
            <button className="flex items-center w-full px-2 py-1.5 text-xs text-primary-500 hover:bg-primary-50 rounded">
              <Plus size={12} className="mr-1" />
              Add new infrastructure layer
            </button>
          </div>
        )}
        
        {/* Disaster Risk Layers */}
        <SectionHeader 
          title="Disaster Risk" 
          expanded={expandedSections['disaster']}
          onToggle={() => toggleSection('disaster')}
        />
        
        {expandedSections['disaster'] && (
          <div className="space-y-1 px-2 mb-4">
            {layers.filter(layer => layer.category === 'disaster').map(layer => (
              <LayerItem 
                key={layer.id}
                layer={layer}
                isSelected={selectedFeature?.id === layer.id}
                onSelect={() => onSelectFeature(layer)}
              />
            ))}
          </div>
        )}
        
        {/* Eco Infrastructure Layers */}
        <SectionHeader 
          title="Eco Infrastructure" 
          expanded={expandedSections['eco']}
          onToggle={() => toggleSection('eco')}
        />
        
        {expandedSections['eco'] && (
          <div className="space-y-1 px-2 mb-4">
            {layers.filter(layer => layer.category === 'eco').map(layer => (
              <LayerItem 
                key={layer.id}
                layer={layer}
                isSelected={selectedFeature?.id === layer.id}
                onSelect={() => onSelectFeature(layer)}
              />
            ))}
            <button className="flex items-center w-full px-2 py-1.5 text-xs text-primary-500 hover:bg-primary-50 rounded">
              <Plus size={12} className="mr-1" />
              Add new eco layer
            </button>
          </div>
        )}
      </div>
      
      <div className="border-t border-neutral-200 p-4">
        <button className="w-full py-2 bg-primary-500 hover:bg-primary-600 text-white rounded text-sm flex items-center justify-center">
          <Plus size={16} className="mr-1" />
          Add New Layer
        </button>
      </div>
    </div>
  );
};

interface SectionHeaderProps {
  title: string;
  expanded: boolean;
  onToggle: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, expanded, onToggle }) => {
  return (
    <button 
      className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
      onClick={onToggle}
    >
      <span>{title}</span>
      {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
    </button>
  );
};

interface LayerItemProps {
  layer: any;
  isSelected: boolean;
  onSelect: () => void;
}

const LayerItem: React.FC<LayerItemProps> = ({ layer, isSelected, onSelect }) => {
  const [visible, setVisible] = useState(true);
  
  const toggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(!visible);
  };
  
  return (
    <button 
      className={`flex items-center justify-between w-full px-2 py-1.5 text-xs rounded
        ${isSelected ? 'bg-primary-50 text-primary-700' : 'text-neutral-700 hover:bg-neutral-50'}`}
      onClick={onSelect}
    >
      <div className="flex items-center">
        <span className={`block w-2 h-2 rounded-full mr-2
          ${layer.category === 'infrastructure' ? 'bg-primary-500' : 
            layer.category === 'disaster' ? 'bg-warning-500' : 'bg-success-500'}`}
        ></span>
        <span>{layer.name}</span>
      </div>
      <button onClick={toggleVisibility}>
        {visible ? <Eye size={14} /> : <EyeOff size={14} />}
      </button>
    </button>
  );
};

export default LayerPanel;