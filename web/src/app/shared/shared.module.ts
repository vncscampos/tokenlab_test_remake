import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderService } from './components/header/header.service';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    HeaderComponent
  ],
  providers: [
    HeaderService
  ]
})
export class SharedModule { }
