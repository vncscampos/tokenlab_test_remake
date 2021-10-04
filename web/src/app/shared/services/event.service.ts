import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private apollo: Apollo) {}

  getEvents() {
    const events = gql`
      query events {
        events {
          id
          description
          start_date
          end_date
        }
      }
    `;
    return this.apollo.watchQuery<any>({
      query: events,
    });
  }
}
