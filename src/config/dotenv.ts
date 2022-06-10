import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const SERVICE_NAME = process.env.SERVICE_NAME || 'Weather-forecast-api';
export const HKO_WEATHER_API =
  process.env.HKO_WEATHER_API || 'https://data.weather.gov.hk';
