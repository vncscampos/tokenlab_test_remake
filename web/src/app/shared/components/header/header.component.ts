import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  logo = '/assets/logo.svg';

  constructor(private apollo: Apollo, private router: Router) {}

  onClick() {
    localStorage.removeItem('JWT');
    this.apollo.client.resetStore();
    this.router.navigate(['login']);
  }
}
