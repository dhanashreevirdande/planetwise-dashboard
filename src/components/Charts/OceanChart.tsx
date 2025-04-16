
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { year: '2018', health: 78, biodiversity: 82 },
  { year: '2019', health: 76, biodiversity: 79 },
  { year: '2020', health: 74, biodiversity: 77 },
  { year: '2021', health: 73, biodiversity: 75 },
  { year: '2022', health: 72, biodiversity: 73 },
  { year: '2023', health: 71, biodiversity: 72 },
  { year: '2024', health: 72, biodiversity: 72 },
];

const OceanChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ocean Health & Biodiversity Index</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="health" 
                stackId="1"
                stroke="#0EA5E9" 
                fill="#0EA5E9" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="biodiversity" 
                stackId="2"
                stroke="#22C55E" 
                fill="#22C55E" 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default OceanChart;
