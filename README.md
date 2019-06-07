# NsPwaWeather

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

To run both the Express server proxy for the DarkSky API and the Angular development server, run `npm start`

Test the DarkSky proxy by navigating to `http://localhost:8000/forecast/`

**NOTE**: Before running this demo, you must acquire a DarkSky API key from: https://darksky.net

Once you have an API key, create a `.env` file in the root of your project and add the following content:

```
DARKSKY_API_KEY=YOUR API KEY
```

This will set a Node process environment variable consumed by `server.js` file.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
