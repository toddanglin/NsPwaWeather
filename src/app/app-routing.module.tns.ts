import { NgModule } from '@angular/core';
import { NativeScriptRouterModule as RouterModule } from 'nativescript-angular/router';

import { routes } from './app.common';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
