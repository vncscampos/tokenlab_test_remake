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
        ({ data }) => {
          alert('Evento removido com sucesso!');
        },
        (error) => {
          alert(error);
        }
      );
  }
}
