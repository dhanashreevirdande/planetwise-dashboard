
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
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
];

const TemperatureChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Global Temperature Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
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
      </CardContent>
    </Card>
  );
};

export default TemperatureChart;
