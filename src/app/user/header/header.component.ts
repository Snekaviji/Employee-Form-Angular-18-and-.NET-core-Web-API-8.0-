import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // Injects the Router service for navigation between routes
  constructor(private router: Router) {}

  // Tracks the state of the dropdown menu (open/closed)
  dropdownOpen = false;

  /**
   * Toggles the dropdown menu:
   * - Switches the `dropdownOpen` state between `true` and `false`.
   * - Used to show or hide the dropdown menu dynamically.
   */
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  /**
   * Navigates to the profile page:
   * - Called when the "View Profile" option is selected from the dropdown menu.
   */
  // viewProfile() {
  //   this.router.navigate(['/profile']);
  // }

  /**
   * Logs out the user:
   * - Logs a message to the console for debugging purposes.
   * - Redirects the user to the home (or login) page.
   */
  logout() {
    console.log('Logout clicked'); // Debug message
    this.router.navigate(['']); // Redirects to the root path
  }
}
