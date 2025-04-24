
import { format, fromUnixTime } from "date-fns";

export function getFormattedDate(unixTimestamp: number, formatString: string = "EEEE, MMMM d"): string {
  return format(fromUnixTime(unixTimestamp), formatString);
}

export function getFormattedTime(unixTimestamp: number, formatString: string = "h:mm a"): string {
  return format(fromUnixTime(unixTimestamp), formatString);
}

export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export function getUnitSymbol(units: "metric" | "imperial", measurement: "temp" | "speed"): string {
  if (measurement === "temp") {
    return units === "metric" ? "°C" : "°F";
  }
  return units === "metric" ? "m/s" : "mph";
}

export function getDailyForecast(forecastList: any[]): any[] {
  const dailyForecasts: any[] = [];
  const days = new Set<string>();

  // Group forecasts by day (excluding current day)
  const today = new Date().toDateString();
  
  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dayStr = date.toDateString();
    
    // Skip entries from today
    if (dayStr === today) return;
    
    // Get each day only once
    if (!days.has(dayStr)) {
      days.add(dayStr);
      // Find forecast closest to noon for representative day weather
      const dayForecasts = forecastList.filter(
        forecast => new Date(forecast.dt * 1000).toDateString() === dayStr
      );
      
      // Find noon forecast (or closest to it)
      const noonForecast = dayForecasts.reduce((closest, forecast) => {
        const forecastHour = new Date(forecast.dt * 1000).getHours();
        const closestHour = new Date(closest.dt * 1000).getHours();
        return Math.abs(forecastHour - 12) < Math.abs(closestHour - 12) ? forecast : closest;
      }, dayForecasts[0]);
      
      dailyForecasts.push(noonForecast);
    }
  });
  
  // Return maximum 5 days
  return dailyForecasts.slice(0, 5);
}

export function getWindDirection(degrees: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

export function getBackgroundColor(weatherCondition: string, isDay: boolean): string {
  if (!weatherCondition) return "bg-gradient-to-br from-blue-400 to-blue-700";
  
  const condition = weatherCondition.toLowerCase();
  
  if (condition.includes("clear")) {
    return isDay 
      ? "bg-gradient-to-br from-blue-400 to-blue-700" 
      : "bg-gradient-to-br from-slate-800 to-slate-950";
  } else if (condition.includes("cloud") || condition.includes("overcast")) {
    return isDay 
      ? "bg-gradient-to-br from-gray-300 to-blue-600" 
      : "bg-gradient-to-br from-slate-700 to-slate-900";
  } else if (condition.includes("rain") || condition.includes("drizzle")) {
    return isDay 
      ? "bg-gradient-to-br from-gray-400 to-gray-700" 
      : "bg-gradient-to-br from-slate-800 to-slate-950";
  } else if (condition.includes("snow")) {
    return isDay 
      ? "bg-gradient-to-br from-gray-100 to-gray-300" 
      : "bg-gradient-to-br from-slate-600 to-slate-800";
  } else if (condition.includes("thunder") || condition.includes("storm")) {
    return "bg-gradient-to-br from-gray-700 to-gray-900";
  } else {
    return isDay 
      ? "bg-gradient-to-br from-blue-400 to-blue-700" 
      : "bg-gradient-to-br from-slate-800 to-slate-950";
  }
}
