import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (c) => c.LoginComponent,
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (c) => c.RegisterComponent,
      ),
  },

  {
    path: 'todos',
    loadComponent: () =>
      import('./features/todos/pages/todos-page/todos-page.component').then(
        (c) => c.TodosPageComponent,
      ),
    canActivate: [authGuard],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
