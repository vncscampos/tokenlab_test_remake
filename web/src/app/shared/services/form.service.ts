import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, Subject } from 'rxjs';

interface IFormLogin {
  email: string;
  password: string;
}

interface IFormUser {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private apollo: Apollo) {}

  submitLogin({ email, password }: IFormLogin): Observable<any> {
    const login = gql`
      mutation ($password: String!, $email: String!) {
        session(password: $password, email: $email) {
          token
          user {
            id 
            name 
            email 
          }
        }
      }
    `;

    var subject = new Subject<any>();

    this.apollo
      .mutate<any>({
        mutation: login,
        variables: { email, password },
      })
      .subscribe(
        ({ data }) => {
          subject.next(data?.session);
        });

      return subject.asObservable();
  }

  submitUser({ name, email, password }: IFormUser): Observable<string> {
    const createUser = gql`
      mutation ($password: String!, $email: String!, $name: String!) {
        createUser(password: $password, email: $email, name: $name) {
          email
        }
      }
    `;

    var subject = new Subject<string>();

    this.apollo
      .mutate<any>({
        mutation: createUser,
        variables: { name, email, password },
      })
      .subscribe(
        ({ data }) => {
          subject.next(data?.createUser.email);
        });

    return subject.asObservable();
  }
}
