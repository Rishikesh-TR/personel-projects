import React, { useRef, useEffect, useState } from 'react';
import Map, { 
  NavigationControl,
  ScaleControl,
  Source,
  Layer
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { initialViewState, mapStyle, mapLayers } from '../../data/mapConfig';

// Mapbox token would normally be stored in environment variables
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xna3d0Ymg0MDE4MDNkcHFrdWxzeTBsYyJ9.ZZfAU5-LOr1cwLFCqrVRUw';

interface CityMapProps {
  zoom: number;
  activeTool: string | null;
  selectedFeature: any;
  onFeatureSelect: (feature: any) => void;
}

const CityMap: React.FC<CityMapProps> = ({ 
  zoom, 
  activeTool,
  selectedFeature,
  onFeatureSelect
}) => {
  const mapRef = useRef<any>(null);
  const [viewState, setViewState] = useState({
    ...initialViewState,
    zoom
  });
  
  useEffect(() => {
    setViewState(prev => ({
      ...prev,
      zoom
    }));
  }, [zoom]);
  
  const handleClick = (event: any) => {
    if (!mapRef.current || !activeTool) return;
    
    if (activeTool === 'select') {
      const features = mapRef.current.queryRenderedFeatures(event.point);
      if (features.length > 0) {
        onFeatureSelect(features[0].properties);
      }
    }
  };
  
  return (
    <div className="w-full h-full">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle={mapStyle}
        onClick={handleClick}
        cursor={activeTool ? 'crosshair' : 'grab'}
      >
        <NavigationControl position="bottom-right" />
        <ScaleControl position="bottom-left" />
        
        {/* Base layers */}
        {mapLayers.map((layer) => (
          <Source key={layer.id} id={layer.id} type="geojson" data={layer.data}>
            <Layer {...layer.layer} />
          </Source>
        ))}
        
        {/* Selected feature highlight */}
        {selectedFeature && (
          <Source
            id="selected-feature"
            type="geojson"
            data={{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [selectedFeature.lng || 72.8777, selectedFeature.lat || 19.0760]
              },
              properties: {}
            }}
          >
            <Layer
              id="selected-feature-layer"
              type="circle"
              paint={{
                'circle-radius': 12,
                'circle-color': '#0F766E',
                'circle-opacity': 0.8,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff'
              }}
            />
          </Source>
        )}
      </Map>
    </div>
  );
};

export default CityMap;