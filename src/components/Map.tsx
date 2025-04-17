
import { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map as OLMap, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { defaults as defaultControls } from 'ol/control';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Button } from '@/components/ui/button';
import { RefreshCw, Layers, GitBranch } from 'lucide-react';

const mapStyles = {
  'standard': new TileLayer({ source: new OSM() }),
  'satellite': new TileLayer({
    source: new OSM({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attributions: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    })
  }),
};

interface HotspotData {
  lat: number;
  lon: number;
  type: 'temperature' | 'pollution' | 'deforestation';
  value: number;
}

// Regional map centers
const regionCenters = {
  'global': { center: [0, 20], zoom: 2 },
  'north-america': { center: [-100, 40], zoom: 3 },
  'south-america': { center: [-60, -15], zoom: 3 },
  'europe': { center: [15, 50], zoom: 3 },
  'asia': { center: [100, 30], zoom: 3 },
  'africa': { center: [20, 0], zoom: 3 },
  'oceania': { center: [135, -25], zoom: 3 },
};

// Example data for demonstration
const globalHotspots: HotspotData[] = [
  { lat: 37.7749, lon: -122.4194, type: 'temperature', value: 2.3 },
  { lat: 40.7128, lon: -74.0060, type: 'pollution', value: 85 },
  { lat: -3.4653, lon: -62.2159, type: 'deforestation', value: 15000 },
  { lat: 51.5074, lon: -0.1278, type: 'pollution', value: 65 },
  { lat: 55.7558, lon: 37.6173, type: 'temperature', value: 1.8 },
  { lat: 35.6762, lon: 139.6503, type: 'pollution', value: 72 },
  { lat: -33.8688, lon: 151.2093, type: 'temperature', value: 1.5 },
  { lat: 28.6139, lon: 77.2090, type: 'pollution', value: 95 },
  { lat: -23.5505, lon: -46.6333, type: 'deforestation', value: 8000 },
];

// Region-specific hotspots
const regionalHotspots = {
  'global': globalHotspots,
  'north-america': [
    { lat: 37.7749, lon: -122.4194, type: 'temperature' as const, value: 2.3 },
    { lat: 40.7128, lon: -74.0060, type: 'pollution' as const, value: 85 },
    { lat: 36.1699, lon: -115.1398, type: 'temperature' as const, value: 2.8 },
    { lat: 41.8781, lon: -87.6298, type: 'pollution' as const, value: 75 },
    { lat: 29.7604, lon: -95.3698, type: 'pollution' as const, value: 80 },
  ],
  'south-america': [
    { lat: -3.4653, lon: -62.2159, type: 'deforestation' as const, value: 15000 },
    { lat: -23.5505, lon: -46.6333, type: 'deforestation' as const, value: 8000 },
    { lat: -34.6037, lon: -58.3816, type: 'pollution' as const, value: 70 },
    { lat: -12.0464, lon: -77.0428, type: 'pollution' as const, value: 85 },
    { lat: -0.1807, lon: -78.4678, type: 'temperature' as const, value: 1.7 },
  ],
  'europe': [
    { lat: 51.5074, lon: -0.1278, type: 'pollution' as const, value: 65 },
    { lat: 48.8566, lon: 2.3522, type: 'pollution' as const, value: 60 },
    { lat: 41.9028, lon: 12.4964, type: 'temperature' as const, value: 2.1 },
    { lat: 52.5200, lon: 13.4050, type: 'pollution' as const, value: 55 },
    { lat: 59.3293, lon: 18.0686, type: 'temperature' as const, value: 1.9 },
  ],
  'asia': [
    { lat: 35.6762, lon: 139.6503, type: 'pollution' as const, value: 72 },
    { lat: 39.9042, lon: 116.4074, type: 'pollution' as const, value: 110 },
    { lat: 28.6139, lon: 77.2090, type: 'pollution' as const, value: 95 },
    { lat: 31.2304, lon: 121.4737, type: 'pollution' as const, value: 90 },
    { lat: 25.2048, lon: 55.2708, type: 'temperature' as const, value: 2.5 },
    { lat: 1.3521, lon: 103.8198, type: 'temperature' as const, value: 1.8 },
    { lat: 13.7563, lon: 100.5018, type: 'deforestation' as const, value: 5000 },
  ],
  'africa': [
    { lat: 5.5557, lon: -0.1963, type: 'deforestation' as const, value: 7000 },
    { lat: -1.2921, lon: 36.8219, type: 'temperature' as const, value: 1.9 },
    { lat: 30.0444, lon: 31.2357, type: 'pollution' as const, value: 88 },
    { lat: -26.2041, lon: 28.0473, type: 'pollution' as const, value: 65 },
    { lat: 6.5244, lon: 3.3792, type: 'pollution' as const, value: 85 },
  ],
  'oceania': [
    { lat: -33.8688, lon: 151.2093, type: 'temperature' as const, value: 1.5 },
    { lat: -37.8136, lon: 144.9631, type: 'pollution' as const, value: 45 },
    { lat: -41.2865, lon: 174.7762, type: 'temperature' as const, value: 1.3 },
    { lat: -9.4438, lon: 147.1803, type: 'deforestation' as const, value: 4000 },
    { lat: -17.7134, lon: 178.0650, type: 'temperature' as const, value: 1.6 },
  ],
};

