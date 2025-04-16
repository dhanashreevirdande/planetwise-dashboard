
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Map from "@/components/Map";
import MetricsCard from "@/components/MetricsCard";
import RegionSelector from "@/components/RegionSelector";
import TemperatureChart from "@/components/Charts/TemperatureChart";
import ForestChart from "@/components/Charts/ForestChart";
import { Thermometer, Wind, TreePine, Droplet, Fish, Heart, AlertCircle } from "lucide-react";
import OceanChart from "@/components/Charts/OceanChart";
import AirQualityGauge from "@/components/AirQualityGauge";
import GlobalEvents from "@/components/GlobalEvents";
import TimelineSelector from "@/components/TimelineSelector";
import BiodiversityChart from "@/components/Charts/BiodiversityChart";
import HealthIndexChart from "@/components/HealthIndexChart";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

// Regional data
const regionData = {
  "global": {
    temperature: { value: "15.6°C", trend: 0.8 },
    airQuality: { value: "Good", aqi: 42, trend: -3 },
    forestCoverage: { value: "31.2%", trend: -1.2 },
    oceanHealth: { value: "72%", trend: -0.5 },
    healthIndex: [
      { date: "2018", value: 78 },
      { date: "2019", value: 76 },
      { date: "2020", value: 74 },
      { date: "2021", value: 73 },
      { date: "2022", value: 72 },
      { date: "2023", value: 71 },
      { date: "2024", value: 72 },
    ],
    biodiversity: {
      mammals: "5,701",
      birds: "10,932",
      fish: "33,600",
      endangered: "41,415",
      mammalsTrend: -0.8,
      birdsTrend: -0.5,
      fishTrend: -1.2,
      endangeredTrend: 2.1
    }
  },
  "north-america": {
    temperature: { value: "12.8°C", trend: 1.2 },
    airQuality: { value: "Good", aqi: 35, trend: -5 },
    forestCoverage: { value: "36.7%", trend: -0.9 },
    oceanHealth: { value: "75%", trend: -0.3 },
    healthIndex: [
      { date: "2018", value: 81 },
      { date: "2019", value: 80 },
      { date: "2020", value: 79 },
      { date: "2021", value: 78 },
      { date: "2022", value: 77 },
      { date: "2023", value: 76 },
      { date: "2024", value: 75 },
    ],
    biodiversity: {
      mammals: "965",
      birds: "2,059",
      fish: "4,200",
      endangered: "1,662",
      mammalsTrend: -0.5,
      birdsTrend: -0.3,
      fishTrend: -0.8,
      endangeredTrend: 1.5
    }
  },
  "south-america": {
    temperature: { value: "17.3°C", trend: 0.7 },
    airQuality: { value: "Moderate", aqi: 65, trend: 2 },
    forestCoverage: { value: "47.2%", trend: -2.1 },
    oceanHealth: { value: "76%", trend: -0.7 },
    healthIndex: [
      { date: "2018", value: 80 },
      { date: "2019", value: 79 },
      { date: "2020", value: 77 },
      { date: "2021", value: 75 },
      { date: "2022", value: 73 },
      { date: "2023", value: 72 },
      { date: "2024", value: 70 },
    ],
    biodiversity: {
      mammals: "1,385",
      birds: "3,751",
      fish: "9,100",
      endangered: "5,245",
      mammalsTrend: -1.2,
      birdsTrend: -0.8,
      fishTrend: -2.0,
      endangeredTrend: 3.2
    }
  },
  "europe": {
    temperature: { value: "10.9°C", trend: 1.0 },
    airQuality: { value: "Good", aqi: 39, trend: -6 },
    forestCoverage: { value: "45.3%", trend: 0.5 },
    oceanHealth: { value: "78%", trend: -0.2 },
    healthIndex: [
      { date: "2018", value: 83 },
      { date: "2019", value: 82 },
      { date: "2020", value: 82 },
      { date: "2021", value: 81 },
      { date: "2022", value: 80 },
      { date: "2023", value: 79 },
      { date: "2024", value: 78 },
    ],
    biodiversity: {
      mammals: "912",
      birds: "1,154",
      fish: "2,800",
      endangered: "1,211",
      mammalsTrend: -0.4,
      birdsTrend: -0.2,
      fishTrend: -0.6,
      endangeredTrend: 1.2
    }
  },
  "asia": {
    temperature: { value: "16.8°C", trend: 1.3 },
    airQuality: { value: "Unhealthy", aqi: 128, trend: 7 },
    forestCoverage: { value: "28.1%", trend: -1.5 },
    oceanHealth: { value: "68%", trend: -0.9 },
    healthIndex: [
      { date: "2018", value: 70 },
      { date: "2019", value: 69 },
      { date: "2020", value: 68 },
      { date: "2021", value: 66 },
      { date: "2022", value: 65 },
      { date: "2023", value: 64 },
      { date: "2024", value: 62 },
    ],
    biodiversity: {
      mammals: "1,873",
      birds: "2,894",
      fish: "11,300",
      endangered: "19,513",
      mammalsTrend: -1.3,
      birdsTrend: -0.9,
      fishTrend: -1.8,
      endangeredTrend: 3.4
    }
  },
  "africa": {
    temperature: { value: "24.2°C", trend: 0.9 },
    airQuality: { value: "Moderate", aqi: 72, trend: 2 },
    forestCoverage: { value: "21.4%", trend: -2.2 },
    oceanHealth: { value: "71%", trend: -0.6 },
    healthIndex: [
      { date: "2018", value: 75 },
      { date: "2019", value: 73 },
      { date: "2020", value: 71 },
      { date: "2021", value: 69 },
      { date: "2022", value: 68 },
      { date: "2023", value: 66 },
      { date: "2024", value: 64 },
    ],
    biodiversity: {
      mammals: "1,437",
      birds: "2,355",
      fish: "3,500",
      endangered: "8,126",
      mammalsTrend: -1.6,
      birdsTrend: -1.0,
      fishTrend: -1.5,
      endangeredTrend: 2.8
    }
  },
  "oceania": {
    temperature: { value: "14.2°C", trend: 0.5 },
    airQuality: { value: "Good", aqi: 32, trend: -4 },
    forestCoverage: { value: "17.3%", trend: -0.4 },
    oceanHealth: { value: "83%", trend: -0.1 },
    healthIndex: [
      { date: "2018", value: 85 },
      { date: "2019", value: 84 },
      { date: "2020", value: 84 },
      { date: "2021", value: 84 },
      { date: "2022", value: 83 },
      { date: "2023", value: 83 },
      { date: "2024", value: 82 },
    ],
    biodiversity: {
      mammals: "416",
      birds: "1,237",
      fish: "4,100",
      endangered: "1,843",
      mammalsTrend: -0.3,
      birdsTrend: -0.2,
      fishTrend: -0.4,
      endangeredTrend: 0.9
    }
  }
};

