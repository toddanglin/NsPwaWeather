import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CityPickerComponent } from './city-picker/city-picker.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';

export const componentDeclarations: any[] = [
    HomeComponent, SpinnerComponent, CityPickerComponent, WeatherCardComponent
];

export const providerDeclarations: any[] = [
];

export const sharedImports: any[] = [
    HomeRoutingModule
]