import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.css',
})
export class LeftMenuComponent {
  // A boolean property to track the state of the left menu.
  // If true, the menu is collapsed (hidden or minimized).
  // If false, the menu is expanded (fully visible).
  isCollapsed: boolean = false;

  @Output() sidebarToggled = new EventEmitter<boolean>(); // EventEmitter for sidebar state
  // This method toggles the state of the menu between collapsed and expanded.
  // When called, it flips the value of `isCollapsed`:
  // - If the menu is currently expanded (`isCollapsed = false`), it will become collapsed (`isCollapsed = true`).
  // - If the menu is currently collapsed (`isCollapsed = true`), it will become expanded (`isCollapsed = false`).
  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit(this.isCollapsed); // Emit the state change
  }
}
