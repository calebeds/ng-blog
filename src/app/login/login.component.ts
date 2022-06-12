import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = new User();
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  login() {
    this.errorMessage = '';
    this.authService.login(this.user.name, this.user.password).subscribe(
      result => {
        if(typeof localStorage !== 'undefined') {
          localStorage.setItem('token', result.token);
        }

        this.router.navigate(['/dashboard']);
      },
      err => {
        console.log(err);
        this.errorMessage =  'Username or password is wrong';
      }
    );
  }

}
