import React, { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleCheck, AlertCircle, CircleX } from "lucide-react";

const Index = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedRegion, setSelectedRegion] = useState<string>("global");
  const [currentRegionData, setCurrentRegionData] = useState(regionData.global);
  
  useEffect(() => {
    setCurrentRegionData(regionData[selectedRegion as keyof typeof regionData]);
    
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
  
  const StatusDots = () => (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center gap-1">
              <CircleCheck className="h-4 w-4 text-green-500" />
              <span className="text-xs">Stable</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Indicators are within expected, healthy ranges</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <span className="text-xs">Warning</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Potential risks or declining trends detected</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center gap-1">
              <CircleX className="h-4 w-4 text-red-500" />
              <span className="text-xs">Critical</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Urgent environmental concerns requiring immediate action</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

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
          <StatusDots />
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