const Index = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedRegion, setSelectedRegion] = useState<string>("global");
  const [currentRegionData, setCurrentRegionData] = useState(regionData.global);
  
  useEffect(() => {
    // Update current region data when region changes
    setCurrentRegionData(regionData[selectedRegion as keyof typeof regionData]);
    
    // Show toast notification when region changes
    if (selectedRegion !== "global") {
      const regionName = selectedRegion.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      toast({
        title: `Region: ${regionName}`,
        description: "Dashboard data updated for selected region",
        duration: 2000,
      });
    }
  }, [selectedRegion]);
  
  const handleTimelineChange = (year: number) => {
    setSelectedYear(year);
    console.log(`Year changed to ${year}`);
  };
  
  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    console.log(`Region changed to ${region}`);
  };
  
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Planetary Health Dashboard</h1>
        <div className="flex gap-4 items-center">
          <span className="text-sm text-muted-foreground">Data for: {selectedYear}</span>
          <RegionSelector onRegionChange={handleRegionChange} selectedRegion={selectedRegion} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Temperature"
          value={currentRegionData.temperature.value}
          icon={<Thermometer className="h-4 w-4" />}
          description="Average temperature"
          trend={currentRegionData.temperature.trend}
          color="bg-red-500"
        />
        <MetricsCard
          title="Air Quality"
          value={currentRegionData.airQuality.value}
          icon={<Wind className="h-4 w-4" />}
          description={`Current AQI: ${currentRegionData.airQuality.aqi}`}
          trend={currentRegionData.airQuality.trend}
          color="bg-blue-500"
        />
        <MetricsCard
          title="Forest Coverage"
          value={currentRegionData.forestCoverage.value}
          icon={<TreePine className="h-4 w-4" />}
          description="Forest area"
          trend={currentRegionData.forestCoverage.trend}
          color="bg-green-500"
        />
        <MetricsCard
          title="Ocean Health"
          value={currentRegionData.oceanHealth.value}
          icon={<Droplet className="h-4 w-4" />}
          description="Marine ecosystem health index"
          trend={currentRegionData.oceanHealth.trend}
          color="bg-blue-700"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <TimelineSelector minYear={1980} maxYear={2024} onChange={handleTimelineChange} />
        </div>
        <div className="md:col-span-1 flex justify-end items-center">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-xs">Critical</span>
            <div className="h-3 w-3 rounded-full bg-yellow-500 ml-2"></div>
            <span className="text-xs">Warning</span>
            <div className="h-3 w-3 rounded-full bg-green-500 ml-2"></div>
            <span className="text-xs">Stable</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="map" className="space-y-4">
        <TabsList className="grid grid-cols-5 md:w-[600px]">
          <TabsTrigger value="map">Interactive Map</TabsTrigger>
          <TabsTrigger value="climate">Climate</TabsTrigger>
          <TabsTrigger value="forests">Forests</TabsTrigger>
          <TabsTrigger value="oceans">Oceans</TabsTrigger>
          <TabsTrigger value="biodiversity">Biodiversity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="map" className="space-y-4">
          <Map region={selectedRegion} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlobalEvents region={selectedRegion} />
            <HealthIndexChart 
              title="Planet Health Index" 
              current={parseInt(currentRegionData.healthIndex[6].value.toString())} 
              change={parseInt(currentRegionData.healthIndex[5].value.toString()) - parseInt(currentRegionData.healthIndex[6].value.toString())} 
              data={currentRegionData.healthIndex}
              color="#22c55e"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="climate">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Temperature Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <TemperatureChart region={selectedRegion} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Climate Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <AirQualityGauge aqi={currentRegionData.airQuality.aqi} location={selectedRegion === "global" ? "Global Average" : selectedRegion.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="forests">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Deforestation Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <HealthIndexChart 
                    title="Deforestation Index" 
                    current={parseInt(currentRegionData.forestCoverage.value)} 
                    change={currentRegionData.forestCoverage.trend} 
                    data={[
                      { date: "2018", value: parseInt(currentRegionData.forestCoverage.value) + 4 },
                      { date: "2019", value: parseInt(currentRegionData.forestCoverage.value) + 3 },
                      { date: "2020", value: parseInt(currentRegionData.forestCoverage.value) + 2 },
                      { date: "2021", value: parseInt(currentRegionData.forestCoverage.value) + 1.5 },
                      { date: "2022", value: parseInt(currentRegionData.forestCoverage.value) + 1 },
                      { date: "2023", value: parseInt(currentRegionData.forestCoverage.value) + 0.5 },
                      { date: "2024", value: parseInt(currentRegionData.forestCoverage.value) },
                    ]}
                    color="#22c55e"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Forest Coverage by Region</CardTitle>
              </CardHeader>
              <CardContent>
                <ForestChart region={selectedRegion} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="oceans">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Marine Biodiversity Index</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <HealthIndexChart 
                    title="Marine Health" 
                    current={parseInt(currentRegionData.oceanHealth.value)} 
                    change={currentRegionData.oceanHealth.trend} 
                    data={[
                      { date: "2018", value: parseInt(currentRegionData.oceanHealth.value) + 6 },
                      { date: "2019", value: parseInt(currentRegionData.oceanHealth.value) + 5 },
                      { date: "2020", value: parseInt(currentRegionData.oceanHealth.value) + 4 },
                      { date: "2021", value: parseInt(currentRegionData.oceanHealth.value) + 3 },
                      { date: "2022", value: parseInt(currentRegionData.oceanHealth.value) + 2 },
                      { date: "2023", value: parseInt(currentRegionData.oceanHealth.value) + 1 },
                      { date: "2024", value: parseInt(currentRegionData.oceanHealth.value) },
                    ]}
                    color="#0284c7"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Ocean Health Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <OceanChart region={selectedRegion} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="biodiversity">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Biodiversity Loss</CardTitle>
              </CardHeader>
              <CardContent>
                <BiodiversityChart region={selectedRegion} />
              </CardContent>
            </Card>
            <div className="col-span-3 grid gap-4">
              <MetricsCard
                title="Mammal Species"
                value={currentRegionData.biodiversity.mammals}
                icon={<Heart className="h-4 w-4" />}
                description="Total known species"
                trend={currentRegionData.biodiversity.mammalsTrend}
                color="bg-orange-500"
              />
              <MetricsCard
                title="Bird Species"
                value={currentRegionData.biodiversity.birds}
                icon={<Wind className="h-4 w-4" />}
                description="Total known species"
                trend={currentRegionData.biodiversity.birdsTrend}
                color="bg-blue-500"
              />
              <MetricsCard
                title="Fish Species"
                value={currentRegionData.biodiversity.fish}
                icon={<Fish className="h-4 w-4" />}
                description="Total known species"
                trend={currentRegionData.biodiversity.fishTrend}
                color="bg-blue-700"
              />
              <MetricsCard
                title="Endangered Species"
                value={currentRegionData.biodiversity.endangered}
                icon={<AlertCircle className="h-4 w-4" />}
                description="IUCN Red List"
                trend={currentRegionData.biodiversity.endangeredTrend}
                color="bg-red-500"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
