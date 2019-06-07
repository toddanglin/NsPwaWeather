import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CityPickerComponent } from './city-picker/city-picker.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';

@NgModule({
  declarations: [HomeComponent, SpinnerComponent, CityPickerComponent, WeatherCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ]
})
export class HomeModule { }
