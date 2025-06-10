import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Importa provideHttpClient y withFetch
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()), // Habilita fetch para HttpClient
    importProvidersFrom(ReactiveFormsModule)
  ]
}).catch(err => console.error(err));