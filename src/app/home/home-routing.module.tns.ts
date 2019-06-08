import { NgModule } from '@angular/core';
import { NativeScriptRouterModule as RouterModule } from 'nativescript-angular/router';

import { routes } from './home.routes';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
