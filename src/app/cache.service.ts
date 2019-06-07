import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CacheService {
    constructor() { }

    checkCache(url, key, label): Promise<any> {
        return new Promise((resolve, reject) => {
            if ('caches' in window) {
                /*
                 * Check if the service worker has already cached this city's weather
                 * data. If the service worker has the data, then display the cached
                 * data while the app fetches the latest data.
                 */
                caches.match(url)
                  .then(response => {
                    if (response) {
                      response.json()
                        .then((json) => {
                          let results = json.query.results;
                          results.key = key;
                          results.label = label;
                          results.created = json.query.created;
                          return resolve(results);
                        });
                    } else {
                      console.log("NO CACHE MATCH");
                      resolve();
                    }
                  });
              } else {
                resolve();
              }
        });
    }

    cacheResponse(url, response): Promise<Object> {
        return new Promise((resolve) => {
            // For the web, we'll leave this work to the Service Worker

            resolve(response);
        })
    }
}