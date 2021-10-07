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
      .subscribe(({ data }) => {
        subject.next(data?.createUser.email);
      });

    return subject.asObservable();
  }
}
