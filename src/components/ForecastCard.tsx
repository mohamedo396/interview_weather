
import { getFormattedDate, getWeatherIconUrl } from "@/utils/weatherUtils";

interface ForecastCardProps {
  date: number;
  temp: number;
  icon: string;
  description: string;
  tempUnit: string;
}

export default function ForecastCard({ date, temp, icon, description, tempUnit }: ForecastCardProps) {
  return (
    <div className="flex flex-col items-center p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
      <p className="font-medium text-sm mb-1">{getFormattedDate(date, "E")}</p>
      <p className="text-xs text-gray-500 mb-2">{getFormattedDate(date, "MMM d")}</p>
      <img 
        src={getWeatherIconUrl(icon)} 
        alt={description}
        className="h-10 w-10 my-1"
      />
      <p className="text-lg font-semibold">{Math.round(temp)}{tempUnit}</p>
      <p className="text-xs capitalize text-gray-600 truncate w-full text-center">{description}</p>
    </div>
  );
}
