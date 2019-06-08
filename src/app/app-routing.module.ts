import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routes } from './app.common';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
