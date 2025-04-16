
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AirQualityGaugeProps {
  aqi: number;
  location: string;
}

const getAirQualityStatus = (aqi: number) => {
  if (aqi <= 50) return { status: "Good", color: "bg-green-500" };
  if (aqi <= 100) return { status: "Moderate", color: "bg-yellow-500" };
  if (aqi <= 150) return { status: "Unhealthy for Sensitive Groups", color: "bg-orange-500" };
  if (aqi <= 200) return { status: "Unhealthy", color: "bg-red-500" };
  if (aqi <= 300) return { status: "Very Unhealthy", color: "bg-purple-500" };
  return { status: "Hazardous", color: "bg-rose-700" };
};

const AirQualityGauge = ({ aqi, location }: AirQualityGaugeProps) => {
  const { status, color } = getAirQualityStatus(aqi);
  const progressValue = Math.min((aqi / 500) * 100, 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Air Quality Index - {location}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">{aqi}</span>
            <span className="text-muted-foreground">{status}</span>
          </div>
          <Progress value={progressValue} className={color} />
          <div className="grid grid-cols-6 text-xs text-muted-foreground">
            <div>0</div>
            <div>100</div>
            <div>200</div>
            <div>300</div>
            <div>400</div>
            <div>500</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityGauge;
