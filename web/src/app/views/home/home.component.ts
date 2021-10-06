import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Event } from 'src/app/core/models/events.model';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myEvents: boolean = true;
  events: Observable<Event[]>;

  constructor(
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.switch(true);
  }

  switch(bool: boolean): void {
    this.myEvents = bool;

    if (!this.myEvents) {
      this.events = this.eventService
        .getInvites()
        .valueChanges.pipe(map((result) => result.data.guests));
    } else {
      this.events = this.eventService
        .getEvents()
        .valueChanges.pipe(map((result) => result.data.events));
    }
  }

  update(event: Event) {
    const { id, description, start_date, end_date, guests } = event;
    this.router.navigate(['event'], {
      queryParams: { id, description, start_date, end_date, guests },
      skipLocationChange: true,
    });
  }

  remove(id: string): void {
    this.eventService.deleteEvents(id);
  }
}
