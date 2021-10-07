import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  logo = '/assets/logo.svg';

  constructor(private authService: AuthService) {}

  onClick() {
    this.authService.logout();
  }
}
