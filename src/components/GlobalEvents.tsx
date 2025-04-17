
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface GlobalEventsProps {
  selectedRegion: string;
}

const GlobalEvents = ({ selectedRegion }: GlobalEventsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          Environmental Events
        </CardTitle>
        <CardDescription>
          Recent events in {selectedRegion === "global" ? "worldwide" : selectedRegion.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-l-4 border-red-500 pl-4 py-2">
            <p className="font-medium">Major Flooding</p>
            <p className="text-sm text-muted-foreground">Southeast Asia, 3 days ago</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4 py-2">
            <p className="font-medium">Wildfire Alert</p>
            <p className="text-sm text-muted-foreground">West Coast, 1 week ago</p>
          </div>
          <div className="border-l-4 border-yellow-500 pl-4 py-2">
            <p className="font-medium">Drought Warning</p>
            <p className="text-sm text-muted-foreground">Central Africa, 2 weeks ago</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="font-medium">Coral Bleaching Event</p>
            <p className="text-sm text-muted-foreground">Great Barrier Reef, ongoing</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalEvents;
