import { Component } from '@angular/core';
import { LeftMenuComponent } from '../left-menu/left-menu.component';
import { HeaderComponent } from '../header/header.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [LeftMenuComponent, HeaderComponent, RouterOutlet, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  currentPage: number = 1; // Current active page
  totalPages: number = 25; // Total number of pages
  visiblePages: number[] = []; // Pages visible in the pagination bar
  dropdownPages: number[] = []; // Pages visible in the dropdown

  constructor() {
    this.updatePagination();
  }

  /**
   * Update the pagination bar and dropdown based on the current page
   */
  private updatePagination(): void {
    // Set visible pages (show 5 pages at a time)
    const startPage = Math.floor((this.currentPage - 1) / 5) * 5 + 1;
    const endPage = Math.min(startPage + 4, this.totalPages);
    this.visiblePages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );

    // Set dropdown pages (only 10, 15, 20, 25)
    this.dropdownPages = Array.from(
      { length: this.totalPages / 5 },
      (_, i) => (i + 1) * 5
    ).filter((page) => !this.visiblePages.includes(page));
  }

  /**
   * Handle "Previous" button click
   */
  onPrevious(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  /**
   * Handle "Next" button click
   */
  onNext(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  /**
   * Go to a specific page
   */
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  /**
   * Handle dropdown selection
   */
  onSelectDropdown(event: Event): void {
    const selectedPage = +(event.target as HTMLSelectElement).value;
    this.goToPage(selectedPage);
  }
}