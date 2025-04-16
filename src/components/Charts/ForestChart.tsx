
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from 'react';

// Regional data for forest coverage
const forestData = {
  'global': [
    { region: 'N. America', coverage: 36.7 },
    { region: 'S. America', coverage: 47.2 },
    { region: 'Europe', coverage: 45.3 },
    { region: 'Asia', coverage: 28.1 },
    { region: 'Africa', coverage: 21.4 },
    { region: 'Oceania', coverage: 17.3 },
  ],
  'north-america': [
    { region: 'Canada', coverage: 38.2 },
    { region: 'USA', coverage: 33.9 },
    { region: 'Mexico', coverage: 33.6 },
    { region: 'C. America', coverage: 41.2 },
  ],
  'south-america': [
    { region: 'Brazil', coverage: 59.1 },
    { region: 'Peru', coverage: 57.8 },
    { region: 'Colombia', coverage: 52.7 },
    { region: 'Venezuela', coverage: 51.9 },
    { region: 'Bolivia', coverage: 50.6 },
  ],
  'europe': [
    { region: 'Finland', coverage: 73.1 },
    { region: 'Sweden', coverage: 68.7 },
    { region: 'Slovenia', coverage: 62.3 },
    { region: 'Latvia', coverage: 54.0 },
    { region: 'Estonia', coverage: 51.3 },
  ],
  'asia': [
    { region: 'Russia', coverage: 49.4 },
    { region: 'Japan', coverage: 68.5 },
    { region: 'China', coverage: 22.3 },
    { region: 'India', coverage: 21.7 },
    { region: 'SE Asia', coverage: 43.8 },
  ],
  'africa': [
    { region: 'Congo', coverage: 67.9 },
    { region: 'Gabon', coverage: 89.3 },
    { region: 'Zambia', coverage: 65.4 },
    { region: 'Tanzania', coverage: 52.0 },
    { region: 'N. Africa', coverage: 8.2 },
  ],
  'oceania': [
    { region: 'PNG', coverage: 74.1 },
    { region: 'New Zealand', coverage: 37.6 },
    { region: 'Australia', coverage: 16.2 },
    { region: 'Pacific Is.', coverage: 35.8 },
  ],
};

interface ForestChartProps {
  region?: string;
}

const ForestChart = ({ region = 'global' }: ForestChartProps) => {
  const [chartData, setChartData] = useState(forestData.global);

  useEffect(() => {
    const data = forestData[region as keyof typeof forestData] || forestData.global;
    setChartData(data);
  }, [region]);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(value) => [`${value}%`, 'Coverage']} />
          <Bar dataKey="coverage" fill="#22C55E" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForestChart;
