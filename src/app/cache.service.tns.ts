import { Injectable } from '@angular/core';
import * as appSettings from 'tns-core-modules/application-settings';

@Injectable({ providedIn: 'root' })
export class CacheService {
    constructor() { }

    checkCache(url, key, label): Promise<any> {
        return new Promise((resolve, reject) => {
            if(appSettings.hasKey(url)) {
                // Cached response matching URL is available
                // TODO: Wrap responses in object to set expiry time

                let json = JSON.parse(appSettings.getString(url));
                const results = json;
                results.key = key;
                results.label = label;
                results.created = json.currently.time;

                return resolve(results);
            } else {
                resolve();
            }
        });
    }

    cacheResponse(url, response): Promise<any> {
        return new Promise((resolve) => {
            if(appSettings.hasKey(url)) {
                appSettings.remove(url); // Clear old cache
            }

            //TODO: Wrap response in object to set extra metadata (like expiry time)
            appSettings.setString(url, JSON.stringify(response));

            resolve(response);
        })
    }
}