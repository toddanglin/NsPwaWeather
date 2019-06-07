import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { componentDeclarations, providerDeclarations, sharedImports } from './home.common';

@NgModule({
  declarations: [ ...componentDeclarations],
  imports: [
    CommonModule,
    FormsModule,
    ...sharedImports
  ]
})
export class HomeModule { }
