import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Public property to store the password
  public password: string = '';
  
  public loginMessage: string = '';

  constructor(private authservice: AuthServiceService, private router: Router) { }

  ngOnInit(): void {}

//When the user clicks the Login button
onLogin(loginform: NgForm): void {
  if (loginform.invalid) {
    // Handle invalid form
    return;
  }

  this.authservice.login(loginform.value.username, loginform.value.password)
    .then((response?: { token: string, username: string }) => {
      if (!response) {
        // Handle invalid login credentials
        this.loginMessage = 'Invalid username or password';
      } else {
        // Set token and navigate to messages
        this.authservice.setToken(response.token);
        this.router.navigate(['/Messages']);
      }
    })
    .catch((error: any) => {
      // Handle login failure
      console.error('Login failed:', error);

      // Check if the error is due to authentication failure
      if (error && error.error && error.error.message === 'Authentication Failure') {
        this.loginMessage = 'Invalid username or password';
      } else {
        // Handle other types of errors (e.g., network issues)
        this.loginMessage = 'An unexpected error occurred. Please try again later.';
      }
    });
}

  //When the user clicks the Logout button
  onLogout(): void {
    // Clear token and provide user feedback
    this.authservice.setToken('');
    alert('User successfully logged out');
  }
}