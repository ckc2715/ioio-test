import { WeatherForecastRouter } from './WeatherForecastRouter';
import { WeatherForecastService } from '../services/WeatherForecastService';
import { mockData } from './mockData';

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

  it('should has one endpoint: /9daysweather in router', () => {
    const expressRouter = router.router();
    expect(expressRouter.stack.length).toBe(1);
    expect(
      expressRouter.stack.some(
        s => Object.keys(s.route.methods).indexOf('get') > -1
      )
    ).toBe(true);
    expect(
      expressRouter.stack.some(s => s.route.path === '/9daysweather')
    ).toBe(true);
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
