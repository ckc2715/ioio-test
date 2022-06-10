import axios from 'axios';
import { HKO_WEATHER_API } from 'config/dotenv';

export interface ForecastMaxtemp {
  value: number;
  unit: string;
}

export interface ForecastMintemp {
  value: number;
  unit: string;
}

export interface ForecastMaxrh {
  value: number;
  unit: string;
}

export interface ForecastMinrh {
  value: number;
  unit: string;
}

export interface WeatherForecast {
  forecastDate: string;
  week: string;
  forecastWind: string;
  forecastWeather: string;
  forecastMaxtemp: ForecastMaxtemp;
  forecastMintemp: ForecastMintemp;
  forecastMaxrh: ForecastMaxrh;
  forecastMinrh: ForecastMinrh;
  ForecastIcon: number;
  PSR: string;
}

export interface SeaTemp {
  place: string;
  value: number;
  unit: string;
  recordTime: Date;
}

export interface Depth {
  unit: string;
  value: number;
}

export interface SoilTemp {
  place: string;
  value: number;
  unit: string;
  recordTime: Date;
  depth: Depth;
}

export interface HKOWeatherForecastResponse {
  generalSituation: string;
  weatherForecast: WeatherForecast[];
  updateTime: Date;
  seaTemp: SeaTemp;
  soilTemp: SoilTemp[];
}

export const getWeatherForecast = async () => {
  const res = await axios.get<HKOWeatherForecastResponse>(
    `${HKO_WEATHER_API}/weatherAPI/opendata/weather.php?dataType=fnd&lang=en`
  );
  return res.data;
};
