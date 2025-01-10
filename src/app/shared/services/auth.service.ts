import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { LoginRequest, LoginResponse } from '../../models/login';
import { Register } from '../../models/register';
import { Employee } from '../../models/employee';

// The AuthService handles authentication and employee management APIs
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Base API URL for backend services
  private apiUrl: string = 'https://localhost:7030/api/';

  constructor(private http: HttpClient) {}

  /**
   * Login method:
   * - Accepts user credentials and sends a POST request to the 'Login' endpoint.
   * - Returns a Promise for asynchronous handling.
   */
  login(credentials: any): Promise<any> {
    return this.http.post(`${this.apiUrl}Login`, credentials).toPromise(); // Converts the Observable to a Promise
  }

  /**
   * Create Employee method:
   * - Accepts employee data and sends a POST request to the 'EmployeeDetails' endpoint.
   * - Returns an Observable to allow subscription for response handling.
   * - Handles errors by logging them and re-throwing the error.
   */
  createEmployee(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}EmployeeDetails`, data).pipe(
      catchError((error) => {
        console.error('Error creating employee:', error); // Logs the error
        return throwError(error); // Re-throws the error for further handling
      })
    );
  }

  /**
   * Fetch Employee List method:
   * - Sends a GET request to the '' endpoint to retrieve all employees.
   * - Returns an Observable that emits an array of employee data.
   * - Handles errors by logging and re-throwing them.
   */
  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}EmployeeDetails`);
  }
}
