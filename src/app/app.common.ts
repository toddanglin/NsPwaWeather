import { Routes } from '@angular/router';
import { ForecastService } from './forecast.service';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },
]

export const sharedProviders: any[] = [
    ForecastService
]
