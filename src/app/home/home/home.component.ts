import { Component, OnInit } from '@angular/core';
import { CityPickerComponent } from '../city-picker/city-picker.component';
import { ForecastService } from '../../forecast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public forecastSvc: ForecastService) {
    this.forecasts = new Array<any>();
  }

  isBusy: boolean;
  title = 'Weather Forecast';
  forecasts: Array<any>;
  cities: Array<any>;

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
      if (localStorage !== undefined){
        localStorage.setItem('selectedCities', JSON.stringify(this.cities));
      }
    }

    // Using timeout to address race condition with activity indicator in {N}
    // Without timeout, acitivity indicator can get "stuck" visible. Not sure why. Timeout fixes it.
    setTimeout(() => { this.refreshForecast(); }, 0);
  }

  refreshForecast() {
    // TODO: Get forecasts from Yahoo API
    this.isBusy = true;
    const p = new Array<Promise<any>>();

    this.cities.forEach(city => {
      p.push(this.forecastSvc.getForecast(city.key, city.label));
    });

    Promise.all(p)
      .then(result => {
        this.forecasts = result;
        this.isBusy = false;
      })
      .catch(err => {
        console.warn('ERROR refreshing forecasts', err);
        this.isBusy = false;
      });
  }

}
