import * as express from 'express';
import { PORT, SERVICE_NAME } from 'config/dotenv';
import { WeatherForecastService } from 'services/WeatherForecastService';
import { WeatherForecastRouter } from 'routers/WeatherForecastRouter';

const app = express();
app.use(express.json());

const weatherForecastService = new WeatherForecastService();
const weatherForecastRouter = new WeatherForecastRouter(weatherForecastService);

app.use('/', weatherForecastRouter.router());

app.listen(PORT, () =>
  console.log(`${SERVICE_NAME} is listening on port ${PORT}`)
);
