// Importing Angular's CommonModule, which provides commonly needed services and directives (e.g., ngIf, ngFor).
import { CommonModule } from '@angular/common';
// Importing Angular's Component decorator for defining metadata for the component.
import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
// Importing Angular's FormBuilder, FormGroup, and Validators to build and manage reactive forms.
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// Importing FormsModule for template-driven forms functionality.
import { FormsModule } from '@angular/forms';
// Importing Router and NavigationEnd to navigate between routes and track the end of navigation events.
import { NavigationEnd, Router } from '@angular/router';
// Importing AuthService to handle authentication-related functionality (e.g., login, token management).
import { AuthService } from '../../shared/services/auth.service';
// Importing the Employee model, which represents the structure of an employee object.
import { Employee } from '../../models/employee';
// Importing EmployeeService to perform CRUD operations and business logic related to employees.
import { EmployeeService } from '../../shared/services/employee.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: [],
})
export class HomeComponent {
  // Reference to the modal element
  @ViewChild('myModal') model: ElementRef | undefined;

  // Form group for managing employee data and validations
  employeeForm: FormGroup = new FormGroup({});

  // Array to store employee data fetched from API
  employees: any[] = [];
  currentSortColumn: string | undefined;
  currentSortOrder: string | undefined;
  filteredEmployees: any[] = [];
  searchQuery: string = '';
  // Array for sample employee data
  employeelist: Employee[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  // Initialize component and fetch employee data
  ngOnInit(): void {
    this.setFormstate();
    this.fetchEmployees(); // Fetch employees when the component is initialized.

    // Listen to navigation events to refresh the grid
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/layout') {
        this.fetchEmployees(); // Refresh employee data on navigation
      }
    });
  }
  // Define the structure and validations for the employee form
  setFormstate() {
    this.employeeForm = this.fb.group({
      employeeId: [''],
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      maritalStatus: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      address1: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  // Fetch employees and initialize filteredEmployees
  fetchEmployees() {
    this.authService.getEmployeeList().subscribe({
      next: (data) => {
        console.log('Employee data fetched:', data);
        this.employees = data; // Update the main employees array
        this.filteredEmployees = [...this.employees]; // Initialize filteredEmployees with the full list
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      },
    });
  }
  sortTable(column: string): void {
    if (this.currentSortColumn === column) {
      // Toggle sort order if the column is already sorted
      this.currentSortOrder = this.currentSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // Set sorting column and default order
      this.currentSortColumn = column;
      this.currentSortOrder = 'asc';
    }

    // Custom sorting logic for "FullName"
    this.filteredEmployees = [...this.filteredEmployees].sort((a, b) => {
      let valueA: string | number = '';
      let valueB: string | number = '';

      if (column === 'FullName' || column === 'name') {
        // Concatenate firstName, middleName, and lastName for comparison
        valueA = `${a.firstName || ''} ${a.middleName || ''} ${
          a.lastName || ''
        }`
          .trim()
          .toLowerCase();
        valueB = `${b.firstName || ''} ${b.middleName || ''} ${
          b.lastName || ''
        }`
          .trim()
          .toLowerCase();
      } else {
        // Use the column directly for other fields
        valueA = (a[column] || '').toString().toLowerCase();
        valueB = (b[column] || '').toString().toLowerCase();
      }

      // Perform comparison based on current sort order
      if (valueA < valueB) return this.currentSortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.currentSortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }
  getSortIcon(column: string): string {
    if (this.currentSortColumn !== column) {
      return 'bi-arrow-down-up'; // Default icon when not sorted
    }
    return this.currentSortOrder === 'asc' ? 'bi-arrow-up' : 'bi-arrow-down';
  }
  isCustomIcon(column: string): boolean {
    // Ensure the custom icon logic is still valid
    return true; // Always show the icon
  }
  // Filter employees based on search query
  filterEmployees(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      // If no search query, reset filteredEmployees to show all employees
      this.filteredEmployees = [...this.employees];
    } else {
      // Filter employees based on the query
      this.filteredEmployees = this.employees.filter((employee) => {
        const fullName = `${employee.firstName || ''} ${
          employee.middleName || ''
        } ${employee.lastName || ''}`.toLowerCase();
        return (
          fullName.includes(query) ||
          (employee.email && employee.email.toLowerCase().includes(query)) ||
          (employee.mobileNumber &&
            employee.mobileNumber.toString().includes(query)) ||
          (employee.username && employee.username.toLowerCase().includes(query))
        );
      });
    }
  }

  // employee: any[] = [
  //   {
  //     // employeeID: '',
  //     firstName: '',
  //     middleName: '',
  //     lastName: '',
  //     maritalStatus: '',
  //     dateOfBirth: '',
  //     mobileNumber: '',
  //     address1: '',
  //     city: '',
  //     state: '',
  //     street: '',
  //     zipCode: 0,
  //     email: '',
  //     username: '',
  //     password: '',
  //   },
  // ];
  onEdit(employee: any) {
    console.log('employee', employee);
    this.employeeForm.patchValue({
      employeeId: employee.employeeId,
      firstName: employee.firstName,
      middleName: employee.middleName,
      lastName: employee.lastName,
      email: employee.email,
      mobileNumber: employee.mobileNumber,
      city: employee.city,
      maritalStatus: employee.maritalStatus,
      dateOfBirth: employee.dateOfBirth,
      address1: employee.address1,
      state: employee.state,
      street: employee.street,
      zipCode: employee.zipCode,
      username: employee.username,
      password: employee.password,
    });
    this.openModel();
  }
  isModalVisible = false; // Controls the modal visibility
  employeeToDelete: any = null;

  openDeleteModal(employee: any) {
    if (employee.name === 'Admin') {
      alert('Cannot delete this employee');
      return;
    }
    this.employeeToDelete = employee;
    this.isModalVisible = true; // Show modal
  }
  CloseModal() {
    this.isModalVisible = false; // Hide modal
    this.employeeToDelete = null; // Reset employee
  }
  confirmDelete() {
    if (this.employeeToDelete) {
      // Call the deleteEmployee API from EmployeeService
      this.employeeService
        .deleteEmployee(this.employeeToDelete.employeeId) // Use the correct ID field
        .then(() => {
          console.log('Employee deleted successfully');
          this.fetchEmployees(); // Refresh the grid after deletion
        })
        .catch((err) => {
          console.error('Error deleting employee:', err);
        })
        .finally(() => {
          this.CloseModal(); // Always close the modal
        });
    }
  }
  // Open modal to add/edit employee
  openModel() {
    const newEmployee = document.getElementById('myModal');
    if (newEmployee != null) {
      newEmployee.style.display = 'block';
    }
  }
  // Close the modal
  closeModal() {
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }
  // Submit the form to add or update an employee
  onSubmit() {
    console.log('Form Valid:', this.employeeForm.valid);
    console.log('Form Valid:', this.employeeForm.value);
    for (const controlName in this.employeeForm.controls) {
      const control = this.employeeForm.controls[controlName];
      if (control.errors) {
        console.log(`${controlName} Errors:`, control.errors);
      }
    }

    // Proceed only if the form is valid
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;
      console.log('Employee Data:', employeeData);
      // Check if we are updating an existing employee
      if (employeeData.employeeId) {
        // Update employee
        this.employeeService
          .updateEmployee(employeeData)
          .then((response) => {
            console.log('Employee updated successfully:', response);
            this.fetchEmployees(); // Refresh employee list after updating
            this.employeeForm.reset(); // Clear the form
            this.closeModal(); // Close the modal
          })
          .catch((err) => {
            console.error('Error updating employee:', err);
          });
      } else {
        delete employeeData['employeeId'];
        // Create new employee
        this.authService.createEmployee(employeeData).subscribe({
          next: (response) => {
            console.log('Employee added successfully:', response);
            this.fetchEmployees(); // Refresh employee list after adding
            this.employeeForm.reset(); // Clear the form
            this.closeModal(); // Close the modal
          },
          error: (err) => {
            console.error('Error adding employee:', err);
          },
        });
      }
    } else {
      console.log('employeeForm', this.employeeForm);
      console.error('Form is invalid');
    }
  }
}
