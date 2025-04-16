
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { region: 'N. America', coverage: 36.7 },
  { region: 'S. America', coverage: 47.2 },
  { region: 'Europe', coverage: 45.3 },
  { region: 'Asia', coverage: 28.1 },
  { region: 'Africa', coverage: 21.4 },
  { region: 'Oceania', coverage: 17.3 },
];

const ForestChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Forest Coverage by Region</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="coverage" fill="#22C55E" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForestChart;
