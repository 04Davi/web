import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Importa RouterOutlet para el routing
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}