import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherIcon'
})
export class WeatherIconPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value; // Do nothing for web
  }

}
