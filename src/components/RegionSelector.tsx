
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const regions = [
  { value: "global", label: "Global" },
  { value: "north-america", label: "North America" },
  { value: "south-america", label: "South America" },
  { value: "europe", label: "Europe" },
  { value: "asia", label: "Asia" },
  { value: "africa", label: "Africa" },
  { value: "oceania", label: "Oceania" },
];

interface RegionSelectorProps {
  onRegionChange: (region: string) => void;
}

const RegionSelector = ({ onRegionChange }: RegionSelectorProps) => {
  return (
    <Select onValueChange={onRegionChange} defaultValue="global">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Region" />
      </SelectTrigger>
      <SelectContent>
        {regions.map((region) => (
          <SelectItem key={region.value} value={region.value}>
            {region.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RegionSelector;
