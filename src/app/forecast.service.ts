import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class ForecastService {
  constructor(private httpClient: HttpClient, private cacheSvc: CacheService) { }

  /*
 * Gets a forecast for a specific city and updates the card with the data.
 * getForecast() first checks if the weather data is in the cache. If so,
 * then it gets that data and populates the card with the cached data.
 * Then, getForecast() goes to the network for fresh data. If the network
 * request goes through, then the card gets updated a second time with the
 * freshest data.
 */
  getForecast(key, label): Promise<any> {
    const params = new HttpParams()
      .set('exclude', 'flags,alerts,hourly,minutely');

    const url = `http://localhost:8000/forecast/${key}`;

    // TODO add cache logic here

    return new Promise((resolve, reject) => {
      this.cacheSvc.checkCache(url + '?' + params.toString(), key, label)
        .then(results => {
          if (results) {
            resolve(results); // Return cached response first
          }
          return this.httpClient.get(url, { params })
            .toPromise()
            .then((results: any) => {
              return this.cacheSvc.cacheResponse(url + params.toString(), results);
          })
        })
        .then((results: any) => {
          let response = results;
          response.key = key;
          response.label = label;
          response.created = results.currently.time;

          resolve(response);
        })
        .catch(err => {
          console.warn("Forecast HTTP Error", err);
          reject();
        })
    });
  }
}