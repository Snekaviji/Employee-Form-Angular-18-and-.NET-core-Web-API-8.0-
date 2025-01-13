import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Employee } from '../../models/employee';

// The EmployeeService handles API operations for managing employee data.
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // Base API URL for employee-related operations
  private apiurl: string = 'https://localhost:7030/api/EmployeeDetails';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all employees:
   * - Sends a GET request to retrieve all employee details.
   * - Converts the Observable to a Promise using `firstValueFrom` for asynchronous handling.
   * - Returns an array of Employee objects.
   */
  getAllEmployees() {
    return firstValueFrom(this.http.get<Employee[]>(this.apiurl));
  }
  /**
   * Fetch employees (alternative):
   * - Sends a POST request to the endpoint.
   * - Returns an Observable emitting an array of employee data.
   */
  fetchEmployees(data: any) {
    return this.http.post<any[]>(`${this.apiurl}EmployeeDetails`, data);
  }

  /**
   * Delete an employee:
   * - Accepts the employee's ID and sends a DELETE request to remove the employee.
   * - Uses `firstValueFrom` to convert the Observable to a Promise.
   */
  deleteEmployee(id: number) {
    return firstValueFrom(this.http.delete(`${this.apiurl}/${id}`));
  }

  /**
   * Update an employee:
   * - Accepts an Employee object and sends a PUT request to update the employee's details.
   * - The URL includes the employee's ID for identification.
   * - Converts the Observable to a Promise using `firstValueFrom`.
   */
  updateEmployee(employee: Employee) {
    return firstValueFrom(
      this.http.put(`${this.apiurl}/${employee.employeeId}`, employee)
    );
  }
}
