import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Event } from './models/events.model';
import { User } from './models/user.model';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [Event, User],
})
export class CoreModule {}
