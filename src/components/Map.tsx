
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  selectedRegion: string;
}

const Map = ({ selectedRegion }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = React.useState<string>('');

  // Function to center map based on region
  const getCenterForRegion = (region: string): [number, number] => {
    switch(region) {
      case 'north-america': return [-100, 40];
      case 'south-america': return [-60, -20];
      case 'europe': return [15, 50];
      case 'asia': return [100, 30];
      case 'africa': return [20, 0];
      case 'oceania': return [135, -25];
      default: return [0, 20]; // global
    }
  };

  // Function to set zoom based on region
  const getZoomForRegion = (region: string): number => {
    return region === 'global' ? 1.5 : 3;
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        projection: 'globe',
        zoom: getZoomForRegion(selectedRegion),
        center: getCenterForRegion(selectedRegion),
        pitch: 45,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Disable scroll zoom for smoother experience
      map.current.scrollZoom.disable();

      // Add atmosphere and fog effects
      map.current.on('style.load', () => {
        map.current?.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 200, 225)',
          'horizon-blend': 0.2,
        });
      });

      // Rotation animation settings
      const secondsPerRevolution = 240;
      const maxSpinZoom = 5;
      const slowSpinZoom = 3;
      let userInteracting = false;
      let spinEnabled = true;

      // Spin globe function
      function spinGlobe() {
        if (!map.current) return;
        
        const zoom = map.current.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
          let distancePerSecond = 360 / secondsPerRevolution;
          if (zoom > slowSpinZoom) {
            const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
          }
          const center = map.current.getCenter();
          center.lng -= distancePerSecond;
          map.current.easeTo({ center, duration: 1000, easing: (n) => n });
        }
      }

      // Event listeners for interaction
      map.current.on('mousedown', () => {
        userInteracting = true;
      });
      
      map.current.on('dragstart', () => {
        userInteracting = true;
      });
      
      map.current.on('mouseup', () => {
        userInteracting = false;
        spinGlobe();
      });
      
      map.current.on('touchend', () => {
        userInteracting = false;
        spinGlobe();
      });

      map.current.on('moveend', () => {
        spinGlobe();
      });

      // Start the globe spinning
      spinGlobe();
    } else {
      // Update map center and zoom when region changes
      map.current.flyTo({
        center: getCenterForRegion(selectedRegion),
        zoom: getZoomForRegion(selectedRegion),
        duration: 2000,
      });
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [selectedRegion, mapboxToken]);

  // If no Mapbox token, show input field
  if (!mapboxToken) {
    return (
      <div className="h-96 rounded-lg bg-muted flex flex-col items-center justify-center p-6">
        <h3 className="text-xl font-bold mb-4">Interactive Map Setup</h3>
        <p className="text-muted-foreground mb-4 text-center">
          Please enter your Mapbox public token to enable the interactive map.
          You can get one by signing up at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">mapbox.com</a>.
        </p>
        <input
          type="text"
          className="w-full max-w-md p-2 border rounded mb-4"
          placeholder="Enter your Mapbox public token"
          onChange={(e) => setMapboxToken(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Your token is stored only in your browser and not sent to any server.
        </p>
      </div>
    );
  }

  return (
    <div className="h-96 rounded-lg shadow-md overflow-hidden relative">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute bottom-4 left-4 bg-white/80 p-2 rounded shadow z-10">
        <p className="text-sm font-medium">
          Currently viewing: {selectedRegion === "global" ? "Global" : selectedRegion.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </p>
      </div>
    </div>
  );
};

export default Map;
