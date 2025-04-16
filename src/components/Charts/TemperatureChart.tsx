
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

// Regional temperature data
const temperatureData = {
  'global': [
    { month: 'Jan', temperature: 13.2 },
    { month: 'Feb', temperature: 13.8 },
    { month: 'Mar', temperature: 14.3 },
    { month: 'Apr', temperature: 15.1 },
    { month: 'May', temperature: 15.8 },
    { month: 'Jun', temperature: 16.2 },
    { month: 'Jul', temperature: 16.9 },
    { month: 'Aug', temperature: 16.5 },
    { month: 'Sep', temperature: 15.9 },
    { month: 'Oct', temperature: 15.2 },
    { month: 'Nov', temperature: 14.5 },
    { month: 'Dec', temperature: 13.9 },
  ],
  'north-america': [
    { month: 'Jan', temperature: 5.3 },
    { month: 'Feb', temperature: 6.1 },
    { month: 'Mar', temperature: 8.3 },
    { month: 'Apr', temperature: 11.5 },
    { month: 'May', temperature: 15.7 },
    { month: 'Jun', temperature: 19.4 },
    { month: 'Jul', temperature: 22.1 },
    { month: 'Aug', temperature: 21.6 },
    { month: 'Sep', temperature: 18.3 },
    { month: 'Oct', temperature: 13.6 },
    { month: 'Nov', temperature: 9.2 },
    { month: 'Dec', temperature: 6.4 },
  ],
  'south-america': [
    { month: 'Jan', temperature: 22.5 },
    { month: 'Feb', temperature: 22.7 },
    { month: 'Mar', temperature: 21.9 },
    { month: 'Apr', temperature: 20.2 },
    { month: 'May', temperature: 18.1 },
    { month: 'Jun', temperature: 16.5 },
    { month: 'Jul', temperature: 16.2 },
    { month: 'Aug', temperature: 17.3 },
    { month: 'Sep', temperature: 18.5 },
    { month: 'Oct', temperature: 19.8 },
    { month: 'Nov', temperature: 21.1 },
    { month: 'Dec', temperature: 22.2 },
  ],
  'europe': [
    { month: 'Jan', temperature: 1.2 },
    { month: 'Feb', temperature: 2.1 },
    { month: 'Mar', temperature: 5.4 },
    { month: 'Apr', temperature: 9.8 },
    { month: 'May', temperature: 14.2 },
    { month: 'Jun', temperature: 18.1 },
    { month: 'Jul', temperature: 20.3 },
    { month: 'Aug', temperature: 19.7 },
    { month: 'Sep', temperature: 15.8 },
    { month: 'Oct', temperature: 10.6 },
    { month: 'Nov', temperature: 5.9 },
    { month: 'Dec', temperature: 2.4 },
  ],
  'asia': [
    { month: 'Jan', temperature: 9.3 },
    { month: 'Feb', temperature: 10.8 },
    { month: 'Mar', temperature: 14.6 },
    { month: 'Apr', temperature: 19.2 },
    { month: 'May', temperature: 23.8 },
    { month: 'Jun', temperature: 26.7 },
    { month: 'Jul', temperature: 27.9 },
    { month: 'Aug', temperature: 27.2 },
    { month: 'Sep', temperature: 24.5 },
    { month: 'Oct', temperature: 19.8 },
    { month: 'Nov', temperature: 14.6 },
    { month: 'Dec', temperature: 10.5 },
  ],
  'africa': [
    { month: 'Jan', temperature: 24.2 },
    { month: 'Feb', temperature: 24.9 },
    { month: 'Mar', temperature: 25.1 },
    { month: 'Apr', temperature: 24.8 },
    { month: 'May', temperature: 23.7 },
    { month: 'Jun', temperature: 22.3 },
    { month: 'Jul', temperature: 21.8 },
    { month: 'Aug', temperature: 22.6 },
    { month: 'Sep', temperature: 24.0 },
    { month: 'Oct', temperature: 24.9 },
    { month: 'Nov', temperature: 24.7 },
    { month: 'Dec', temperature: 24.3 },
  ],
  'oceania': [
    { month: 'Jan', temperature: 22.8 },
    { month: 'Feb', temperature: 22.5 },
    { month: 'Mar', temperature: 21.3 },
    { month: 'Apr', temperature: 18.7 },
    { month: 'May', temperature: 15.9 },
    { month: 'Jun', temperature: 13.8 },
    { month: 'Jul', temperature: 13.2 },
    { month: 'Aug', temperature: 14.1 },
    { month: 'Sep', temperature: 15.9 },
    { month: 'Oct', temperature: 17.8 },
    { month: 'Nov', temperature: 19.6 },
    { month: 'Dec', temperature: 21.5 },
  ],
};

interface TemperatureChartProps {
  region?: string;
}

const TemperatureChart = ({ region = 'global' }: TemperatureChartProps) => {
  const [chartData, setChartData] = useState(temperatureData.global);

  useEffect(() => {
    const data = temperatureData[region as keyof typeof temperatureData] || temperatureData.global;
    setChartData(data);
  }, [region]);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 'auto']} />
          <Tooltip formatter={(value) => [`${value}°C`, 'Temperature']} />
          <Line 
            type="monotone" 
            dataKey="temperature" 
            stroke="#0EA5E9" 
            strokeWidth={2}
            dot={{ fill: '#0EA5E9' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
