
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

// Regional ocean health data
const oceanData = {
  'global': [
    { year: '2018', health: 78, biodiversity: 82 },
    { year: '2019', health: 76, biodiversity: 79 },
    { year: '2020', health: 74, biodiversity: 77 },
    { year: '2021', health: 73, biodiversity: 75 },
    { year: '2022', health: 72, biodiversity: 73 },
    { year: '2023', health: 71, biodiversity: 72 },
    { year: '2024', health: 72, biodiversity: 72 },
  ],
  'north-america': [
    { year: '2018', health: 81, biodiversity: 83 },
    { year: '2019', health: 80, biodiversity: 82 },
    { year: '2020', health: 79, biodiversity: 81 },
    { year: '2021', health: 78, biodiversity: 80 },
    { year: '2022', health: 77, biodiversity: 78 },
    { year: '2023', health: 76, biodiversity: 77 },
    { year: '2024', health: 75, biodiversity: 76 },
  ],
  'south-america': [
    { year: '2018', health: 80, biodiversity: 85 },
    { year: '2019', health: 78, biodiversity: 83 },
    { year: '2020', health: 76, biodiversity: 80 },
    { year: '2021', health: 74, biodiversity: 78 },
    { year: '2022', health: 72, biodiversity: 75 },
    { year: '2023', health: 71, biodiversity: 73 },
    { year: '2024', health: 70, biodiversity: 71 },
  ],
  'europe': [
    { year: '2018', health: 83, biodiversity: 84 },
    { year: '2019', health: 82, biodiversity: 83 },
    { year: '2020', health: 82, biodiversity: 82 },
    { year: '2021', health: 81, biodiversity: 81 },
    { year: '2022', health: 80, biodiversity: 80 },
    { year: '2023', health: 79, biodiversity: 79 },
    { year: '2024', health: 78, biodiversity: 78 },
  ],
  'asia': [
    { year: '2018', health: 70, biodiversity: 75 },
    { year: '2019', health: 69, biodiversity: 73 },
    { year: '2020', health: 67, biodiversity: 70 },
    { year: '2021', health: 66, biodiversity: 68 },
    { year: '2022', health: 64, biodiversity: 66 },
    { year: '2023', health: 63, biodiversity: 65 },
    { year: '2024', health: 62, biodiversity: 64 },
  ],
  'africa': [
    { year: '2018', health: 75, biodiversity: 78 },
    { year: '2019', health: 73, biodiversity: 76 },
    { year: '2020', health: 71, biodiversity: 74 },
    { year: '2021', health: 69, biodiversity: 72 },
    { year: '2022', health: 68, biodiversity: 70 },
    { year: '2023', health: 66, biodiversity: 68 },
    { year: '2024', health: 64, biodiversity: 66 },
  ],
  'oceania': [
    { year: '2018', health: 85, biodiversity: 87 },
    { year: '2019', health: 84, biodiversity: 86 },
    { year: '2020', health: 84, biodiversity: 85 },
    { year: '2021', health: 83, biodiversity: 84 },
    { year: '2022', health: 83, biodiversity: 83 },
    { year: '2023', health: 82, biodiversity: 82 },
    { year: '2024', health: 82, biodiversity: 81 },
  ],
};

interface OceanChartProps {
  region?: string;
}

const OceanChart = ({ region = 'global' }: OceanChartProps) => {
  const [chartData, setChartData] = useState(oceanData.global);

  useEffect(() => {
    const data = oceanData[region as keyof typeof oceanData] || oceanData.global;
    setChartData(data);
  }, [region]);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis domain={[50, 100]} />
          <Tooltip formatter={(value) => [`${value}%`, '']} />
          <Area 
            type="monotone" 
            dataKey="health" 
            stackId="1"
            stroke="#0EA5E9" 
            fill="#0EA5E9" 
            fillOpacity={0.6}
            name="Ocean Health"
          />
          <Area 
            type="monotone" 
            dataKey="biodiversity" 
            stackId="2"
            stroke="#22C55E" 
            fill="#22C55E" 
            fillOpacity={0.6}
            name="Marine Biodiversity"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OceanChart;
