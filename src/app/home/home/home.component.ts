import { Component, OnInit } from '@angular/core';
import { CityPickerComponent } from '../city-picker/city-picker.component';
import { ForecastService } from "../../forecast.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isBusy: boolean;
  title: string = "Weather Forecast";
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
    this.cities = JSON.parse(localStorage.getItem("selectedCities"));
    if (this.cities === null) {
      this.cities = [
        { key: "2459115", label: "New York, NY" }
      ];

      // Save default city on first load
      localStorage.setItem("selectedCities", JSON.stringify(this.cities));
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
  initialWeatherForecast = {
    key: '2459115',
    label: 'New York, NY',
    created: '2016-07-22T01:00:00Z',
    channel: {
      astronomy: {
        sunrise: "5:43 am",
        sunset: "8:21 pm"
      },
      item: {
        condition: {
          text: "Windy",
          date: "Thu, 21 Jul 2016 09:00 PM EDT",
          temp: 56,
          code: 24
        },
        forecast: [
          { code: 44, high: 86, low: 70, day: "Thu" },
          { code: 44, high: 94, low: 73, day: "Fri" },
          { code: 4, high: 95, low: 78, day: "Sat" },
          { code: 24, high: 75, low: 89, day: "Sun" },
          { code: 24, high: 89, low: 77, day: "Mon" },
          { code: 44, high: 92, low: 79, day: "Tue" },
          { code: 44, high: 89, low: 77, day: "Wed" }
        ]
      },
      atmosphere: {
        humidity: 56
      },
      wind: {
        speed: 25,
        direction: 195
      }
    }
  };

}