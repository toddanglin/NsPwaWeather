import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { sharedImports, componentDeclarations } from './home.common'

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ ...componentDeclarations ],
  imports: [
    CommonModule,
    FormsModule,
    ...sharedImports
  ]
})
export class HomeModule { }
