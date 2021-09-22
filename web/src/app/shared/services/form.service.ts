import { Injectable } from '@angular/core';

interface IFormValue {
  description: string,
  start_hour: string,
  start_date: string,
  end_hour: string,
  end_date: string,
  invites: string
}

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  submit({ description, start_hour, start_date, end_hour, end_date, invites }: IFormValue) {
    console.log(description);
  }
}
