
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HealthIndexProps {
  title: string;
  current: number;
  change: number;
  data: Array<{ date: string; value: number }>;
}

const HealthIndexChart = ({ title, current, change, data }: HealthIndexProps) => {
  const isPositive = change >= 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{current}%</div>
        <div className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}{change}% from last year
        </div>
        <div className="h-[200px] mt-4 flex items-center justify-center text-muted-foreground">
          Chart visualization will be added here
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthIndexChart;
