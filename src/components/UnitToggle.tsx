
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface UnitToggleProps {
  units: "metric" | "imperial";
  onToggle: () => void;
}

export default function UnitToggle({ units, onToggle }: UnitToggleProps) {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <Label htmlFor="units" className="text-sm font-medium cursor-pointer">°C</Label>
      <Switch
        id="units"
        checked={units === "imperial"}
        onCheckedChange={onToggle}
      />
      <Label htmlFor="units" className="text-sm font-medium cursor-pointer">°F</Label>
    </div>
  );
}
