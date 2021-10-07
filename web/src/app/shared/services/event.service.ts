import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subject, Observable } from 'rxjs';

import { Event } from 'src/app/core/models/events.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private apollo: Apollo) {}

  setEvent(
    description: string,
    start_date: string,
    start_hour: string,
    end_date: string,
    end_hour: string,
    guests: string = ""
  ): Observable<Event> {
    const createEvent = gql`
      mutation (
        $guests: String!
        $end_date: String!
        $start_date: String!
        $description: String!
      ) {
        createEvent(
          guests: $guests
          end_date: $end_date
          start_date: $start_date
          description: $description
        ) {
          id
          description
          start_date
          end_date
        }
      }
    `;

    start_date = start_date + 'T' + start_hour;
    end_date = end_date + 'T' + end_hour;

    var subject = new Subject<Event>();

    this.apollo
      .mutate<any>({
        mutation: createEvent,
        variables: { description, start_date, end_date, guests },
      })
      .subscribe(({ data }) => {
        subject.next(data?.createEvent);
      });

    return subject.asObservable();
  }

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

  getInvites() {
    const guests = gql`
      query {
        guests {
          id
          description
          start_date
          end_date
        }
      }
    `;
    return this.apollo.watchQuery<any>({
      query: guests,
    });
  }

  updateEvent(
    id: string,
    description: string,
    start_date: string,
    start_hour: string,
    end_date: string,
    end_hour: string,
    guests: string = ""
  ): Observable<Event> {
    const updateEvent = gql`
      mutation (
        $id: String!
        $end_date: String!
        $start_date: String!
        $description: String!
      ) {
        updateEvent(
          end_date: $end_date
          start_date: $start_date
          description: $description
          id: $id
        ) {
          id
          description
          start_date
          end_date
        }
      }
    `;

    start_date = start_date + 'T' + start_hour;
    end_date = end_date + 'T' + end_hour;

    var subject = new Subject<Event>();

    this.apollo
      .mutate<any>({
        mutation: updateEvent,
        variables: { id, description, start_date, end_date, guests },
      })
      .subscribe(({ data }) => {
        subject.next(data?.createEvent);
      });

    return subject.asObservable();
  }

  deleteEvents(id: string) {
    const remove = gql`
      mutation ($id: String!) {
        deleteEvent(id: $id)
      }
    `;

    this.apollo
      .mutate<any>({
        mutation: remove,
        variables: { id },
      })
      .subscribe(
        () => {
          alert('Evento removido com sucesso!');
        },
        (error) => {
          alert(error);
        }
      );
  }

  deleteInvites(id: string) {
    const remove = gql`
      mutation ($id: String!) {
        deleteInvite(id: $id)
      }
    `;

    this.apollo
      .mutate<any>({
        mutation: remove,
        variables: { id },
      })
      .subscribe(
        () => {
          alert('Convite removido com sucesso!');
        },
        (error) => {
          alert(error);
        }
      );
  }
}
