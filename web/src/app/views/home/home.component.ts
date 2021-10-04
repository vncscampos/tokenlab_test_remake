import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from 'src/app/core/models/events.model';

import { DateService } from 'src/app/shared/services/date.service';
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
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    this.events = this.eventService.getEvents().valueChanges.pipe(
      map((result) => {
        const events = this.dateService.format(result.data.events);
        return events;
      })
    );
  }

  onClick(bool: boolean) {
    this.myEvents = bool;
  }
}
