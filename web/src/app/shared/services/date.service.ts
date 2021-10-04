import { Injectable } from '@angular/core';
import { Event } from 'src/app/core/models/events.model';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  format(event: Event[]): Event[] {
    const newEvent = event.map((ev: Event) => {
      const startDay = new Date(ev.start_date).getDate();
      const startMonth = String(
        new Date(ev.start_date).getMonth() + 1
      ).padStart(2, '0');
      const startYear = new Date(ev.start_date).getFullYear();

      const startDateFormatted = `${startDay}/${startMonth}/${startYear}`;

      const startHour = new Date(ev.start_date).getHours();
      const startMinute = String(new Date(ev.start_date).getMinutes()).padStart(
        2,
        '0'
      );

      const endDay = new Date(ev.end_date).getDate();
      const endMonth = String(new Date(ev.end_date).getMonth() + 1).padStart(
        2,
        '0'
      );
      const endYear = new Date(ev.end_date).getFullYear();

      const endDateFormatted = `${endDay}/${endMonth}/${endYear}`;

      const endHour = new Date(ev.end_date).getHours();
      const endMinute = String(new Date(ev.end_date).getMinutes()).padStart(
        2,
        '0'
      );

      return new Event().desirialize({
          ...ev,
          start_date: `${startHour}:${startMinute} ${startDateFormatted}`,
          end_date: `${endHour}:${endMinute} ${endDateFormatted}`
      })
    });

    return newEvent;
  }
}
