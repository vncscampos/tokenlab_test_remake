import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logo = '/assets/logo.svg';

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null)
    })
  }

  ngOnInit(): void { }

  onSubmit() {
    console.log(this.form.value);
  }
}
