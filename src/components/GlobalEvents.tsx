
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Flame, CloudRain, Wind } from "lucide-react";

interface Event {
  type: 'wildfire' | 'flood' | 'storm' | 'drought';
  location: string;
  severity: 'low' | 'medium' | 'high' | 'extreme';
  date: string;
}

const events: Event[] = [
  { type: 'wildfire', location: 'California, USA', severity: 'high', date: '2025-04-15' },
  { type: 'flood', location: 'Bangladesh', severity: 'extreme', date: '2025-04-14' },
  { type: 'storm', location: 'Philippines', severity: 'high', date: '2025-04-13' },
  { type: 'drought', location: 'East Africa', severity: 'extreme', date: '2025-04-10' },
];

const getEventIcon = (type: string) => {
  switch (type) {
    case 'wildfire': return <Flame className="h-4 w-4" />;
    case 'flood': return <CloudRain className="h-4 w-4" />;
    case 'storm': return <Wind className="h-4 w-4" />;
    case 'drought': return <AlertTriangle className="h-4 w-4" />;
    default: return <AlertTriangle className="h-4 w-4" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'low': return 'bg-blue-100 text-blue-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'extreme': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const GlobalEvents = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Environmental Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[300px] overflow-y-auto">
        {events.map((event, index) => (
          <Alert key={index} className="flex items-start">
            <div className="mr-2 mt-1">{getEventIcon(event.type)}</div>
            <div className="flex-1">
              <AlertTitle className="flex items-center">
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                <Badge className={`ml-2 ${getSeverityColor(event.severity)}`} variant="outline">
                  {event.severity}
                </Badge>
              </AlertTitle>
              <AlertDescription className="text-sm">
                <div>{event.location}</div>
                <div className="text-xs text-muted-foreground mt-1">Reported on {event.date}</div>
              </AlertDescription>
            </div>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
};

export default GlobalEvents;
