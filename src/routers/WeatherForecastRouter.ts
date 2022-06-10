import * as express from 'express';
import { WeatherForecastService } from 'services/WeatherForecastService';

export class WeatherForecastRouter {
  constructor(private weatherForecastService: WeatherForecastService) {}

  public router() {
    const router = express.Router();
    router.get('/9daysweather', this.getNineDaysWeatherForecast);
    return router;
  }

  getNineDaysWeatherForecast: express.RequestHandler = async (req, res) => {
    try {
      const result = await this.weatherForecastService.getNineDaysWeatherForecast();
      res.json(result);
    } catch (error) {
      res.json({
        ok: false,
        message: 'Fail to get weather forecast'
      });
    }
  };
}
