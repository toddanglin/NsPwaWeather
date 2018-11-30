import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ForecastService {
  constructor(private httpClient: HttpClient) { }

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
      .set("format", "json")
      .set("q", "select * from weather.forecast where woeid=" + key);

    var url = "https://query.yahooapis.com/v1/public/yql";

    // TODO add cache logic here
    
    return new Promise((resolve, reject) => {
      this.httpClient.get(url, { params })
        .toPromise()
        .then((results: any) => {
          let response = results.query.results;
          response.key = key;
          response.label = label;
          response.created = results.query.created;

          resolve(response);
        })
        .catch(err => {
          console.warn("Forecast HTTP Error", err);
          reject();
        })

    });
  }
}