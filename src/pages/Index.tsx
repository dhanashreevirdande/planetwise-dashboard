
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Map from "@/components/Map";
import MetricsCard from "@/components/MetricsCard";
import RegionSelector from "@/components/RegionSelector";
import TemperatureChart from "@/components/Charts/TemperatureChart";
import ForestChart from "@/components/Charts/ForestChart";
import { Thermometer, Wind, TreePine, Droplet } from "lucide-react";
import OceanChart from "@/components/Charts/OceanChart";
import AirQualityGauge from "@/components/AirQualityGauge";

const Index = () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Planetary Health Dashboard</h1>
        <RegionSelector onRegionChange={(region) => console.log(region)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Temperature"
          value="15.6°C"
          icon={<Thermometer className="h-4 w-4 text-muted-foreground" />}
          description="Global average temperature"
        />
        <MetricsCard
          title="Air Quality"
          value="Good"
          icon={<Wind className="h-4 w-4 text-muted-foreground" />}
          description="Current AQI: 42"
        />
        <MetricsCard
          title="Forest Coverage"
          value="31.2%"
          icon={<TreePine className="h-4 w-4 text-muted-foreground" />}
          description="Global forest area"
        />
        <MetricsCard
          title="Ocean Health"
          value="72%"
          icon={<Droplet className="h-4 w-4 text-muted-foreground" />}
          description="Marine ecosystem health index"
        />
      </div>

      <Tabs defaultValue="map" className="space-y-4">
        <TabsList>
          <TabsTrigger value="map">Interactive Map</TabsTrigger>
          <TabsTrigger value="climate">Climate</TabsTrigger>
          <TabsTrigger value="forests">Forests</TabsTrigger>
          <TabsTrigger value="oceans">Oceans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="map" className="space-y-4">
          <Map />
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
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Deforestation chart will be added here
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
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Marine biodiversity chart will be added here
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
      </Tabs>
    </div>
  );
};

export default Index;
