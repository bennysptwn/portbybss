import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, Router, withComponentInputBinding, withNavigationErrorHandler, withViewTransitions } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions(),
      withNavigationErrorHandler(() => inject(Router).navigate(['/home']))
    ),
    provideClientHydration(withEventReplay())
  ]
};
