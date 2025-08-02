export const initialViewState = {
  longitude: 72.8777,
  latitude: 19.0760,
  zoom: 12
};

export const mapStyle = 'mapbox://styles/mapbox/light-v11';

// This would normally come from a GeoJSON API or database
export const mapLayers = [
  {
    id: 'base-layer',
    data: {
      type: 'FeatureCollection',
      features: []
    },
    layer: {
      id: 'base-layer-fill',
      type: 'fill',
      paint: {
        'fill-color': '#0891B2',
        'fill-opacity': 0.1
      }
    }
  },
  {
    id: 'risk-zones',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: 'Earthquake Risk Zone',
            risk: 'high'
          },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [72.8577, 19.0560],
                [72.8977, 19.0560],
                [72.8977, 19.0960],
                [72.8577, 19.0960],
                [72.8577, 19.0560]
              ]
            ]
          }
        }
      ]
    },
    layer: {
      id: 'risk-zones-fill',
      type: 'fill',
      paint: {
        'fill-color': [
          'match',
          ['get', 'risk'],
          'high', '#EF4444',
          'medium', '#F59E0B',
          'low', '#10B981',
          '#64748B'
        ],
        'fill-opacity': 0.3
      }
    }
  }
];