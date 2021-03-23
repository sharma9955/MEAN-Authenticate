import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  message: string = '';
  successmessage: boolean = false;

  constructor(
    private userser: UserService,
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullname: ['', Validators.compose([Validators.required])],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.emailRegEx),
        ]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  onSubmit() {
    try {
      let data = this.registerForm.value;

      this.userser.postuser(data).subscribe((res: any) => {
        this.registerForm.reset();

        this.toast.success('User register successfully');
        this.router.navigateByUrl('/login');
      });
    } catch (error) {
      this.toast.error('Something went wrong');
    }
  }
}
