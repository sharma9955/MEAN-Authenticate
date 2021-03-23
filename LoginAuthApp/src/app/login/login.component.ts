import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  serverErrorMessages: string;

  model = {
    email: '',
    password: '',
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.emailRegEx),
        ]),
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    if (this.userService.isLoggedIn())
      this.router.navigateByUrl('/userprofile');
  }

  onSubmit() {
    this.userService.login(this.loginForm.value).subscribe(
      (res) => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/userprofile');
      },
      (err) => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
}
