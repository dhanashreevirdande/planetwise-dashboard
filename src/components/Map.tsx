
import React from 'react';

interface MapProps {
  selectedRegion: string;
}

const Map = ({ selectedRegion }: MapProps) => {
  return (
    <div className="h-96 rounded-lg bg-muted flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Interactive Map</h3>
        <p className="text-muted-foreground">
          Currently displaying: {selectedRegion === "global" ? "Global" : selectedRegion.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </p>
      </div>
    </div>
  );
};

export default Map;
