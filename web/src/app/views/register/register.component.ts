import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  logo = '/assets/logo.svg';
  
  form: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [null],
      email: [null],
      password: [null],
    })
  }

  ngOnInit(): void { }

  onSubmit() {
    console.log(this.form.value);
  }
}
