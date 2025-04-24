
import { ForecastData } from "@/services/weatherService";
import { getUnitSymbol, getDailyForecast } from "@/utils/weatherUtils";
import ForecastCard from "./ForecastCard";

interface WeatherForecastProps {
  forecastData: ForecastData;
  units: "metric" | "imperial";
}

export default function WeatherForecast({ forecastData, units }: WeatherForecastProps) {
  if (!forecastData) return null;
  
  const tempUnit = getUnitSymbol(units, "temp");
  const dailyForecasts = getDailyForecast(forecastData.list);
  
  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <h3 className="font-semibold mb-3 text-white">5-Day Forecast</h3>
      <div className="grid grid-cols-5 gap-2">
        {dailyForecasts.map((forecast, index) => (
          <ForecastCard
            key={index}
            date={forecast.dt}
            temp={forecast.main.temp}
            icon={forecast.weather[0].icon}
            description={forecast.weather[0].description}
            tempUnit={tempUnit}
          />
        ))}
      </div>
    </div>
  );
}
