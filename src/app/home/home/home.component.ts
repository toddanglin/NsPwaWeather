import { Component, OnInit } from '@angular/core';
import { CityPickerComponent } from '../city-picker/city-picker.component';
import { ForecastService } from '../../forecast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isBusy: boolean;
  title: string = 'Weather App';
  forecasts: Array<any>;
  cities: Array<any>;

  constructor(public forecastSvc: ForecastService) {
    this.forecasts = new Array<any>();
    this.forecasts.push(this.initialWeatherForecast);
  }

  ngOnInit() {
    this.isBusy = true;

    this.loadCities();
  }

  showPicker(pickerRef: CityPickerComponent) {
    pickerRef.show();
    this.isBusy = false;
  }

  hidePicker() {
    this.isBusy = true;
    this.loadCities();
  }

  loadCities() {
    this.cities = JSON.parse(localStorage.getItem('selectedCities'));
    if (this.cities === null) {
      this.cities = [
        { key: '40.7720232,-73.9732319', label: 'New York, NY' }
      ];

      // Save default city on first load
      localStorage.setItem('selectedCities', JSON.stringify(this.cities));
    }

    // Using timeout to address race condition with activity indicator in {N}
    // Without timeout, acitivity indicator can get "stuck" visible. Not sure why. Timeout fixes it.
    setTimeout(() => { this.refreshForecast(); }, 0);
  }

  refreshForecast() {
    // TODO: Get forecasts from Yahoo API
    this.isBusy = true;
    let p = new Array<Promise<any>>();

    this.cities.forEach(city => {
      p.push(this.forecastSvc.getForecast(city.key, city.label));
    });

    Promise.all(p)
      .then(result => {
        this.forecasts = result;
        this.isBusy = false;
      })
      .catch(err => {
        console.warn("ERROR refreshing forecasts", err);
        this.isBusy = false;
      });
  }

  /*
   * Fake weather data that is presented when the user first uses the app,
   * or when the user has not saved any cities. See startup code for more
   * discussion.
   */
// tslint:disable-next-line: member-ordering
 initialWeatherForecast = {
    'latitude': 40.7720232,
    'longitude': -73.9732319,
    'timezone': 'America/New_York',
    'label': 'New York',
    'currently': {
        'time': 1559936200,
        'summary': 'Partly Cloudy',
        'icon': 'partly-cloudy-day',
        'temperature': 80.71,
        'humidity': 0.45,
        'windSpeed': 2.14,
        'windBearing': 116
    },
    'daily': {
        'data': [
            {
                'time': 1559880000,
                'icon': 'partly-cloudy-day',
                'temperatureHigh': 80.79,
                'temperatureLow': 65.28
            },
            {
                'time': 1559966400,
                'icon': 'partly-cloudy-day',
                'temperatureHigh': 82.48,
                'temperatureLow': 61.54
            },
            {
                'time': 1560052800,
                'icon': 'partly-cloudy-day',
                'temperatureHigh': 78.49,
                'temperatureLow': 60.36
            },
            {
                'time': 1560139200,
                'icon': 'rain',
                'temperatureHigh': 73.87,
                'temperatureLow': 70.4
            },
            {
                'time': 1560225600,
                'icon': 'rain',
                'temperatureHigh': 78.15,
                'temperatureLow': 63.37
            },
            {
                'time': 1560312000,
                'icon': 'cloudy',
                'temperatureHigh': 78.51,
                'temperatureLow': 61.07
            },
            {
                'time': 1560398400,
                'icon': 'rain',
                'temperatureHigh': 76.23,
                'temperatureLow': 67.15
            },
            {
                'time': 1560484800,
                'icon': 'partly-cloudy-day',
                'temperatureHigh': 80.53,
                'temperatureLow': 62.2
            }
        ]
    }
};

}