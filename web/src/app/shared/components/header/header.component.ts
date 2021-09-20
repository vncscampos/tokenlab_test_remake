import { Component } from '@angular/core';

import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  logo = '/assets/logo.svg';

  onClick() {
    const headerService = new HeaderService();
    headerService.getClick();
  }
}
