import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  getClick() {
    alert('aaah sai n pô!')
  }
}
