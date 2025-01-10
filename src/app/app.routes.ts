// Import Routes from Angular's router module and the LayoutComponent to define the routing configuration
import { Routes } from '@angular/router';
import { LayoutComponent } from './user/layout/layout.component';
import { ReportsComponent } from './user/reports/reports.component';

// Define the application's routing configuration
export const appRoutes: Routes = [
  // Default route: redirect to the login page
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login route: lazy load the LoginComponent when this path is accessed
  {
    path: 'login',
    loadComponent: () =>
      import('./user/login/login.component').then((m) => m.LoginComponent),
  },

  // Registration route: lazy load the RegistrationComponent when this path is accessed
  {
    path: 'register',
    loadComponent: () =>
      import('./user/registration/registration.component').then(
        (m) => m.RegistrationComponent
      ),
  },

  // Layout route: this is the main layout that contains child routes
  {
    path: '',
    component: LayoutComponent, // Use LayoutComponent for the '/layout' path
    children: [
      // Header route: lazy load the HeaderComponent when this path is accessed
      {
        path: 'header',
        loadComponent: () =>
          import('./user/header/header.component').then(
            (m) => m.HeaderComponent
          ),
      },
      // Left menu route: lazy load the LeftMenuComponent when this path is accessed
      {
        path: 'left-menu',
        loadComponent: () =>
          import('./user/left-menu/left-menu.component').then(
            (m) => m.LeftMenuComponent
          ),
      },

      {
        path: 'reports',
        loadComponent: () =>
          import('./user/reports/reports.component').then(
            (m) => m.ReportsComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./user/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./user/home/home.component').then((m) => m.HomeComponent),
      },
    ],
  },
];
