import { WeatherForecastService } from './WeatherForecastService';
import {
  getWeatherForecast,
  HKOWeatherForecastResponse
} from 'utils/getWeatherForecast';
import * as path from 'path';
import * as fs from 'fs';

jest.mock('utils/getWeatherForecast');
const mockGetWeatherForecast = getWeatherForecast as jest.MockedFunction<
  typeof getWeatherForecast
>;

describe('WeatherForecastService', () => {
  const weatherForecastService = new WeatherForecastService();
  let rawData: HKOWeatherForecastResponse;

  beforeAll(() => {
    const data = fs.readFileSync(
      path.join(__dirname, '../models/mockData.json'),
      'utf-8'
    );
    rawData = JSON.parse(data);
  });

  it('should return a data transfer object transformed from HKO API', async () => {
    mockGetWeatherForecast.mockResolvedValue(rawData);
    const result = await weatherForecastService.getNineDaysWeatherForecast();

    expect(result.length).toBe(9);

    expect(result.every(forecast => forecast.date.length === 8)).toBe(true);

    expect(result.every(forecast => typeof forecast.weather === 'string')).toBe(
      true
    );
  });

  it('it should throw error message if fails to fetch data from HKO API', async () => {
    mockGetWeatherForecast.mockRejectedValue('some errors occurred');
    await expect(async () => {
      await weatherForecastService.getNineDaysWeatherForecast();
    }).rejects.toThrowError('Cannot get forecast data.');
  });
});
