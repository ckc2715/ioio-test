import { getWeatherForecast } from 'utils/getWeatherForecast';
import { WeatherForecast } from 'models/WeatherForecast';

export class WeatherForecastService {
  async getNineDaysWeatherForecast() {
    try {
      const rawData = await getWeatherForecast();
      const weatherForecast = new WeatherForecast(rawData);
      return weatherForecast.toDto();
    } catch (error) {
      throw new Error('Cannot get forecast data.');
    }
  }
}
