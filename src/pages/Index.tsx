
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  getCurrentWeather, 
  getForecast, 
  getWeatherByCoords, 
  getForecastByCoords, 
  WeatherData, 
  ForecastData 
} from "@/services/weatherService";
import { getBackgroundColor } from "@/utils/weatherUtils";
import SearchBar from "@/components/SearchBar";
import UnitToggle from "@/components/UnitToggle";
import CurrentWeather from "@/components/CurrentWeather";
import WeatherForecast from "@/components/WeatherForecast";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
import { toast } from "sonner";

const Index = () => {
  const [location, setLocation] = useState<string>("London");
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [coordinates, setCoordinates] = useState<{ lat: number, lon: number } | null>(null);

  // Get current location on first load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Unable to get your location. Using default location.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser. Using default location.");
    }
  }, []);

  // Weather query based on location or coordinates
  const weatherQuery = useQuery<WeatherData>({
    queryKey: ['weather', coordinates ? 'coords' : location, units],
    queryFn: () => {
      if (coordinates) {
        return getWeatherByCoords(coordinates.lat, coordinates.lon, units);
      }
      return getCurrentWeather(location, units);
    },
    enabled: Boolean(location) || Boolean(coordinates),
    staleTime: 300000, // 5 minutes
  });

  // Forecast query based on location or coordinates
  const forecastQuery = useQuery<ForecastData>({
    queryKey: ['forecast', coordinates ? 'coords' : location, units],
    queryFn: () => {
      if (coordinates) {
        return getForecastByCoords(coordinates.lat, coordinates.lon, units);
      }
      return getForecast(location, units);
    },
    enabled: Boolean(location) || Boolean(coordinates),
    staleTime: 300000, // 5 minutes
  });

  // When weather is fetched, update the location name
  useEffect(() => {
    if (weatherQuery.data) {
      setLocation(weatherQuery.data.name);
      // If we got data from coordinates, clear them so subsequent searches use the city name
      if (coordinates) {
        setCoordinates(null);
      }
    }
  }, [weatherQuery.data, coordinates]);

  const handleSearch = (query: string) => {
    setCoordinates(null);
    setLocation(query);
  };

  const toggleUnits = () => {
    setUnits(prev => prev === "metric" ? "imperial" : "metric");
  };

  const handleRetry = () => {
    weatherQuery.refetch();
    forecastQuery.refetch();
  };

  // Determine if it's day time
  const isDay = weatherQuery.data 
    ? new Date().getTime() / 1000 > weatherQuery.data.sys.sunrise && 
      new Date().getTime() / 1000 < weatherQuery.data.sys.sunset
    : true;

  // Get background color based on current weather
  const bgClass = weatherQuery.data 
    ? getBackgroundColor(weatherQuery.data.weather[0].main, isDay)
    : "bg-gradient-to-br from-blue-400 to-blue-700";

  const isLoading = weatherQuery.isLoading || forecastQuery.isLoading;
  const isError = weatherQuery.isError || forecastQuery.isError;
  const errorMessage = weatherQuery.error instanceof Error 
    ? weatherQuery.error.message
    : "Failed to load weather data. Please try again.";

  return (
    <div className={`min-h-screen ${bgClass} p-6 transition-colors duration-500`}>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Weather App</h1>

        <div className="flex flex-col space-y-4 mb-6">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          <div className="flex justify-end">
            <UnitToggle units={units} onToggle={toggleUnits} />
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <ErrorDisplay message={errorMessage} onRetry={handleRetry} />
        ) : (
          <>
            {weatherQuery.data && (
              <CurrentWeather weatherData={weatherQuery.data} units={units} />
            )}
            {forecastQuery.data && (
              <WeatherForecast forecastData={forecastQuery.data} units={units} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
