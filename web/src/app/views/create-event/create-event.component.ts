import { Component } from '@angular/core';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
  banner = '/assets/create_banner.svg';

  onSubmit(form: Object) {
    console.log(form);
  }
}
