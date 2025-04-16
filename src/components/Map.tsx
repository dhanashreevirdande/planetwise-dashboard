
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

// Example data for demonstration
const hotspots: HotspotData[] = [
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

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<OLMap | null>(null);
  const [currentStyle, setCurrentStyle] = useState<string>('standard');
  const [showHotspots, setShowHotspots] = useState<boolean>(true);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Create vector source and layer for hotspots
    const hotspotSource = new VectorSource();
    hotspots.forEach(hotspot => {
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

    // Initialize map
    mapRef.current = new OLMap({
      target: mapContainer.current,
      layers: [
        mapStyles[currentStyle as keyof typeof mapStyles],
        hotspotLayer
      ],
      view: new View({
        center: fromLonLat([0, 20]),
        zoom: 2,
        maxZoom: 18,
      }),
      controls: defaultControls({ zoom: false, rotate: false }),
    });

    return () => {
      mapRef.current?.setTarget(undefined);
      mapRef.current = null;
    };
  }, []);

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
