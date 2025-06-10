import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-main',
  template: `
    <div class="flex h-screen">
      <app-menu class="w-1/5"></app-menu>
      <main class="w-4/5 p-4">
        <h2 class="text-2xl font-bold">Bienvenido al Panel Principal</h2>
        <p>Este es el contenido de la página principal.</p>
      </main>
    </div>
  `,
  styleUrls: ['./main.component.css'],
  imports: [MenuComponent]
})
export class MainComponent {}