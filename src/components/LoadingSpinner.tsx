
import { Circle } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-56">
      <Circle className="h-12 w-12 text-white animate-spin" />
      <p className="mt-4 text-white">Loading weather data...</p>
    </div>
  );
}
