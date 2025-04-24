
import { toast } from "sonner";

const API_KEY = "68c169bee514865028ee7382341ee003"
; // OpenWeatherMap API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  name: string;
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
}

export interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
    dt_txt: string;
  }[];
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
}

export async function getCurrentWeather(location: string, units: "metric" | "imperial" = "metric"): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${location}&units=${units}&appid=${API_KEY}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch weather data");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`Weather data error: ${error.message}`);
    } else {
      toast.error("Failed to fetch weather data");
    }
    throw error;
  }
}

export async function getWeatherByCoords(lat: number, lon: number, units: "metric" | "imperial" = "metric"): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch weather data");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`Weather data error: ${error.message}`);
    } else {
      toast.error("Failed to fetch weather data");
    }
    throw error;
  }
}

export async function getForecast(location: string, units: "metric" | "imperial" = "metric"): Promise<ForecastData> {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${location}&units=${units}&appid=${API_KEY}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch forecast data");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`Forecast data error: ${error.message}`);
    } else {
      toast.error("Failed to fetch forecast data");
    }
    throw error;
  }
}

export async function getForecastByCoords(lat: number, lon: number, units: "metric" | "imperial" = "metric"): Promise<ForecastData> {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch forecast data");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`Forecast data error: ${error.message}`);
    } else {
      toast.error("Failed to fetch forecast data");
    }
    throw error;
  }
}
