import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from 'src/app/core/models/user.model';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  logo = '/assets/logo.svg';

  subs: Subscription;
  form: FormGroup;
  valueEmail: string;
  valuePassword: string;

  constructor(
    private formService: FormService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.subs = this.activatedRoute.queryParams.subscribe((params: any) => {
      this.valueEmail = params['email'];
      this.valuePassword = params['password'];
    });

    this.form = new FormGroup({
      email: new FormControl(this.valueEmail),
      password: new FormControl(this.valuePassword),
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSubmit() {
    const { email, password } = this.form.value;

    this.formService.submitLogin({ email, password }).subscribe(
      (data) => {
        const user = new User().desirialize(data.user);

        localStorage.setItem('JWT', data.token);
        localStorage.setItem("user", JSON.stringify(user));

        this.route.navigate(['home']);
      },
      (error) => {
        alert(error);
      }
    );
  }
}
