import { getWeatherForecast } from './getWeatherForecast';

test('it should get raw data from HKO API ', async () => {
  const rawData = await getWeatherForecast();
  expect(rawData).toHaveProperty('generalSituation');
  expect(rawData).toHaveProperty('weatherForecast');
  expect(rawData).toHaveProperty('updateTime');
  expect(rawData).toHaveProperty('seaTemp');
  expect(rawData).toHaveProperty('soilTemp');
  expect(Array.isArray(rawData.weatherForecast)).toBe(true);
});
