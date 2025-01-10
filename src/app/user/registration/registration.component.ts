import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration', // Component selector
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule], // Required modules for form handling, routing, and common features
  templateUrl: './registration.component.html',
  styleUrls: [],
})
export class RegistrationComponent {
  authService = inject(AuthService); // Injecting AuthService for API interaction
  registerForm: FormGroup; // Registration form group

  // Regex patterns for validations
  EmailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
  passwordPattern =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    // Initializing the form with controls and validations
    this.registerForm = this.formBuilder.group(
      {
        FirstName: ['', [Validators.required]],
        MiddleName: [''],
        LastName: ['', [Validators.required]],
        MaritalStatus: ['', Validators.required],
        DateOfBirth: ['', [Validators.required]],
        Email: [
          '',
          [Validators.required, Validators.pattern(this.EmailPattern)],
        ],
        MobileNumber: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
        ],
        Address1: ['', Validators.required],
        Street: [''],
        City: ['', Validators.required],
        State: ['', Validators.required],
        ZipCode: ['', [Validators.required]],
        UserName: ['', [Validators.required, Validators.minLength(5)]],
        Password: [
          '',
          [Validators.required, Validators.pattern(this.passwordPattern)],
        ],
        ConfirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator } // Custom validator for password matching
    );
  }

  // Custom validator to ensure passwords match
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('Password')?.value;
    const confirmPassword = formGroup.get('ConfirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Handles form submission
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.createEmployee(this.registerForm.value).subscribe(
        (response) => {
          console.log('Employee created successfully', response);
          this.registerForm.reset(); // Reset form after successful submission
          this.router.navigate(['/home']); // Navigate to the home page
        },
        (error) => {
          console.error('Error creating employee', error);
          if (error.status === 400) {
            console.error('Bad Request - Check data or API contract');
          }
        }
      );
    }
  }
}
