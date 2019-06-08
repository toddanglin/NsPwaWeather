import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { CityPickerComponent } from './city-picker/city-picker.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { HomeComponent } from './home/home.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SpinnerComponent, CityPickerComponent, WeatherCardComponent, HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ]
})
export class HomeModule { }
