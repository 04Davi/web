import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
      <div class="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl text-center">
        <h1 class="text-4xl font-bold text-indigo-700 mb-6">Bienvenido, {{ username }}</h1>
        <p class="text-gray-600 mb-4">Estás listo para gestionar tu base de datos.</p>
        <a routerLink="/tables" class="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200">Ir a Tablas</a>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  username = 'David Murillo'; // Esto se puede obtener del login response
}