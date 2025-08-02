import React, { useState } from 'react';
import { X, ChevronRight, Camera } from 'lucide-react';

interface PropertyPanelProps {
  feature: any;
  onClose: () => void;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({ feature, onClose }) => {
  const [activeTab, setActiveTab] = useState('properties');
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
        <h2 className="text-lg font-semibold text-neutral-800">{feature.name || 'Feature Properties'}</h2>
        <button 
          className="p-1 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="border-b border-neutral-200">
        <div className="flex">
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium text-center transition-colors
              ${activeTab === 'properties' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-neutral-500 hover:text-neutral-700'}`}
            onClick={() => setActiveTab('properties')}
          >
            Properties
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium text-center transition-colors
              ${activeTab === 'simulation' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-neutral-500 hover:text-neutral-700'}`}
            onClick={() => setActiveTab('simulation')}
          >
            Simulation
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'properties' ? (
          <PropertyTabContent feature={feature} />
        ) : (
          <SimulationTabContent feature={feature} />
        )}
      </div>
    </div>
  );
};

interface PropertyTabContentProps {
  feature: any;
}

const PropertyTabContent: React.FC<PropertyTabContentProps> = ({ feature }) => {
  return (
    <div className="p-4">
      {feature.imageUrl && (
        <div className="mb-4">
          <img 
            src={feature.imageUrl} 
            alt={feature.name} 
            className="w-full h-40 object-cover rounded-md"
          />
          <div className="flex justify-end mt-2">
            <button className="flex items-center text-xs text-primary-500">
              <Camera size={12} className="mr-1" />
              View More Images
            </button>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-neutral-700 mb-2">Basic Information</h3>
          <div className="space-y-2">
            <PropertyField label="Type" value={feature.type || 'Infrastructure'} />
            <PropertyField label="Status" value={feature.status || 'Active'} />
            <PropertyField label="Last Updated" value={feature.lastUpdated || 'Today'} />
            <PropertyField label="Created By" value={feature.createdBy || 'Urban Planner'} />
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-neutral-700 mb-2">Technical Details</h3>
          <div className="space-y-2">
            <PropertyField label="Area" value={feature.area || '1,245 sq.m'} />
            <PropertyField label="Length" value={feature.length || '124 m'} />
            <PropertyField label="Height" value={feature.height || '12 m'} />
            <PropertyField label="Material" value={feature.material || 'Reinforced Concrete'} />
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-neutral-700 mb-2">Resilience Score</h3>
          <div className="bg-neutral-100 h-3 rounded-full overflow-hidden">
            <div 
              className="h-full bg-success-500" 
              style={{ width: `${feature.resilienceScore || 75}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-neutral-500">Score: {feature.resilienceScore || 75}/100</span>
            <span className="text-xs text-success-500">Good</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SimulationTabContentProps {
  feature: any;
}

const SimulationTabContent: React.FC<SimulationTabContentProps> = ({ feature }) => {
  return (
    <div className="p-4">
      <div className="bg-warning-50 border border-warning-200 rounded-md p-3 mb-4">
        <h3 className="text-sm font-medium text-warning-800 mb-1">Simulation Results</h3>
        <p className="text-xs text-warning-600">This feature has been analyzed for disaster resilience.</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-neutral-700 mb-2">Earthquake Risk</h3>
          <div className="space-y-2">
            <RiskBar label="Structural Integrity" value={85} />
            <RiskBar label="Foundation Stability" value={92} />
            <RiskBar label="Material Resilience" value={78} />
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-neutral-700 mb-2">Flood Risk</h3>
          <div className="space-y-2">
            <RiskBar label="Water Resistance" value={65} />
            <RiskBar label="Drainage Capacity" value={58} />
            <RiskBar label="Elevation Safety" value={82} />
          </div>
        </div>
        
        <button className="w-full py-2 bg-primary-500 hover:bg-primary-600 text-white rounded text-sm mt-4">
          Run New Simulation
        </button>
      </div>
    </div>
  );
};

interface PropertyFieldProps {
  label: string;
  value: string;
}

const PropertyField: React.FC<PropertyFieldProps> = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-neutral-500">{label}</span>
      <span className="text-xs font-medium text-neutral-700">{value}</span>
    </div>
  );
};

interface RiskBarProps {
  label: string;
  value: number;
}

const RiskBar: React.FC<RiskBarProps> = ({ label, value }) => {
  const getRiskColor = (value: number) => {
    if (value > 80) return 'bg-success-500';
    if (value > 60) return 'bg-warning-500';
    return 'bg-danger-500';
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-neutral-700">{label}</span>
        <span className="text-xs font-medium text-neutral-700">{value}%</span>
      </div>
      <div className="bg-neutral-100 h-2 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getRiskColor(value)}`} 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PropertyPanel;