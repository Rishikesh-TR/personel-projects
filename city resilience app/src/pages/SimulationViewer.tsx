import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  AlertTriangle, 
  Droplets, 
  Wind, 
  Thermometer, 
  Play,
  RotateCw,
  Zap,
  FileText,
  Settings,
  Share2
} from 'lucide-react';
import CityMap from '../components/map/CityMap';

const SimulationViewer: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeSimulation, setActiveSimulation] = useState('earthquake');
  const [intensity, setIntensity] = useState(7.0);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [zoom, setZoom] = useState(13);
  
  const handleRunSimulation = () => {
    setRunning(true);
    
    // Simulate a loading delay
    setTimeout(() => {
      setRunning(false);
      setCompleted(true);
    }, 2000);
  };

  const handleResetSimulation = () => {
    setCompleted(false);
  };
  
  const getSimulationTitle = () => {
    switch (activeSimulation) {
      case 'earthquake':
        return `${intensity} Magnitude Earthquake`;
      case 'flood':
        return 'Monsoon Flooding';
      case 'tsunami':
        return 'Coastal Tsunami';
      default:
        return 'Simulation';
    }
  };
  
  return (
    <div className="flex h-full">
      {/* Left panel - Simulation Controls */}
      <div className="w-80 bg-white border-r border-neutral-200">
        <div className="px-4 py-3 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-800">Disaster Simulation</h2>
          <p className="text-xs text-neutral-500 mt-1">Test resilience against various scenarios</p>
        </div>
        
        <div className="p-4">
          <h3 className="text-sm font-medium text-neutral-700 mb-2">Simulation Type</h3>
          <div className="grid grid-cols-2 gap-2 mb-6">
            <SimulationTypeCard
              title="Earthquake"
              icon={<AlertTriangle size={18} />}
              active={activeSimulation === 'earthquake'}
              onClick={() => setActiveSimulation('earthquake')}
            />
            <SimulationTypeCard
              title="Flood"
              icon={<Droplets size={18} />}
              active={activeSimulation === 'flood'}
              onClick={() => setActiveSimulation('flood')}
            />
            <SimulationTypeCard
              title="Tsunami"
              icon={<Wind size={18} />}
              active={activeSimulation === 'tsunami'}
              onClick={() => setActiveSimulation('tsunami')}
            />
            <SimulationTypeCard
              title="Heatwave"
              icon={<Thermometer size={18} />}
              active={activeSimulation === 'heatwave'}
              onClick={() => setActiveSimulation('heatwave')}
            />
          </div>
          
          {activeSimulation === 'earthquake' && (
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <h3 className="text-sm font-medium text-neutral-700">Magnitude (Richter Scale)</h3>
                <span className="text-sm text-neutral-500">{intensity.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="5.0"
                max="9.0"
                step="0.1"
                value={intensity}
                onChange={(e) => setIntensity(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-neutral-500 mt-1">
                <span>5.0</span>
                <span>9.0</span>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <button
              className={`w-full py-2 text-white rounded text-sm flex items-center justify-center
                ${running || completed ? 'bg-neutral-400 cursor-not-allowed' : 'bg-primary-500 hover:bg-primary-600'}`}
              onClick={handleRunSimulation}
              disabled={running || completed}
            >
              {running ? (
                <>
                  <RotateCw size={16} className="mr-2 animate-spin" />
                  Running Simulation...
                </>
              ) : (
                <>
                  <Play size={16} className="mr-2" />
                  Run Simulation
                </>
              )}
            </button>
            
            {completed && (
              <button
                className="w-full py-2 border border-neutral-300 text-neutral-700 rounded text-sm flex items-center justify-center hover:bg-neutral-50"
                onClick={handleResetSimulation}
              >
                <RotateCw size={16} className="mr-2" />
                Reset Simulation
              </button>
            )}
          </div>
        </div>
        
        {completed && (
          <div className="p-4 border-t border-neutral-200">
            <h3 className="text-sm font-medium text-neutral-700 mb-3">Impact Summary</h3>
            <div className="space-y-3">
              <ImpactItem
                label="Buildings Affected"
                value="68"
                percentage={24}
                severity="medium"
              />
              <ImpactItem
                label="Critical Infrastructure"
                value="12"
                percentage={38}
                severity="high"
              />
              <ImpactItem
                label="Green Spaces"
                value="4"
                percentage={8}
                severity="low"
              />
              <ImpactItem
                label="Transportation Network"
                value="21 km"
                percentage={45}
                severity="high"
              />
            </div>
            
            <div className="mt-6 flex space-x-2">
              <button className="flex-1 py-2 text-sm text-primary-500 border border-primary-500 rounded flex items-center justify-center hover:bg-primary-50">
                <FileText size={16} className="mr-2" />
                Report
              </button>
              <button className="flex-1 py-2 text-sm text-neutral-700 border border-neutral-300 rounded flex items-center justify-center hover:bg-neutral-50">
                <Share2 size={16} className="mr-2" />
                Share
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Center - Simulation Map View */}
      <div className="flex-1 relative">
        <CityMap 
          zoom={zoom} 
          activeTool={null}
          onFeatureSelect={() => {}}
          selectedFeature={null}
        />
        
        {/* Simulation Info Overlay */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-md shadow-card px-4 py-2 flex items-center space-x-4">
          <div className="flex items-center">
            {activeSimulation === 'earthquake' && <AlertTriangle size={18} className="text-warning-500 mr-2" />}
            {activeSimulation === 'flood' && <Droplets size={18} className="text-primary-500 mr-2" />}
            <h2 className="font-medium text-neutral-800">{getSimulationTitle()}</h2>
          </div>
          
          {completed && (
            <div className="flex items-center pl-4 border-l border-neutral-200">
              <div className="w-2 h-2 bg-warning-500 rounded-full mr-2"></div>
              <span className="text-sm text-neutral-600">High Risk Areas: 26%</span>
            </div>
          )}
        </div>
        
        {/* Legend */}
        {completed && (
          <div className="absolute bottom-4 right-4 bg-white rounded-md shadow-card p-3">
            <h3 className="text-xs font-medium text-neutral-700 mb-2">Risk Level</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-danger-500 mr-2"></div>
                <span className="text-xs text-neutral-600">Severe</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-warning-500 mr-2"></div>
                <span className="text-xs text-neutral-600">High</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-primary-400 mr-2"></div>
                <span className="text-xs text-neutral-600">Moderate</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-success-500 mr-2"></div>
                <span className="text-xs text-neutral-600">Low</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Recommendations */}
        {completed && (
          <div className="absolute bottom-4 left-4 bg-white rounded-md shadow-card p-3 w-80">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-neutral-700">Recommendations</h3>
              <button className="text-neutral-500 hover:text-neutral-700">
                <Settings size={14} />
              </button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              <RecommendationItem 
                text="Upgrade buildings in northern sector to IS 1893 standards"
                type="infrastructure"
              />
              <RecommendationItem 
                text="Install seismic sensors across critical infrastructure"
                type="technology"
              />
              <RecommendationItem 
                text="Reinforce metro stations with additional support columns"
                type="infrastructure"
              />
              <RecommendationItem 
                text="Create emergency evacuation corridors in high-density areas"
                type="planning"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface SimulationTypeCardProps {
  title: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const SimulationTypeCard: React.FC<SimulationTypeCardProps> = ({ title, icon, active, onClick }) => {
  return (
    <button
      className={`p-3 rounded-md border flex flex-col items-center justify-center transition-colors
        ${active 
          ? 'bg-primary-50 border-primary-500 text-primary-700' 
          : 'border-neutral-300 text-neutral-600 hover:bg-neutral-50'}`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{title}</span>
    </button>
  );
};

interface ImpactItemProps {
  label: string;
  value: string;
  percentage: number;
  severity: 'low' | 'medium' | 'high';
}

const ImpactItem: React.FC<ImpactItemProps> = ({ label, value, percentage, severity }) => {
  const getSeverityColor = () => {
    switch (severity) {
      case 'low':
        return 'bg-success-500';
      case 'medium':
        return 'bg-warning-500';
      case 'high':
        return 'bg-danger-500';
      default:
        return 'bg-neutral-500';
    }
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-neutral-700">{label}</span>
        <div className="flex items-center">
          <span className="text-xs font-medium text-neutral-700 mr-2">{value}</span>
          <div className={`w-2 h-2 rounded-full ${getSeverityColor()}`}></div>
        </div>
      </div>
      <div className="bg-neutral-100 h-1.5 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getSeverityColor()}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

interface RecommendationItemProps {
  text: string;
  type: 'infrastructure' | 'planning' | 'technology';
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({ text, type }) => {
  const getTypeColor = () => {
    switch (type) {
      case 'infrastructure':
        return 'bg-primary-100 text-primary-800';
      case 'planning':
        return 'bg-success-100 text-success-800';
      case 'technology':
        return 'bg-secondary-100 text-secondary-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };
  
  return (
    <div className="p-2 rounded border border-neutral-200">
      <p className="text-xs text-neutral-700">{text}</p>
      <span className={`text-xs px-2 py-0.5 rounded-full inline-block mt-2 ${getTypeColor()}`}>
        {type}
      </span>
    </div>
  );
};

export default SimulationViewer;