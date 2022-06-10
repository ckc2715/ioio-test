import * as fs from 'fs';
import { HKOWeatherForecastResponse } from 'utils/getWeatherForecast';
import { WeatherForecast } from './WeatherForecast';
import * as path from 'path';

describe('WeatherForecastModel', () => {
  let rawData: HKOWeatherForecastResponse;

  beforeAll(() => {
    const data = fs.readFileSync(
      path.join(__dirname, 'mockData.json'),
      'utf-8'
    );
    rawData = JSON.parse(data);
  });

  it('should return a transformed data transfer object from HKO API', () => {
    const weatherForecast = new WeatherForecast(rawData);
    const weatherForecastDto = weatherForecast.toDto();

    expect(weatherForecastDto.length).toBe(9);

    expect(
      weatherForecastDto.every(forecast => forecast.date.length === 8)
    ).toBe(true);

    expect(
      weatherForecastDto.every(forecast => typeof forecast.weather === 'string')
    ).toBe(true);
  });
});
