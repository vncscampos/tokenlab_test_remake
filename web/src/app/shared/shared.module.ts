import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { FormService } from './services/form.service';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    HeaderComponent,
  ],
  providers: [FormService]
})
export class SharedModule { }
