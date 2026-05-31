import { Routes } from '@angular/router';
import { ShellComponent } from './layouts/shell/shell';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home').then(m => m.HomeComponent)
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about').then(m => m.AboutComponent)
      },
      {
        path: 'experiences',
        loadComponent: () =>
          import('./features/experiences/experiences').then(m => m.ExperiencesComponent)
      },
      {
        path: 'work-samples',
        loadComponent: () =>
          import('./features/work-samples/work-samples').then(m => m.WorkSamplesComponent)
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./features/services/services').then(m => m.ServicesComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'home' }
];
