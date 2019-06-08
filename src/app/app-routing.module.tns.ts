import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { routes } from './app.common';

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
