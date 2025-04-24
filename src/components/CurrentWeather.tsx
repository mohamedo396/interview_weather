
import { WeatherData } from "@/services/weatherService";
import { getFormattedDate, getFormattedTime, getWeatherIconUrl, getUnitSymbol, getWindDirection } from "@/utils/weatherUtils";
import { CloudRain, CloudSnow, CloudSun, Compass, MapPin, Sun, Thermometer, Wind } from "lucide-react";

interface CurrentWeatherProps {
  weatherData: WeatherData;
  units: "metric" | "imperial";
}

export default function CurrentWeather({ weatherData, units }: CurrentWeatherProps) {
  if (!weatherData) return null;
  
  const tempUnit = getUnitSymbol(units, "temp");
  const speedUnit = getUnitSymbol(units, "speed");
  const isDay = new Date().getTime() / 1000 > weatherData.sys.sunrise && 
               new Date().getTime() / 1000 < weatherData.sys.sunset;

  // Determine which weather icon to use
  const getWeatherIcon = () => {
    const condition = weatherData.weather[0].main.toLowerCase();
    if (condition.includes("rain") || condition.includes("drizzle")) {
      return <CloudRain className="h-8 w-8 text-weather-blue" />;
    } else if (condition.includes("snow")) {
      return <CloudSnow className="h-8 w-8 text-weather-snowy" />;
    } else if (condition.includes("cloud")) {
      return <CloudSun className="h-8 w-8 text-weather-cloudy" />;
    } else {
      return isDay ? 
        <Sun className="h-8 w-8 text-weather-sunny" /> : 
        <CloudSun className="h-8 w-8 text-weather-cloudy" />;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-500 mr-1" />
            <h2 className="text-xl font-bold">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
          </div>
          {getWeatherIcon()}
        </div>

        <p className="text-sm text-gray-500 mb-6">{getFormattedDate(weatherData.dt)}</p>

        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-5xl font-bold">
              {Math.round(weatherData.main.temp)}{tempUnit}
            </p>
            <p className="text-gray-600">
              Feels like {Math.round(weatherData.main.feels_like)}{tempUnit}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold capitalize">
              {weatherData.weather[0].description}
            </p>
            <img 
              src={getWeatherIconUrl(weatherData.weather[0].icon)} 
              alt={weatherData.weather[0].description}
              className="w-16 h-16 inline-block"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Wind className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm">
              {Math.round(weatherData.wind.speed)} {speedUnit} · {getWindDirection(weatherData.wind.deg)}
            </span>
          </div>
          <div className="flex items-center">
            <Compass className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm">
              {Math.round(weatherData.main.humidity)}% humidity
            </span>
          </div>
          <div className="flex items-center">
            <Thermometer className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm">
              {Math.round(weatherData.main.pressure)} hPa
            </span>
          </div>
          <div className="flex items-center">
            <Sun className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm">
              UV Index: Moderate
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-4 flex justify-between text-sm">
        <div>
          <p className="text-gray-500">Sunrise</p>
          <p className="font-medium">{getFormattedTime(weatherData.sys.sunrise)}</p>
        </div>
        <div>
          <p className="text-gray-500">Sunset</p>
          <p className="font-medium">{getFormattedTime(weatherData.sys.sunset)}</p>
        </div>
      </div>
    </div>
  );
}
