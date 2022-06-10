import { HKOWeatherForecastResponse } from 'utils/getWeatherForecast';

export class WeatherForecast {
  constructor(private rawData: HKOWeatherForecastResponse) {}

  toDto() {
    return this.rawData.weatherForecast.map(data => ({
      date: data.forecastDate,
      weather: data.forecastWeather
    }));
  }
}
