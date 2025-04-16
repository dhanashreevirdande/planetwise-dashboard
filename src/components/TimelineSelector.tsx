
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface TimelineSelectorProps {
  minYear: number;
  maxYear: number;
  onChange: (year: number) => void;
}

const TimelineSelector = ({ minYear, maxYear, onChange }: TimelineSelectorProps) => {
  const [currentYear, setCurrentYear] = useState(maxYear);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);

  const handleYearChange = (value: number[]) => {
    const newYear = value[0];
    setCurrentYear(newYear);
    onChange(newYear);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimeline = () => {
    setIsPlaying(false);
    setCurrentYear(minYear);
    onChange(minYear);
  };

  const skipToEnd = () => {
    setIsPlaying(false);
    setCurrentYear(maxYear);
    onChange(maxYear);
  };

  useEffect(() => {
    const animate = (time: number) => {
      if (!lastUpdateTimeRef.current) {
        lastUpdateTimeRef.current = time;
      }
      
      const deltaTime = time - lastUpdateTimeRef.current;
      
      // Update every 500ms
      if (deltaTime > 500) {
        lastUpdateTimeRef.current = time;
        
        if (currentYear < maxYear) {
          const newYear = Math.min(currentYear + 1, maxYear);
          setCurrentYear(newYear);
          onChange(newYear);
        } else {
          setIsPlaying(false);
          return;
        }
      }
      
      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, currentYear, maxYear, onChange]);

  return (
    <div className="flex flex-col space-y-4 p-4 bg-card rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Timeline</span>
        <span className="text-xl font-bold">{currentYear}</span>
      </div>
      
      <Slider
        value={[currentYear]}
        min={minYear}
        max={maxYear}
        step={1}
        onValueChange={handleYearChange}
        className="w-full"
      />
      
      <div className="flex items-center justify-center space-x-2">
        <Button variant="outline" size="sm" onClick={resetTimeline}>
          <SkipBack className="h-4 w-4" />
        </Button>
        
        <Button 
          variant={isPlaying ? "destructive" : "default"} 
          size="sm" 
          onClick={togglePlayback}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        
        <Button variant="outline" size="sm" onClick={skipToEnd}>
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-5 text-xs text-muted-foreground">
        {Array.from({ length: 5 }).map((_, i) => {
          const year = minYear + Math.floor(i * (maxYear - minYear) / 4);
          return (
            <div key={i} className={i === 0 ? 'text-left' : i === 4 ? 'text-right' : 'text-center'}>
              {year}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineSelector;
