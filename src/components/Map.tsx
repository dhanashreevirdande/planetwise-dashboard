
import React, { useEffect, useRef, useState } from 'react';
import { Globe, MapPin } from 'lucide-react';

interface MapProps {
  selectedRegion: string;
}

const Map = ({ selectedRegion }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to get background position based on region
  const getBackgroundPositionForRegion = (region: string): string => {
    switch(region) {
      case 'north-america': return '20% 30%';
      case 'south-america': return '30% 60%';
      case 'europe': return '45% 30%';
      case 'asia': return '65% 40%';
      case 'africa': return '50% 55%';
      case 'oceania': return '80% 70%';
      default: return 'center'; // global
    }
  };

  // Function to get pin position based on region
  const getPinPositionForRegion = (region: string): { top: string, left: string } => {
    switch(region) {
      case 'north-america': return { top: '30%', left: '20%' };
      case 'south-america': return { top: '60%', left: '30%' };
      case 'europe': return { top: '30%', left: '45%' };
      case 'asia': return { top: '40%', left: '65%' };
      case 'africa': return { top: '55%', left: '50%' };
      case 'oceania': return { top: '70%', left: '80%' };
      default: return { top: '50%', left: '50%' }; // global
    }
  };

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [selectedRegion]);

  const pinPosition = getPinPositionForRegion(selectedRegion);
  const backgroundPosition = getBackgroundPositionForRegion(selectedRegion);

  return (
    <div className="h-96 rounded-lg shadow-md overflow-hidden relative">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <Globe className="h-12 w-12 animate-pulse text-muted-foreground" />
        </div>
      ) : (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-no-repeat transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: 'url("https://img.freepik.com/free-vector/blue-world-map_1035-8255.jpg")',
              backgroundPosition: backgroundPosition,
              backgroundSize: selectedRegion === 'global' ? 'contain' : '150%',
            }}
          />
          
          {selectedRegion !== 'global' && (
            <div 
              className="absolute animate-bounce"
              style={{ 
                top: pinPosition.top, 
                left: pinPosition.left,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/10 pointer-events-none" />
          
          <div className="absolute bottom-4 left-4 bg-white/80 p-2 rounded shadow z-10">
            <p className="text-sm font-medium">
              Currently viewing: {selectedRegion === "global" ? "Global" : selectedRegion.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Map;
