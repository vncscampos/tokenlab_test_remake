import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
  banner = '/assets/create_banner.svg';

  constructor(private formService: FormService) { }

  onSubmit(form: NgForm) {
    const { description, start_hour, start_date, end_hour, end_date, invites } = form.value;
    this.formService.submitEvent({
      description, 
      start_hour, 
      start_date, 
      end_hour, 
      end_date,
      invites
    });
  }
}