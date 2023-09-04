import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.userService.loginUser(this.loginForm.value).subscribe(
        (response) => {
          console.log('API Response:', response);
          const token = response;
          localStorage.setItem('token', token);
          console.log('Token:', token);
          this.router.navigate(['Home']);
          this.toastService.showSuccess('Login successful..!', 'Success');
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
    } else {
      this.toastService.showError(
        'Please provide your email and password.',
        'Login Error'
      );
    }
  }
}
