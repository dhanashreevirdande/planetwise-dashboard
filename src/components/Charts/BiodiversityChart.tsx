
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { year: '1970', mammals: 100, birds: 100, fish: 100, amphibians: 100 },
  { year: '1980', mammals: 95, birds: 96, fish: 90, amphibians: 92 },
  { year: '1990', mammals: 85, birds: 86, fish: 75, amphibians: 81 },
  { year: '2000', mammals: 77, birds: 78, fish: 65, amphibians: 70 },
  { year: '2010', mammals: 70, birds: 72, fish: 58, amphibians: 62 },
  { year: '2020', mammals: 65, birds: 68, fish: 52, amphibians: 56 },
  { year: '2024', mammals: 60, birds: 65, fish: 48, amphibians: 50 },
];

const BiodiversityChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Global Biodiversity Index (1970 = 100%)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                formatter={(value) => [`${value}%`, '']}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="mammals" 
                stroke="#FF7F0E" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="birds" 
                stroke="#1F77B4" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="fish" 
                stroke="#2CA02C" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="amphibians" 
                stroke="#D62728" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BiodiversityChart;
