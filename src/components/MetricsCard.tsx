
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface MetricsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  trend?: number;
  color?: string;
}

const MetricsCard = ({ title, value, icon, description, trend, color = "bg-blue-500" }: MetricsCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const trendDirection = trend && trend > 0 ? "↑" : trend && trend < 0 ? "↓" : "";
  const trendColor = trend && trend > 0 ? "text-red-500" : trend && trend < 0 ? "text-green-500" : "";

  return (
    <Card 
      className={`transition-all duration-300 ${isHovered ? 'shadow-xl scale-105' : 'hover:shadow-lg'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className={`flex flex-row items-center justify-between pb-2 ${isHovered ? color + '/10' : ''}`}>
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`p-2 rounded-full ${color} text-white`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold flex items-center gap-2">
          {value}
          {trend && (
            <span className={`text-sm ${trendColor}`}>
              {trendDirection} {Math.abs(trend)}%
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
