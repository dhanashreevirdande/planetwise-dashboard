
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
import { useState } from "react";

const healthIndexData = [
  { date: "2018", value: 78 },
  { date: "2019", value: 76 },
  { date: "2020", value: 74 },
  { date: "2021", value: 73 },
  { date: "2022", value: 72 },
  { date: "2023", value: 71 },
  { date: "2024", value: 72 },
];

const Index = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  
  const handleTimelineChange = (year: number) => {
    setSelectedYear(year);
    console.log(`Year changed to ${year}`);
  };
  
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Planetary Health Dashboard</h1>
        <div className="flex gap-4 items-center">
          <span className="text-sm text-muted-foreground">Data for: {selectedYear}</span>
          <RegionSelector onRegionChange={(region) => console.log(region)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Temperature"
          value="15.6°C"
          icon={<Thermometer className="h-4 w-4" />}
          description="Global average temperature"
          trend={0.8}
          color="bg-red-500"
        />
        <MetricsCard
          title="Air Quality"
          value="Good"
          icon={<Wind className="h-4 w-4" />}
          description="Current AQI: 42"
          trend={-3}
          color="bg-blue-500"
        />
        <MetricsCard
          title="Forest Coverage"
          value="31.2%"
          icon={<TreePine className="h-4 w-4" />}
          description="Global forest area"
          trend={-1.2}
          color="bg-green-500"
        />
        <MetricsCard
          title="Ocean Health"
          value="72%"
          icon={<Droplet className="h-4 w-4" />}
          description="Marine ecosystem health index"
          trend={-0.5}
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
          <Map />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlobalEvents />
            <HealthIndexChart 
              title="Planet Health Index" 
              current={72} 
              change={-0.5} 
              data={healthIndexData}
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
                <TemperatureChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Climate Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <AirQualityGauge aqi={42} location="Global Average" />
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
                    current={31} 
                    change={-1.2} 
                    data={[
                      { date: "2018", value: 35 },
                      { date: "2019", value: 34 },
                      { date: "2020", value: 33 },
                      { date: "2021", value: 32.5 },
                      { date: "2022", value: 32 },
                      { date: "2023", value: 31.5 },
                      { date: "2024", value: 31 },
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
                <ForestChart />
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
                    current={72} 
                    change={-0.5} 
                    data={[
                      { date: "2018", value: 78 },
                      { date: "2019", value: 76 },
                      { date: "2020", value: 75 },
                      { date: "2021", value: 74 },
                      { date: "2022", value: 73 },
                      { date: "2023", value: 72.5 },
                      { date: "2024", value: 72 },
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
                <OceanChart />
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
                <BiodiversityChart />
              </CardContent>
            </Card>
            <div className="col-span-3 grid gap-4">
              <MetricsCard
                title="Mammal Species"
                value="5,701"
                icon={<Heart className="h-4 w-4" />}
                description="Total known species"
                trend={-0.8}
                color="bg-orange-500"
              />
              <MetricsCard
                title="Bird Species"
                value="10,932"
                icon={<Wind className="h-4 w-4" />}
                description="Total known species"
                trend={-0.5}
                color="bg-blue-500"
              />
              <MetricsCard
                title="Fish Species"
                value="33,600"
                icon={<Fish className="h-4 w-4" />}
                description="Total known species"
                trend={-1.2}
                color="bg-blue-700"
              />
              <MetricsCard
                title="Endangered Species"
                value="41,415"
                icon={<AlertCircle className="h-4 w-4" />}
                description="IUCN Red List"
                trend={2.1}
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
