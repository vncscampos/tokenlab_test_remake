import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  logo = '/assets/logo.svg';

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      email: [null],
      password: [null],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const { name, email, password } = this.form.value;

    this.formService.submitUser({ name, email, password }).subscribe(
      () => {
        this.router.navigate(['login'], {
          queryParams: { email, password },
          skipLocationChange: true,
        });
      },
      (error) => {
        alert(error);
      }
    );
  }
}
