import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from './app-routing.module.tns';
import { AppComponent } from './app.component';

require( "nativescript-localstorage" );

import { registerElement } from "nativescript-angular/element-registry";
registerElement("FilterableListpicker", () => require("nativescript-filterable-listpicker").FilterableListpicker);

// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { sharedProviders } from './app.common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule
  ],
  providers: [ ...sharedProviders ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
