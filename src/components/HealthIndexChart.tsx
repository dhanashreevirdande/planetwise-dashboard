
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Info } from "lucide-react";
import { useState } from "react";

interface HealthIndexProps {
  title: string;
  current: number;
  change: number;
  data: Array<{ date: string; value: number }>;
  color?: string;
}

const HealthIndexChart = ({ 
  title, 
  current, 
  change, 
  data,
  color = "#0EA5E9" 
}: HealthIndexProps) => {
  const isPositive = change >= 0;
  const [showInfo, setShowInfo] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{title}</CardTitle>
        <div 
          className="cursor-help relative" 
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          <Info className="h-5 w-5 text-muted-foreground" />
          {showInfo && (
            <div className="absolute right-0 top-6 bg-card z-50 p-3 rounded-md shadow-lg text-sm w-64">
              This index measures the overall health status based on multiple environmental indicators. 
              Data is collected from global monitoring stations and satellites.
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline mb-4">
          <div className="text-2xl font-bold">{current}%</div>
          <div className={`ml-2 text-sm ${isPositive ? 'text-red-500' : 'text-green-500'}`}>
            {isPositive ? '+' : ''}{change}% from last year
          </div>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id={`colorGradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" opacity={0.1} />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} domain={[0, 'dataMax + 10']} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '4px',
                  fontSize: '12px'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                fillOpacity={1}
                fill={`url(#colorGradient-${title})`} 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthIndexChart;
