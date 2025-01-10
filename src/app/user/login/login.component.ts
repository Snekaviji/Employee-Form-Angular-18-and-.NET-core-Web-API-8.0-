// Import necessary modules and services for the component
import { Component } from '@angular/core'; // Import Component decorator to define Angular components
import { Router, RouterModule } from '@angular/router'; // Import Router and RouterModule for navigation and routing
import { FormsModule } from '@angular/forms'; // Import FormsModule for handling template-driven forms
import { CommonModule } from '@angular/common'; // Import CommonModule for common Angular directives (e.g., ngIf, ngFor)
import { AuthService } from '../../shared/services/auth.service'; // Import custom AuthService for handling authentication
import { LoginRequest } from '../../models/login'; // Import LoginRequest model for login data structure

@Component({
  // Define component selector, template, style, and providers
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: [],
  providers: [AuthService],
})
export class LoginComponent {
  // Declare component properties for binding to the form inputs
  username: string = ''; // Username property for binding to the input field
  password: string = '';

  // Constructor to inject AuthService for authentication and Router for navigation
  constructor(private authService: AuthService, private router: Router) {}

  // Submit handler function for the login form
  async onSubmit(): Promise<void> {
    // Check if both username and password are provided
    if (!this.username || !this.password) {
      alert('⚠️ Both fields are required.'); // Alert if either field is empty
      return;
    }
    // Prepare login credentials for authentication
    const credentials: LoginRequest = {
      username: this.username,
      password: this.password,
    };
    try {
      // Call AuthService to authenticate the user
      const response = await this.authService.login(credentials);
      console.log('Login response:', response); // Log the full response
      console.log('Login response:', response.message); // Log the message from response
      console.log('Login response:', response.userId); // Log the user ID from response

      // Check if the login was successful based on response
      if (
        response &&
        response.message == 'Login Successful' &&
        response.userId != null
      ) {
        // alert('✅ Login successful'); // Show success alert
        this.router.navigate(['/home']); // Navigate to the layout page upon success
      } else {
        console.error('Login error:'); // Log error if login fails
      }
    } catch (error) {
      console.error('Login error:', error); // Log any error that occurred during the login process
      alert('❌ An error occurred during login. Please try again later.'); // Show error alert if login fails
    }
  }
}
