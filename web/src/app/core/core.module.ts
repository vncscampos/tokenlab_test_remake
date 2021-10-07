import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Event } from './models/events.model';
import { User } from './models/user.model';
import { AuthGuard } from './guards/auth-guard';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [Event, User, AuthGuard],
})
export class CoreModule {}
