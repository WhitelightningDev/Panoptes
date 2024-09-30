/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder for reactive forms
import axios from 'axios'; // Import Axios

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // Define a FormGroup to manage the login form
  errorMessage: string | null = null; // Variable to store error messages

  constructor(
    private router: Router,
    private fb: FormBuilder // Remove HttpClient as we're using Axios
  ) {
    // Initialize the form in the constructor
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // Username field with validators
      password: ['', [Validators.required]], // Password field with validators
    });
  }

  ngOnInit() {
    console.log('LoginComponent initialized'); // Log initialization
  }

  // Method to handle form submission
  async onLogin() {
    console.log('Login button clicked'); // Log when the login button is clicked
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value; // Extract values from the form
      console.log('Form values:', { username, password }); // Log the extracted values

      try {
        console.log('Sending login request to backend'); // Log before sending the request
        const response = await axios.post(
          'http://localhost:3000/api/users/login',
          {
            username,
            password,
          }
        );

        // Store the token received from the backend
        localStorage.setItem('token', response.data.token);
        console.log('Login successful, token received:', response.data.token); // Log successful login
        this.router.navigate(['/home']); // Navigate to the home page on successful login
      } catch (error) {
        // Handle login errors
        this.handleLoginError(error);
      }
    } else {
      console.log('Form is invalid', this.loginForm.errors); // Log errors in the form
    }
  }

  // Method to handle login error
  private handleLoginError(error: any) {
    console.error('Login failed', error); // Log error to console
    this.errorMessage = 'Invalid username or password. Please try again.'; // Set error message
    console.log('Displayed error message to user:', this.errorMessage); // Log the displayed error message
  }
}
