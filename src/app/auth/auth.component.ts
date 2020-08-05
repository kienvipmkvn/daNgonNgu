import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent{
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<User>;

    this.isLoading = true;
      authObs = this.authService.login(email, password); 

    authObs.subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['quan-ly/chinh-sua']);
        this.toastr.success("Login success!", 'LOGIN');
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
        this.toastr.error(errorMessage, 'ERROR');
      }
    );

    form.reset();
  }
}
