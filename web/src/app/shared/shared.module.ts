import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { FormService } from './services/form.service';
import { EventService } from './services/event.service';
import { DateService } from './services/date.service';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    HeaderComponent,
  ],
  providers: [FormService, EventService, DateService]
})
export class SharedModule { }