const getHotspotStyle = (type: string, value: number) => {
  let color = 'rgba(255, 0, 0, 0.8)';
  let size = 8;
  
  if (type === 'temperature') {
    color = 'rgba(255, 0, 0, 0.8)';
    size = 8 + (value * 2);
  } else if (type === 'pollution') {
    color = 'rgba(128, 0, 128, 0.8)';
    size = 8 + (value / 10);
  } else if (type === 'deforestation') {
    color = 'rgba(0, 128, 0, 0.8)';
    size = 8 + (value / 1000);
  }
  
  return new Style({
    image: new CircleStyle({
      radius: size,
      fill: new Fill({ color }),
      stroke: new Stroke({ color: 'white', width: 2 }),
    })
  });
};

interface MapProps {
  region?: string;
}

const Map = ({ region = 'global' }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<OLMap | null>(null);
  const [currentStyle, setCurrentStyle] = useState<string>('standard');
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [currentRegion, setCurrentRegion] = useState<string>(region);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Create vector source and layer for hotspots
    const hotspotSource = new VectorSource();
    const hotspotsToShow = regionalHotspots[region as keyof typeof regionalHotspots] || globalHotspots;
    
    hotspotsToShow.forEach(hotspot => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([hotspot.lon, hotspot.lat])),
        type: hotspot.type,
        value: hotspot.value,
      });
      
      feature.setStyle(getHotspotStyle(hotspot.type, hotspot.value));
      hotspotSource.addFeature(feature);
    });
    
    const hotspotLayer = new VectorLayer({
      source: hotspotSource,
      visible: showHotspots,
    });

    // Get region center and zoom
    const regionConfig = regionCenters[region as keyof typeof regionCenters] || regionCenters.global;

    // Initialize map
    mapRef.current = new OLMap({
      target: mapContainer.current,
      layers: [
        mapStyles[currentStyle as keyof typeof mapStyles],
        hotspotLayer
      ],
      view: new View({
        center: fromLonLat(regionConfig.center),
        zoom: regionConfig.zoom,
        maxZoom: 18,
      }),
      controls: defaultControls({ zoom: false, rotate: false }),
    });

    return () => {
      mapRef.current?.setTarget(undefined);
      mapRef.current = null;
    };
  }, []);

  // Update map when region changes
  useEffect(() => {
    if (!mapRef.current || currentRegion === region) return;
    
    setCurrentRegion(region);
    
    // Get region center and zoom
    const regionConfig = regionCenters[region as keyof typeof regionCenters] || regionCenters.global;
    
    // Update view
    const view = mapRef.current.getView();
    view.animate({
      center: fromLonLat(regionConfig.center),
      zoom: regionConfig.zoom,
      duration: 1000,
    });
    
    // Update hotspots
    const layers = mapRef.current.getLayers().getArray();
    const hotspotLayer = layers[1] as VectorLayer<VectorSource>;
    const hotspotSource = hotspotLayer.getSource();
    
    if (hotspotSource) {
      // Clear existing features
      hotspotSource.clear();
      
      // Add new region-specific hotspots
      const hotspotsToShow = regionalHotspots[region as keyof typeof regionalHotspots] || globalHotspots;
      
      hotspotsToShow.forEach(hotspot => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([hotspot.lon, hotspot.lat])),
          type: hotspot.type,
          value: hotspot.value,
        });
        
        feature.setStyle(getHotspotStyle(hotspot.type, hotspot.value));
        hotspotSource.addFeature(feature);
      });
    }
    
  }, [region, currentRegion]);

  // Update map when style changes
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Remove the old base layer and add the new one
    const layers = mapRef.current.getLayers().getArray();
    mapRef.current.removeLayer(layers[0]);
    mapRef.current.getLayers().insertAt(0, mapStyles[currentStyle as keyof typeof mapStyles]);
    
  }, [currentStyle]);

  // Toggle hotspot visibility
  useEffect(() => {
    if (!mapRef.current) return;
    
    const layers = mapRef.current.getLayers().getArray();
    const hotspotLayer = layers[1] as VectorLayer<VectorSource>;
    hotspotLayer.setVisible(showHotspots);
    
  }, [showHotspots]);

  const toggleMapStyle = () => {
    setCurrentStyle(prev => prev === 'standard' ? 'satellite' : 'standard');
  };

  const toggleHotspots = () => {
    setShowHotspots(prev => !prev);
  };

  const rotateMap = () => {
    if (!mapRef.current) return;
    
    const view = mapRef.current.getView();
    const currentRotation = view.getRotation();
    view.animate({
      rotation: currentRotation + Math.PI/2,
      duration: 500,
    });
  };

  return (
    <div className="rounded-lg overflow-hidden h-[500px] relative">
      <div ref={mapContainer} className="absolute inset-0" />
      
      <div className="absolute top-4 right-4 space-y-2 z-10">
        <Button variant="secondary" size="sm" onClick={toggleMapStyle}>
          <Layers className="h-4 w-4 mr-2" />
          {currentStyle === 'standard' ? 'Satellite' : 'Standard'}
        </Button>
        <Button variant="secondary" size="sm" onClick={toggleHotspots}>
          <GitBranch className="h-4 w-4 mr-2" />
          {showHotspots ? 'Hide' : 'Show'} Hotspots
        </Button>
        <Button variant="secondary" size="sm" onClick={rotateMap}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Rotate
        </Button>
      </div>
      
      <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm p-2 rounded-md text-xs">
        <div className="flex gap-2 items-center">
          <div className="rounded-full w-3 h-3 bg-red-500"></div>
          <span>Temperature Anomalies</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="rounded-full w-3 h-3 bg-purple-800"></div>
          <span>Pollution Hotspots</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="rounded-full w-3 h-3 bg-green-700"></div>
          <span>Deforestation Areas</span>
        </div>
      </div>
    </div>
  );
};

export default Map;
