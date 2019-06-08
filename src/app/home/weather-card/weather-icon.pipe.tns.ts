import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherIcon'
})
export class WeatherIconPipe implements PipeTransform {

  transform(value: number, ...args: any[]): any {
    return this.getIconClass(value);
  }

  getIconClass(weatherCode) {
    // Weather codes: https://darksky.net/dev/docs#data-point
    switch (weatherCode) {
      case 'clear-day': // sunny
      case 'clear-night': // fair (night)
        return 'ion-ios-sunny-outline';
      case 'rain': // tornado
        return 'ion-ios-rainy-outline';
      case 'sleet': // heavy snow
      case 'snow': // snow showers
        return 'ion-ios-snowy';
      case 'fog':
      case 'cloudy': // smoky
        return 'ion-ios-cloudy-outline';
      case 'wind': // windy
        return 'ion-ios-shuffle'; // TODO Need better icon
      case 'party-cloudy-night': // partly cloudy (day)
      case 'partly-cloudy-day': // partly cloudy
        return 'ion-ios-partlysunny-outline';
    }
  }

}
