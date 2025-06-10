import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

enableProdMode();

// Configuración para la aplicación standalone
export default async () => {
  const app = await bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      importProvidersFrom(HttpClientModule, ReactiveFormsModule)
    ]
  });
  return app;
};