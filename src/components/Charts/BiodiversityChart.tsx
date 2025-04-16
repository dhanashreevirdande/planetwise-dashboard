
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

// Regional biodiversity data
const biodiversityData = {
  'global': [
    { year: '1970', mammals: 100, birds: 100, fish: 100, amphibians: 100 },
    { year: '1980', mammals: 95, birds: 96, fish: 90, amphibians: 92 },
    { year: '1990', mammals: 85, birds: 86, fish: 75, amphibians: 81 },
    { year: '2000', mammals: 77, birds: 78, fish: 65, amphibians: 70 },
    { year: '2010', mammals: 70, birds: 72, fish: 58, amphibians: 62 },
    { year: '2020', mammals: 65, birds: 68, fish: 52, amphibians: 56 },
    { year: '2024', mammals: 60, birds: 65, fish: 48, amphibians: 50 },
  ],
  'north-america': [
    { year: '1970', mammals: 100, birds: 100, fish: 100, amphibians: 100 },
    { year: '1980', mammals: 97, birds: 98, fish: 95, amphibians: 96 },
    { year: '1990', mammals: 90, birds: 92, fish: 87, amphibians: 89 },
    { year: '2000', mammals: 85, birds: 87, fish: 80, amphibians: 83 },
    { year: '2010', mammals: 80, birds: 83, fish: 75, amphibians: 78 },
    { year: '2020', mammals: 75, birds: 80, fish: 70, amphibians: 74 },
    { year: '2024', mammals: 72, birds: 78, fish: 67, amphibians: 71 },
  ],
  'south-america': [
    { year: '1970', mammals: 100, birds: 100, fish: 100, amphibians: 100 },
    { year: '1980', mammals: 92, birds: 94, fish: 88, amphibians: 90 },
    { year: '1990', mammals: 80, birds: 82, fish: 70, amphibians: 77 },
    { year: '2000', mammals: 70, birds: 73, fish: 58, amphibians: 65 },
    { year: '2010', mammals: 62, birds: 65, fish: 50, amphibians: 55 },
    { year: '2020', mammals: 55, birds: 60, fish: 45, amphibians: 48 },
    { year: '2024', mammals: 52, birds: 58, fish: 42, amphibians: 45 },
  ],
  'europe': [
    { year: '1970', mammals: 100, birds: 100, fish: 100, amphibians: 100 },
    { year: '1980', mammals: 96, birds: 97, fish: 94, amphibians: 95 },
    { year: '1990', mammals: 90, birds: 92, fish: 85, amphibians: 88 },
    { year: '2000', mammals: 86, birds: 88, fish: 80, amphibians: 82 },
    { year: '2010', mammals: 83, birds: 85, fish: 76, amphibians: 78 },
    { year: '2020', mammals: 80, birds: 83, fish: 73, amphibians: 75 },
    { year: '2024', mammals: 78, birds: 81, fish: 70, amphibians: 73 },
  ],
  'asia': [
    { year: '1970', mammals: 100, birds: 100, fish: 100, amphibians: 100 },
    { year: '1980', mammals: 92, birds: 94, fish: 85, amphibians: 88 },
    { year: '1990', mammals: 80, birds: 82, fish: 68, amphibians: 75 },
    { year: '2000', mammals: 70, birds: 72, fish: 55, amphibians: 63 },
    { year: '2010', mammals: 62, birds: 65, fish: 45, amphibians: 52 },
    { year: '2020', mammals: 55, birds: 58, fish: 38, amphibians: 44 },
    { year: '2024', mammals: 50, birds: 54, fish: 35, amphibians: 40 },
  ],
  'africa': [
    { year: '1970', mammals: 100, birds: 100, fish: 100, amphibians: 100 },
    { year: '1980', mammals: 93, birds: 95, fish: 88, amphibians: 90 },
    { year: '1990', mammals: 82, birds: 85, fish: 72, amphibians: 78 },
    { year: '2000', mammals: 72, birds: 75, fish: 60, amphibians: 67 },
    { year: '2010', mammals: 63, birds: 66, fish: 50, amphibians: 57 },
    { year: '2020', mammals: 55, birds: 60, fish: 42, amphibians: 48 },
    { year: '2024', mammals: 50, birds: 56, fish: 38, amphibians: 43 },
  ],
  'oceania': [
    { year: '1970', mammals: 100, birds: 100, fish: 100, amphibians: 100 },
    { year: '1980', mammals: 97, birds: 98, fish: 94, amphibians: 96 },
    { year: '1990', mammals: 92, birds: 94, fish: 88, amphibians: 90 },
    { year: '2000', mammals: 88, birds: 90, fish: 84, amphibians: 86 },
    { year: '2010', mammals: 85, birds: 87, fish: 80, amphibians: 82 },
    { year: '2020', mammals: 82, birds: 85, fish: 78, amphibians: 80 },
    { year: '2024', mammals: 80, birds: 83, fish: 75, amphibians: 78 },
  ],
};

interface BiodiversityChartProps {
  region?: string;
}

const BiodiversityChart = ({ region = 'global' }: BiodiversityChartProps) => {
  const [chartData, setChartData] = useState(biodiversityData.global);

  useEffect(() => {
    const data = biodiversityData[region as keyof typeof biodiversityData] || biodiversityData.global;
    setChartData(data);
  }, [region]);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
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
            name="Mammals"
          />
          <Line 
            type="monotone" 
            dataKey="birds" 
            stroke="#1F77B4" 
            strokeWidth={2}
            activeDot={{ r: 8 }}
            name="Birds"
          />
          <Line 
            type="monotone" 
            dataKey="fish" 
            stroke="#2CA02C" 
            strokeWidth={2}
            activeDot={{ r: 8 }}
            name="Fish"
          />
          <Line 
            type="monotone" 
            dataKey="amphibians" 
            stroke="#D62728" 
            strokeWidth={2}
            activeDot={{ r: 8 }}
            name="Amphibians"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BiodiversityChart;
