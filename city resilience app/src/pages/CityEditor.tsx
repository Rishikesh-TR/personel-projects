import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Layers, 
  Plus, 
  Minus, 
  MousePointer, 
  Move, 
  Square, 
  Circle, 
  Share2,
  Save,
  FileText,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import CityMap from '../components/map/CityMap';
import MapToolbar from '../components/map/MapToolbar';
import LayerPanel from '../components/map/LayerPanel';
import PropertyPanel from '../components/map/PropertyPanel';
import { mapFeatures } from '../data/mockData';

const CityEditor: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [showLayerPanel, setShowLayerPanel] = useState(true);
  const [showPropertyPanel, setShowPropertyPanel] = useState(true);
  const [zoom, setZoom] = useState(12);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  
  // This would come from an API in a real application
  const projectName = projectId === 'new' ? 'New Project' : 'Mumbai Central District';
  
  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 1, 20));
  };
  
  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 1, 5));
  };
  
  const handleToolSelect = (tool: string) => {
    setActiveTool(activeTool === tool ? null : tool);
  };

  const handleFeatureSelect = (feature: any) => {
    setSelectedFeature(feature);
    setShowPropertyPanel(true);
  };
  
  return (
    <div className="flex h-full">
      {/* Left panel - Layers */}
      <div className={`bg-white border-r border-neutral-200 transition-all duration-300 ${showLayerPanel ? 'w-64' : 'w-0 overflow-hidden'}`}>
        <LayerPanel
          layers={mapFeatures}
          onSelectFeature={handleFeatureSelect}
          selectedFeature={selectedFeature}
        />
      </div>
      
      {/* Center - Map */}
      <div className="flex-1 relative">
        <CityMap 
          zoom={zoom} 
          activeTool={activeTool}
          onFeatureSelect={handleFeatureSelect}
          selectedFeature={selectedFeature}
        />
        
        {/* Map Controls */}
        <div className="absolute top-4 left-4 bg-white rounded-md shadow-card">
          <button 
            className="p-2 hover:bg-neutral-100 text-neutral-700 border-b border-neutral-200"
            onClick={handleZoomIn}
          >
            <Plus size={18} />
          </button>
          <button 
            className="p-2 hover:bg-neutral-100 text-neutral-700"
            onClick={handleZoomOut}
          >
            <Minus size={18} />
          </button>
        </div>
        
        {/* Toggle Panels Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button 
            className={`p-2 rounded-md shadow-card ${showLayerPanel ? 'bg-primary-500 text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setShowLayerPanel(!showLayerPanel)}
          >
            <Layers size={18} />
          </button>
          <button 
            className={`p-2 rounded-md shadow-card ${showPropertyPanel ? 'bg-primary-500 text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setShowPropertyPanel(!showPropertyPanel)}
            disabled={!selectedFeature}
          >
            <FileText size={18} />
          </button>
        </div>
        
        {/* Project info bar */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-md shadow-card px-4 py-2 flex items-center space-x-4">
          <h2 className="font-medium text-neutral-800">{projectName}</h2>
          <div className="flex items-center space-x-2">
            <button className="p-1.5 rounded-md hover:bg-neutral-100 text-neutral-600">
              <Save size={16} />
            </button>
            <button className="p-1.5 rounded-md hover:bg-neutral-100 text-neutral-600">
              <Share2 size={16} />
            </button>
          </div>
        </div>
        
        {/* Tools Bar */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-md shadow-card">
          <MapToolbar 
            activeTool={activeTool} 
            onToolSelect={handleToolSelect}
          />
        </div>
        
        {/* Simulation Alert */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-warning-50 border border-warning-200 text-warning-800 rounded-md px-4 py-2 flex items-center space-x-2 shadow-card">
          <AlertTriangle size={18} />
          <span className="text-sm">This area has high earthquake risk. Click to run simulation.</span>
          <button className="ml-2 text-warning-600 hover:text-warning-700">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      {/* Right panel - Properties */}
      <div className={`bg-white border-l border-neutral-200 transition-all duration-300 ${showPropertyPanel && selectedFeature ? 'w-80' : 'w-0 overflow-hidden'}`}>
        {selectedFeature && (
          <PropertyPanel 
            feature={selectedFeature}
            onClose={() => setShowPropertyPanel(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CityEditor;