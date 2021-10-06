import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EventService } from './../../shared/services/event.service';
import { Event } from 'src/app/core/models/events.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  banner = '/assets/create_banner.svg';
  isUpdate: Boolean;

  event: Event;
  subs: Subscription;

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subs = this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params['id']) {
        this.isUpdate = true;
      }
      const { id, description, start_date, end_date, guests } = params;
      this.event = new Event().desirialize({
        id,
        description,
        start_date,
        end_date,
        guests,
      });
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const { description, start_hour, start_date, end_hour, end_date, guests } =
      form.value;
    if (!this.isUpdate) {
      this.eventService
        .setEvent(
          description,
          start_date,
          start_hour,
          end_date,
          end_hour,
          guests
        )
        .subscribe(
          (event) => {
            this.event = new Event().desirialize(event);
            alert('Evento criado com sucesso!')
          },
          (error) => {
            alert(error);
          }
        );
    } else {
      this.eventService
        .updateEvent(
          this.event.id,
          description,
          start_date,
          start_hour,
          end_date,
          end_hour,
          guests
        )
        .subscribe(
          (event) => {
            this.event = new Event().desirialize(event);
            alert('Evento atulizado com sucesso!');
          },
          (error) => {
            alert(error);
          }
        );
    }
  }
}
