import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

interface IFormLogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo, private router: Router) {}

  session({ email, password }: IFormLogin): Observable<any> {
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
      .subscribe(({ data }) => {
        subject.next(data?.session);
      });

    return subject.asObservable();
  }

  logout() {
    localStorage.removeItem('JWT');
    localStorage.removeItem('user');
    this.apollo.client.resetStore();
    this.router.navigate(['login']);
  }
}
