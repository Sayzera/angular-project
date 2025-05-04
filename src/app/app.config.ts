import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideHttpClient } from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    FontAwesomeModule,
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideHttpClient(),

    
  ],
};
