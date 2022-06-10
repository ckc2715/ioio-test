import { WeatherForecastRouter } from './WeatherForecastRouter';
import { WeatherForecastService } from '../services/WeatherForecastService';
import { mockData } from './mockData';
jest.mock('express');

type Mockify<T> = {
  [P in keyof T]: jest.Mock<any>;
};

describe('WeatherForecastRouter', () => {
  let router: WeatherForecastRouter;
  let service: Mockify<WeatherForecastService>;
  let resJson: jest.SpyInstance;
  let req: any;
  let res: any;
  let next: any;

  beforeEach(function() {
    service = {
      getNineDaysWeatherForecast: jest.fn(() => mockData)
    };
    router = new WeatherForecastRouter(
      (service as any) as WeatherForecastService
    );
    req = {
      body: {},
      params: {}
    };
    res = {
      json: () => {
        // do nothing.
      }
    };
    next = () => {
      // do nothing.
    };
    resJson = jest.spyOn(res, 'json');
  });

  it('should handle getNineDaysWeatherForecast method correctly', async () => {
    await router.getNineDaysWeatherForecast(req, res, next);
    expect(service.getNineDaysWeatherForecast).toBeCalledTimes(1);
    expect(resJson).toBeCalledWith(mockData);
  });

  it('should send error message if cannot fetch data from HKO API', async () => {
    service.getNineDaysWeatherForecast = jest
      .fn()
      .mockImplementationOnce(() => {
        throw new Error('Cannot get forecast data.');
      });
    await router.getNineDaysWeatherForecast(req, res, next);
    expect(service.getNineDaysWeatherForecast).toBeCalledTimes(1);
    expect(resJson).toBeCalledWith({
      ok: false,
      message: 'Fail to get weather forecast'
    });
  });
});
