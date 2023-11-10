import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // Public property to store the password
  public password: string = '';

  constructor(public authservice: AuthServiceService) {}

  ngOnInit(): void {}

  // Method to handle user signup when the form is submitted
  onSignup(signupform: NgForm) {
    // Check if the form is invalid
    if (signupform.invalid) {
      return;
    }

    // Call the signup method from the auth service
    this.authservice.signup(
      signupform.value.enteredusername,
      signupform.value.enteredfirstname,
      signupform.value.enteredlastname,
      this.password
    );

    signupform.reset();

    // Display an alert indicating successful user creation
    alert('User created, you can now login to your new account.');
  }
}
